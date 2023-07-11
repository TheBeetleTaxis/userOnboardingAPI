import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    businessName: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
    password: { type: String,required: true },
		phoneNumber: { type: String, unique: true },
		website: { type: String, unique: true, sparse: true},
		country: { type: String },
		starter: { type: Boolean, default: false },
    registeredBusiness: { type: Boolean, default: false },
	},
	{ timestamps: true }
    
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
