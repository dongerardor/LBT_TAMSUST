var CIDADES = {
	"Belo Horizonte": {"circulo" : "bola_beloHorizonte", 	"v0" : "26", 	"v1" : "30", 	"perc": "15.5"	},
	"Brasília"		: {"circulo" : "bola_brasilia", 		"v0" : "83", 	"v1" : "92", 	"perc": "11"	},
	"Cuiabá"		: {"circulo" : "bola_cuiaba", 			"v0" : "6", 	"v1" : "12", 	"perc": "100"	},
	"Curitiba"		: {"circulo" : "bola_curitiba", 		"v0" : "29", 	"v1" : "32", 	"perc": "10.5"	},
	"Fortaleza"		: {"circulo" : "bola_fortaleza", 		"v0" : "28", 	"v1" : "33", 	"perc": "18"	},
	"Manaus"		: {"circulo" : "bola_manaus", 			"v0" : "13", 	"v1" : "15", 	"perc": "15.5"	},
	"Natal"			: {"circulo" : "bola_natal", 			"v0" : "9",	 	"v1" : "14", 	"perc": "55.5"	},
	"Porto Alegre"	: {"circulo" : "bola_portoAlegre", 		"v0" : "26", 	"v1" : "31", 	"perc": "19.5"	},
	"Recife"		: {"circulo" : "bola_recife", 			"v0" : "24", 	"v1" : "26", 	"perc": "8.5"	},
	"Rio de Janeiro": {"circulo" : "bola_rioDeJaneiro", 	"v0" : "94", 	"v1" : "108", 	"perc": "15"	},
	"Salvador"		: {"circulo" : "bola_salvador", 		"v0" : "27", 	"v1" : "33", 	"perc": "22"	},
	"São Paulo"		: {"circulo" : "bola_saoPaulo", 		"v0" : "211", 	"v1" : "225", 	"perc": "6.5"	}
};

var bolasPiscantes = true;
var timerBolasPiscantes;
var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

