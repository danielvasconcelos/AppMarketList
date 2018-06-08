

// Função inicial ao carregar a pagina
$(document).ready(function(){

	mostrar();
	item = 0;
	totalGeral = 0;
	a = "";
	
});

// pega o id do item e grava na variavel item
function enviaItem(id){
	item = id;
}

// função que cria um elemento na lista
function listaItens(){
	
	item ++;
	
	descricao = document.getElementById('descitem').value;

	// valida se o campo input esta com conteudo
	if (descricao == '') {
		
	}else{

					var tr = '';
        			tr+= '<tr>';
        			tr+= '<td><div class=" ui-checkbox"><input type="checkbox" id="'+item+'" name="checkbox-0" value="" onClick="verificaCheck(this);" style="margin-top: 10px;"></div></td>';
        			tr+= '<td><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">';
        			tr+= '<input type="text" id="desc'+item+'" value="'+descricao+'" style="height: 8px; padding-bottom: 0px;"></div></td>';
        			tr+= '<td>';
        			tr+= '<fieldset id="teste3" data-role="controlgroup" data-type="horizontal" data-mini="true">';
					tr+= '<select id="qtd'+item+'" name="select-custom-14" role="button" id="select-custom-14-button" aria-haspopup="true" onClick="alteraQtd(id);" ';
					tr+= 'class=" teste4 ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow ui-first-child ui-last-child" >';
					tr+= '<option value="1" selected="selected">1</option>';
					tr+= '<option value="2">2</option>';
					tr+= '<option value="3">3</option>';
					tr+= '<option value="4">4</option>';
					tr+= '<option value="5">5</option>';
					tr+= '<option value="6">6</option>';
					tr+= '<option value="7">7</option>';
					tr+= '<option value="8">8</option>';
					tr+= '<option value="9">9</option>';
					tr+= '<option value="10">10</option>';
					tr+= '<option value="11">11</option>';
					tr+= '<option value="12">12</option>';
					tr+= '<option value="13">13</option>';
					tr+= '<option value="14">14</option>';
					tr+= '<option value="15">15</option>';
					tr+= '</select>';
					tr+= '</fieldset>';
        			tr+= '</td>';
        			tr+= '<td>';
        			tr+= '<button class=" deletar ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete" onclick="deletaItem('+item+');" ></button>';
        			tr+= '</td>';
        			tr+= '</tr>';


	// insere o codigo da variavel tr dentro do #td-body
	$('#tb-body').append(tr);

	var qtd = document.getElementById("qtd"+item+"").value;

	// chama a função salvar no banco de dados enviando item e qtd
	salvar(item,qtd);
	
	// apaga o conteudo do input descitem
	document.getElementById('descitem').value = '';

	}
	
}


// funcao que habilita deslize do menu esquerdo
$(document).on("pagecreate", "body", function(){

	$(document).on("swipeleft swiperight", "body", function (e) {

		if ($(".ui-page-active").jqmData("panel") !== "open") {
			if (e.type === "swiperight") {
				$("#outside").panel("open");
			}
		}
	});
});
//////////////////////////////// fim função deslize menu esquerdo


// função que atualiza a quantidade do item
function alteraQtd(idItem){

			// retira a palavra qtd do id para ficar somente a quantidade
			idQtd = idItem.replace("qtd", "");
			
			// Verifica se o conteudo do select foi alterado (qtd)
			var menu_dropdown = document.getElementById("qtd"+idQtd+"");
			
			menu_dropdown.addEventListener("change", function(){
				// Como este código é executado após cada alteração, sempre obtemos o valor atualizado:
				var valor_selecionado = menu_dropdown.options[menu_dropdown.selectedIndex].value;
				
				// atualiza a quantidade do item
				updateQtd(idQtd, valor_selecionado);

			});

}


// chama a função quando o checkbox é clicado, passando o objeto
function verificaCheck(a){

	// objeto passado "a" . id/class/value etc...
	// item recebe o valor do objeto check, para saber qual item foi selecionado
	item = a.id;

	// executa caso o checkbox seja selecionado true
	if (a.checked){
  				
  		telaValor(a.checked);
							 
  	}	

  	// caso o check seja desabilitado
  	else {
		
		// atualiza se o item não esta checkado false
		updateCheckFalse(item, a.checked);

	}

}							


// chama essa função quando um item é checkado, e exibe a tela valor do item
function telaValor(ItemTrue){

		// cria um popup para inserir o valor do item
		var telapreco = '<form name="form" >' 
				+	'<div style="padding:10px 20px;">'
				+ '<div class="ui-input-text ui-body-a ui-corner-all ui-shadow-inset">'
				+		'<input type="number" name="novoitem" autofocus id="valoritem'+item+'" value="" placeholder="Valor do Item" onblur="totalItens('+ItemTrue+')" data-theme="a" >'
				+ '</div>'
				+		'<a class="add" href="#itens">'
				+		'<button type="button" class="ui-btn ui-corner-all ui-shadow ui-btn-b ui-btn-icon-left ui-icon-check" >Add</button></a>'
				+		'<a class="cancelar" href="#itens">'
				+		'<button type="button" class="ui-btn ui-corner-all ui-shadow ui-btn-b ui-btn-icon-left ui-icon-delete" >Cancel</button></a>'
				+	'</div>'
				+  '</form>';


				document.getElementById('precoitem').innerHTML = telapreco;
				
				// função que simula o click para clicar a tela
				jQuery(function(){
					jQuery('#add2').click();
				});

}


// função que recebe o valor do item
function totalItens(checkTrue){

		// cria variavel para receber o preço pelo prompt
		var preco = document.getElementById("valoritem"+item+"").value;
	
		// atualiza o preço do item
		updateVal(item, preco);
	
		// atualiza se o item esta checkado true
		updateCheck(item, a.checked);
				
}		


// função que imprime o total em uma label
function imprimeTotal(total){

		// formata o conteudo recebido
		totalGeralFormat = "R$ " + total.toFixed(2).replace(".",",");

		// gera o codigo html
		var tot = '<label id="tot">Total Geral '+totalGeralFormat+'</label>';

		// atualiza o html com valor totalgeral dos itens
		document.getElementById('totalGeral').innerHTML = tot;

}