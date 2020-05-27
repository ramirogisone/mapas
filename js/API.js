class API{
	async obtenerDatos(){
		const cantidad = 1000;
		const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${cantidad}`);
		const respuestaJSON = await datos.json();
		return{
			respuestaJSON
		}
	}
}