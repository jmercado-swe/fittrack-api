const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            // We don't need to store Google users in our own database for this
            // project - the profile returned by Google is enough to prove the
            // request came from a logged-in person.
            const user = {
                id: profile.id,
                displayName: profile.displayName,
                email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
            };
            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
