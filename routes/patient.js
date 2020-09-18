const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');


router.get("/login/patient", (req, res, next) => {
  res.render("patient/enterPin")
})



router.post("/login/patient", (req, res, next) => {
  // console.log(req.body);
  const {email, pin} = req.body;
  const pinNumber = Number(pin);
  Patient.findOne({"contact.email": email})
  .then(found => {
    if (pinNumber == found.patientPin) {
      console.log("credentials correct");
      res.redirect(`loggedPatientView/${found._id}`
      // , {
      //   loggedPatient: found
      // }
      )
  }
    if(found !== null) {
      res.render('patient/enterPin', {
        message: 'Credentials are incorrect'
      });
      return;
    }
    if (pinNumber !== found.patientPin) {
      res.redirect("/login/patient")
    } 
  }).catch(err => {
    console.log(err); 
  })
})

// agregar values de paciente
// moestrarlos en la ruta correcta
// revisar que esten apareciendo los valores guardados
//
//

router.post('/addMeasure/:id', async (req, res, next) => {
  const id = req.params.id;
  const {bloodPressure, heartRate, bloodGlucose, comment, date} = req.body;
  const bloodPressureData = bloodPressure.split("/");

  try{
    const patientMeasurements = await Patient.findByIdAndUpdate(id, {
      $push: {
        "bloodPressureData.values": 
        {
          systolic: bloodPressureData[0],
          diastolic: bloodPressureData[1],
          date,
          comment
          }
        ,
        'heartFrequencyData.values': 
          {
            date,
            value: heartRate,
            comment
          },
          'bloodSugarData.values': 
          {
            date,
            value: bloodGlucose,
            comment
          }
      }
    })
    console.log(patientMeasurements);
  //   res.render('patient/loggedPatientView', {
  //     patientMeasurements
  // });
  res.redirect(`/login/loggedPatientView/${patientMeasurements._id}`)

  }catch (error) {
    next(error)
  }
});


router.get("/login/loggedPatientView/:id", async (req,res,next) => {
  const id = req.params.id;
  try{
    const patient = await Patient.findById({_id:id});

    let values = patient.heartFrequencyData.values.map((result,i) => {
      return {
        date: result.date,
        comment: result.comment,
        heartFrequencyData: result.value,
        bloodPressureData: {
          systolic: patient.bloodPressureData.values[i].systolic, 
          diastolic: patient.bloodPressureData.values[i].diastolic
        },
        bloodSugarData: patient.bloodSugarData.values[i].value
      }
    })

    console.log(values, "values")

    res.render('patient/loggedPatientView', {
      patient,
      values
    })
  } catch (error){
    next(error)
  }
    
  
})


module.exports = router;



// }
// if(found !== null) {
//   res.render('patient/enterPin', {
//     message: 'Credentials are incorrect'
//   });
//   return;
// }
// if (pinNumber !== found.patientPin) {
//   res.redirect("/login/patient")
// } else {
//   console.log("credentials correct");
//    res.render(`patient/patientView/${found._id}`, {
//      loggedPatient: found
//    })
//  }