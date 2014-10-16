'use strict';

module.exports = {
    db: 'mongodb://localhost/poetry-test',
    port: 3001,
    app: {
        title: 'Poetry - Test Environment'
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || '',
        clientSecret: process.env.FACEBOOK_SECRET || '',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || '',
        clientSecret: process.env.TWITTER_SECRET || '',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || 'OfnSg6P_nRCi6Fiaq9PQtDoI',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || '',
        clientSecret: process.env.LINKEDIN_SECRET || '',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    },
    github: {
        clientID: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
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
