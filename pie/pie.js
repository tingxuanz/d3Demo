var dataset = [30,10,43,55,13];

var width = 400;
var height = 400;

var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);


var pie = d3.layout.pie();
var piedata = pie(dataset);

var outerRadius = 150;
var innerRadius = 0;

var arc = d3.svg.arc()
	.innerRadius(innerRadius)
	.outerRadius(outerRadius);

var arcs = svg.selectAll("g")
	.data(piedata)
	.enter()
	.append("g")
	.attr("transform","translate("+ (width/2) +","+ (width/2) +")");

var color = d3.scale.category10();

arcs.append("path")
	.attr("fill",function(d,i){
		return color(i);
	})
	.attr("d",function(d){
		return arc(d);
	});

arcs.append("text")
	.attr("transform",function(d){
		return "translate(" + arc.centroid(d) + ")";
	})
	.attr("text-anchor","middle")
	.text(function(d){
		return d.data;
	});