//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Clientes {

    pNom_Cli = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Cli = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Cli= <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Cli= <HTMLInputElement>document.getElementById('inputTelefono');

    constructor() {
    }


    postClientes() {
        //alert(`EL EMPLEADO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/productos/postProducto"
        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pNom_Cli: this.pNom_Cli.value,
            pApe_Cli: this.pApe_Cli.value,
            pNoID_Cli: this.pNoID_Cli.value,
            pTel_Cli: this.pTel_Cli.value
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


const clientes = new Clientes()