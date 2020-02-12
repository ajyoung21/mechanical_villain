



    d3.csv('static/data/standardized_info.csv').then((d) => {




    var array = Object.values(d)



    var margin = { top: 50, right: 80, bottom: 50, left: 80 },
				width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom);


    function make_star(list) {
        var data = []



        for (var i = 0; i < list.length; i++) {

            
            

		var datapoint = 
				{ name: `${list[i]['Island_Name']} - ${list[i]['Country']}`,
					axes: [
						{axis: 'Value', value: 1 - list[i]['P_Value']},
						{axis: 'Remoteness', value: list[i]['P_Distance']},
						{axis: 'Homicide Rate', value: list[i]['P_Homicide']},
						{axis: 'Corruption', value: list[i]['P_CPI']},
						{axis: 'Income Potential', value: list[i]['Income_Potential']},
					],
         color: '#26AF32'
                }
                
        data.push(datapoint)
            }

    console.log(data)
      
      console.log(data[0].color);

			//////////////////////////////////////////////////////////////
			////// First example /////////////////////////////////////////
      ///// (not so much options) //////////////////////////////////
			//////////////////////////////////////////////////////////////
			var radarChartOptions = {
			  w: 290,
			  h: 350,
			  margin: margin,
			  levels: 0,
			  roundStrokes: true,
				color: d3.scaleOrdinal().range(["#26AF32", "#762712", "#2a2fd4"]),
				format: '.00f'
			};

			// Draw the chart, get a reference the created svg element :
			let svg_radar1 = RadarChart(".radarChart", data, radarChartOptions);

			//////////////////////////////////////////////////////////////
			///// Second example /////////////////////////////////////////
			///// Chart legend, custom color, custom unit, etc. //////////
			//////////////////////////////////////////////////////////////
			var radarChartOptions2 = {
			  w: 290,
			  h: 350,
			  margin: margin,
			  maxValue: 1,
			  levels: 10,
			  roundStrokes: false,
			  color: d3.scaleOrdinal().range(["#AFC52F", "#ff6600", 'red', "#2a2fd4"]),
				format: '.00f',
				legend: { title: 'Individual Island', translateX: 50, translateY: 40 },
				unit: ''
			};

			// Draw the chart, get a reference the created svg element :
            let svg_radar2 = RadarChart(".radarChart2", data, radarChartOptions2);
            
    }

    function format_filtered_list(list) {

        console.log('It might be filtering')

        d3.csv('static/data/standardized_info.csv').then((d) => {

            var array = Object.values(d)
            
            var final_list = []
            for (var i = 0; i < list.length; i++) {
                for (var i = 0; j < array.length; i++) {
                    if (filtered_list[i]['Island_Name'] == array[i]['Island_Name']) {
                        final_list.push(array[j])
                    }
                }
                }
            
            make_star(final_list)
            })
        
        }
  
    make_star(array.slice(0,4))
  
        })

format_filtered_list()




