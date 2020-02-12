// Fill in the drop down menus
function drop_down_update() {
  // Read in the data and make promise
  d3.json("/data_one").then((data) => {

      // grab drop downs
      var drop_down_1 = d3.select("#first_selection")
      var drop_down_2 = d3.select("#second_selection")
      var drop_down_3 = d3.select("#third_selection")
      
      // Grab specific attributes to go in dropdowns
      var keys = Object.entries(data)
      var first_key = keys[0]
      var attributes = Object.keys(first_key[1])
      var attributes = attributes.splice(1)
      attributes.pop()
      attributes.pop()
      attributes.pop()
      attributes.pop()
      var index = attributes.indexOf('Country')
      if (index > -1) {
        attributes.splice(index,1)
      }
      attributes.unshift("No Selection")

      // Append attributes to dropdowns
      attributes.forEach((attribute) => {
        drop_down_1.append("option").text(attribute).property("value", attribute)
        drop_down_2.append("option").text(attribute).property("value", attribute)
        drop_down_3.append("option").text(attribute).property("value", attribute)
      })
  })

  // Read in country collection to create country dropdowns
  d3.json("/data_two").then((data) => {

    // Grab the dropdowns
    var country_drop_1 = d3.select("#country_selection_1")
    var country_selection = d3.select("#country_input")
    var country_drop_2 = d3.select("#country_selection_2")

    // Make the list to insert into the dropdowns
    var keys = Object.entries(data)
    keys.unshift(["No Selection"])

    // Insert into each dropdown
    keys.forEach((key) => {
      country_drop_1.append("option").text(key[0]).property("value", key[0])
      country_selection.append("option").text(key[0]).property("value", key[0])
      country_drop_2.append("option").text(key[0]).property("value", key[0])
    })
  })
}

// The purpose of this function is to create an array of objects that fit the user-inputted criteria
function grab_params_and_filter() {

  // Read in the island data
  d3.json("/data_one").then((data) => {

    //Format it into an array
    keys = Object.entries(data)

    // Loop through the array to filter
    var filtered_list = []
    keys.forEach((datum, index) => {

      // Here we are grabbing the user inputted criteria
      var param_1 = d3.select("#first_selection").node().value
      var param_2 = d3.select("#second_selection").node().value
      var param_3 = d3.select("#third_selection").node().value
      var min_acreage_box = d3.select("#min_acreage_input").node().value
      var min_distance_box = d3.select("#min_distance_input").node().value
      var max_acreage_box = d3.select("#max_acreage_input").node().value
      var max_distance_box = d3.select("#max_distance_input").node().value
      var country_input = d3.select("#country_input").node().value
      
      // read in appropriate island information
      var island_info = datum[1]
      var param_1_yes_no = island_info[param_1]
      var param_2_yes_no = island_info[param_2]
      var param_3_yes_no = island_info[param_3]
      var acreage = island_info["Acreage"]
      var distance = island_info["city_distance"]
      var country = island_info["Country"]

      // Handling cases where no input was gathered
      if (min_acreage_box === "") {
          var min_acreage_box = 0
      }

      if (min_distance_box === "") {
          var min_distance_box = 0
      }

      if (max_acreage_box === "") {
          var max_acreage_box = 1000000
      }

      if (max_distance_box === "") {
          var max_distance_box = 1000000
      }

      if (country_input == "No Selection") {
        var country_input = country
      }

      // This is the magic filtering if statement
      if (country_input == country && param_1_yes_no !== "no" && param_2_yes_no !== "no" && param_3_yes_no !== "no" && acreage >= min_acreage_box && distance >= min_distance_box && distance <= max_distance_box && acreage <= max_acreage_box) {
          filtered_list.push(datum)
      }

    })
    // Pass filtered list to the scatterplot and map to only display those islands
    make_scatter(filtered_list)
    make_map(filtered_list)
<<<<<<< Updated upstream
    console.log('Salutations')
    format_filtered_list(filtered_list)
=======

  })
}

// Create the Map instance 
var myMap = L.map("map", {
  center: [30, -100],
  zoom: 1,
});

// Set the map bounds
var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

myMap.setMaxBounds(bounds);


// Bring in the main Layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.comic",
  accessToken: "pk.eyJ1IjoibWFyZ2FyaXRhMjUiLCJhIjoiY2s0eWRmYnVqMDh1YzNubWJyczkxN2pnMiJ9.nqjuIZcKeKe9hWtEsmxLSQ"
}).addTo(myMap); 


// add a layer for the markers
var markersLayer = new L.LayerGroup()
markersLayer.addTo(myMap)

