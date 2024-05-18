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

const routes = (app) => {
    app.use(express.json())

    app.use('/noauth', signupRouter, signinRouter, noAuthGroupRouter, noAuthAdoptionPointRouter, noAuthPetRouter)
    app.use('/auth', authorizationMiddleware, authGroupRouter, authAdoptionPointRouter, authPetRouter)
}

export { routes }