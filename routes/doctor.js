const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');


router.get('/doctor/newPatient1', (req, res) => {
const currentPatient = req.session.user.currentPatient
    res.render('doctor/newPatient1', {
      currentPatient
    })
});


router.post('/doctor/newPatient2', (req, res, next) => {
  req.session.currentPatient = req.body;
  req.session.treatments = [];
  let currentPatient = req.session.currentPatient
console.log("tag",req.session.currentPatient);
      res.render('doctor/newPatient2', {
        currentPatient
      });
      console.log("current patient of first page: ",currentPatient);
});

router.get("/doctor/newPatient2", (req,res,next) => {
  const currentPatient = req.session.currentPatient;
  res.render("doctor/newPatient2", {
    currentPatient
  })
})

router.post('/doctor/newPatient3', (req, res, next) => {
  let currentPatient = req.session.currentPatient
  currentPatient = Object.assign(req.session.currentPatient, req.body)
      res.render('doctor/newPatient3', {
        currentPatient
      });
      console.log("current patient of second page: ",currentPatient);
});

router.post('/doctor/newTreatment', (req, res, next) => {
  req.session.treatments.push(req.body)
  console.log(req.body);
const treatments = req.session.treatments
      res.render('doctor/newPatient3', {
        treatments
      });
});



router.get("/doctor/newPatient3", (req,res,next) => {
  const currentPatient = req.session.currentPatient;
  res.render("doctor/newPatient3", {
    currentPatient
  })
  
})

router.get("/doctor/newPatient4", (req,res,next) => {
  
  res.render("doctor/newPatient4")
  
})


module.exports = router;