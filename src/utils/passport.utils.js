import passport from "passport";
import passportLocal from "passport-local";
import { UserModel } from "../models/models/users.models.js";
import passportGithub from 'passport-github2'
import * as UserService from "../services/usersDAO/users.services.js";
import * as AuthService from "../services/auth.services.js"
import dotenv from 'dotenv'
import logger from "../utils/logger.js"
dotenv.config()

passport.serializeUser(function (user, done) {
  logger.debug("Serializing");
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  logger.debug("Deserializing");
  UserModel.findById(_id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "signup",
  new passportLocal.Strategy({ passReqToCallback: true, usernameField: "email" }, async function (
    req,
    username,
    password,
    done,
  ) {
    try {
      const userExist = await UserModel.findOne({ email: username });
      if (userExist) {
        return done("El usuario ya existe", false);
      } else {
        const user = await UserService.createUser(req.body);
        return done(null, user);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }),
);

passport.use("login", new passportLocal.Strategy({passReqToCallback:true, usernameField:'email'}, async function (req,username,password,done) {
  try {
    const login = await AuthService.login(username, password)
    if (login) {
      const user = await UserModel.findOne({ email: username });
      return done(null,user)
    } else {
      return done(null,false)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}))

passport.use('github', new passportGithub.Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL:'http://localhost:8080/api/github/callback'
}, async function (accessToken, refreshToken, profile, done) {
  try {
    logger.debug(profile)
    const newUser = {
      first_name: profile.displayName,
      last_name: profile.displayName,
      age: 20,
      email: profile._json.email,
      role: "user"
    }
    const user = await UserModel.create(newUser)
    done(null,user)
  } catch (error) {
    throw new Error(error.message)
  }
}))

passport.use('githubLogin', new passportGithub.Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL:'http://localhost:8080/api/github/callback'
}, async function (accessToken, refreshToken, profile, done) {
  try {
    logger.debug(profile)
    const user = await UserModel.findOne({ email: profile._json.email})
    done(null,user)
  } catch (error) {
    throw new Error(error.message)
  }
}))

export default passport;
