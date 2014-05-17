var status = 0;

var CIDADES = [
{"nome": "São Paulo", 		"id": "cidade_saopaulo", 		"abbr": "SP"},
{"nome": "Brasília", 		"id": "cidade_brasilia", 		"abbr": "DF"},
{"nome": "Rio de Janeiro", 	"id": "cidade_riodejaneiro", 	"abbr": "RJ"},
{"nome": "Fortaleza", 		"id": "cidade_fortaleza", 		"abbr": "CE"},
{"nome": "Belo Horizonte", 	"id": "cidade_belohorizonte", 	"abbr": "MG"},
{"nome": "Salvador", 		"id": "cidade_salvador", 		"abbr": "BA"},
{"nome": "Recife", 			"id": "cidade_recife", 			"abbr": "PE"},
{"nome": "Porto Alegre", 	"id": "cidade_portoalegre", 	"abbr": "RS"},
{"nome": "Curitiba", 		"id": "cidade_curitiba", 		"abbr": "PA"},
{"nome": "Manaus", 			"id": "cidade_manaus", 			"abbr": "AM"},
{"nome": "Natal", 			"id": "cidade_natal", 			"abbr": "RN"},
{"nome": "Cuiabá", 			"id": "cidade_cuiaba", 			"abbr": "MT"}];

window.onload=function(){
	init();
	initPainelRodape();
	initSwitch();

}; //fim onload


function init(){
	$("#legendaGraficoPlantas").hide();
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
		$("#grafico1").attr("transform", "scale(1, .4)");
		$("#legendaGraficoEmissoes").css("top", 102);
		$("div#txtNomesCidadesWrapper").css("top", 75);
		$("#legendaGraficoPlantas").show();
		$("#txtPasso2").css("top", 270);
		$("#txtValoresCarbonoWrapper").css("top", 145);
		$("#titulo").css("height", 75).addClass("short");
		$("#verMais").show();

		$(".nomeCidade").each(function(i){
			var objCidade;
			for (i=0; i<=CIDADES.length; i++){
				if (CIDADES[i]["id"] == $(this).attr("id")){
					objCidade = CIDADES[i];
					$(this).text(objCidade["abbr"]);
					return;
				}
			}
		});

	}else{
		$("img#plantas").attr("src", "images/secao2_OFF.png");
		$("#grafico1").attr("transform", "scale(1, 1)");
		$("#legendaGraficoEmissoes").css("top", 248);
		$("div#txtNomesCidadesWrapper").css("top", 130);
		$("#legendaGraficoPlantas").hide();
		$("#txtPasso2").css("top", 410);
		$("#txtValoresCarbonoWrapper").css("top", 280);
		$("#titulo").css("height", 270).removeClass("short");
		$("#verMais").hide();

		$(".nomeCidade").each(function(i){
			var objCidade;
			for (i=0; i<=CIDADES.length; i++){
				if (CIDADES[i]["id"] == $(this).attr("id")){
					objCidade = CIDADES[i];
					$(this).text(objCidade["nome"]);
					return;
				}
			}
		});
	}
}