window.onload = function(){

	setTimeout(function(){
		showMapa();
	},2000);

	function showMapa(){

		if (iOS){
			d3.selectAll("#bolinhas g").style("opacity", 1);
			d3.selectAll(".circulo").style("opacity", .7);
		}else{

			/* animação inicial bolinhas */
			var qBolinhas = $("#bolinhas g").length;
			var iBolinhas = 0;
			var qCirculos = $(".circulo").length;
			var iCirculos = 0;
		
			$("#mapaPainelDados").hide();
			$(".labelsCirculos").hide();

			d3.selectAll("#bolinhas g")
			.attr("opacity", 0)
			.attr("transform", "translate(-1500,-1500) scale(5)");

			var bolinhas = d3.selectAll("#bolinhas g").transition(),
				delayBolinhas = function(d, i){
					return i* 200;
				}

			bolinhas.style("opacity", 1)
				.attr("transform", "translate(0,0) scale(1)")
				.ease("bounce")
				.duration(1000)
				.delay(delayBolinhas)
				.each("end", function(){
					++iBolinhas;
					if (iBolinhas >= qBolinhas){
						d3.selectAll(".circulo")
						.transition()
						.duration(750)
						.delay(function(d, i) { return i * 200; } )
						.style( "opacity", .7 )
						.each("end", function(){
							++iCirculos;
							if (iCirculos >= qCirculos){
								timerBolasPiscantes = setInterval(startBolasPiscantes, 5000);
							}
						});
					}
				});

			function startBolasPiscantes(){
				if (!bolasPiscantes){ 
					stopBolasPiscantes();
					return;
				}
				var piscantes = d3.selectAll(".circulo")
					.transition()
					.duration(100)
					.delay(function(d, i) { return i * 100; } )
					.style( "opacity", .3 )
					.each("end", function() { 
					    d3.select(this)
					    .transition()
					    .style( "opacity", .7 );
					});
			}

			function stopBolasPiscantes(){
				clearInterval(timerBolasPiscantes);
			}
		}


	  	
		$(".circulo").mouseover(function(evt, i){

			bolasPiscantes = false;

			var cidade = {};
			for (var cid in CIDADES){
				if (CIDADES[cid].circulo == this.id){
					cidade = CIDADES[cid];
					cidade.nome = cid;
				}
			}
			// var textCidade = cidade.nome + " increases " + cidade.perc + "% the average of flights";
			var textCidade = cidade.nome + " increases flights by " + cidade.perc + "%";

			$("#mapaPainelDados").find("h5").text(textCidade);

			$("#mapaPainelDados").fadeIn("fast", function(){

				var arrData = [Number(cidade.v0), Number(cidade.v1)],
					canvasWidth = $("#miniGraficoPainel").width(),
					canvasHeight = $("#miniGraficoPainel").height(),
					barHeight = 10,
					barMargin = 10;

				var widthScale = d3.scale.linear()
					.domain([0, d3.max(arrData)])
					.range([0, canvasWidth-80]);

				var axis = d3.svg.axis()
					.ticks(5)
					.scale(widthScale);

				var canvas = d3.select("#miniGraficoPainel")
					.append("g");

				var bars = canvas.selectAll("rect")
					.data(arrData)
					.enter()
					.append("g")
					.attr("transform", function(d, i) {
						return "translate(0," + (10 + i * (barHeight + barMargin)) + ")";
					});

				if(iOS){
					bars.append("path")
						.attr("fill", function (d, i){ 
							return i%2==0?"#A7A9AC":"#006fac";
						})
						.attr("d", function(d, i){

					    	var node1 = {"x": 0, 										"y": 	barHeight };
					    	var node2 = {"x": i==1? widthScale(d):widthScale(d) + 5,	"y": 	barHeight };
					    	var node3 = {"x": i==0? widthScale(d):widthScale(d) + 5, 	"y": 	0 };
					    	var node4 = {"x": 0,	 				"y": 	0 };

					    	i==0?height - scaleY(d):height - scaleY(d)+10

					        var attrs = "M" 	+ node1.x + ", " + node1.y;
					        attrs += 	" L" 	+ node2.x + ", " + node2.y;
					        attrs += 	" L" 	+ node3.x + ", " + node3.y;
					        attrs += 	" L" 	+ node4.x + ", " + node4.y;
					        attrs += 	" z";

						        return attrs;
						});
				}else{

					bars.append("path")
						.attr("d", function(d, i){

					    	var node1 = {"x": 0, 	"y": barHeight };
					    	var node2 = {"x": 0, 	"y": barHeight };
					    	var node3 = {"x": 0, 	"y": 0 };
					    	var node4 = {"x": 0,	"y": 0 };

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
						.duration(500)
						.attr("d", function(d, i){

					    	var node1 = {"x": 0, 										"y": 	barHeight };
					    	var node2 = {"x": i==1? widthScale(d):widthScale(d) + 5,	"y": 	barHeight };
					    	var node3 = {"x": i==0? widthScale(d):widthScale(d) + 5, 	"y": 	0 };
					    	var node4 = {"x": 0,	 				"y": 	0 };

					    	i==0?height - scaleY(d):height - scaleY(d)+10

					        var attrs = "M" 	+ node1.x + ", " + node1.y;
					        attrs += 	" L" 	+ node2.x + ", " + node2.y;
					        attrs += 	" L" 	+ node3.x + ", " + node3.y;
					        attrs += 	" L" 	+ node4.x + ", " + node4.y;
					        attrs += 	" z";

						        return attrs;
						});
				}

				bars.append("text")
				    .attr("x", function(d) { return widthScale(d) + 10; })
				    .attr("y", barHeight / 3)
				    .attr("dy", ".35em")
				    .text(function(d) { return d + " flights"; });
			});

			// labelCirculos_ show
			var id_labelCirculo = "labelCirculos_" + this.id.split("bola_")[1];
			$("#" + id_labelCirculo).fadeIn();

		});

		$(".circulo").mouseout(function(evt, i){
			$(".labelsCirculos").hide();
			$("#mapaPainelDados").fadeIn().stop(true, true);
			$("#mapaPainelDados").fadeOut("", function(){
				$("#mapaPainelDados g").remove();
			});
		})
	}
}