const
    config = require('./config'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = require('./router'),
    cors = require('cors'),
    path = require('path')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.set('views',path.join(__dirname, '../UI'))

app.use('/leads', express.static('UI'))
/* app.use(express.static('./views')) */

router(app)
console.log('serverrrr')
const port = process.env.PORT || 1234;
// app.listen(config.port, () => console.log(`Server is running: ${config.port}`))
app.listen(port, () => console.log(`Server is running: ${port}`))