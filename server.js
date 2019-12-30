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


app.get('/hello', (req,res) => {
    res.render('../views/pages/index');
});


app.get('/books', (req, res) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=amman`;
    superagent.get(url)
    .then( data => {
        res.render('books',{'books': data.body.items})
        
    });
    
});


app.get('*', (req,res) => {
    res.status(404).send('Error 404 Not Found');
});
app.listen(PORT, ()=> {
    console.log('Working!!!!!!!');
});