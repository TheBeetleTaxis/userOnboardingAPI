import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';
import { unsubscribe } from 'diagnostics_channel';

// @desc    Authenticate user and generate token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Get request validation result
	const error = validationResult(req);
	// Check for error in request body
	if (!error.isEmpty()) {
		// If error exists, return a 400 Bad Request response with the errors
		return res.status(400).json({
			errors: error.array(),
		});
	}

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		const accessToken = generateToken(res, user._id);

		res.json({
			_id: user._id,
      		businessName: user.businessName,
			userName: user.userName,
			email: user.email,
			accessToken: accessToken,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { businessName, userName, email, password, phoneNumber, website  } = req.body;

	// Get request validation result
	const error = validationResult(req);
	// Check for error in request body
	if (!error.isEmpty()) {
		// If error exists, return a 400 Bad Request response with the errors
		return res.status(400).json({
			errors: error.array(),
		});
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		businessName,
    	userName,
		email,
		password,
	});

	if (user) {
		const accessToken = generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
     		businessName: user.businessName,
			userName: user.name,
			email: user.email,
			accessToken: accessToken,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
	req.headers['authorization'] = '';
	res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
      		businessName: user.businessName,
			userName: user.userName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			website: user.website

		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	// Get request validation result
	const error = validationResult(req);
	// Check for error in request body
	if (!error.isEmpty()) {
		// If error exists, return a 400 Bad Request response with the errors
		return res.status(400).json({
			errors: error.array(),
		});
	}

	if (user) {
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Delete user profile
// @route   DELETE /api/users/profile
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const deletedUser = await User.findByIdAndDelete(req.user._id);

		if (deletedUser) {
			res.status(200).json('User has been deleted');
		}
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
};