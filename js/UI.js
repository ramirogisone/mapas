class UI {
	constructor() {
		this.api = new API();
		//Inicializo los pines
		this.markers = new L.layerGroup();
		// Iniciar el mapa
		this.mapa = this.inicializarMapa();
	}
	inicializarMapa() {
		// Inicializar y obtener la propiedad del mapa
		const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
		const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
		L.tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; ' + enlaceMapa + ' Contributors',
			maxZoom: 18,
			}).addTo(map);
		return map;
	}
	mostrarEstablecimientos(){
		this.api.obtenerDatos()
			.then(datos => {
				const resultado = datos.respuestaJSON.results;
				this.mostrarPines(resultado);
			});
	}
	mostrarPines(datos){
		//limpio los markers usando funcion de leaflet
		this.markers.clearLayers();
		datos.forEach(dato => {
			//destructuring
			const {latitude, longitude, calle, regular, premium} = dato;
			//popUp
			const opcionesPopUp = L.popup()
				.setContent(`
					<p>Calle: ${calle}</p>
					<p><b>Regular:</b> ${regular}</p>
					<p><b>Premium:</b> ${premium}</p>
				`);
			//agregar pin
			const marker = new L.marker([
				parseFloat(latitude),
				parseFloat(longitude)
			]).bindPopup(opcionesPopUp);
			this.markers.addLayer(marker)
		});
		this.markers.addTo(this.mapa);
	}
	obtenerSugerencia(busqueda){
		this.api.obtenerDatos()
			.then(datos => {
				const resultados = datos.respuestaJSON.results;
				this.filtrarSugerencias(resultados, busqueda);
				/* console.log(resultados);
				console.log(busqueda); */
			})
	}
	filtrarSugerencias(resultado, busqueda){
		const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
		this.mostrarPines(filtro);
	}
}
