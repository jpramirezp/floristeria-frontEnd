class Dashboard {

    Productos: IProductos[] = [];
    bodyAcumulativos = <HTMLTableElement>document.getElementById('bodyAcumulativos');

    constructor() {

    }

    getproductosDash() {
        let URL = "http://localhost:3500/api/productos/getProductos"
        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {

                this.Productos = res as IProductos[]
                //console.log(res as IProductos[])

                this.bodyAcumulativos.innerHTML = '' //limpia
                
                this.Productos.forEach(producto => {
                    //console.log(producto.URL_Imagen)             
                    this.bodyAcumulativos.innerHTML += `
            <tr>
            <td>${producto.id}</td>
            <td>${producto.Nom_Prod}</td>
            <td>${producto.Cant_Prod}</td>
            <td>${producto.Precio}</td>
            <td>${producto.URL_Imagen}</td>
          </tr>
            `
                })





            })

    }


}

const dashboard = new Dashboard()

//Carga Inicial
window.onload = () => {
    dashboard.getproductosDash()
}