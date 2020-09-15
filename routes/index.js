const express = require('express');
const router  = express.Router();
const {isLoggedIn} = require('./middlewares');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

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

router.get('/patient/:id', (req, res, next) => {
  console.log('route called');
  Patient.findById(req.params.id)
  // .populate('treatments')
  .then(patient => {
    console.log(patient);
    res.render('doctor/patientDashboard', {
      patient: patient,
    });
  })
  .catch(err => next(err));
}); 

// router.get('/addPatient', (req, res, next) => {
//   Patient.create({
//     patientId: 111111111,
//   healthInsuranceId: 22222222,
//   firstName: 'Marlena',
//   lastName: 'Koslowski',
//   birthDate: new Date(1995, 4, 1),
//   contact: {
//     email: "m.k@gmail.com",
//     telephone: 004912345678
//   },
//   diagnosis: 'Diabetes',
//   allergies: 'Gluten',
//   alertLevel: 'Low',
//   treatments: [],
//   bloodPressureData: [{
//     isMeasured: true,
//     min: {
//       systolic: 90,
//       diastolic: 80
//     },
//     max: {
//       systolic: 180,
//       diastolic: 170
//     },
//     target: {
//       systolic: 150,
//       diastolic: 100
//     },
//     date: new Date(2020, 05, 11),
//     value: [{
//             systolic: 100,
//             diastolic: 80
//         }],
//     comment: 'blablablubb'
//   }],
//   heartFrequencyData: [{
//     isMeasured: false,
//     min: '',
//     max: '',
//     target: '',
//     date: '',
//     value: '',
//     comment:''
//   }],
//   bloodSugarData: [{
//     isMeasured: true,
//     min: 80,
//     max: 120,
//     target: 100,
//     date: new Date(2020, 8, 12),
//     value: 130,
//     comment: 'blood sugar too high'
//   }],
//   assignedDoctor: req.session.user._id,
//   lastUpdate: new Date(2020, 8, 12)
// })
// .then(patient => {
//   Doctor.findByIdAndUpdate(req.session.user._id, { $push: {patients: patient._id}})
//   .then(doctor => {
//     console.log(doctor);
//   })
//   .catch(err => next(err));

// })
// .catch(err => next(err));
//   })

module.exports = router;
