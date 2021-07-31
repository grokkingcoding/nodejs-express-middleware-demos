// We usually write our own custom middleware in their own folders 
// putting middleware in their own files is good for separation of concern 
// you do not want to clog up your index.js

module.exports = function logSomethingMiddleware(req, res, next) {
    console.log('This is a middleware in its own file');
    next();
};

