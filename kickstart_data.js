// import { readFileSync } from "fs";
// const fileSystem = require('fs');
// console.log( readFileSync );
// var content = readFileSync("ks2018.json");
// var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('GET', 'ks2018.json', false);
//   xobj.onreadystatechange = function () {
//
//     if (xobj.readyState === 4 && xobj.status === "200") {
//       jsonContent = JSON.parse(xobj.responseText);
//     }
//   };
var jsonContent = require("./ks2018.json");
//
// window.jsonContent = jsonContent;
// var artSuccess = jsonContent.filter(function(el) {
//   return el.main_category === "Art" &&
//   el.state === "successful" &&
//   el.deadline.includes('/09');
// });



const query = (catArr, year) => {
  // TODO return placeholder values for empty categories
  var rawData = (jsonContent.filter((el) => (
    catArr.includes(el.category) &&
      el.year === year
  )));


  const reduced = rawData.reduce((aggregate, current) => {
    const key = current.year + current.category;
    if (!aggregate.hasOwnProperty(key)) {
      aggregate[key] = {
        year: current.year,
        category: current.category,
      };
    }
    // TODO combine failed and canceled
    aggregate[key][current.state] = current;
    return aggregate;
  }, {});
  return catArr.map(cat => {
    const d = reduced[year + cat];
    return d || {
      year: year,
      category: cat,
      successful: {},
      failed: {},
    };
  });
};
//
// const averageBy = (fieldName, arr) => {
//   let sum = 0;
//   let count = 0;
//   for (let i = 0; i < arr.length; i++) {
//     if(arr[i].main_category === fieldName) {
//       sum += parseInt(arr[i].usd_goal_real);
//       count += 1;
//     }
//   }
//   return sum/count;
// };

module.exports = { query };


console.log(query(["Dance", "Games"],'/09',"successful"));
