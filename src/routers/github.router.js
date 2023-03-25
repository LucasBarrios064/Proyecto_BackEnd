import { Router } from 'express'
import passport from '../utils/passport.utils.js'

const passportRouter = Router()

passportRouter.get('/fail', (req, res) => {
  res.send('Fail')
})
passportRouter.get('/login',passport.authenticate("github",{scope:["user:email"]}))
passportRouter.get('/callback',passport.authenticate('github',{failureRedirect:'/api/github/fail'}))

export default passportRouter