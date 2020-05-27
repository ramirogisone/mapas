const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
	ui.mostrarEstablecimientos();
})
const buscardor = document.querySelector('#buscar input');
buscardor.addEventListener('input', () => {
	if(buscardor.value.length > 3){
		ui.obtenerSugerencia(buscardor.value);
	}else{
		ui.mostrarEstablecimientos();
	}
})