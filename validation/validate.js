const Joi = require('joi'); 

// your mongoDB User model may look something like this:

// const User = mongoose.model('Customer', new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5, 
//         maxlength: 50
//     }, 
//     phone: {
//         type: String,
//         required: true,
//         minlength: 5, 
//         maxlength: 50
//     }, 
//     isSub: {
//         type: Boolean,
//         default: false,        
//     }, 
// })); 

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isSub: Joi.boolean()
    }; 

    return Joi.validate(user, schema); 
}; 