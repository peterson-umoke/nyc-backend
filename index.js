const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

const stripe = new Stripe("sk_test_mYZzXGgs1C65Wpy7vJywjgOX")

app.post('/payment', async (req, res) => {
   
    try {
        const {amount} = req.body
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        })
        console.log("here", paymentIntent.client_secret)
        res.status(200).send(paymentIntent.client_secret);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ statusCode: 500, message: error.message });
    }

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`)
})