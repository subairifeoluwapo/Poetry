'use strict';

module.exports = {
	db: 'mongodb://localhost/poetry-dev',
	app: {
		title: 'Poetry - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1552402298305965',
		clientSecret: process.env.FACEBOOK_SECRET || 'ea9c628732074e59520001b9df36abae',
		callbackURL: 'http://poetrysubair.herokuapp.com/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'saySMvQVJ31agDkiYS5pDVtf7',
		clientSecret: process.env.TWITTER_SECRET || 'tXRzy0uL99n72WrHgD3uF9k2KN5HquWZxd7PH7LghsoCmAeOCk',
		callbackURL: 'http://poetrysubair.herokuapp.com/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '976777458307-nrs8nbna3bjbphfupar51sqs620vm9q1',
		clientSecret: process.env.GOOGLE_SECRET || 'OfnSg6P_nRCi6Fiaq9PQtDoI',
		callbackURL: 'http://poetrysubair.herokuapp.com/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || '772epnqgpiq8x5',
		clientSecret: process.env.LINKEDIN_SECRET || 'eZ7Rq77djlyePp0Y',
		callbackURL: 'http://poetrysubair.herokuapp.com/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || '712472fa88baacff2bf2',
		clientSecret: process.env.GITHUB_SECRET || '69d1ce26286fc9a3ac5f61668decdbb25c115c5a',
		callbackURL: 'http://poetrysubair.herokuapp.com/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};