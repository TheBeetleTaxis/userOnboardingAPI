import asyncHandler from 'express-async-handler';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Configure the SES client
const sesClient = new SESClient({ region: 'us-east-1' });

const sendEmail = asyncHandler(async (req, res, next) => {
	// Create the email message
	const params = {
		Source: process.env['SENDER'],
		Destination: {
			ToAddresses: [process.env['RECIPIENT']],
		},
		Message: {
			Subject: {
				Data: 'New Merchant Request',
			},
			Body: {
				Text: {
					Data: res.merchant,
				},
			},
		},
	};

	try {
		// Send the email
		const command = new SendEmailCommand(params);
		const response = await sesClient.send(command);
		return next();
	} catch (err) {
		// Handle and propagate any unexpected errors
		res.status(500);
		throw new Error(err.message);
	}
});

export default sendEmail;

