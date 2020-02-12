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
}

function grab_and_filter() {
    // Read in the island data
    d3.json("/data_one").then((data) => {
        //Format it into an array
        keys = Object.entries(data)

        // Loop through the array to filter
        var filtered_list = []
        keys.forEach((datum, index) => {
            var param_1 = d3.select("#first_selection").node().value
            var param_2 = d3.select("#second_selection").node().value
            var param_3 = d3.select("#third_selection").node().value

            var min_acreage_box = d3.select("#min_acreage_input").node().value
            var max_acreage_box = d3.select("#max_acreage_input").node().value
            var country_input = d3.select("#country_input").node().value

            // read in appropriate island information
            var island_info = datum[1]
            var param_1_yes_no = island_info[param_1]
            var param_2_yes_no = island_info[param_2]
            var param_3_yes_no = island_info[param_3]
            var acreage = island_info["Acreage"]
            var country = island_info["Country"]

            // Handling cases where no input was gathered
            if (min_acreage_box === "") {
                var min_acreage_box = 0
            }
            if (max_acreage_box === "") {
                var max_acreage_box = 1000000
            }
            if (country_input == "") {
                var country_input = country
            }

            if (country_input == country && param_1_yes_no !== 0 && param_2_yes_no !== 0 && param_3_yes_no !== 0 && acreage >= min_acreage_box && acreage <= max_acreage_box) {
                filtered_list.push(datum)
            }
        })
    make_table(filtered_list)
    })
}

function make_table(filtered_list) {
    var restructured_list = []
    filtered_list.forEach((island, index) => {
        var dummy_dict = {}
        var island_name = island[0]
        dummy_dict.island_name = island_name
        var object_island = island[1]

        for(var key in object_island) {
            dummy_dict[key] = object_island[key]
        }
        restructured_list.push(dummy_dict)
    })

    var myTable = document.getElementById("dataTable")
    myTable.innerHTML = ""

    console.log(restructured_list)
    restructured_list.forEach(function(tableRow) {
        // Create a row for each Object in tableData
        var row = tbody.append("tr");
    
        // Create a cell for each value in the Object
        Object.entries(tableRow).forEach(function([key, value]) {
            var cell = row.append('td');
            // Put value into the cell
            cell.text(value)
        });
    });
}

var tbody = d3.select("tbody")

drop_down_update()
grab_and_filter()

d3.select("#submit").on("click", grab_and_filter)