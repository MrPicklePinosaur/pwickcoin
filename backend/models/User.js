const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:String,
    password:String,
    friends:[{type: Schema.Types.ObjectId, ref: 'User'}],
    publicKey:String
});

module.exports = mongoose.model("Users",UserSchema);
