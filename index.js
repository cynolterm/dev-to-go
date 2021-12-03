const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(express.static('UI/build'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

require('./route/index')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})