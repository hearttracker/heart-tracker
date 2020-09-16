// Get the modal

var modal = document.getElementById("editModal");

// Get the button that opens the modal
var btns = document.querySelectorAll('#editBtn');
// var btn = document.getElementById("editBtn");
console.log(btns);
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btns.forEach(btn => {
  btn.addEventListener('click', event => {
    const patientId = btn.nextElementSibling.innerText;
    fetch(`http://localhost:3000/api/patient/${patientId}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('firstName').value = data.firstName;
      document.getElementById('lastName').value = data.lastName;
      document.getElementById('birthDate').value = data.birthDate;
      document.getElementById('id').value = data.patientId;
      document.getElementById('tis').value = data.healthInsuranceId;
      document.getElementById('phoneNumber').value = data.contact.telephone;
      document.getElementById('email').value = data.contact.email;
      document.getElementById('totalColesterol').value = data.lastMeasurements.totalColesterol;
      document.getElementById('ldl').value = data.lastMeasurements.ldl;
      document.getElementById('hdl').value = data.lastMeasurements.hdl;
      document.getElementById('triglycerides').value = data.lastMeasurements.triglycerides;
      document.getElementById('urea').value = data.lastMeasurements.urea;
      document.getElementById('creatinine').value = data.lastMeasurements.creatinine;
      document.getElementById('potassium').value = data.lastMeasurements.potassium;
      document.getElementById('sodium').value = data.lastMeasurements.sodium;
      document.getElementById('basalBloodGlucose').value = data.lastMeasurements.basalBloodGlucose;
      document.getElementById('allergies').value = data.allergies;
      // document.getElementById('treatments').innerHTML.push(data.treatments.map(treatment => {
      //   `<li>${treatment.name}</li>`
      // }));
      document.getElementsByName('bloodPressureMeasured')[0].value = data.bloodPressureData.isMeasured;
      document.getElementsByName('minBloodPressure')[0].value = data.bloodPressureData.min;
      document.getElementsByName('maxBloodPressure')[0].value = data.bloodPressureData.max;
      document.getElementsByName('targetObjectiveBloodPressure')[0].value = data.bloodPressureData.target;
      document.getElementsByName('heartRateMeasured')[0].value = data.heartFrequencyData.isMeasured;
      document.getElementsByName('minHeartRate')[0].value = data.heartFrequencyData.min;
      document.getElementsByName('maxHeartRate')[0].value = data.heartFrequencyData.max;
      document.getElementsByName('targetObjectiveHeartRate')[0].value = data.heartFrequencyData.target;
      document.getElementsByName('bloodGlucoseMeasured')[0].value = data.bloodGlucoseData.isMeasured;
      document.getElementsByName('minBloodGlucose')[0].value = data.bloodGlucoseData.min;
      document.getElementsByName('maxBloodGlucose')[0].value = data.bloodGlucoseData.max;
      document.getElementsByName('targetObjectiveBloodGlucose')[0].value = data.bloodGlucoseData.target;

});
    modal.style.display = "block";
  })
});



// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}