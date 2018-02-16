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



const query = (catArr, year, success) => {
  return (jsonContent.filter((el) => (
    catArr.includes(el.main_category) && el.state === success &&
      el.deadline.includes(year)
  )));

};

const averageBy = (fieldName, arr) => {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].main_category === fieldName) {
      sum += parseInt(arr[i].usd_goal_real);
      count += 1;
    }
  }
  return sum/count;
};

module.exports = { query, averageBy };


console.log(query(["Dance", "Games"],'/09',"successful"));
