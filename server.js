'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.status(200).send('Work');
});
app.use(express.static('./pages'));
app.use('/public' , express.static('public'));


app.get('/search', (req,res) => {
    res.render('../views/pages/index');
});


app.get('/searches', (req, res) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=tokoy`;
    superagent.get(url)
    .then( data => {
        res.render('show',{'show': data.body.items})
        
    });
    
});


app.get('*', (req,res) => {
    res.status(404).send('Error 404 Not Found');
});
app.listen(PORT, ()=> {
    console.log('Working!!!!!!!');
});