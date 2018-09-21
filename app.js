var express = require('express');
var path = require('path')
var app = express();
app.use( express.static( `${__dirname}/build` ) );
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen('3000', function () {
  console.log('Example app listening on port ' + process.env.PORT);
});
