
const express = require('express')
const app = express()
const port = process.env.PORT || 80
const cors = require('cors')

const login = require('./routes/login')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(login)

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

