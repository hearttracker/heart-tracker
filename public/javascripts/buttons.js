const bpButton = document.getElementById('bpNext');
const bsButton = document.getElementById('bsNext');

bpButton.addEventListener('click', function() {
  console.log('clicked');
  document.getElementById('bloodPressureParent').style.display = 'none';
  document.getElementById('bloodSugarParent').style.display = 'flex';
})

bsButton.addEventListener('click', function() {
  console.log('clicked');
  document.getElementById('bloodSugarParent').style.display = 'none';
  document.getElementById('bloodPressureParent').style.display = 'flex';
})

// const bloodPressure = document.getElementById('heartRateContainer');
// const bloodSugar = document.getElementById('bloodSugarContainer');

// bloodPressure.addEventListener("click", function() {
//   if(!bloodPressure.classList.contains('active')) {
//   bloodPressure.classList.toggle('active');
//   bloodSugar.classList.toggle('active');

//   let bloodPressureParent = bloodPressure.parentElement;
//   bloodPressureParent.style.width = '60vw';
//   bloodPressure.style.width = '60vw';
//   bloodPressure.style.flexDirection = 'row';

//   let bloodSugarParent = bloodSugar.parentElement;
//   bloodSugarParent.style.width = '20vw';
//   bloodSugar.style.width = '20vw';
//   bloodSugar.style.flexDirection = 'column';


// }
// });

// bloodSugar.addEventListener("click", function() {
//   console.log('clicked');
//   if(!bloodSugar.classList.contains('active')) {
//   bloodSugar.classList.toggle('active');
//   bloodPressure.classList.toggle('active');

//   let bloodSugarParent = bloodSugar.parentElement;
//   bloodSugarParent.style.width = '60vw';
//   bloodSugar.style.width = '60vw';
//   bloodSugar.style.flexDirection = 'row';


//   let bloodPressureParent = bloodPressure.parentElement;
//   bloodPressureParent.style.width = '20vw';
//   bloodPressure.style.width = '20vw';
//   bloodPressure.style.flexDirection = 'column';


// }
// });