const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var url = req.url;
    var method = req.method;
    var log = `${now}: ${req.method} request to ${req.url}`
    console.log(log);
    fs.appendFile('requests.log', log + '\n', (err) => {
        if (err)
            console.log('Unable to log request');
    });
    next();
});

app.use((req, res) => {
    res.render('maintenance');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', function(req, res) {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello!!'
    })
});

app.get('/json', function(req, res) {
    res.send({ // could use .json
        name: 'Sulaiman',
        likes: [
            'gaming',
            'coding',
            'movies'
        ]
    });
});

app.get('/bad', function(req, res) {
    res.send({
        errorMessage: 'Could not handle request'
    })
});

app.get('/about', function(req, res) {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
});