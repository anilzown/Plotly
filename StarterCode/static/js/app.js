
let file = "../data/samples.json"

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
            buildMetadata(data.names[0]);
        })
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
    buildMetadata(id);
}


init();
