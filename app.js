var express = require('express');
var bodyParser = require('body-parser');
var colourlovers = require('colourlovers');

// Initialize Express
var app = express();

// Set port assignment
var port = process.env.PORT || 3000;

// Parse that body middleware, four for you, you go middleware.
app.use(bodyParser.urlencoded({ extended: true }));


// Change this to change how many palettes are returned
var NUMBER_OF_PALETTES = 3;

var formatColorRow = function (q) {

  // Add pound to beginning of each color
  var colors = q.colors.map(function (color) {
    return ' #' + color;
  });

  return '*' + q.title + '*: ' + colors.toString();
};

// Main route
app.post('/palette', function (req, res) {

  var searchTerm = req.body.text;

  // Check if input is a search term
  if (/^[a-zA-Z0-9 ]+$/.test(searchTerm)) {

    // Create object to send to API
    var params = {
      numResults: NUMBER_OF_PALETTES,
      keywords: searchTerm,
      keywordExact: 1
    };

    // Request palettes from COLOURlovers
    colourlovers.get('/palettes', params, function (err, data) {
      if (err) {
        res.status(404).send('Uh oh, looks like something went wrong.');
      }

      // Construct list of palettes
      var qs = ['Top color palettes for "' + searchTerm + '"\n']
          .concat(data.map(formatColorRow));

      // If no results found tell user to make broader search
      if (qs.length === 1) {
        res.status(204).send('No questions found. Please try a broader search');
      }

      // Send message to Slack
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.status(200).send(qs.join('\r\n'));

    });
  }

  // For when you can't paint with all the colors of the wind
  else {
    res.status(404).send(searchTerm + ' is not a valid search term, please try again.');
  }
});

// Error Handler
app.use(function (err, req, res) {
	console.error(err.stack);
	res.status(400).send(err.message);
});

app.listen(port, function () {
	console.log('Slack bot listening on port ' + port);
});
