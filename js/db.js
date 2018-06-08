window.addEventListener('load', carregado);
//criar um banco nome, versão nome de exposicap e tamanho
var db = openDatabase('dbApp1', '1.0', 'Primeiro Banco', 2 * 1024 * 1024);

	//criar uma transacao no banco, recebe um valor e dentro você coloca o comando
	db.transaction(function(tx){
		
		//cria a tabela caso não exista com os campos -> item, descrição, quantidade, valor e status
		tx.executeSql('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, item INT, descricao TEXT, qtd INT, valor DECIMAL, status TEXT, tipo TEXT )');
	});


	//função para incluir registro no banco (salvar)
	function salvar(item,qtd){
		
		var nome = document.getElementById('descitem').value;
		
		//função para salvar
		db.transaction(function(tx){
			tx.executeSql('INSERT INTO produtos (item,descricao,qtd) VALUES("'+item+'","'+nome+'","'+qtd+'")',db.onError);
						
		});

		atualizaPagina();
	}

	function carregado(){
		//document.getElementById('field-salvar').addEventListener('click',salvar);
		//document.getElementById('field-mostrar').addEventListener('click',mostrar);
		//document.getElementById('field-up').addEventListener('click',update);
	}


	// função que mostra os itens salvos na tabela
	function mostrar(){
		
		id = 0;

		var table = document.getElementById('tb-body');

		db.transaction(function(tx){

			tx.executeSql('SELECT * FROM produtos ORDER BY tipo, descricao', [], function(tx, resultado){

				var rows = resultado.rows;
				
				var tr = '';
				table.innerHTML = tr;
				
				for (var i =  0 ; i < rows.length; i++) {

					id = rows[i].id;
					tr+= '<tr>';
        			tr+= '<td><div class=" ui-checkbox"><input type="checkbox" id="'+id+'" '+rows[i].status+' name="checkbox-0" onClick="verificaCheck(this);" style="margin-top: 10px;"></div></td>';
        			tr+= '<td><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">';
        			tr+= '<input type="text" id="desc'+id+'" value="'+rows[i].descricao+'" onblur="updateDesc(this);"style="height: 8px; padding-bottom: 0px;"></div></td>';
        			tr+= '<td>';
        			tr+= '<fieldset id="teste3" data-role="controlgroup" data-type="horizontal" data-mini="true">';
					tr+= '<select id="qtd'+id+'" name="select-custom-14" role="button" id="select-custom-14-button" aria-haspopup="true" onClick="alteraQtd(id);" ';
					tr+= 'class=" teste4 ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow ui-first-child ui-last-child" >';
					tr+= '<option value="'+rows[i].qtd+'" selected="selected">'+rows[i].qtd+'</option>';
					tr+= '<option value="1">1</option>';
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
        			tr+= '<button class=" deletar ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete" onclick="deletaItem('+id+');" ></button>';
        			tr+= '</td>';
        			tr+= '</tr>';


	        		// verifica se o item possui valor(preço) e esta checkado
	        		if (rows[i].status == "checked"){


	        		// multiplica o valor do item pela quantidade do item
	        		var totalItem = rows[i].valor * rows[i].qtd;

	        		// formata o valor com R$ e virgula
	        		var totalItemFormat = "R$ " + totalItem.toFixed(2).replace(".",",");
	        			
	        		// cria a lista com a descrição e valor total de cada item checkado
					var resumo  = '<li id="linhaItem'+id+'" class="lii ui-li-static ui-body-inherit ui-first-child ui-last-child"><div class="ui-checkbox">'
					+ '<label class="descresumo">'+rows[i].descricao+'</label>'
					+ '<label class="totalresumo">'+totalItemFormat+'</label>'
					+ '</li>';

					//cria o item abaixo do outro 
					$('#resumovalores').append(resumo);

					// soma o totalGeral a cada item inserido na lista
					totalGeral += totalItem;

					// chama a função que imprime o total
					imprimeTotal(totalGeral);
	        		
	        		}

				}
				
				table.innerHTML = tr;

				
				// envia a quantidade de itens da lista
				enviaItem(id);
				
			});

		}, null);
		
	}


	// função que atualiza a descrição do item 
	function updateDesc(novaDesc){
		
		// retira o texto desc do para obter somente o numero do item
		idDesc = novaDesc.id.replace("desc", "");
		
		// executa o codigo sql para atualizar a descrição
		db.transaction(function(tx){

			tx.executeSql('UPDATE produtos SET descricao="'+novaDesc.value+'" WHERE id="'+idDesc+'"');

			atualizaPagina();
		});
	}

	
	// função que atualiza o preço do item
	function updateVal(item, preco){
		
		// executa o codigo sql para atualizar o preço
		db.transaction(function(tx){
			tx.executeSql('UPDATE produtos SET valor="'+preco+'" WHERE id="'+item+'"');
		});
	}


	// função que atualiza a quantidade do item
	function updateQtd(item, qtd){
		
		// executa o codigo sql para atualizar o preço
		db.transaction(function(tx){
			tx.executeSql('UPDATE produtos SET qtd="'+qtd+'" WHERE id="'+item+'"');

			atualizaPagina();
		});
	}


	// função que atualiza a se o item está checkado
	function updateCheck(item, check){
		
		// executa o codigo sql para atualizar o status
		db.transaction(function(tx){
			tx.executeSql('UPDATE produtos SET status="checked" WHERE id="'+item+'"');

			atualizaPagina();
		});
	
	}


	// atualiza que atualiza o valor e o status caso não checkado
	function updateCheckFalse(item, check){
		
		// executa o codigo sql para atualizar o status e o valor caso checked = false
		db.transaction(function(tx){
			tx.executeSql('UPDATE produtos SET status="" WHERE id="'+item+'"');
			tx.executeSql('UPDATE produtos SET valor=0 WHERE id="'+item+'"');

			atualizaPagina();
			
		});

	}


	// função que deleta um item da tabela
	function deletaItem(idItem){
		
		db.transaction(function(tx){
			tx.executeSql('DELETE FROM produtos WHERE id ='+idItem+'');

			atualizaPagina();

		});
	}


	// função que apaga a tabela de produtos	
	function limpaTabela(){

		db.transaction(function(tx){
			tx.executeSql('DROP TABLE produtos');

			atualizaPagina();

		});
	}


	// função que atualiza a pagina a cada interação, necessário para reexibir o resumo 
	function atualizaPagina(){

		// atualiza a pagina (refresh)
		//history.go(0);
		window.location.reload();
	}

	//////////////////////////////////////////////////////////////
	//////////////2018 - Daniel Vasconcelos//////////////////////

	//função para incluir registro no banco (salvar)
	function salvarListaFrutasEVerduras(){
		
		var nome = ["Banana",
					"Mamão",
					"Melão",
					"Maça",
					"Manga",
					"Abacate",
					"Pera",
					"Tomate",
					"Batata",
					"Cenoura",
					"Abobora",
					"Mandioquinha",
					"Alface",
					"Batata Doce",
					"Coentro",
					"Salsinha",
					"Beterraba",
					"Ovos",
					];
		var itemFruta = item;

			db.transaction(function(tx){

				for (var i = 0; i < nome.length; i++){
					tx.executeSql('INSERT INTO produtos (item,descricao,qtd,tipo) VALUES("'+(++itemFruta)+'","'+(nome[i])+'",1,"Frutas_Legumes")',db.onError);
				}	
				
		});


				
		atualizaPagina();

	}

	//função para incluir registro no banco (salvar)
	function salvarListaLanche(){
		
		var nome = ["Bisnaguinha",
					"Danone",
					"Suco",
					"Bolacha"];
		var itemLanche = item;

			db.transaction(function(tx){

				for (var i = 0; i < nome.length; i++){
					tx.executeSql('INSERT INTO produtos (item,descricao,qtd,tipo) VALUES("'+(++itemLanche)+'","'+(nome[i])+'",1,"Lanche")',db.onError);
				}	
				
		});

		atualizaPagina();

	}

	//função para incluir registro no banco (salvar)
	function salvarListaBasico(){
		
		var nome = ["Arroz",
					"Feijão",
					"Macarrão",
					"Molho de Tomate",
					"Miojo",
					"Açucar",
					"Nescau",
					"Leite",
					"Óleo",
					"Manteiga",
					"Suco Saquinho",
					"Presunto",
					"Peito de Frango",
					"Queijo",
					"Requeijão",
					"Leite Condensado",
					"Creme de Leite",
					"Batata Palha",
					"Milho",
					"Temperos",
					"Frango",
					"Linguiça",
					"Nuggets",
					"Carnes",
					"Carne Moida"];
		var itemLanche = item;

			db.transaction(function(tx){

				for (var i = 0; i < nome.length; i++){
					tx.executeSql('INSERT INTO produtos (item,descricao,qtd,tipo) VALUES("'+(++itemLanche)+'","'+(nome[i])+'",1,"Basico")',db.onError);
				}	
				
		});

		
		atualizaPagina();

	}

	//função para incluir registro no banco (salvar)
	function salvarListaLimpeza(){
		
		var nome = [
					"Esponja",
					"Sabão em pó",
					"Sabão em Pedra",
					"Detergente",
					"Desinfetante",
					"Amaciante",
					"Candida",
					"Álcool"
					];
		var itemLanche = item;

			db.transaction(function(tx){

				for (var i = 0; i < nome.length; i++){
					tx.executeSql('INSERT INTO produtos (item,descricao,qtd,tipo) VALUES("'+(++itemLanche)+'","'+(nome[i])+'",1,"Limpeza")',db.onError);
				}	
				
		});

		
		atualizaPagina();

	}

	///////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////