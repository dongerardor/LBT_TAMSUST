var arrCIDADES = [
	{"cidade" : "Belo Horizonte", "circulo" : "bola_beloHorizonte", 	"v0" : "26", 	"v1" : "30", 	"perc": "15.5"	},
	{"cidade" : "Brasília"		, "circulo" : "bola_brasilia", 			"v0" : "83", 	"v1" : "92", 	"perc": "11"	},
	{"cidade" : "Cuiabá"		, "circulo" : "bola_cuiaba", 			"v0" : "6", 	"v1" : "12", 	"perc": "100"	},
	{"cidade" : "Curitiba"		, "circulo" : "bola_curitiba", 			"v0" : "29", 	"v1" : "32", 	"perc": "10.5"	},
	{"cidade" : "Fortaleza"		, "circulo" : "bola_fortaleza", 		"v0" : "28", 	"v1" : "33", 	"perc": "18"	},
	{"cidade" : "Manaus"		, "circulo" : "bola_manaus", 			"v0" : "13", 	"v1" : "15", 	"perc": "15.5"	},
	{"cidade" : "Natal"			, "circulo" : "bola_natal", 			"v0" : "9",	 	"v1" : "14", 	"perc": "55.5"	},
	{"cidade" : "Porto Alegre"	, "circulo" : "bola_portoAlegre", 		"v0" : "26", 	"v1" : "31", 	"perc": "19.5"	},
	{"cidade" : "Recife"		, "circulo" : "bola_recife", 			"v0" : "24", 	"v1" : "26", 	"perc": "8.5"	},
	{"cidade" : "Rio de Janeiro", "circulo" : "bola_rioDeJaneiro", 		"v0" : "94", 	"v1" : "108", 	"perc": "15"	},
	{"cidade" : "Salvador"		, "circulo" : "bola_salvador", 			"v0" : "27", 	"v1" : "33", 	"perc": "22"	},
	{"cidade" : "São Paulo"		, "circulo" : "bola_saoPaulo", 			"v0" : "211", 	"v1" : "225", 	"perc": "6.5"	}
];

var barWidth 			= 8, 
	gap 				= 3,
	gapBetweenGroups 	= 28,
    margin 				= {top: 15, bottom: 125, left: 20, right: 20},
	width  				= $("#graficoBarrasWrapper").width() - margin.left - margin.right,
    height 				= $("#graficoBarrasWrapper").height() - margin.top - margin.bottom,
	dados 				= arrCIDADES;


var scaleY = d3.scale.linear()
	.domain([0, 250])
	.range([0, height]);

var yAxis = d3.svg.axis()
		.scale(scaleY)
		.orient("left");



function setupGraficoBarras(){

	$("#numeralia").css("visibility", "visible");
	$("#referenciasGraficoVoos").css("display", "block");

	arrCIDADES = arrCIDADES.sort(function(a, b) {
		return +a.v1 < +b.v1 ? -1 : +a.v1 > +b.v1 ? 1 : 0; 
	});

	var canvas = d3.select("svg#graficoBarras")
		.append("g")
		.attr("transform", "translate (" + margin.left + ", " + margin.top + ")")

	var series = canvas.selectAll('g.series')
	    .data(dados)
	    .enter()
	    .append('g')
	    .attr('class', 'series')
	    .attr("transform", function(d, i) {
					return "translate(" + (10 + i * (barWidth + gapBetweenGroups)) + ", 0)";
				});


	series.each(function(d, index){

		var arrDadosRects = [Number(d.v0), Number(d.v1)];
	 	
		var groupRects = d3.select(this).append('g');

			groupRects.selectAll("path")
				.data(arrDadosRects)
				.enter()
				.append('path')
			    .attr("d", function(d, i){

			    	var desp = i==0?0:barWidth+gap;

			    	var node1 = {"x": desp, 				"y": 	height };
			    	var node2 = {"x": desp + barWidth, 		"y": 	height };
			    	var node3 = {"x": desp + barWidth, 		"y": 	height };
			    	var node4 = {"x": desp,	 				"y": 	height };

			        var attrs = "M" 	+ node1.x + ", " + node1.y;
			        attrs += 	" L" 	+ node2.x + ", " + node2.y;
			        attrs += 	" L" 	+ node3.x + ", " + node3.y;
			        attrs += 	" L" 	+ node4.x + ", " + node4.y;
			        attrs += 	" z";

			        return attrs;
			    })
				.attr("fill", function (d, i){ 
				return i%2==0?"#A7A9AC":"#006fac";
			})
			.transition()
			.duration(1000)
			.delay(function(){
				return 50 * index;
			})
			.attr("d", function(d, i){

				var desp = i==0?0:barWidth+gap;

		    	var node1 = {"x": desp, 				"y": 	height };
		    	var node2 = {"x": desp + barWidth, 		"y": 	height };
		    	var node3 = {"x": desp + barWidth, 		"y": 	i==0?height - scaleY(d):height - scaleY(d)+5 };
		    	var node4 = {"x": desp,	 				"y": 	i==1?height - scaleY(d):height - scaleY(d)+5 };

		        var attrs = "M" 	+ node1.x + ", " + node1.y;
		        attrs += 	" L" 	+ node2.x + ", " + node2.y;
		        attrs += 	" L" 	+ node3.x + ", " + node3.y;
		        attrs += 	" L" 	+ node4.x + ", " + node4.y;
		        attrs += 	" z";

			        return attrs;
			});


			/* textos */
			groupRects.selectAll("text")
				.data(arrDadosRects)
				.enter()
				.append('text')
				.attr('class', 'series')
				.attr("fill-opacity", 0)
				.attr('y', function(d, i){
					var textY = i%2 == 0?height - scaleY(d) - margin.top - 15:height - scaleY(d) - margin.top - 2;
					return textY;
				})
				.attr('x', function(d, i){
					var textX = i%2 == 0?-25:-5;
					return textX;
				})
			.attr ("text-anchor", "rigth")
				.text(function(d){
					return String(d);
				})
				.attr("transform", function(d, i) {
					var textY = i%2 ==0?height - scaleY(d) - margin.top - 20:height - scaleY(d) - margin.top - 10;
					var textX = i%2 ==0?0:barWidth+gap;
					var textRotation = -90;
	        	return "rotate(-90, " + textX + ", " + textY + ")"; 
	        })
			.transition()
			.duration(500)
				.delay(function(){
				return 200 * index;
			})
			.attr("fill-opacity", 1);
	});


	var scaleX = d3.scale.ordinal()
	    .domain(dados.map(function(d) {
	    	return d["cidade"];
	    }))
	    .rangeRoundBands([0, width]);

	var xAxis = d3.svg.axis()
		.scale(scaleX)
		.orient("bottom");

	canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(xAxis)
	    .selectAll("text")  
           .style("text-anchor", "end")
           .attr("transform", function(d) {
               return "rotate(-90, 0, 0)" 
			})
           .attr("dx", "35")
           .attr("dy", "-8")
           .attr("x", "-50")
			.text(function(d, i){
				return d;
			})

}