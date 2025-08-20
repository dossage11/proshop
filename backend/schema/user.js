import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
    
},{timestamps: true});

userSchema.methods.matchPassword = async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function(next){
 
  if(!this.isModified('password')){
    next()
  }


  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})




export default mongoose.model("User", userSchema);


// // Separate Session Schema
// const sessionSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
//   token: {
//     type: String,
//     required: true,
//     unique: true,
//     index: true
//   },
//   tokenHash: {
//     type: String,
//     required: true,
//     index: true
//   },
//   deviceInfo: {
//     userAgent: String,
//     ip: String,
//     deviceType: String,
//     browser: String,
//     os: String
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//     index: true
//   },
//   loginAt: {
//     type: Date,
//     default: Date.now
//   },
//   logoutAt: {
//     type: Date
//   },
//   expiresAt: {
//     type: Date,
//     required: true,
//     index: true
//   },
//   // Additional security fields
//   refreshToken: String,
//   lastActivity: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// // Index for cleanup queries
// sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// sessionSchema.index({ userId: 1, isActive: 1 });

// // Static methods for session management
// sessionSchema.statics.createSession = async function(userId, token, deviceInfo, expiresAt) {
//   const tokenHash = bcrypt.hashSync(token, 10);
  
//   return this.create({
//     userId,
//     token,
//     tokenHash,
//     deviceInfo,
//     expiresAt,
//     lastActivity: new Date()
//   });
// };