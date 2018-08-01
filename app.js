var express = require('express');
var app = express();
app.use( express.static( `${__dirname}/build` ) );
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT);
});
