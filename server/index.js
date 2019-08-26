const
    config = require('./config'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = require('./router'),
    cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* app.use(express.static('./views')) */

router(app)

app.listen(config.port, () => console.log(`Server is running: ${config.port}`))