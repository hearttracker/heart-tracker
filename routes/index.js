const express = require('express');
const router  = express.Router();
const {isLoggedIn} = require('./middlewares');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Treatment = require('../models/Treatment');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/overview', isLoggedIn(), (req, res, next) => {
  Doctor.findById(req.session.user._id)
  .populate('patients')
  .then(doctor => {
    res.render('doctor/overview', {
      doctor: doctor
    });
  })
  .catch(err => next(err));
});

router.get('/patient/:id', isLoggedIn(), (req, res, next) => {
  Patient.findById(req.params.id)
  .populate('treatments')
  .then(patient => {
    patient.bloodSugarData.values.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });
    patient.bloodPressureData.values.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });
    patient.heartFrequencyData.values.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });
    res.render('doctor/patientDashboard', {
      patient: patient
    });
  })
  .catch(err => next(err));
}); 

router.get('/api/patient/:id', isLoggedIn(), (req, res, next) => {
  Patient.findById(req.params.id)
  .populate('treatments')
  .then(patient => {
    res.json(patient);
  })
  .catch(err => next(err));
}); 

router.post('/patient/:id', (req, res, next) => {
  if(req.body.hidden === 'bloodPressure') {
  const { systolic, diastolic, heartFrequency, comment, date } = req.body;
  
  Patient.findByIdAndUpdate(req.params.id,
    {
      $push: {'bloodPressureData.values': 
        {
        systolic,
        diastolic,
        date,
        comment
        }
      ,
      'heartFrequencyData.values': 
        {
          date,
          value: heartFrequency,
          comment
        }
    }
  })
    .populate('treatments')
    .then(patient => {
      res.render(`doctor/patientDashboard`, {
        patient: patient
      });
    }
  )
  .catch(err => next(err));
}
else if(req.body.hidden === 'bloodSugar') {
  const { bloodSugar, date, comment } = req.body;
  Patient.findByIdAndUpdate(req.params.id,
    {
      $push: {'bloodSugarData.values': 
      {
        date,
        value: bloodSugar,
        comment
      }
    }
  })
  .then(patient => {
    res.render(`doctor/patientDashboard`, {
      patient: patient
    });
  }
)
.catch(err => next(err));
}
});


module.exports = router;
