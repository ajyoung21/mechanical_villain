


d3.json("/data_one").then((data) => {

  console.log('working')


  
  for (var i = 0; i < data.length; i++) {

  data[i].longitude = +data[i].longitude;
  data[i].latitude = +data[i].latitude;
  data[i].Acreage = +data[i].Acreage;
  data[i].CPI_Score_2018 = +data[i].CPI_Score_2018;
  data[i].city_distance = +data[i].city_distance;
  data[i].country_id = parseInt(data[i].country_id)
  if (data[i].country_id < 100) {
    data[i].country_id = `0${data[i].country_id}`
  }
  else {
  data[i].country_id = `${data[i].country_id}`
  }
  }








 


// ms to wait after dragging before auto-rotating
var rotationDelay = 3000
// scale of the globe (not the canvas element)
var scaleFactor = 0.9
// autorotation speed
var degPerSec = 6
// start angles
var angles = { x: -20, y: 40, z: 0}
// colors
var colorWater = 'lightblue'
var colorLand = 'darkgreen'
var colorGraticule = 'gray'
var colorCountry = 'gray'


//
// Handler
//

function enter(country) {
  var country = countryList.find(function(c) {
    return c.id === country.id
  })
  current.text(country && country.name || '')
}

function leave(country) {
  current.text('')
}






//
// Variables
//

var current = d3.select('#current')
console.log('current', current.text)
var canvas = d3.select('#globe')
console.log(canvas)
var context = canvas.node().getContext('2d')
var water = {type: 'Sphere'}
var projection = d3.geoOrthographic().precision(0.1)
var graticule = d3.geoGraticule10()
var path = d3.geoPath(projection).context(context).pointRadius(7)
var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
var r0 // Projection rotation as Euler angles at start.
var q0 // Projection rotation as versor at start.
var lastTime = d3.now()
var degPerMs = degPerSec / 1000
var width, height
var land, countries
var countryList
var autorotate, now, diff, roation
var currentCountry

//
// Functions
//

function setAngles() {
  var rotation = projection.rotate()
  rotation[0] = angles.y
  rotation[1] = angles.x
  rotation[2] = angles.z
  projection.rotate(rotation)
}

function scale() {
  width = document.documentElement.clientWidth
  height = document.documentElement.clientHeight
  canvas.attr('width', width).attr('height', height)
  projection
    .scale((scaleFactor * Math.min(width, height)) / 2)
    .translate([width / 2, height / 2])
  render()
}

function startRotation(delay) {
  autorotate.restart(rotate, delay || 0)
}

function stopRotation() {
  autorotate.stop()
}

function dragstarted() {
  v0 = versor.cartesian(projection.invert(d3.mouse(this)))
  r0 = projection.rotate()
  q0 = versor(r0)
  stopRotation()
}

function dragged() {
  var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
  var q1 = versor.multiply(q0, versor.delta(v0, v1))
  var r1 = versor.rotation(q1)
  projection.rotate(r1)
  render()
}

function dragended() {
  startRotation(rotationDelay)
}

function render() {
  context.clearRect(0, 0, width, height)
  fill(water, colorWater)
  stroke(graticule, colorGraticule)
  fill(land, colorLand)
  drawMarkers();
  if (currentCountry) {
    fill(currentCountry, colorCountry)
    drawMarkers()
  }
}


function fill(obj, color) {
  context.beginPath()
  path(obj)
  context.fillStyle = color
  context.strokeStyle = 'black'
  context.stroke()
  context.fill()
}

function stroke(obj, color) {
  context.beginPath()
  path(obj)
  context.strokeStyle = color
  context.stroke()
}

function rotate(elapsed) {
  now = d3.now()
  diff = now - lastTime
  if (diff < elapsed) {
    rotation = projection.rotate()
    rotation[0] += diff * degPerMs
    projection.rotate(rotation)
    render()
  }
  lastTime = now
}

function loadData(cb) {
  d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function(error, world) {
    if (error) throw error
    d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function(error, countries) {
      if (error) throw error
      cb(world, countries)
    })
  })

}

