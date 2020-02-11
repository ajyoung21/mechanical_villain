console.log('Salutations')

// var margin = {
//     top: 36,
//     right: 50,
//     bottom: 20,
//     left: 50
//   };
//   var width = 240 - margin.left - margin.right;
//   var height = 240 - margin.top - margin.bottom;
//   var labelMargin = 8;
  
//   var scale = d3.scale.linear()
//     .domain([0, 4])
//     .range([0, 100])
  
//   d3.csv('../data/standardized_info.csv')
//     .row(function(d) {
//         d.P_Value = +d.P_Value;
//         d.P_Distance = +d.P_Distance;
//         d.P_Homicide = +d.P_Homicide;
//         d.P_CPI = +d.P_CPI;
//         d.Income_Potential = +d.Income_Potential;
     
//         return d;
//     })
//     .get(function(error, rows) {
//       var star = d3.starPlot()
//         .width(width)
//         .accessors([
//           function(d) { return scale(d.P_Value); },
//           function(d) { return scale(d.P_Distance); },
//           function(d) { return scale(d.P_Homicide); },
//           function(d) { return scale(d.P_CPI); },
//           function(d) { return scale(d.Income_Potential); },
          
//         ])
//         .labels([
//           'Value ($/Acre)',
//           'Distance From Nearest City',
//           'Homicide Rate',
//           'Corruption Rate',
//           'Income Potential',
         
//         ])
//         .title(function(d) { return d.Island_Name; })
//         .margin(margin)
//         .labelMargin(labelMargin)
  
//       rows.forEach(function(d, i) {
//         star.includeLabels(i % 4 === 0 ? true : false);

//         console.log('Its working?')
  
//         d3.select('#star').append('svg')
//           .attr('class', 'chart')
//           .attr('width', width + margin.left + margin.right)
//           .attr('height', width + margin.top + margin.bottom)
//           .append('g')
//             .datum(d)
//             .call(star)
//       });
//     });


    d3.csv('static/data/standardized_info.csv').then((data) => {


        console.log('It may be reading the data')


    var margin = { top: 50, right: 80, bottom: 50, left: 80 },
				width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

			//////////////////////////////////////////////////////////////
			////////////////////////// Data //////////////////////////////
			//////////////////////////////////////////////////////////////

			var data = [
				{ name: 'Allocated budget',
					axes: [
						{axis: 'Sales', value: 42},
						{axis: 'Marketing', value: 20},
						{axis: 'Development', value: 60},
						{axis: 'Customer Support', value: 26},
						{axis: 'Information Technology', value: 35},
						{axis: 'Administration', value: 20}
					],
         color: '#26AF32'
				},
				{ name: 'Actual Spending',
					axes: [
						{axis: 'Sales', value: 50},
						{axis: 'Marketing', value: 45},
						{axis: 'Development', value: 20},
						{axis: 'Customer Support', value: 20},
						{axis: 'Information Technology', value: 25},
						{axis: 'Administration', value: 23}
					],
         color: '#762712'
				},
        { name: 'Further Test',
					axes: [
						{axis: 'Sales', value: 32},
						{axis: 'Marketing', value: 62},
						{axis: 'Development', value: 35},
						{axis: 'Customer Support', value: 10},
						{axis: 'Information Technology', value: 20},
						{axis: 'Administration', value: 28}
					],
         color: '#2a2fd4'
				}
			];
      
      console.log(data[0].color);

			//////////////////////////////////////////////////////////////
			////// First example /////////////////////////////////////////
      ///// (not so much options) //////////////////////////////////
			//////////////////////////////////////////////////////////////
			var radarChartOptions = {
			  w: 290,
			  h: 350,
			  margin: margin,
			  levels: 5,
			  roundStrokes: true,
				color: d3.scaleOrdinal().range(["#26AF32", "#762712", "#2a2fd4"]),
				format: '.0f'
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
			  maxValue: 60,
			  levels: 6,
			  roundStrokes: false,
			  color: d3.scaleOrdinal().range(["#AFC52F", "#ff6600", "#2a2fd4"]),
				format: '.0f',
				legend: { title: 'Organization XYZ', translateX: 100, translateY: 40 },
				unit: '$'
			};

			// Draw the chart, get a reference the created svg element :
			let svg_radar2 = RadarChart(".radarChart2", data, radarChartOptions2);
  
        })