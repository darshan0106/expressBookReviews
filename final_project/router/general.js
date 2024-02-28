const express = require('express');
const axios = require('axios');
const books = require('./booksdb.js');
const public_users = express.Router();

public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://api.example.com/books');
    const books = response.data;
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://api.example.com/books/isbn/${isbn}`);
    const book = response.data;
    res.status(200).json({ book });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});


public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const response = await axios.get(`http://api.example.com/books/author/${author}`);
    const booksByAuthor = response.data;
    res.status(200).json({ books: booksByAuthor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const response = await axios.get(`http://api.example.com/books/title/${title}`);
    const booksByTitle = response.data;
    res.status(200).json({ books: booksByTitle });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://api.example.com/books/review/${isbn}`);
    const reviews = response.data;
    res.status(200).json({ reviews });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

module.exports.general = public_users;
