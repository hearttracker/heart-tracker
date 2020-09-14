const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const Doctor = require('../models/Doctor');

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  //if email is empty or doesn't include an '@', show error message
  if(email === '' || !email.includes('@')) {
    res.render('auth/signup', {
      message: 'Invalid Email address'
    });
  }

  if(password.length < 8) {
    res.render('auth/signup', {
      message: 'The password needs to be at least 8 characters long'
    });
  }

  Doctor.findOne({email: email}).then(found => {
    if(found !== null) {
      res.render('auth/signup', {
        message: 'An account with this email already exists'
      });
      return;
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      Doctor.create({
        firstName,
        lastName,
        email,
        password: hash
      })
      .then(() => {
        res.redirect('/login');
      })
      .catch(err => next(err));
    }
  });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  Doctor.findOne({email: email}).then(found => {
    if(found === null) {
      res.render('auth/login', {
        message: 'Invalid Credentials'
      });
      return;
    }
    if(bcrypt.compareSync(password, found.password)) {
      req.session.user = found;
      console.log('Session created!')
      res.redirect('/overview');
    } else {
      res.render('auth/login', {
        message: 'Invalid Credentials'
      });
      return;
    }
  })
  .catch(err => next(err)); 
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if(error) {
      next(error);
    } else {
      res.redirect('/');
    }
  })
});


module.exports = router;