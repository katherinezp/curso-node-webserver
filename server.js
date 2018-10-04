const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const puerto = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));

app.use((req, res, netx) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err) {
            console.log('unable to append to server.log');
        }
    });
    netx();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome !',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(puerto, () => {
    console.log(`servidor listo en puerto ${puerto}.`);
});