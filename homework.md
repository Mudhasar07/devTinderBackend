- create a repository
- Initialize a repository
- What is node_modules, package.json, Package-lock.json
- Install Express
- Create a new Express server
- Listen to port 7777...
- Write Request Handler -> app.use()
- Install Nodemon and update script inside package.json
- What are dependencies
- What is the use of "-g" while npm i or install
- Difference between ~ (tilda) and ^ (caret) inside package.json file.


- initialize Git
- Create new Git Repository
- Push all the code to remote origin / inside Repository
- Play with creating a new Routes --> /test, /hello, /, /hello/xyz/abc
- Order of the routes matters a lot.....
- Install postman make oue seperate workspace
- Write logic for GET, POST, DELETE, PATCH
- Explore routing and use of ?, +, *, (), in the routes.
- use the regex in route -> /a/, /.*fly$/
- Reading query and params from the reqest API call.
- Reading the dynamic route


- Create Multiple route handler
- what is next()
- next function and error along with res.sen()
- app.use("/", RouteHandler1, RH2, RH3, RH4, ....);
- What is middleware? Why do we need it?
- How Express Js Handles Request behind the screen.
- Differen app.use() Vs app.all()
- Write dummy auth middleware for /admin
- write dummy auth middleware for /User
- Error Handing using app.use("/", ()=> { err, req, res, next})


- Create free cluster on MongoDB on their official website
- Install mongoose library
- Connect to the application to data via connection+string 
- Before Listening to the port connect the DB first then start Listing on port 7777
- Create User schema and User Model Using Moongose Library
- Create some POST API / send some document to the database
- Using Postman push some data to DB
- Error handling using try{} catch{} methode always


- Difference between JSON vs Javascript Object
- Add the express.json middleware to our app, to handle all JSON, and covert to JS Object
- Make our /signUp API dynamic to receive data from End User
- find user.findone with duplicate email ids, which object returns first, check and explore
- API - Get user by emailid
- API - Feed API - Get all user from DB
- Get - user by ID
- API - Delete user 
- Difference b/w PATCH vs PUT
- API - Update a USER
- Explore Mongoose documentation for Models methods or function or Model 
- What are options in Model.findOneAndUpdate
- API - Update User with email ID

- Explore schematype options from the documentation
- add require, unique, min, loercase, minLength, trim
- Add default
- Create a cusomer validation function for gender
- Improve the DB Schema - Put all appropriate validation on each field in schema
- Add timestamp to the UserSchema
- Add API level validation on PATCH request & SignUp POST API
- Data Sanitizing - Add API validation for each field