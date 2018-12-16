function load() {
	$("header").load("views/layouts/header.html");
	$("section #pedidos").load("views/pedidos/index.html");
	$("section #mesas").load("views/mesas/index.html");
	$("section #produtos").load("views/produtos/index.html");
}