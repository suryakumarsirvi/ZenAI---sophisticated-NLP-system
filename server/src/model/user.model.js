import {Schema, model} from 'mongoose';

const UserSchema = Schema({
    fullname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        select: false
    }
}, {
    timeStamps: true
});

const User = model('users', UserSchema);

export default User;