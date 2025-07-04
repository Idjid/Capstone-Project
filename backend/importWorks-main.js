const { Worker } = require('worker_threads');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const FILE_PATH = './ol_dump_works_2025-05-31.txt';
const THREADS = 4;
const PROGRESS_FILE = 'progress.json';

async function countLines(path) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(path),
    });
    rl.on('line', () => count++);
    rl.on('close', () => resolve(count));
    rl.on('error', reject);
  });
}

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function runMultithreadImport() {
  const totalLines = await countLines(FILE_PATH);
  const chunkSize = Math.ceil(totalLines / THREADS);

  console.log(`Total amount of boxes: ${totalLines}`);
  console.log(`Starting ${THREADS} threads, ~${chunkSize} each`);

  //Downloading progress and creating new massive
  let progress = loadProgress();
  if (!progress || !Array.isArray(progress) || progress.length !== THREADS) {
    progress = new Array(THREADS).fill(0);
  }

  const startTime = Date.now();

  function printProgress() {
    const totalProcessed = progress.reduce((a, b) => a + b, 0);
    const percent = ((totalProcessed / totalLines) * 100).toFixed(2);
    const elapsedSec = (Date.now() - startTime) / 1000;
    const speed = totalProcessed / elapsedSec; 
    const remaining = totalLines - totalProcessed;
    const remainingSec = remaining / (speed || 1);
    const remainingMin = (remainingSec / 60).toFixed(2);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress: ${percent}% (${totalProcessed}/${totalLines}) — left ≈ ${remainingMin} min`);
  }

  let completed = 0;
  let workers = [];

  //Saving progress each minute
  const saveInterval = setInterval(() => {
    saveProgress(progress);
  }, 1000);

  //Cancelling
  process.on('SIGINT', () => {
    console.log('Saving teh progress');
    saveProgress(progress);
    process.exit();
  });

  for (let i = 0; i < THREADS; i++) {
    const start = i * chunkSize + progress[i]; //Start from checkpoint!
    const end = Math.min((i + 1) * chunkSize, totalLines);

    if (start >= end) {
      //finished Thread
      console.log(` [Thread ${i + 1}] already finished (processed ${progress[i]} boxes)`);
      completed++;
      if (completed === THREADS) {
        clearInterval(saveInterval);
        console.log('Import finally finished!');
        process.exit(0);
      }
      continue;
    }

    const workerPath = path.resolve(__dirname, 'importWorks-worker.js');

    const worker = new Worker(workerPath, {
      workerData: {
        filePath: FILE_PATH,
        startLine: start,
        endLine: end,
        threadId: i + 1,
      },
    });

    workers.push(worker);

    worker.on('message', (msg) => {
  if (msg.progress !== undefined) {
    progress[i] = msg.progress;
    printProgress();
  }
  if (msg.done) {
    console.log(`Thread ${msg.threadId}] already finished: ${msg.count} boxes`);
    completed++;
    if (completed === THREADS) {
      clearInterval(saveInterval);
      if (fs.existsSync(PROGRESS_FILE)) fs.unlinkSync(PROGRESS_FILE);
      console.log('Import finally finished in ALL threads god damn it!!!');
      process.exit(0);
    }
  }
});


    worker.on('error', (err) => {
      console.error(`Error in the flow ${i + 1}:`, err);
    });
  }
}

runMultithreadImport();
