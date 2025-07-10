
- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json - What are dependencies
- What is the use of "-g" while npm install is
- Difference between caret and tilde ( ^ vs ~)



- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplucate email ids, which object returned
- API- Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
-  API - Update the user with email ID


- Explore schematype options from the documention
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in Schema 
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanitizing - API validation for each field, Explore Validator Library func and use validator fuc, password,email..




Create Connnection Request Schema 
Send Connection Request API 
Proper validation of Data
Think about ALL corner cases
$or query $and query in mongoose query-logical/  https://www.mongodb.com/docs/manual/reference/operator/

schema.pre("save") function
Read more about indexes in MongoDB
Why do we need index in DB?
What is the advantages and disadvantage of creating?
- Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/ index-types/index-compound/
ALWAYS THINK ABOUT CORNER CASES


Write code with proper validations for POST /request/review/:status/:requestId
Thought process - POST vs GET
Read about ref and populate https://mongoosejs.com/docs/populate.html Create GET /user/requests/received with all the checks
Create GET GET /user/connections