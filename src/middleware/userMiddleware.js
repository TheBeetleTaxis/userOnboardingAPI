import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { registrationValidator, validationResult, registrationValidator } from 'express-validator';
import User from '../../backend/models/userModel';

// @desc    Save New user info to database
// @route   POST /api/user
// @access  Public
const createUser = asyncHandler(async (req, res, next) => {
	// Destructure request body
	const {
		
        businessName,
        userName,
		email,
		phoneNumber,
		businessWebsite,
        starter,
        registeredBusiness,
	} = req.body;

	try {
		// Get request validation result
		const error = validationResult(req);
		// Check for error in request body
		if (!error.isEmpty()) {
			// If error exists, return a 400 Bad Request response with the errors
			return res.status(400).json({
				errors: error.array(),
			});
		}


	// Create a new user document and save it to the database
    const user = await User.create({
        businessName: businessName,
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        website: businessWebsite,
        starter: starter,
        registeredBusiness: registeredBusiness,
    });

    // Add merchant information to the response body
    res.User = User;
    return next();
} catch (err) {
    // Handle and propagate any unexpected errors
    res.status(500);
    throw new Error(err.message);
}
});

export { User };


