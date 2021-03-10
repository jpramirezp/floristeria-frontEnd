//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Productos {

    pNom_Prod = <HTMLInputElement>document.getElementById('inputNombre');
    pTipo_Prod = <HTMLInputElement>document.getElementById('inputTipo');
    pCant_Prod = <HTMLInputElement>document.getElementById('inputCantidad');
    pNoID_Prod= <HTMLInputElement>document.getElementById('inputCodigoBarra');
    pDescripcion= <HTMLInputElement>document.getElementById('inputDescripcion');
    pURL_imagen= <HTMLInputElement>document.getElementById('inputURL');
    pPrecio= <HTMLInputElement>document.getElementById('inputPrecio');

    constructor() {
    }


    postProducto() {
        //alert(`EL PRODUCTO ES AHORA: ${this.pNom_Prod.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/productos/postProducto"
        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pNom_Prod: this.pNom_Prod.value,
            pTipo_Prod: this.pTipo_Prod.value,
            pCant_Prod: this.pCant_Prod.value,
            pNoID_Prod:this.pNoID_Prod.value,
            pDescripcion:this.pDescripcion.value,
            pURL_imagen:this.pURL_imagen.value,
            pPrecio:this.pPrecio.value
        }

        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status=='OK')
                swal("Completado", "Registro actualizado", "success");                               
                else
                swal("Error", "Ocurrio un problema al guardar el registro", "error");   //error

               
            })
    };

}


const producto = new Productos()