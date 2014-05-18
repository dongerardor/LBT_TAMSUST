var status = 0;

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
		status = status == 0?1:0;
		switchStatus();
	})
}

function switchStatus(){
	var imgsSwitch = ["images/btn_switch_OFF.png", "images/btn_switch_ON.png"];
	$("#switch").attr("src", imgsSwitch[status]);

	if (status==1){
		$("img#plantas").attr("src", "images/secao2_ON.png");
		$("#secao1_ON").css("visibility", "hidden");
		$("#secao1_OFF").css("top", 80);
		$("#legendaGraficoEmissoes").css("top", 66);
		$("#legendaGraficoPlantas").css("top", 320);
		$("#txtPasso2").css("top", 235);
		$("#txtValoresCarbonoWrapper").css("top", 87);
		$("#verMais").show();
		$(".nomeCidade").hide();
		$("#bolinhasWrapper img").each(function(i, bola){
			$(bola).css("left", moveBolinhas($(bola).attr("id")));
		});
		$("#txtVoosWrapper p").each(function(i, numero){
			$(numero).css("left", moveNumerosVoos($(numero).attr("id")));
		});

	}else{
		$("img#plantas").attr("src", "images/secao2_OFF.png");
		$("#secao1_ON").css("visibility", "visible");
		$("#secao1_OFF").css("top", 275);
		$("#legendaGraficoEmissoes").css("top", 248);
		$("#legendaGraficoPlantas").css("top", 468);
		$("#txtPasso2").css("top", 420);
		$("#txtValoresCarbonoWrapper").css("top", 280);
		$("#verMais").hide();
		$(".nomeCidade").show();
		$("#bolinhasWrapper img").each(function(i, bola){
			$(bola).css("left", moveBolinhas($(bola).attr("id")));
		});
		$("#txtVoosWrapper p").each(function(i, numero){
			$(numero).css("left", moveNumerosVoos($(numero).attr("id")));
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
	console.log(idNumero);
	var prefix = idNumero.split("_")[1];
	for (var i=0; i<CIDADES.length; i++){
		if (prefix == CIDADES[i].prefix){
			return status == 1?CIDADES[i].numVoosOFF:CIDADES[i].numVoosON;
		}
	}
}