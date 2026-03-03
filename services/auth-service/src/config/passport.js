// strategies/google-strategy.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { handleGoogleUser } = require("../services/oauth-service");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await handleGoogleUser(profile);
        done(null, result);
      } catch (err) {
        done(err, null);
      }
    }
  )
);