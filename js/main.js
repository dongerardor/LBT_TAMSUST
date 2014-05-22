var status = 0;

var CIDADES = [
{"nome": "São Paulo", 		"prefix": "saopaulo", 		"abbr": "SP",	"bolaON": 320,	"bolaOFF": 159, "numVoosON": 302, "numVoosOFF": 141},
{"nome": "Brasília", 		"prefix": "brasilia", 		"abbr": "DF",	"bolaON": 353,	"bolaOFF": 318, "numVoosON": 335, "numVoosOFF": 300},
{"nome": "Rio de Janeiro", 	"prefix": "riodejaneiro", 	"abbr": "RJ",	"bolaON": 384,	"bolaOFF": 447, "numVoosON": 365, "numVoosOFF": 430},
{"nome": "Fortaleza", 		"prefix": "fortaleza", 		"abbr": "CE",	"bolaON": 411,	"bolaOFF": 530, "numVoosON": 393, "numVoosOFF": 515},
{"nome": "Belo Horizonte", 	"prefix": "belohorizonte", 	"abbr": "MG",	"bolaON": 438,	"bolaOFF": 582, "numVoosON": 420, "numVoosOFF": 564},
{"nome": "Salvador", 		"prefix": "salvador", 		"abbr": "BA",	"bolaON": 465,	"bolaOFF": 626, "numVoosON": 446, "numVoosOFF": 609},
{"nome": "Recife", 			"prefix": "recife", 		"abbr": "PE",	"bolaON": 491,	"bolaOFF": 677, "numVoosON": 471, "numVoosOFF": 659},
{"nome": "Porto Alegre", 	"prefix": "portoalegre", 	"abbr": "RS",	"bolaON": 517,	"bolaOFF": 723, "numVoosON": 498, "numVoosOFF": 705},
{"nome": "Curitiba", 		"prefix": "curitiba", 		"abbr": "PA",	"bolaON": 543,	"bolaOFF": 755, "numVoosON": 523, "numVoosOFF": 737},
{"nome": "Manaus", 			"prefix": "manaus", 		"abbr": "AM",	"bolaON": 569,	"bolaOFF": 788, "numVoosON": 551, "numVoosOFF": 771},
{"nome": "Natal", 			"prefix": "natal", 			"abbr": "RN",	"bolaON": 595,	"bolaOFF": 826, "numVoosON": 576, "numVoosOFF": 809},
{"nome": "Cuiabá", 			"prefix": "cuiaba", 		"abbr": "MT",	"bolaON": 621,	"bolaOFF": 858, "numVoosON": 602, "numVoosOFF": 839}];

window.onload=function(){

	$(".bolinhas").each(function(i, bola){
		var posXbolaInit = function(){
			for (var i in CIDADES){
				if (CIDADES[i].prefix == bola.id.split("_")[1]){
					return CIDADES[i].bolaOFF;
				}
			}
		}();

		$(bola).css({
	      "top"		: -500,
	      "left"	: posXbolaInit,
	      "height"	: 100,
	      "width"	: 100
    	});
	});

	$("div.titulos").css("display", "block").animate ({ opacity: 1 }, 2000, function(){
		var animacaoBolinhasComplete = 0;
		$(".bolinhas").each(function(i, bola){
			var posXbola = function(){
				for (i in CIDADES){
					if (CIDADES[i].prefix == bola.id.split("_")[1]){
						return CIDADES[i].bolaON;
					}
				}
			}();
			$(bola).delay(Math.round(Math.random()*2000)).animate ({ 
				opacity: 1,
				top: 0,
				left: posXbola,
				width: 22,
				height: 22
			}, 1000, 'easeOutBounce', function(){
				animacaoBolinhasComplete++;
				if (animacaoBolinhasComplete >= 12){
					continueAnimation1();
				}
			})
		});
	});

	function continueAnimation1(){
		$("img#secao1_ON").fadeIn("fast", function(){
			//$("img#secao1_ON").fadeIn();
			$("#txtPasso1").fadeIn("fast", function(){
				$("#txtVoosWrapper").fadeIn();
				$("#txtNomesCidadesWrapper").fadeIn();
				$("#legendaGraficoVoos").fadeIn();
				$("#txtVoosWrapper").fadeIn();
			}).delay(500, function(){
				$("#txtValoresCarbonoWrapper").fadeIn();
				$("#legendaGraficoEmissoes").fadeIn();
				$("#txtValoresCarbonoWrapper").fadeIn()
				.delay(500, function(){
					$("#txtPasso2").fadeIn();
					$("#peSecao2").fadeIn();
					$("#plantas").fadeIn();
					$("#legendaGraficoPlantas").fadeIn();
					$(".txt_rodape").fadeIn()
					.delay(500, function(){
						$("#aviao").animate({ 
							left:22,
							opacity: 1
						}, 500, function(){
							$("#switchWrapper").delay(500).fadeIn("slow", function(){
								init();
							});
						});
					});
				});
			});
		});
		
	}
}; //fim onload


function init(){
	initPainelRodape();
	initSwitch();
	initTooltips();
}

