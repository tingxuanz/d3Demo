var body = d3.select("body");

var numOfClickedBars = 0;
var selectedBarId = [];

var width = 400;
var height = 400;

var svg = body.append("svg")
	.attr("width",width)
	.attr("height",height);

var padding = {left:30, right:30, top:20, bottom:20};

var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

var xScale = d3.scale.ordinal()
	.domain(d3.range(dataset.length))
	.rangeRoundBands([0,width - padding.left - padding.right]);

var yScale = d3.scale.linear()
	.domain([0,d3.max(dataset)])
	.range([height - padding.top - padding.bottom,0]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left");

//var rectHeight = 25;
var rectPadding = 4;

var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("clicked", "false")
		.attr("id", function (d,i){
			return "component" + (i + 1);
		})
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		/*
		.on("mouseover",function(d,i){
			d3.select(this)
				.attr("fill","red");
		})
		*/
		.on("click",function(d,i){
			var clicked = this.getAttribute("clicked");
			var id = this.getAttribute("id");

			if (numOfClickedBars < 2) {
				if (clicked === "false") {
					d3.select(this)
						.attr("clicked", "true")
						.attr("fill", "red");
					numOfClickedBars = numOfClickedBars + 1;
					selectedBarId.push(id);
				}

				if (numOfClickedBars === 2) {
					console.log(numOfClickedBars);
				}
			} else {
				alert("Two components are chosen, please reset")
			}
		})
		/*
		.on("mouseout",function(d,i){
			d3.select(this)
				.transition()
		        .duration(500)
				.attr("fill","steelblue");
		})
		*/
		.attr("x",function(d,i){
			return xScale(i) + rectPadding/2;
		})
		.attr("width", xScale.rangeBand() - rectPadding)
		.attr("y", function(d){
			//var min = yScale.domain()[0];
			return yScale(d);
		})
		/*
		.attr("height", function(d){
			return 0;
		})
		.transition()
		.delay(function(d,i){
			return i * 300;
		})
		.duration(2000)
		.ease("bounce")
		.attr("y",function(d){
			return yScale(d);
		})
		*/
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d);
		})
		.attr("fill","steelblue");

/*
var texts = svg.selectAll(".MyText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class","MyText")
        .attr("transform","translate("+ padding.left + "," + padding.top +")")
        .attr("x", function(d,i){
            return xScale(i) + rectPadding/2;
        } )
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("dx",function(){
            return (xScale.rangeBand() - rectPadding)/2;
        })
        .attr("dy",function(d){
            return 20;
        })
        .text(function(d){
            return d;
        })
        .attr("y",function(d){
        	var min = yScale.domain()[0];
        	return yScale(min);
        })
        .transition()
        .delay(function(d,i){
        	return i * 300;
        })
        .duration(2000)
        .ease("bounce")
        .attr("y",function(d){
        	return yScale(d);
        });
*/
svg.append("g")
	.attr("class","axis")
	.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
	.call(xAxis);

svg.append("g")
	.attr("class","axis")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	.call(yAxis);
