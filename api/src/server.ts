import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();

// CONFIG
    
    // CORS
        app.use(cors())

    // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
        app.use(bodyParser.json())

// ------

// IMPORT ROUTES

    import userRoute from './routes/user'

// -------------


// ALL ROUTES

    app.use('/user', userRoute)

// ----------

// DEFAULT ROUTE

    app.get('/', (req, res) => {
        res.status(200).send({status: 'Server OK'})
    })

// ------------

app.listen(8080, () => {
    console.log('SERVIDOR ABERTO NA PORTA 8080')
})