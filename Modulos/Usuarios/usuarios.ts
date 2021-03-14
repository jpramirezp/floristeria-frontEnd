//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Usuarios {

    pNom_Usuario = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Usuario = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Usuario= <HTMLInputElement>document.getElementById('inputIdentidad');
    pTipo_Usuario= <HTMLInputElement>document.getElementById('inputTipo');
    pArea_Usuario= <HTMLInputElement>document.getElementById('inputArea');
    pUser_Usuario= <HTMLInputElement>document.getElementById('inputUsuario');
    pClave_Usuario= <HTMLInputElement>document.getElementById('inputClave');
    
    constructor() {
    }


    postUsuarios() {
        //alert(`EL EMPLEADO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/productos/postProducto"
        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pNom_Usuario: this.pNom_Usuario.value,
            pApe_Usuario: this.pApe_Usuario.value,
            pNoID_Usuario: this.pNoID_Usuario.value,
            pTipo_Usuario: this.pTipo_Usuario.value,
            pArea_Usuario: this.pApe_Usuario.value,
            pUser_Usuario: this.pUser_Usuario.value,
            pClave_Usuario: this.pClave_Usuario.value
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


const usuarios = new Usuarios()