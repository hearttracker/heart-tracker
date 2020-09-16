const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.get("/patient/patientView/:id", (req,res,next) => {
  
  res.render('patient/patientView', {
    
  })
})


module.exports = router;