// https://github.com/d3/d3-polygon
function polygonContains(polygon, point) {
  var n = polygon.length
  var p = polygon[n - 1]
  var x = point[0], y = point[1]
  var x0 = p[0], y0 = p[1]
  var x1, y1
  var inside = false
  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1]
    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
    x0 = x1, y0 = y1
  }
  return inside
}

function mousemove() {
  var c = getCountry(this)
  // console.log(c)
  if (!c) {
    if (currentCountry) {
      leave(currentCountry)
      currentCountry = undefined
      colorCountry = 'gray'
      render()
    }
    return
  }
  if (c === currentCountry) {
    return
  }
  currentCountry = c
  
  var current_name = 'No Islands in Dataset';
  var num_islands = 0;
  var current_cpi = 'Not Available'
  var current_hom_rate = 'Not Available'
  var current_s_err = 'Not Available'

  console.log('indubitably')

  
  for (var j = 0; j < data.length; j++) {

    console.log('Salutations')

    console.log(currentCountry['Name'])
    console.log(data[j].Country)

    if (currentCountry['Name'] == data[j].Country){
      current_name = data[j].Country
      

      // We need to make sure that there are actually islands with this country.
      if (data[j].latitude) {
          num_islands = num_islands + 1
     
      }
      if (data[j].CPI_Score_2018 > 0) {

        current_cpi = data[j].CPI_Score_2018
        current_hom_rate = data[j].Homicide_Rate
        current_s_err = data[j].Standard_error
        
       
      }
      if (data[j].CPI_Score_2018) {

        colorCountry = 'lightgreen'


      }
      if (data[j].CPI_Score_2018 > 19.5) {

        colorCountry = 'yellow'


      }
      if (data[j].CPI_Score_2018 > 49.5) {

        colorCountry = 'darkred'


      }
      

      
    }

   
    }

  var info = d3.select("#globe-info")



  info.html(`<div class ='col-md-6'><center><ul><li><h3><strong>Name:</strong> ${current_name}</h3></li>
  <li><h3><strong>Country ID:</strong> ${currentCountry['id']}</h3></li>
  <li><h3><strong>Number of Islands:</strong> ${num_islands}</h3></li></center></div>
  <div class ='col-md-6'><ul>
  <center><li><h3><strong>Corruption Index 2018:</strong> ${current_cpi}</h3></li>
  <li><h3><strong>Homicide Rate:</strong> ${current_hom_rate}</h3></li>
  <li><h3><strong>Homicide Standard Error:</strong> ${current_s_err}</h3></li></center></div>`)


  // var ul = info.append('ul')
  // ul.append('li').html(`<h5>Country Name: ${current_name}</h5`)


  // var theDiv = info.getElementById("#globe-info");
  // var content = document.createTextNode(`<h5>Country Name: ${current_name}</h5`);
  // theDiv.append('ul').append('li').appendChild(content);

  // console.log(content)

  render()
  enter(c)
}


function getCountry(event) {
  var pos = projection.invert(d3.mouse(event))
  return countries.features.find(function(f) {
    return f.geometry.coordinates.find(function(c1) {
      return polygonContains(c1, pos) || c1.find(function(c2) {
        return polygonContains(c2, pos)
      })
    })
  })
}


//
// Initialization
//


setAngles()

canvas
  .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
   )
  .on('mousemove', mousemove)

loadData(function(world, cList) {
  land = topojson.feature(world, world.objects.land)
  countries = topojson.feature(world, world.objects.countries)
  console.log(countries)
  countryList = cList
  drawMarkers();
  window.addEventListener('resize', scale)
  scale()
  autorotate = d3.timer(rotate)
})

const center = [width/2, height/2];

function drawMarkers() {

  

  var points = data.map(({ longitude, latitude}) => [+longitude, +latitude])


  var pointsToMap = {
    type: "MultiPoint",
    coordinates: points,
    pointRadius: 10
  }

  context.beginPath();
  path(pointsToMap)
  context.fillStyle = 'blue'
  context.fill()
  context.stroke()
  ;




}
})
  ;
