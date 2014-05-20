tooltips

activación en la imagen del pie

animación inicial




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
