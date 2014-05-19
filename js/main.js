var status = 0;
var transition = false;

var CIDADES = [
{"nome": "São Paulo", 		"prefix": "saopaulo", 		"abbr": "SP",	"bolaON": 320,	"bolaOFF": 159, "numVoosON": 302, "numVoosOFF": 141},
{"nome": "Brasília", 		"prefix": "brasilia", 		"abbr": "DF",	"bolaON": 353,	"bolaOFF": 318, "numVoosON": 335, "numVoosOFF": 300},
{"nome": "Rio de Janeiro", 	"prefix": "riodejaneiro", 	"abbr": "RJ",	"bolaON": 384,	"bolaOFF": 447, "numVoosON": 365, "numVoosOFF": 430},
{"nome": "Fortaleza", 		"prefix": "fortaleza", 		"abbr": "CE",	"bolaON": 411,	"bolaOFF": 536, "numVoosON": 393, "numVoosOFF": 519},
{"nome": "Belo Horizonte", 	"prefix": "belohorizonte", 	"abbr": "MG",	"bolaON": 438,	"bolaOFF": 582, "numVoosON": 420, "numVoosOFF": 564},
{"nome": "Salvador", 		"prefix": "salvador", 		"abbr": "BA",	"bolaON": 465,	"bolaOFF": 626, "numVoosON": 446, "numVoosOFF": 609},
{"nome": "Recife", 			"prefix": "recife", 		"abbr": "PE",	"bolaON": 491,	"bolaOFF": 677, "numVoosON": 471, "numVoosOFF": 659},
{"nome": "Porto Alegre", 	"prefix": "portoalegre", 	"abbr": "RS",	"bolaON": 517,	"bolaOFF": 723, "numVoosON": 498, "numVoosOFF": 705},
{"nome": "Curitiba", 		"prefix": "curitiba", 		"abbr": "PA",	"bolaON": 543,	"bolaOFF": 755, "numVoosON": 523, "numVoosOFF": 737},
{"nome": "Manaus", 			"prefix": "manaus", 		"abbr": "AM",	"bolaON": 569,	"bolaOFF": 788, "numVoosON": 551, "numVoosOFF": 771},
{"nome": "Natal", 			"prefix": "natal", 			"abbr": "RN",	"bolaON": 595,	"bolaOFF": 826, "numVoosON": 576, "numVoosOFF": 809},
{"nome": "Cuiabá", 			"prefix": "cuiaba", 		"abbr": "MT",	"bolaON": 621,	"bolaOFF": 858, "numVoosON": 602, "numVoosOFF": 839}];

window.onload=function(){
	init();
	initPainelRodape();
	initSwitch();

}; //fim onload


function init(){
	//$("#legendaGraficoPlantas").hide();
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

	$("img#verMais").click(function (evt) {
		status = status == 0?1:0;
		switchStatus();
	});
	$("#switch").click(function(evt){
		if (!transition){
			status = status == 0?1:0;
			switchStatus();
		}
	})
}

function switchStatus(){
	transition = true;
	var imgsSwitch = ["images/btn_switch_OFF.png", "images/btn_switch_ON.png"];
	$("#switch").attr("src", imgsSwitch[status]);

	if (status==1){

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
			$("#txtValoresCarbonoWrapper").animate		({ top: 87 });

			//passo 2
			$("#txtPasso2").delay(500).animate			({ top: 235 }, 500, function(){

				//SEÇÃO 2
				//$("img#plantas").attr("src", "images/secao2_ON.png");
				$("img#plantas").css("opacity", 0)
				.attr("src", "images/secao2_ON.png")
				.animate								({ opacity: 1 });

				$("#legendaGraficoPlantas").animate		({ top: 320 });
				$("#txtValoresCarbonoWrapper").animate	({ top: 87 }, 500, function(){
					transition = false;
				});
			});
		});

	}else{

		$("#legendaGraficoPlantas").animate		({ top:     468 
		}, 500, function(){
			$("img#plantas").css("opacity", 0)
				.attr("src", "images/secao2_OFF.png")
				.animate								({ opacity: 1 })

				//passo 2
			$("#txtPasso2").animate								({ top: 420 }, 500, function(){
				$("#txtValoresCarbonoWrapper").animate			({ top: 280 });
				$( "#secao1_OFF" ).animate						({ top: 275 });
				$( "#secao1_OFF" ).delay(500).animate			({ opacity: 0 }, function(){ transition = false; });
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