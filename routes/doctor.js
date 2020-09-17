const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Treatment = require("../models/Treatment")


router.get('/doctor/newPatient1', (req, res) => {
const currentPatient = req.session.currentPatient
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
  const {name, doseTime, doseMeal, breakfast, lunch, dinner, night, doseQuantity, doseInterval, timeMeasure, startDate, endDate, recommendation} = req.body;
  req.session.treatments.push({
    name: name,
    doseMeals: {
      isSelected: doseMeal,
      breakfast,
      lunch,
      dinner,
      night,
    },
    doseTime: {
      isSelected: doseTime,
      quantity: doseQuantity,
      interval: doseInterval,
      timeMeasure: timeMeasure
    },
    startDate,
    endDate,
    recommendation
  });
  // req.session.treatments.push(req.body);
  const treatments = req.session.treatments;
  console.log(treatments);
      res.render('doctor/newPatient3', {
      treatments
    });
});



router.get("/doctor/newPatient3", (req,res,next) => {
  const treatments = req.session.treatments;
  const currentPatient = req.session.currentPatient;
  res.render("doctor/newPatient3", {
    currentPatient, treatments
  })
  
})

router.get("/doctor/newPatient4", (req, res, next) => {
  const currentPatient = req.session.currentPatient;
  res.render("doctor/newPatient4", {
    currentPatient
  })
  
})



router.post("/doctor/newPatient4", async (req, res, next) => {
  const treatments = req.session.treatments
  let currentPatient = req.session.currentPatient
  console.log("current patient info in the end", currentPatient);
  currentPatient = Object.assign(req.session.currentPatient, req.body);
  const {
    firstName,
    lastName,
    secondLastName,
    birthDate,
    id ,
    tis,
    phoneNumber,
    email,
    totalColesterol,
    ldl,
    hdl,
    triglycerides,
    urea,
    creatinine,
    potassium,
    sodium,
    basalBloodGlucose,
    allergies, 
    alert,
    bloodPressureMeasured,
    minBloodPressure,
    targetObjetiveBloodPressure,
    minHeartRate,
    targetObjetiveHeartRate,
    minBloodGlucose,
    targetObjetiveBloodGlucose,
    maxBloodPressure,
    maxHeartRate,
    maxBloodGlucose,
    heartRateMeasured,
    bloodGlucoseMeasured
  } = currentPatient
  const minBloodPressureData = minBloodPressure.split("/");
  const maxBloodPressureData = maxBloodPressure.split("/");
  const targetBloodPressureData = targetObjetiveBloodPressure.split("/");

try {
  const addedTreatments = await Treatment.insertMany(treatments);
  const patient = await Patient.create({
    firstName,
    lastName,
    secondLastName,
    birthDate,
    patientId: id,
    healthInsuranceId: tis,
    contact: {
      telephone: phoneNumber,
      email,
    },
    lastMeasurements: {
      totalColesterol,
    ldl,
    hdl,
    triglycerides,
    urea,
    creatinine,
    potassium,
    sodium,
    basalBloodGlucose
    },
    bloodPressureData: {
      isMeasured: bloodPressureMeasured,
    min: {
      systolic: Number(minBloodPressureData[0]),
      diastolic: Number(minBloodPressureData[1])
    },
    max: {
      systolic: Number(maxBloodPressureData[0]),
      diastolic: Number(maxBloodPressureData[1])
    },
    target: {
      systolic: Number(targetBloodPressureData[0]),
      diastolic: Number(targetBloodPressureData[1])
    },
  },
  heartFrequencyData:{
    isMeasured: heartRateMeasured,
    min: minHeartRate,
    max: maxHeartRate,
    target: targetObjetiveHeartRate,
    values: []
  },
  bloodSugarData:{
    isMeasured: bloodGlucoseMeasured,
    max: maxBloodGlucose,
    min: minBloodGlucose,
    target:targetObjetiveBloodGlucose,
    values: []
  },
    allergies,
    alertLevel: alert,
    treatments: addedTreatments._id,
    assignedDoctor: req.session.user._id,
    values: []
  });

  console.log(patient.assignedDoctor,"It this a the id???")
  const doctor = await Doctor.findByIdAndUpdate(patient.assignedDoctor, {$push: {patients: patient._id}});
  console.log(doctor.patients);
  res.redirect(`/doctor/qrCode/${patient._id}`)
    // res.redirect(`/patient/${patient._id}`)
  
} catch (error) {
  next(error)
}

})

router.get("/doctor/qrCode/:patientId", async (req, res, next) => {
  const patient = await Patient.findById(req.params.patientId)
  try{
    console.log("patient in qrcode", patient);
  res.render("doctor/qrCode", {
    patient
  });
} catch(error) {
  next(error)
}
})

module.exports = router;