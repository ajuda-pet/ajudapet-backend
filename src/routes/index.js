import express from 'express'
import signupRouter from './noauth/signup.router.js'
import signinRouter from './noauth/signin.router.js'

const routes = (app) => {
    app.use(express.json())

    app.use('/noauth', signupRouter, signinRouter)
}

export { routes }