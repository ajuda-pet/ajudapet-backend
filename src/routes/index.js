import express from 'express'
import signupRouter from './noauth/signup.router.js'
import signinRouter from './noauth/signin.router.js'
import authorizationMiddleware from './auth/middlewares/authorization.midleware.js'
import noAuthGroupRouter from './noauth/group.router.js'
import authGroupRouter from './auth/group.router.js'
import noAuthAdoptionPointRouter from './noauth/adoption-point.router.js'
import authAdoptionPointRouter from './auth/adoption-points.router.js'
import noAuthPetRouter from './noauth/pets.router.js'
import authPetRouter from './auth/pet.router.js'
import noAuthPixRouter from './noauth/pix.router.js'
import authAuthenticationRouter from './auth/middlewares/authentication.router.js'
import dotenv from 'dotenv'

dotenv.config()

const routes = (app) => {
    app.use(express.json())
    
    const noAuthRouters = [signupRouter, signinRouter, noAuthGroupRouter, noAuthAdoptionPointRouter, noAuthPetRouter, noAuthPixRouter]
    const authRouters = [authGroupRouter, authAdoptionPointRouter, authPetRouter, authAuthenticationRouter]

    app.use('/noauth', ...noAuthRouters)
    app.use('/auth', authorizationMiddleware, ...authRouters)
}

export { routes }