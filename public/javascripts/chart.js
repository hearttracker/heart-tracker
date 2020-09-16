

const bloodSugarChart = (data) => {
  const dates = data.slice(0,10).map(value => (value.date).toString());
  console.log({ dates })
  const measurement = data.slice(0,10).map(value => value.value);
  console.log({ measurement });

  const ctx = document.getElementById('bloodSugarChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Blood Sugar Values',
          fill: false,
          borderColor: 'rgb(224, 189, 13)',
          data: measurement,
          yAxisId: 'first-y-axis'
        }
      ]
    }
  });
};

const bloodPressureChart = (bloodPressureData, heartFrequencyData) => {
  console.log({bloodPressureData});
  const dates = bloodPressureData.slice(0,10).map(value => value.date);
  console.log({ dates })
  const systolic = bloodPressureData.slice(0,10).map(value => value.systolic);
  const diastolic = bloodPressureData.slice(0,10).map(value => value.diastolic);
  console.log({ systolic, diastolic });
  const heartFrequency = heartFrequencyData.slice(0,10).map(value => value.value);

  const ctx = document.getElementById('heartRateGraph').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Systolic',
          borderColor: 'rgb(247, 24, 2)',
          data: systolic,
          fill: 1,
          yAxisId: 'first-y-axis',
          backgroundColor: "rgba(184,151,151, 0.52)"
        },
        {
          label: 'Diastolic',
          borderColor: 'rgb(29, 2, 237)',
          data: diastolic,
          fill: false,
          yAxisId: 'first-y-axis',
        },
        {
          label: 'Heart Frequency',
          borderColor: 'rgb(2, 247, 96)',
          data: heartFrequency,
          fill: false,
          yAxisId: 'second-y-axis'
        }
      ]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
              display: false
          }
      }],
          yAxes: [{
              id: 'first-y-axis',
              type: 'linear',
              position: 'left',
              ticks: {
                min: 40,
                max: 200,
                display: false
              },
              scaleShowLabels : false

          }, {
              id: 'second-y-axis',
              type: 'linear',
              position: 'right',
              ticks: {
                min: 40,
                max: 200,
                display: false
              }

          }]
      }
  }
  });
};

const patientId = document.getElementById('hiddenId').innerText;

fetch(`http://localhost:3000/api/patient/${patientId}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  // if(data.bloodSugarData.isMeasured) {
    bloodSugarChart(data.bloodSugarData.values);
  // };
  // if(data.bloodPressureData.isMeasured && data.heartFrequencyData.isMeasured) {
    bloodPressureChart(data.bloodPressureData.values, data.heartFrequencyData.values)
  // };
});



const bloodPressure = document.getElementById('heartRateContainer');
const bloodSugar = document.getElementById('bloodSugarContainer');

bloodPressure.addEventListener("click", function() {
  if(!bloodPressure.classList.contains('active')) {
  bloodPressure.classList.toggle('active');
  bloodSugar.classList.toggle('active');

  let bloodPressureParent = bloodPressure.parentElement;
  bloodPressureParent.style.width = '60vw';
  bloodPressure.style.width = '60vw';
  bloodPressure.style.flexDirection = 'row';

  let bloodSugarParent = bloodSugar.parentElement;
  bloodSugarParent.style.width = '20vw';
  bloodSugar.style.width = '20vw';
  bloodSugar.style.flexDirection = 'column';


}
});

bloodSugar.addEventListener("click", function() {
  console.log('clicked');
  if(!bloodSugar.classList.contains('active')) {
  bloodSugar.classList.toggle('active');
  bloodPressure.classList.toggle('active');

  let bloodSugarParent = bloodSugar.parentElement;
  bloodSugarParent.style.width = '60vw';
  bloodSugar.style.width = '60vw';
  bloodSugar.style.flexDirection = 'row';


  let bloodPressureParent = bloodPressure.parentElement;
  bloodPressureParent.style.width = '20vw';
  bloodPressure.style.width = '20vw';
  bloodPressure.style.flexDirection = 'column';


}
});
