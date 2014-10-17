'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://heroku:paKj6jm4CO_C7pu6Fk18Uqyoca3dQp6_JN2gxCl63vAS34QG0oZrKfvSvQEPkFybffpuD0J3KAQ2toN1-0bY7Q@linus.mongohq.com:10065/app30779771',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1552402298305965',
		clientSecret: process.env.FACEBOOK_SECRET || 'ea9c628732074e59520001b9df36abae',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'saySMvQVJ31agDkiYS5pDVtf7',
		clientSecret: process.env.TWITTER_SECRET || 'tXRzy0uL99n72WrHgD3uF9k2KN5HquWZxd7PH7LghsoCmAeOCk',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '976777458307-nrs8nbna3bjbphfupar51sqs620vm9q1',
		clientSecret: process.env.GOOGLE_SECRET || 'OfnSg6P_nRCi6Fiaq9PQtDoI',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || '772epnqgpiq8x5',
		clientSecret: process.env.LINKEDIN_SECRET || 'eZ7Rq77djlyePp0Y',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || '712472fa88baacff2bf2',
		clientSecret: process.env.GITHUB_SECRET || '69d1ce26286fc9a3ac5f61668decdbb25c115c5a',
		callbackURL: 'http://localhost:3000/auth/github/callback'
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