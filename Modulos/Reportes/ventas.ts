//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Ventas {

    ventas: IFactura[] = [];
    bodyListaVentas = <HTMLTableElement>document.getElementById('bodyListaVentas');

    constructor() {
    }

    
    //Llena la Tabla de Productos
    getVentas() {
        let URL = "http://localhost:3500/api/facturas/getFacturas"
        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.ventas = res as IFactura[]
                
                //limpia siempre la tabla
                this.bodyListaVentas.innerHTML = '' 

                //llena de manera dinamica la tabla
                this.ventas.forEach((ven,index) => {                          
                    this.bodyListaVentas.innerHTML += `
            <tr>
            <td>${ven.id}</td>
            <td>${ven.Nom_Fact}</td>
            <td>${ven.Direccion_Fact}</td>
            <td>Pendiente</td>    
            <td>
            <button type="button" id="btnSelect${index}" class="btn btn-info btn-sm" title="Seleccionar" onclick="producto.seleccionarProducto(${ven.id})">
            <i class="fa fa-list"></i>
            </button>
            </td>       
          </tr>
            `
                })
            })
    }

};


const ventas = new Ventas()

//Carga Inicial
window.onload = () => {
   ventas.getVentas()   
}