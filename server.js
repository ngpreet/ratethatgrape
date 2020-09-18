const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const cors = require('cors');
const config = require('./server/config');

const app = express();

// var corsOptions = {
//     origin: 'https://hungry-mccarthy-a3a315.netlify.app/'
// }

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = mongo.connect(config.DBUrl, function (err, res) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected to ' + db, ' + ', res);
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome' });
});

require('./server/routes/wine.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})