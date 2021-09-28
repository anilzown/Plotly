
var names = Object.values(research.names);
// console.log(names);
// var names = samples.names;
// console.log(names);
var metadata = Object.values(research.metadata);
// console.log(metadata);
var samples = Object.values(research.samples);
// console.log(samples);


// var samples;
// d3.json("samples.json").then((importedData) => {
//     // console.log(importedData);
//     var data = importedData;
//     console.log(data);
  
//     return data;
//     });

//  var names = samples.names;


function init(){
    console.log(names);
    var researchDropDown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
    var researchNames = data.names;
    researchNames.forEach(element => {
        researchDropDown
            .append("option")
            .text(element)
            .property("value",element);
    });
}

    
    // loadDropDownOptions(researchDropDown,names);
    // researchDropDown.property("value") == names;
    // researchDropDown.select();
    // researchDropDown.values == names;


function myfunction(){
//     var chosenCountry = "BF";
// var countryList = [
//   [1, "BW", "Botswana"],
//   [2, "BF", "Burkina Faso"],
//   [3, "CV", "Cabo Verde"],
//   [4, "CM", "Cameroon"],
//   [5, "CG", "Congo"]
// ];

// var dropdown = d3.select("body")
//   .append("select")
//   .attr('id', 'dropDownId');

// var options = dropdown.selectAll('option')
//   .data(countryList)
//   .enter()
//   .append('option')
//   .attr('value', (d) => d[1])
//   .text((d) => d[2]);

// options.property("selected", function(d) {
//   return d[1] === chosenCountry
// });
}

function loadDropDownOptions(dropdown,data){
    console.log(names)
    
    
// This did not work 
//     var options = dropdown.selectAll('option')
//   .data(names)
//   .enter()
//   .append('option')
//   .attr('value', (d) => d[1];console.log(d[1]))
//   .text((d) => d[1]);


  var options = dropdown.selectAll('option')
  .data(names)
  .enter()

   for (let i = 0; i < data.length; i++) {
        .append('option')
        .attr('value', (d) => d[1];console.log(d[1]))
        .text((d) => d[1]);
      


    } 





// options.property("selected", function(d) {
//   return d[1] === chosenCountry
// });


  } 



// function loadDropDownOptions(dropdown,data){
//     let option;
    
//     for (let i = 0; i < data.length; i++) {
//       option = document.createElement('option');
//         // option.text = data[i].name;
//         // option.value = data[i].abbreviation;
//         option.text = data[i];
//         option.value = data[i];
//         dropdown.add(option);
//     }    
//   } 




init();
