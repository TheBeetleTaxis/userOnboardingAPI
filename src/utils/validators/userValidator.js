import { body } from 'express-validator';

const loginValidator = [
	body('email')
		.notEmpty()
		.withMessage('Email is required!')
		.isEmail()
		.withMessage('Please enter a valid email'),
	body('password')
		.notEmpty()
		.withMessage('Password is required!')
		.isStrongPassword()
		.withMessage('Please enter a strong password'),
];

const registrationValidator = [
    body('businessName')
		.notEmpty()
		.withMessage('Your business name is required!')
		.isAlpha()
		.withMessage('must contain only alphabetic characters'),
	body('userName')
		.notEmpty()
		.withMessage('Username is required!')
		.isAlpha()
		.withMessage('Name must contain only alphabetic characters'),
	body('email')
		.notEmpty()
		.withMessage('Email is required!')
		.isEmail()
		.withMessage('Please enter a valid email'),
	body('password')
		.notEmpty()
		.withMessage('Password is required!')
		.isStrongPassword()
		.withMessage('Password must contain upper case,numerics and signs'),
	

];



const updateValidator = [
	body('username')
		.optional({ checkFalsy: true })
		.isAlpha()
		.withMessage('Name must contain only alphabetic characters'),
	body('email')
		.optional({ checkFalsy: true })
		.isEmail()
		.withMessage('Please enter a valid email'),
	body('password')
		.optional({ checkFalsy: true })
		.isStrongPassword()
		.withMessage('Please enter a strong password'),
];

export {loginValidator, registrationValidator, updateValidator}
