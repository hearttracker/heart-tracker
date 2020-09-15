

const printTheChart = (data) => {
  const dates = data.map(value => value.date);
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
               borderColor: 'rgb(255, 99, 132)',
               data: measurement
              }
          ]
      }
  })
}

const patientId = document.getElementById('hiddenId').innerText;

console.log('script is executed!')

fetch(`http://localhost:3000/api/patient/${patientId}`)
.then(response => response.json())
.then(data => {
  console.log(data);
  printTheChart(data.bloodSugarData.values);
})

