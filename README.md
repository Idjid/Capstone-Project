Project Title: Read&Share


Problem Statement: 
We all know the problems of new books. They are always very overpriced, and used ones always drop in price. It is often difficult to find a book on marketplaces, and it is expensive to buy a new one



Overview of the Application’s Functionality:

On this website people will be able to share books they have read or sell them if they don't need them. 

Also, here it will be possible to leave reviews of certain books and create discussions so that people who have read it can exchange opinions or just chat.

Also, in the “community” section will be a subsection where people can publish their fan works, whether it is a drawing or a short story with their vision of the story.

The main functions of the website should be the ease of getting books, the ability of the community to communicate with each other and find common friends in one way or another. 

Users would also have their own profile with the history of the stories they have read and the feedback they have left on them. Thanks to this information, the website will recommend them new books in genres with similar interests of the user.



Technology Stack:


Front-end:

Main language: JavaScript/TypeScript

Framework: React.js, Next.js

Style: Tailwind Css (styling), Frame Motion (for animation) (optional)


Back-end:

Language: Node.js

Framework: Express.js

Authenticator: JWT (JSON Web Token), Password.js or NextAuth (for Google Auth.)

DataBase: Prisma ORM (comfortable with TypeScript), PostgreSQL (support full text search)

Cloud: Amazon S3

Hosting: EC2/Firebase
API: Google Books API or Open Library (от Internet Archive), Maps JavaScirpt API	


Other:

Git-hub (branches to approve update)

Axios (to work with API)



Features to be Implemented:


Core features:

•	Share or sell secondhand books

•	Map to easily orientate where book is

•	Full chat between users (GIF, pictures and stickers allowed)

•	Login with Google account


Additional features:

•	Users able to create discussions 

•	Profile page for each user

•	Recommendation system

•	Revies to books 

•	Community page (fan arts, discussions, fan stories)



User Stories:

As a User, I want to able to buy secondhand books, so that I can afford it.

As a User, I want to see Map so it will be easier to borrow book from person.

As a User, I want to chat with users so that we can discuss where can we meet. 



Instructor Feedback and Approval:

•	Be carefull with Next.js (don’t have MAC)

•	Be carefull with Next.js (if don’t have MAC)
•	Hosting deploys place (EC2)

•	MapBox for API (cheaper)
•	Chat is hard

•	SQL

•	GUESTs if don’t want to login

•	Login without Google

•	Community section

•	Add somebody in the chat (multi-user chat)

•	Multilanguage (website, comment sections)

•	Cencorship



Milestone 2:

Architecture(0.3v):

![image](https://github.com/user-attachments/assets/3df698e5-e3a0-4242-872a-55fb2f5aa277)


------------------------------------------------------------

Design inspiration: https://dribbble.com/shots/19202835-Digital-Book-Library-Dashboard

-----------------------------------------------------------
Database schema(0.4v):

![image](https://github.com/user-attachments/assets/a3306cbb-75de-42f3-ac17-f5c790e9c24b)


-----------------------------------------------------

API contract submission:

API contacts:

Authentication Endpoints

POST /api/auth/register - Registers a new user

POST /api/auth/login - Logs in as a user



Admin Endpoints:

GET /api/admin/users - Admin views all users

GET /api/admin/users/:id - Admin check just one user

GET /api/admin/books - Admin views all books from library

GET /api/admin/books/:id - Admin check a book from library (+)

DELETE /api/admin/users/:id - Admin deletes user

DELETE /api/admin/listings/user-id - Admin deletes listing



User EndPoints:

GET /api/user/me - User gets his profile

POST /api/chat/chat-id – User creates chat with other user (+)

GET /api/chat/chat-id – User opens chat (+)

DELETE /api/user/me - User deletes his profile


Favorite EndPoints:

POST /api/favorites/"bookId": "id" - User saves book to his favorite list

GET  /api/favorites - User gets his list with saved books

DELETE /api/favorites/:bookId – Deletes saved book


Review EndPoints: 

POST /api/reviews - User makes a review

GET /api/reviews/:bookId - User checks reviews to book

PUT /api/reviews/ – User edits a review (+)

DELETE /api/reviews/:reviewId – User deletes a review

-----------------------------------------------------------
CRUD operations

User collection:

Create: Register new account; Make his own library of favorite books; Create a chat with other users

Read: Login, get user profile, open books

Update: Update account/profile info

Delete: Can delete account himself or admin will do



Review collection:

Create: Students leaves reviews on books

Read: Users can read reviews on books

Update: User edits his review

Delete: User or admin could delete review


Favorite collection:

Create: User saves a book in his favorite list

Read: User views saved books in the list

Update: Change status of the book in his list (reading, finished, planning to read) (+)

Delete: User deletes a book from his list 
