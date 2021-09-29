
let file = "../data/samples.json"

// var names = Object.values(research.names);
// console.log(names);
// var metadata = Object.values(research.metadata);
// console.log(metadata);
// var samples = Object.values(research.samples);
// console.log(samples);

// Retunrs a prototype object
var samples = d3.json(file).then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    console.log("printing data");
    console.log(data);
    return data;
    });
var names = samples["names"];
console.log("printing names");
console.log(names);


function init(){
    // console.log(names);
    var researchDropDown = d3.select("#selDataset");

    d3.json(file).then(
        (data) => {
            var researchNames = data.names;
            researchNames.forEach(element => {
            researchDropDown
                .append("option")
                .text(element)
                .property("value",element);
            });
            buildCharts(data.names[0]);
            // getPlots(data.names[0]);
            // getDemongraphics(data.names[0]);
            buildMetadata(data.names[0]);
        })
}
function getPlots(researchID){
//Read samples.json
    d3.json(file).then (sampledata =>{

        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
        // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
        // get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // create the bar plot
        Plotly.newPlot("bar", data, layout);

        // The bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // creating data variable 
        var data1 = [trace1];

        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 

    });
}

function getDemographics(researchID){
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === researchID)[0];
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}


function buildMetadata(sample) {
    d3.json(file).then((data) => {
        var metadata=data.metadata;
        var resultsarray= metadata.filter(sampleobject =>
            sampleobject.id == sample);

        var result= resultsarray[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value])=> {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}


function buildCharts(sample) {

    d3.json(file).then((data) => {
      var samples= data.samples;
      var resultsarray= samples.filter(sampleobject => 
          sampleobject.id == sample);
      var result= resultsarray[0]
    
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      var values = result.sample_values;
    
    
      var LayoutBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        };
    
        var DataBubble = [ 
        {
          x: ids,
          y: values,
          text: labels,
          mode: "markers",
          marker: {
            color: ids,
            size: values,
            }
        }
      ];
    
      Plotly.newPlot("bubble", DataBubble, LayoutBubble);
    

      var bar_data =[
        {
          y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x:values.slice(0,10).reverse(),
          text:labels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
    
        }
      ];
    
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
    
      Plotly.newPlot("bar", bar_data, barLayout);
    });
    }

function optionChanged(id) {
    buildCharts(id);
    // getPlots(id);
    // getDemographics(id);
    buildMetadata(id);
}


init();
