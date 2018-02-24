const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('server/public'));

const router = require('./routes/galleryRouter');
app.use('/gallery', router);

let port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log(`listening on port ${port}`);
    
})