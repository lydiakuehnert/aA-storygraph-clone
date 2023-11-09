# The PorchStory

The PorchStory is a clone of The StoryGraph website. It is a book lovers site where users can add books, review books, and add a book to their read list. The PorchStory was built using Flask and Python for the backend and React and Redux for the frontend. 

Live Link: https://theporchstory.onrender.com	

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

 ## Index

[Feature List](https://github.com/lydiakuehnert/aA-storygraph-clone/wiki/Feature-List) | [Database Schema](https://github.com/lydiakuehnert/aA-storygraph-clone/wiki/Database-Schema) | [User Stories](https://github.com/lydiakuehnert/aA-storygraph-clone/wiki/User-Stories) | [Wireframes](https://github.com/lydiakuehnert/aA-storygraph-clone/wiki/Wireframes)

## Landing Page
![landing](https://porchstorybucket.s3.amazonaws.com/PorchStory+Screenshots/Landing+Page.png)

## Book Browser Page
![books](https://porchstorybucket.s3.amazonaws.com/PorchStory+Screenshots/Browse+Books+Page.png)

## Book Page
![book](https://porchstorybucket.s3.amazonaws.com/PorchStory+Screenshots/Book+Page.png)

## Add Page
![add](https://porchstorybucket.s3.amazonaws.com/PorchStory+Screenshots/Add+Book+Page.png)


## Endpoints
### Auth
| Request                        | Purpose                | Return Value  |                  
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'profile_pic': STRING<br>}<br>|
| POST /api/auth/unauthorized      | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized'          | {<br>&nbsp;&nbsp;&nbsp;'errors': ['Unauthorized']<br>}<br>|
| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'profile_pic': STRING<br>}<br>|
| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'profile_pic': STRING<br>}<br>|                                                                        
| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.                                 | {<br>&nbsp;&nbsp;&nbsp;'message': 'User logged out'<br>}<br>|

### Books
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/books        | This fetch is sent to get all the books in the book table. Upon success, it returns an array of book objects.                 | [{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'author': STRING,<br>&nbsp;&nbsp;&nbsp;'pageNum': INT,<br>&nbsp;&nbsp;&nbsp;'yrPublished': INT,<br>&nbsp;&nbsp;&nbsp;'genre': STRING,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>&nbsp;&nbsp;&nbsp;'picture': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'tags': ARRAY,<br>&nbsp;&nbsp;&nbsp;'avgRating': INT,<br>}]<br>|
| POST /api/books/add        | This fetch is sent to add a new item to the book table. Upon success, it returns an object with the key of 'newBook' representing that item.                 | {<br>&nbsp;&nbsp;&nbsp;'newSong': <br>&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'author': STRING,<br>&nbsp;&nbsp;&nbsp;'pageNum': INT,<br>&nbsp;&nbsp;&nbsp;'yrPublished': INT,<br>&nbsp;&nbsp;&nbsp;'genre': STRING,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>&nbsp;&nbsp;&nbsp;'picture': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'tags': ARRAY,<br>&nbsp;&nbsp;&nbsp;'avgRating': INT,<br>}}<br>|
| PUT /api/books/<int:id>       | This fetch is sent to update a book. Upon success, it returns an object representing that book with the updated information.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'author': STRING,<br>&nbsp;&nbsp;&nbsp;'pageNum': INT,<br>&nbsp;&nbsp;&nbsp;'yrPublished': INT,<br>&nbsp;&nbsp;&nbsp;'genre': STRING,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>&nbsp;&nbsp;&nbsp;'picture': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'tags': ARRAY,<br>&nbsp;&nbsp;&nbsp;'avgRating': INT,<br>}<br>|
| DELETE /api/books/<int:id>        | This fetch is sent to delete a book. Upon success, it returns an object of success with the string "successfully deleted", otherwise, we throw an error.                | {"Success": "successfully deleted"}<br>|
| GET /api/books/<int:id>        | This fetch is sent to get one book based on id. Upon success, it returns the an object with that book.                | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'author': STRING,<br>&nbsp;&nbsp;&nbsp;'pageNum': INT,<br>&nbsp;&nbsp;&nbsp;'yrPublished': INT,<br>&nbsp;&nbsp;&nbsp;'genre': STRING,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>&nbsp;&nbsp;&nbsp;'picture': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'tags': ARRAY,<br>&nbsp;&nbsp;&nbsp;'avgRating': INT,<br>}<br>|
| GET /api/books/search        | This fetch is sent to get books based on a filter. Upon success, it returns an array of book objects.                | [{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'title': STRING,<br>&nbsp;&nbsp;&nbsp;'author': STRING,<br>&nbsp;&nbsp;&nbsp;'pageNum': INT,<br>&nbsp;&nbsp;&nbsp;'yrPublished': INT,<br>&nbsp;&nbsp;&nbsp;'genre': STRING,<br>&nbsp;&nbsp;&nbsp;'description': STRING,<br>&nbsp;&nbsp;&nbsp;'picture': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'tags': ARRAY,<br>&nbsp;&nbsp;&nbsp;'avgRating': INT,<br>}]<br>|

