import Chart from 'chart.js';
import * as Queries from './kickstart_data';

let canvas;
let ctx;
let kickChart;

document.addEventListener("DOMContentLoaded", function() {

  canvas = document.getElementById("kickChart");
  console.log(canvas);
  ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var select = document.querySelector('.cat-options');

  kickChart = (catArr, succData) => {
    return(
      new Chart(ctx, {
        responsive: 'true',
        responsiveAnimationDuration: '300',
        type: 'bar',
        data: {
            labels: catArr,
            datasets: [{
                label: 'successful projects',
                data: succData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(99, 0, 132, 0.2)',
                    'rgba(54, 162, 200, 0.2)',
                    'rgba(30, 206, 40, 0.2)',
                    'rgba(200, 40, 192, 0.2)',
                    'rgba(153, 18, 255, 0.2)',
                    'rgba(255, 159, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(99, 0, 132, 1)',
                    'rgba(54, 162, 200, 1)',
                    'rgba(30, 206, 40, 1)',
                    'rgba(200, 40, 192, 1)',
                    'rgba(153, 18, 255, 1)',
                    'rgba(255, 159, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'avg goal($) per project'
                  },
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
      })
    );
  };
});


document.addEventListener("DOMContentLoaded", () => initializeChart());

var initializeChart = () => {
  document.getElementsByClassName(
    "cat-options")[0].onclick = e => updateChart(e);

};

let catArr1;
const updateChart = () => {
  catArr1 = document.getElementsByClassName("cat-div");
  let catArr2 = [];
  for (let i = 0; i < catArr1.length; i++) {
      catArr2.push(catArr1[i].getElementsByTagName("input"));
  }
  let catArr = [];
  for (let i = 0; i < catArr2.length; i++) {
    if (catArr2[i][0].checked) {
      catArr.push(catArr2[i][0].value);
    }
  }

  let year = '/09';
  let success = 'successful';
  let data = Queries.query(catArr, year, success);
  let chartData = [];
  catArr.forEach(cat => {
    chartData.push(Queries.averageBy(cat, data));
  });
  kickChart(catArr, chartData);

};
