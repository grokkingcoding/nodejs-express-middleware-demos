const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger/logger');
const port = 3333;

const app = express();

// each request goes through the Request Processing Pipeline 
// if there is a json in the req body it will parse the json object
// then the req body json object is eventually passed to the route handler middleware
// then end with a res to a client 
app.use(express.json());


// this allows us to send arrays and complex objects to server using the urlencoded format
app.use(express.urlencoded({ extended: true }));


// we use express static to servce static files public is the folder name 
app.use(express.static('public'));


// helps secure your apps by setting various HTTP headers
// for more details please refer to helmet docs
app.use(helmet());


// we use morgan to log http requests
// so if someone was sending a GEt request to the route at api/students
// morgan would log something like this: GET /api/students 200...

// it is important to know what environment the express app is running on 
// for example, we usually enable morgan for the development environment not production 

// if not set then process.env.NODE_ENV will be undefined 
// to set env variables use export on linx machine and set for windows machine 
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV using app.get: ${app.get('env')}`);

// we can enable morgan if env is in development mode 
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('morgan middleware enabled')
    console.log(`ready to log http requests on port http://localhost:${port}/`);
};


// here is an example of a custom middleware directly included in index.js file
// this is not recommended 
app.use(function (req, res, next) {
    console.log('This is an express app demonstrating the use of middlewares');
    // if you do not add next() the request will not be terminated and end up hanging 
    next();
});

// our own middleware in a separate module
// this is recommended
app.use(logger);


app.listen(port);
console.log(`listening on ${port}`);