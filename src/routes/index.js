import express from 'express'
import signupRouter from './noauth/signup.router.js'
import signinRouter from './noauth/signin.router.js'
import authorizationMiddleware from './auth/authorization-midleware.js'
import noAuthGroupRouter from './noauth/group.router.js'
import authGroupRouter from './auth/group.router.js'

const routes = (app) => {
    app.use(express.json())

    app.use('/noauth', signupRouter, signinRouter, noAuthGroupRouter)
    app.use('/auth', authorizationMiddleware, authGroupRouter)
}

export { routes }