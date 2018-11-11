//import mongoose from 'mongoose';
//import Book from '../models/bookModel';

const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const db = mongoose.connect('mongodb://adminuser:27vqkg3Z#0uS@ds125068.mlab.com:25068/api-test2')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From ssssssExpress' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/api/recipe', (req, res) => {
	res.json(
			{
				id: 1,
				title: "Alice"
			}
		);
});

// app.get('/api/books', (req, res) => {
// 	Book.find({}, (err, books) => {
// 		res.json(books)
// 	});
// })
app.listen(port, () => console.log(`Listening on port ${port}`));
