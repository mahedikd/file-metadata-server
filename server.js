var express = require('express');
var cors = require('cors');
require('dotenv').config()
const formidable = require('formidable');

const form = formidable({ multiples: true });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', (req, res) => {
  const form = formidable({ multiples: true });
 
  form.parse(req, (err, fields, files) => {
    if (err) {
      log(err);
      return;
    }
		const {name, type, size} = files.upfile;

    res.json({name, type, size});
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