### Reviews
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/reviews/<int:bookId>        | This fetch is sent to get all the reviews associated with a particular book. Upon success, it returns an array of review objects.                 | [{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'review': STRING,<br>&nbsp;&nbsp;&nbsp; 'stars': INT,<br>&nbsp;&nbsp;&nbsp;'date': DATE,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'book': OBJECT<br>}]<br>|
| POST /api/reviews/<int:bookId>/new        | This fetch is sent to add a new item to the review table. Upon success, it returns that new review.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'review': STRING,<br>&nbsp;&nbsp;&nbsp; 'stars': INT,<br>&nbsp;&nbsp;&nbsp;'date': DATE,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'book': OBJECT<br>}<br>|
| PUT /api/reviews/edit/<int:id>       | This fetch is sent to update a review. Upon success, it returns an object representing that review with the updated information.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'review': STRING,<br>&nbsp;&nbsp;&nbsp; 'stars': INT,<br>&nbsp;&nbsp;&nbsp;'date': DATE,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'book': OBJECT<br>}<br>|
| DELETE /api/reviews/<int:id>        | This fetch is sent to delete a review. Upon success, it returns an object of success with the string "successfully deleted".                | {"Success": "successfully deleted"}<br>|


<!-- ### Likes
| Request                        | Purpose                | Return Value  | 
| :----------------------------- | :--------------------: | :------------------------------ |
| GET /api/likes        | This fetch is sent to get all the liked songs of a particular user. Upon success, it returns an array of songs objects.                 | [{<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'name': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING,<br>&nbsp;&nbsp;&nbsp;'audio': STRING,<br>&nbsp;&nbsp;&nbsp;'user': OBJECT,<br>&nbsp;&nbsp;&nbsp;'likes': INT,<br>}]<br>|
| POST /api/likes/<int:songId>        | This fetch is sent to add a user_id and song_id into the likes join table. Upon success, it returns that user.                 | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING<br>}<br>|
| DELETE /api/likes/<int:songId>        | This fetch is sent to delete a like from the joing table. Upon success, it returns that current user.                | {<br>&nbsp;&nbsp;&nbsp;'id': INT,<br>&nbsp;&nbsp;&nbsp;'username': STRING,<br>&nbsp;&nbsp;&nbsp;'email': STRING,<br>&nbsp;&nbsp;&nbsp;'firstname': STRING,<br>&nbsp;&nbsp;&nbsp;'lastname': STRING,<br>&nbsp;&nbsp;&nbsp;'image': STRING<br>}<br>| -->

## Feature List
1. Books
2. Reviews
3. Read Books
4. Search


## Connect with the developer
[Lydia: LinkedIn](https://www.linkedin.com/in/lydia-kuehnert-619286203/)