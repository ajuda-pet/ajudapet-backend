import express from 'express'
import signupRouter from './noauth/signup.router.js'
import signinRouter from './noauth/signin.router.js'
import authorizationMiddleware from './auth/authorization-midleware.js'
import noAuthGroupRouter from './noauth/group.router.js'
import authGroupRouter from './auth/group.router.js'
import noAuthAdoptionPointRouter from './noauth/adoption-point.router.js'
import authAdoptionPointRouter from './auth/adoption-points.router.js'

const routes = (app) => {
    app.use(express.json())

    app.use('/noauth', signupRouter, signinRouter, noAuthGroupRouter, noAuthAdoptionPointRouter)
    app.use('/auth', authorizationMiddleware, authGroupRouter, authAdoptionPointRouter)
}

export { routes }