function initPainelRodape(){

	$(".icones").click(function(evt){
		if ($(this).hasClass("selected")){
			$(".icones").removeClass("selected");
			$(".painel_rodape").css("display", "none");
		}else{
			$(".icones").removeClass("selected");
			$(this).addClass("selected");
			$(".painel_rodape").css("display", "none");
			$(".painel_rodape#" +  $(this).attr("id")).fadeIn();
		}
	});

	$(".painel_rodape").click(function(evt){
		$(".icones").removeClass("selected");
		$(".painel_rodape").css("display", "none");
	})
}

function initSwitch(){
	$("#switch, #plantas").click(function(evt){
		status = status == 0?1:0;
		switchStatus();
	})
}

function switchStatus(){
	var imgsSwitch = ["images/btn_switch_OFF.png", "images/btn_switch_ON.png"];
	$("#switch").attr("src", imgsSwitch[status]);

	if (status==1){

		$("#legendaGraficoPlantas").stop();
		$("img#plantas").stop();
		$("#txtPasso2").stop();
		$("#secao1_OFF").stop();
		$("#secao1_ON").stop();
		$("#legendaGraficoEmissoes").stop();
		$("#bolinhasWrapper img").stop();
		$("#txtVoosWrapper p").stop();


		$( "#secao1_OFF" ).css("opacity", 0).css("display", "block").animate({
		    opacity: 1
		}, 500, function() {
		    $(this).animate								({ top: 80 })
		    $("#secao1_ON").animate						({ opacity: 0 })
		    $(".nomeCidade").animate					({ opacity: 0 })
		    $("#legendaGraficoEmissoes").animate		({ top: 66 })
		    $("#bolinhasWrapper img").each(function(i, bola){
				$(bola).animate							({ left: moveBolinhas($(bola).attr("id")) })
			});
			$("#txtVoosWrapper p").each(function(i, numero){
				$(numero).animate						({ left: moveNumerosVoos($(numero).attr("id")) })
			});
			///
			$("#txtValoresCarbonoWrapper").css("top", 87);

			//passo 2
			$("#txtPasso2").delay(500).animate			({ top: 235 }, 500, function(){

				//SEÇÃO 2
				$("img#plantas").attr("src", "images/secao2_ON.png");

				$("img#plantas").css("opacity", 0)
				.attr("src", "images/secao2_ON_" + lang + ".png")
				.animate								({ opacity: 1 }, 500, function(){
					$("#legendaGraficoPlantas").animate	({ top: 320 });
				});
			});
		});

	}else{

		$("#legendaGraficoPlantas").stop();
		$("img#plantas").stop();
		$("#txtPasso2").stop();
		$("#secao1_OFF").stop();
		$("#secao1_ON").stop();
		$("#legendaGraficoEmissoes").stop();
		$("#bolinhasWrapper img").stop();
		$("#txtVoosWrapper p").stop();


		$("#legendaGraficoPlantas").animate						({ top: 468 
		}, 100, function(){
			$("img#plantas").css("opacity", 0)
				.attr("src", "images/secao2_OFF.png")
				.animate										({ opacity: 1 })

				//passo 2
			$("#txtPasso2").animate								({ top: 420 }, 500, function(){
				$("#txtValoresCarbonoWrapper").css("top", 280);//			({ top: 380 });
				$( "#secao1_OFF" ).animate						({ top: 275 });
				$( "#secao1_OFF" ).delay(500).animate			({ opacity: 0 });
				$("#secao1_ON").animate							({ opacity: 1 });
				$(".nomeCidade").animate						({ opacity: 1 });
				$("#legendaGraficoEmissoes").animate			({ top: 248 })
				$("#bolinhasWrapper img").each(function(i, bola){
					$(bola).animate								({ left: moveBolinhas($(bola).attr("id")) })
				});
				$("#txtVoosWrapper p").each(function(i, numero){
					$(numero).animate							({ left: moveNumerosVoos($(numero).attr("id")) })
				});
			});
		});
	}
}



function moveBolinhas(idBola){
	var prefix = idBola.split("_")[1];
	for (var i=0; i<CIDADES.length; i++){
		if (prefix == CIDADES[i].prefix){
			return status == 1?CIDADES[i].bolaOFF:CIDADES[i].bolaON;
		}
	}
}
function moveNumerosVoos(idNumero){
	var prefix = idNumero.split("_")[1];
	for (var i=0; i<CIDADES.length; i++){
		if (prefix == CIDADES[i].prefix){
			return status == 1?CIDADES[i].numVoosOFF:CIDADES[i].numVoosON;
		}
	}
}

function initTooltips(){
	$(".bolinhas").mouseover(function(evt){	
		if (status==1){	
			var cidadePrefix = $(this).attr("id").split("_")[1];
			var tooltipLeft = $(this).css("left").split("px")[0] - 70;
			$("#tooltip_" +  cidadePrefix).css({
				left: tooltipLeft,
				display: "block"
			});
		}
	}).mouseout(function(evt){
		$(".tooltip").css("display", "none");
	});
}