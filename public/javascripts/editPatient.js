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
    fetch(`/api/patient/${patientId}`)
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
      document.getElementById('diagnosis').value = data.diagnosis;

      data.treatments.forEach(treatment => {
        let node = document.createElement('li');
        node.innerHTML = `<span> ${treatment.name} - <a href=/deleteTreatment/${treatment._id}>Delete</a> </span>`
        document.getElementById('treatmentList').appendChild(node);
        });
 
      document.getElementById('bloodPressureMeasured').checked = data.bloodPressureData.isMeasured;
      document.getElementById('minBloodPressure').value = `${data.bloodPressureData.min.systolic}/${data.bloodPressureData.min.diastolic}` ;
      document.getElementById('maxBloodPressure').value = `${data.bloodPressureData.max.systolic}/${data.bloodPressureData.max.diastolic}` ;
      document.getElementById('targetObjetiveBloodPressure').value = `${data.bloodPressureData.target.systolic}/${data.bloodPressureData.target.diastolic}` ;
      document.getElementById('heartRateMeasured').checked = data.heartFrequencyData.isMeasured;
      document.getElementById('minHeartRate').value = data.heartFrequencyData.min;
      document.getElementById('maxHeartRate').value = data.heartFrequencyData.max;
      document.getElementById('targetObjetiveHeartRate').value = data.heartFrequencyData.target;
      document.getElementById('bloodGlucoseMeasured').checked = data.bloodSugarData.isMeasured;
      document.getElementById('minBloodGlucose').value = data.bloodSugarData.min;
      document.getElementById('maxBloodGlucose').value = data.bloodSugarData.max;
      document.getElementById('targetObjetiveBloodGlucose').value = data.bloodSugarData.target;

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
  document.getElementById('treatmentList').innerHTML = '';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById('treatmentList').innerHTML = '';
  }
}