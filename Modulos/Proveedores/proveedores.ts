//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Proveedores {

    pNom_Prov = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Prov = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Prov= <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Prov= <HTMLInputElement>document.getElementById('inputTelefono');
    pDir_Prov= <HTMLInputElement>document.getElementById('inputDireccion');
    pCorreo_Prov= <HTMLInputElement>document.getElementById('inputCorreo');

    constructor() {
    }


    postProveedores() {
        //alert(`EL EMPLEADO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/productos/postProducto"
        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pNom_Prov: this.pNom_Prov.value,
            pApe_Prov: this.pApe_Prov.value,
            pNoID_Prov: this.pNoID_Prov.value,
            pTel_Prov: this.pTel_Prov.value,
            pDir_Prov: this.pDir_Prov.value,
            pCorreo_Prov: this.pCorreo_Prov.value
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


const proveedores = new Proveedores()