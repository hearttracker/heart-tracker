

const bloodSugarChart = (data) => {
  const dates = data.map(value => (value.date).toString());
  console.log({ dates })
  const measurement = data.map(value => value.value);
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
          data: measurement
        }
      ]
    }
  });
};

const bloodPressureChart = (bloodPressureData, heartFrequencyData) => {
  const dates = bloodPressureData.map(value => value.date);
  console.log({ dates })
  const systolic = bloodPressureData.map(value => value.systolic);
  const diastolic = bloodPressureData.map(value => value.diastolic);
  console.log({ systolic, diastolic });
  const heartFrequency = heartFrequencyData.map(value => value.value);

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
          fill: false
        },
        {
          label: 'Diastolic',
          borderColor: 'rgb(29, 2, 237)',
          data: diastolic,
          fill: false
        },
        {
          label: 'Heart Frequency',
          borderColor: 'rgb(2, 247, 96)',
          data: heartFrequency,
          fill: false
        }
      ]
    }
  });
};

const patientId = document.getElementById('hiddenId').innerText;

fetch(`http://localhost:3000/api/patient/${patientId}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  bloodSugarChart(data.bloodSugarData.values);
  bloodPressureChart(data.bloodPressureData.values, data.heartFrequencyData.values);
})

