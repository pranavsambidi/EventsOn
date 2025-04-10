const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" 
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;