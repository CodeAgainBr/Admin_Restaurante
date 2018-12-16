function index() {
	let html = $(".pedidos");
	let pedidos = getPedidos();
	
	if(Array.isArray(pedidos)) {
		for (var i = 0; i < pedidos.length; i++) {
			let id = pedidos[i].id;
			let status = pedidos[i].status
			let mesa = getMesa(pedidos[i].mesa);
			let itens = getItens(id);
			let valor = 0;

			if(Array.isArray(itens)) {
				for (var i = 0; i < itens.length; i++) {
					let produto = getProduto(itens[i].produto_id);
					valor += itens[i].quantidade * produto.valor;
				}


				html.text(html +
					'<div class="col-12 box-pedido" data-id="'+id+'">'+
						'<div class="row">'+
							'<div class="col-5 py-4">'+
								'<p class="h4">Mesa '+mesa+'</p>'+
							'</div>'+

							'<div class="col-7 pt-2 text-right">'+
								'<p class="h5">'+status+'</p>'+
								'<p class="h5 text-danger">R$ '+valor+'</p>'+
							'</div>'+
						'</div>'+
					'</div>'
				);
			}
		}
	}

	$(".box-pedido").click(function() {
		let mesa = $(this).children(".mesa_numero").each(function() {
			return $(this).val();
		});

		alert(JSON.stringify(mesa));

		$("#modal").load("views/mesas/show.html", function() {
			$("#pedido_id").text();
			$("#pedidoShow").modal();
		});
	});
}

function show() {

}

function create() {

}

function update() {

}

function destroy() {

}

function getPedidos() {
	let pedidos;
	$.ajax({
		url: "http://api-restaurante-vinicius.herokuapp.com/api/v1/pedidos.json",
		method: "get",
		data: {
			cod: 1
		},
		success: function(result, status, xhr) {
			pedidos = result;
		}
	});

	return pedidos;
}

function getMesa(id) {
	let mesa;
	$.ajax({
		url: "http://api-restaurante-vinicius.herokuapp.com/api/v1/mesas/"+id+".json",
		method: "get",
		data: {
			cod: 1
		},
		success: function(result, status, xhr) {
			mesa = result;
		}
	});

	return mesa;
}

function getItens(id) {
	let itens;
	$.ajax({
		url: "http://api-restaurante-vinicius.herokuapp.com/api/v1/item.json",
		method: "get",
		data: {
			cod: 1,
			pedido: id
		},
		success: function(result, status, xhr) {
			itens = result;
		}
	});

	return itens;
}

function getProduto(id) {
	let produto;
	$.ajax({
		url: "http://api-restaurante-vinicius.herokuapp.com/api/v1/produtos/"+id+".json",
		method: "get",
		data: {
			cod: 1,
			pedido: id
		},
		success: function(result, status, xhr) {
			produto = result;
		}
	});

	return produto;
}
