


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
          yAxisId: 'y-axis'
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
              id: 'y-axis',
              type: 'linear',
              position: 'left',
              ticks: {
                min: 40,
                max: 200,
                display: false
              },
              scaleShowLabels : false

          }
        ]},
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
console.log({heartFrequencyData});
  const ctx = document.getElementById('bloodPressureGraph').getContext('2d');

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

fetch(`/api/patient/${patientId}`)
.then(response => response.json())
.then(data => {
    bloodSugarChart(data.bloodSugarData.values);
    bloodPressureChart(data.bloodPressureData.values, data.heartFrequencyData.values);
    data.bloodSugarData.values.map(v => {
      let node = document.createElement('tr');
      node.innerHTML = `
      <td>${v.date.substring(0, v.date.length-4)}</td>
      <td>${v.value}</td>
      <td>${v.comment}</td>`;
      console.log(node);
      document.getElementById('bloodSugarTableBody').appendChild(node);
    })
    console.log(data.bloodSugarData.values);
  
});





