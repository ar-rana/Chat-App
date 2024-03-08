const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        require: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'enter a password'],
        minlength: [6, 'minimum 6 characters']
    }

})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log("before save", this)
    next()
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if (user){
        const isAuthenticated = await bcrypt.compare(password,user.password);
        if (isAuthenticated){
            return user;
        }
        throw Error("incorrect password")
    } else {
        throw Error("incorrect email");
    }
}

const User = mongoose.model("user",userSchema);

module.exports = User;