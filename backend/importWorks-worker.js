const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
const { parentPort, workerData } = require('worker_threads');
const Book = require('./boxes/libraryBookBox');

const BATCH_SIZE = 1000;

(async () => {
  await mongoose.connect('mongodb://localhost:27017/mydatabase');

  const { filePath, startLine, endLine, threadId } = workerData;
  const errorLog = fs.createWriteStream(`error_log_${threadId}.log`, { flags: 'a' });

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let batch = [];
  let count = 0;
  let currentLine = 0;

  for await (const line of rl) {
    if (currentLine < startLine) {
      currentLine++;
      continue;
    }
    if (currentLine >= endLine) break;

    currentLine++;

    const parts = line.split('\t');
    if (parts.length < 5) continue;

    let doc;
    try {
      doc = JSON.parse(parts[4]);
    } catch (err) {
      errorLog.write(`[PARSE] ${err.message}\n${line.slice(0, 300)}\n\n`);
      continue;
    }

    try {
      const cover_i = Array.isArray(doc.covers) && doc.covers.length > 0 ? doc.covers[0] : null;

      const filteredDoc = {
        key: doc.key,
        title: doc.title,
        description: typeof doc.description === 'object' ? doc.description.value : doc.description,
        subjects: doc.subjects || [],
        authors: doc.authors ? doc.authors.map((a) => a.author.key) : [],
        cover_i: cover_i,
      };

      batch.push({
        updateOne: {
          filter: { key: filteredDoc.key },
          update: { $set: filteredDoc },
          upsert: true,
        },
      });

      count++;

      if (batch.length >= BATCH_SIZE) {
        await Book.bulkWrite(batch);
        batch = [];

        //Sends progress to the main flow
        parentPort.postMessage({ threadId, progress: count });
      }

    } catch (err) {
      errorLog.write(`[SAVE] ${err.message}\nkey: ${doc?.key || 'unknown'}\n\n`);
    }
  }

  //Proceeds what left
  if (batch.length > 0) {
    await Book.bulkWrite(batch);
  }

  await mongoose.disconnect();

  //The job is done
  parentPort.postMessage({ threadId, count, done: true });
})();
