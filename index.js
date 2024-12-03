const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))

app.use((req, res, next) => {
    req.requestTime = Date.now()
    next()
})

app.use('/dogs', (req, res, next) => {
    console.log('I love dogs!!')
    next()
})

const verifyPassword = (req, res, next) => {
    const {password} = req.query
    if(password === 'chicken'){
        next()
    }
    res.send('CORRECT PASSWORD REQUIRED!')
}

app.get('/', (req, res) => {
    res.send('HOME PAGE')
})

app.get('/dogs', (req, res) => {
    console.log(req.requestTime)
    res.send('WOOF WOOF!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('Secret text inserted "here"')
})

app.use((req, res) => {
    res.send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('CONNECTION ON PORT 3000')
})