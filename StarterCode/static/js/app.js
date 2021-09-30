
let url = "../data/samples.json"


function init(){
    // console.log(names);
    var subjectSelectionDropDown = d3.select("#selDataset");

    d3.json(url).then( 
        (data) =>{
            var subjectIDs = data.names;
            subjectIDs.forEach(element => {
                subjectSelectionDropDown
                    .append("option")
                    .text(element)
                    .property("value",element);
                });
            buildCharts(subjectIDs[0]);
            buildMetadata(subjectIDs[0]);
        })
}

function buildMetadata(sample) {
    d3.json(url).then((data) => {
        // var metadata=data.metadata;
        var metadata= data.metadata.filter(sampleobject =>
            sampleobject.id == sample);

        var result= metadata[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value])=> {
            panel.append("h6").text(`${key}: ${value}`);
        });

        
          // Gauge chart
          let gaugeTrace = {
            domain: { x: [0, 1], y: [0, 1] },
            value: metadata[0].wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
              bar: {
                color: "red"
              },
              axis:
              {
                range: [null, 9],
                nticks: 10
              },
              steps: [
                { range: [0, 1], color: "#ecfaea" },
                { range: [1, 2], color: "#c7f0c1" },
                { range: [2, 3], color: "#a1e798" },
                { range: [3, 4], color: "#8ee283" },
                { range: [4, 5], color: "#7bdd6e" },
                { range: [5, 6], color: "#56d345" },
                { range: [6, 7], color: "#43cf30" },
                { range: [7, 8], color: "#3cba2c" },
                { range: [8, 9], color: "#36a527" }
              ]
            }
          };
        
          let gaugeLayout = {
            width: 600,
            height: 400,
            font: {
              color: "darkblue"
            }
          };

          Plotly.newPlot('gauge', [gaugeTrace], gaugeLayout);

    });
}


function buildCharts(selectedSampleID) {

    d3.json(url).then((data) => {
      
        // var samples= data.samples;

        var samples= data.samples.filter(sample => sample.id == selectedSampleID);
        
        console.log("loging samples");
        console.log(samples);

        var result= samples[0];
    
        // Define arrays for sample values and OTU ids and labels
        // Used for bubble chart

        var ids = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;
    
        //--------------------Bubble Chart----------------
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
        //--------------------END Bubble Chart----------------

        // Create arrays for top 10 sample values and OTU ids and labels
        // Used for bar chart
  
        let sample_values_10 = values.slice(0, 10).reverse();
        let otu_ids_10 = ids.slice(0, 10).reverse().map(otuID => `OTU ${otuID}`);
        let otu_labels_10 = labels.slice(0, 10).reverse();

        //-------------------- BAR Chart----------------
        var bar_data =[
            {
                x:sample_values_10,
                y:otu_ids_10,
                text:otu_labels_10,
                type:"bar",
                orientation:"h"
            }
        ];
    
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };
    
        Plotly.newPlot("bar", bar_data, barLayout);
        //--------------------END BAR Chart----------------
    });
    }

function optionChanged(id) {
    buildCharts(id);
    buildMetadata(id);
}


init();
