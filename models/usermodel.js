const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    //fullName: {
     //   type: String,
       // required: true,
        //trim: true
   // },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    roles: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    dueDate: {
        type: Date,
        // required: [true, 'Due date is required']
    },    
    pregnancyTracking: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Trakmama",
        },
      ],

}, {timestamps : true});



userSchema.pre("save", async function (next) {
    const user = this;
  
    if (!user.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
  
    next();
  });
  
  userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

const Users = mongoose.model("Users", userSchema);


module.exports = Users;