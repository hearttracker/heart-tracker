const express = require('express');
const router  = express.Router();

const isLoggedIn = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
    res.redirect('login');
    }
  }
}

module.exports = {isLoggedIn}