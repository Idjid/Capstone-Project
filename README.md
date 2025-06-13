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



![image](https://github.com/user-attachments/assets/857fa453-d9d0-4cb9-b398-c5f4b11d66bf)
Milestone 2:

Architecture(0.2v):

![image](https://github.com/user-attachments/assets/38ebec11-fc49-4cff-9281-ad84599dfa7c)

------------------------------------------------------------

Design inspiration: https://dribbble.com/shots/19202835-Digital-Book-Library-Dashboard

-----------------------------------------------------------
Database schema(0.2v):

![image](https://github.com/user-attachments/assets/c8a7b442-a8e7-49be-9e58-f859e60ee66d)

-----------------------------------------------------

API contract submission:

API contacts:

Authentication Endpoints

POST /api/auth/register - Registers a new user

POST /api/auth/login - Logs in as a user



Admin Endpoints:

POST /api/admin/users - Bans/blocks a user

GET /api/admin/users - Admin views all users

GET /api/admin/books - Admin views all listings

DELETE /api/admin/users/user-id- Admin deletes user

DELETE /api/admin/listings/user-id - Admin deletes listing



User EndPoints:

GET /api/users/user-id - User gets his profile

POST /api/chat/chat-id – User creates chat with other user

GET /api/chat/chat-id – User opens chat


Favorite EndPoints:

POST /api/users/user-id/user-books - User saves his favorite books  

GET /api/users/user-id/user-books - Get users favorite books

DELETE /api/users/user-id/user-books – Deletes saved books


Review EndPoints: 

POST /api/reviews - User makes a review

GET /api/reviews/review-id - View the review

PUT /api/reviews/review-id – User edits a review

DELETE /api/reviews/review-id – User deletes a review

-----------------------------------------------------------
CRUD operations

User collection:

Create: Register new account; Make his own library of favorite books; Create a chat with other users

Read: Login, get user profile, open books

Update: Update account/profile info

Delete: Can delete account himself or admin will do



Review collection:

Create: Students leaves reviews on books and other users

Read: Listing displays their review

Update: User edits his review

Delete: User or admin could delete review


Favorite collection:

Create: User saves a book for the list

Read: User views his saved list

Update: Change status of the book in his list (reading, finished, planning to read)

Delete: User deletes a book from his list of favorites
