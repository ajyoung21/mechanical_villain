// This function makes the remoteness scatterplot
function make_scatter(data) {
  // Set up lists for later use
  acreages = []
  names = []
  prices = []
  
  // Loop through each island
  data.forEach((island) => {
    // Grab relevant information
    var island_name = island[0]
    var island_info = island[1]
    var country = island_info["Country"]
    var acreage = island_info["Acreage"]
    var price = island_info["price"]

    var my_string = island_name.concat(": ", country)
    
    // append valuse to lists
    prices.push(price)
    acreages.push(acreage)
    names.push(my_string)
  
        
  })
  
  // Set up trace
  var trace11 = {
    x: prices,
    y: acreages,
    mode: 'markers',
    marker: {size:6},
    text: names,
    type: 'scatter'
  }
    
  // Set up the scatterplot layout
  var layout2 = {
      title: {
        text:'Island Price Relative to Acreage',
        font: {
          family: 'Courier New, monospace',
          size: 24
        },
        xref: 'paper',
        x: 0.05,
      },
      xaxis: {
        title: {
          text: 'Price in US Dollars',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Island Acreage',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    };
  
  var warm = [trace11]
  
  // Plot the data
  Plotly.newPlot("scatter", warm, layout2)

  // This chunk makes the bar chart
  var continents = ["Africa", "Asia", "Europe", "North America", 
  "South America", "Oceania"];
  var continental_prices = [5615994, 9916249, 9821797, 3957247, 5478838, 5738044];

  // Set up the trace
  var trace12 = {
    x: continental_prices,
    y: continents,
    name: "Continental Average Price",
    type: "bar"
  }

  // Plot the bar chart
  var data = [trace12]
  var layout = {barmode: 'group', xaxis: {tickangle: 35, showticklabels: true, type: 'category'}}
  Plotly.newPlot('bar', data, layout)
}
  