// This function puts the appropriate markers on the map
function make_map(data) {

  // Read in informaiton on countries
  d3.json("/data_two").then((countrys) => {
    // Clear out all existing markers on the map
    markersLayer.clearLayers()

    // Loop through each island and create markers
    data.forEach((island) => {
      // Get country information
      var island_name = island[0]
      var island_country = island[1].Country

      var country_stats = countrys[island_country]

      // If no country, set variables to 0
      try {
        var corruption = country_stats["CPI Score 2018"]
        var murder = country_stats["Homicide Rate"]
      } catch {
        var murder = 0
        var corruption = 0
      }

      // Get the lat and lon
      var lat_lon = []
      lat_lon.push(island[1].latitude)
      lat_lon.push(island[1].longitude)

      // Apply color formatting based on host countries corruptness
      if (corruption >=60) {
        tickcolor = "red";
      }
      else if (corruption >=40) {
        tickcolor = "orange";
      }
      else if (corruption >=20 ) {
        tickcolor = "yellow";
      }
      else if (corruption >=1 ) {
        tickcolor = "green";
      }
      else {
        tickcolor = "gray";
      }
      
      // Throw those markers on the map
      var marker = L.circleMarker(lat_lon, {radius: 5, color: tickcolor}).bindPopup("<h3>Island Name: " + island_name + "</h3><hr><h5>Resident country: " + island_country + "</h5><h5>Homicide rate per 100k: " + murder + "</h5>")
      markersLayer.addLayer(marker)
    })
  })
}

// This function makes the scatterplot
function make_scatter(data) {
  
  // Set up lists for later use
  distances = []
  acreages = []
  names = []

  // Loop through each island
  data.forEach((island) => {
    // Grab relevant information
    var island_name = island[0]
    var island_info = island[1]
    var country = island_info["Country"]
    var distance = island_info["city_distance"]
    var acreage = island_info["Acreage"]

    var my_string = island_name.concat(": ", country)
    
    // append valuse to lists
    distances.push(distance)
    acreages.push(acreage)
    names.push(my_string)

      
  })
  
  // Set up trace
  var trace1 = {
    x: distances,
    y: acreages,
    mode: 'markers',
    marker: {size:6},
    text: names,
    type: 'scatter'
  }
  
  // Set up the scatterplot layout
  var layout = {
      title: {
        text:'Island Size vs Remoteness',
        font: {
          family: 'Courier New, monospace',
          size: 24
        },
        xref: 'paper',
        x: 0.05,
      },
      xaxis: {
        title: {
          text: 'Distance to Nearest City in Miles',
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

  var cool = [trace1]

  // Plot the data
  Plotly.newPlot("scatter", cool, layout)
}

// This function makes the pricing/acreage scatterplot
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
    var country = island_final_price["Country"]
    var acreage = island_final_price["Acreage"]
    var price = island_final_price["price"]

    var my_string = island_name.concat(": ", country)
    
    // append valuse to lists
    acreages.push(acreage)
    prices.push(price)
    names.push(my_string)

      
  })
  
  // Set up trace
  var trace3 = {
    x: prices,
    y: acreages,
    mode: 'markers',
    marker: {size:6},
    text: names,
    type: 'scatter'
  }
  
  // Set up the scatterplot layout
  var layout = {
      title: {
        text:'Island Size vs Price',
        font: {
          family: 'Courier New, monospace',
          size: 24
        },
        xref: 'paper',
        x: 0.05,
      },
      xaxis: {
        title: {
          text: 'Price in American Dollars',
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

  var temperate = [trace3]

  // Plot the data
  Plotly.newPlot("scatter", temperate, layout)
}

// This function makes the bar chart
function make_bar() {
  // Read in the data about each country
  d3.json("/data_two").then((data) => {
    // Format data
    var keys = Object.entries(data)

    // Set up lists for later use
    var countrys = []
    var homicides = []
    var corruptions = []

    // Loop through the country data
    keys.forEach((item) => {
      // Grab needed values
      var country = item[0]
      var stats = item[1]

      // Grab the dropdown values
      var country_selection_1 = d3.select("#country_selection_1").node().value
      var country_selection_2 = d3.select("#country_selection_2").node().value

      // Run some filtering
      if (country_selection_1 == "No Selection" && country_selection_2 == "No Selection") {
        countrys.push(country)
        homicides.push(stats["Homicide Rate"])
        corruptions.push(stats["CPI Score 2018"])
      } else {
        // The case if only one country is selected
        if (country_selection_1 == country || country_selection_2 == country) {
          countrys.push(country)
          homicides.push(stats["Homicide Rate"])
          corruptions.push(stats["CPI Score 2018"])
        }
      }
    })
    
    // Set up the trace
    var trace1 = {
      x: countrys,
      y: homicides,
      name: "Homicide Rates",
      type: "bar"
    }

    // And the second trace
    var trace2 = {
      x: countrys,
      y: corruptions,
      name: "Corruption Score",
      type: 'bar'
    }

    // Plot the bar chart
    var data = [trace1, trace2]
    var layout = {barmode: 'group', xaxis: {tickangle: 35, showticklabels: true, type: 'category'}}
    Plotly.newPlot('bar', data, layout)
  })
}

// Sanity check that the file loaded
console.log("hi")

// Call needed functions upon page load
drop_down_update()
make_bar()
grab_params_and_filter()

// Set up event listeners
d3.select("#submit").on("click", grab_params_and_filter)
d3.select("#country_selection_1").on("change", make_bar)
d3.select("#country_selection_2").on("change", make_bar)