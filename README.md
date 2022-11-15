# CSE 341 Final project Proposal
## General Info
Cynthia Rawlings, Eren Radichel
To Do List API
https://cse341todolistapi.onrender.com

## Application Info
### What will the API do?
Out API will allow a user to create an account and log in through an endpoint. They will be able to see tasks that they have already completed as well as tasks on their to do lists. They will have multiple to do lists including a daily to do list, a weekly to do list, a completed daily to do list, and a completed weekly to do list. The user will also be able to logout through an endpoint.
### How will your API utilize a login system?
Our users will be able to log in to our API using OAuth through an endpoint.
### What database will you use?
We will be using MongoDB as our database.
### How will the data be stored in your database?
The data will be stored into 5 collections inside a database called toDoLists. The first collection will be called users and store all the user’s information as well as the IDs for their to do lists. The other collections will be called dailyToDo, weeklyToDo, dailyComplete, and weeklyComplete. Each of these collections will have only 1 object for each user but will link back to the user through an ID.
### How would a frontend be able to manage authentication state based on the data you provide?
We will be using OAuth so a user can login with their email after connecting to the login endpoint.
### What pieces of data in your app will need to be secured? How will you demonstrate web security principles in the development of this app?
All collections in our application will need to be secured because they will all contain personal information about the user. We will be using 0Auth for users to log in so we will not be storing information in the database. To access any of the list collections the user will have to provide the correct ID along with the matching 0Auth ID.
### What file structure and program architecture will you use for this project (how will you organize your node project)? Why?
We will be using NodeJS and we will have different folders for connecting to the database, routes, controllers, and swagger documentation. We will also have a server.js file in the root of our folder.
### What are potential stretch challenges that you could implement to go above and beyond?
We could use TypeScript.
