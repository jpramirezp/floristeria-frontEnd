//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Empleados {

    pNom_Emp = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Emp = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Emp= <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Emp= <HTMLInputElement>document.getElementById('inputTelefono');
    pCargo_Emp= <HTMLInputElement>document.getElementById('inputCargo');
    pArea_Emp= <HTMLInputElement>document.getElementById('inputArea');
    pDir_Emp= <HTMLInputElement>document.getElementById('inputDireccion');
    pEstado_Emp= <HTMLInputElement>document.getElementById('inputEstado');
    pFec_Ingreso= <HTMLInputElement>document.getElementById('inputFechaIngreso');
    pFec_Salida= <HTMLInputElement>document.getElementById('inputFechaSalida');

    constructor() {
    }


    postEmpleados() {
        //alert(`EL EMPLEADO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/productos/postProducto"
        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pNom_Emp: this.pNom_Emp.value,
            pApe_Emp: this.pApe_Emp.value,
            pNoID_Emp: this.pNoID_Emp.value,
            pTel_Emp: this.pTel_Emp.value,
            pCargo_Emp: this.pCargo_Emp.value,
            pArea_Emp: this.pArea_Emp.value,
            pDir_Emp: this.pDir_Emp.value,
            pEstado_Emp: this.pEstado_Emp.value,
            pFec_Ingreso: this.pFec_Ingreso.value,
            pFec_Salida: this.pFec_Salida.value
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


const empleados = new Empleados()