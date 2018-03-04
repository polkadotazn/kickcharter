import Chart from 'chart.js';
import * as Queries from './kickstart_data';

let canvas;
let ctx;
let kickChart;
let currentCategoryArray = [];
let barChartData = {
    labels: [],
    datasets: [{
        label: 'successful projects',
        data: [],
        backgroundColor:
            'rgba(75, 192, 192, 0.2)',
        borderColor:
            'rgba(75, 192, 192, 1)',
        borderWidth: 1
    },
    {
        label: 'failed projects',
        data: [],
        backgroundColor:
            'rgba(255, 99, 132, 0.2)',
        borderColor:
            'rgba(255,99,132,1)',
        borderWidth: 1
    }
  ]
};

document.addEventListener("DOMContentLoaded", function() {

  canvas = document.getElementById("kickChart");
  console.log(canvas);
  ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var select = document.querySelector('.cat-options');
  kickChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = "number of projects: ";
                const tooltipData = data.datasets[tooltipItem.datasetIndex].tooltipData[tooltipItem.index];
                return label + tooltipData.count;
              }
            }
          },
          responsive: false,
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
    });
});

function updateChartData(data) {
  barChartData.labels = data.map(d => d.category);
  barChartData.datasets[0].data = data.map(d => d.successful.goal_avg);
  barChartData.datasets[0].tooltipData = data.map(d => d.successful);
  barChartData.datasets[1].data = data.map(d => d.failed.goal_avg);
  barChartData.datasets[1].tooltipData = data.map(d => d.failed);

  kickChart.update();
}


document.addEventListener("DOMContentLoaded", () => initializeChart());

var initializeChart = () => {
  document.getElementsByClassName("uncheck-btn")[0].onclick = e => {
    currentCategoryArray = [];
    updateChart();
  };
  document.getElementsByClassName(
    "cat-options")[0].onclick = e => {
      const target = e.target;
      if (target.tagName !== 'INPUT') {
        return;
      }
      if (e.target.checked) {
        currentCategoryArray.push(e.target.value);
      } else {
        currentCategoryArray = currentCategoryArray.filter(x =>
          x !== e.target.value);
      }
      updateChart();
    };
  document.getElementById("yr-input").onchange = e => updateChart();
};

let catArr1;
const updateChart = () => {
  // catArr1 = document.getElementsByClassName("cat-div");
  // let catArr2 = [];
  // for (let i = 0; i < catArr1.length; i++) {
  //     catArr2.push(catArr1[i].getElementsByTagName("input"));
  // }
  // let catArr = [];
  // for (let i = 0; i < catArr2.length; i++) {
  //   if (catArr2[i][0].checked) {
  //     catArr.push(catArr2[i][0].value);
  //   }
  // }

  let year = document.getElementById("yr-input").value;
  let success = 'successful';
  let data = Queries.query(currentCategoryArray, year);

  updateChartData(data);
};
