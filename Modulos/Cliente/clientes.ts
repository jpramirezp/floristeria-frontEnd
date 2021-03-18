//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
//declare var swal: any;

class Clientes {
    arregloClientes: IClientes[] = [];
    cliTable = <HTMLTableElement>document.getElementById('cliTable');

    pID_Cli = <HTMLInputElement>document.getElementById('inputID');
    pNom_Cli = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Cli = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Cli = <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Cli = <HTMLInputElement>document.getElementById('inputTelefono');
    pEmail_Cli = <HTMLInputElement>document.getElementById('inputEmail');
    pDir_Cli = <HTMLInputElement>document.getElementById('inputDireccion');

    constructor() {
    }


    postClientes() {
        //alert(`EL EMPLEADO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/clientes/postClientes"

        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pNom_Cli: this.pNom_Cli.value,
            pApe_Cli: this.pApe_Cli.value,
            pNoID_Cli: this.pNoID_Cli.value,
            pTel_Cli: this.pTel_Cli.value,
            pEmail_Cli: this.pEmail_Cli.value,
            pDir_Cli: this.pDir_Cli.value
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
                if (res.status == 'OK') {
                    // Swal.fire("Completado", "Registro actualizado", "success");   
                    console.log("todo bien");
                    // window.location.reload();
                } else
                    console.log("todo mal");

                // Swal.fire("Error", "Ocurrio un problema al guardar el registro", "error");   //error

            })
    };
    // Obtener Usuario
    getClientes() {        
        let URL = "http://localhost:3500/api/clientes/getClientes"

        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET',
            //body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                this.arregloClientes = res as IClientes[]

                this.cliTable.innerHTML = '';


                this.arregloClientes.forEach(cliente => {
                    let newRow = this.cliTable.insertRow(0);
                    let cellId = newRow.insertCell(0)
                    let cellFirst = newRow.insertCell(1);
                    let cellLast = newRow.insertCell(2);
                    let cellHandle = newRow.insertCell(3);
                    let cell1 = newRow.insertCell(4);

                    cellId.innerHTML = cliente.id.toString()
                    cellFirst.innerHTML = cliente.Nom_Cli
                    cellLast.innerHTML = cliente.Ape_Cli
                    cellHandle.innerHTML = cliente.NoID_Cli.toString()
                    cell1.innerHTML = cliente.Tel_Cli.toString()
                })

                let header = this.cliTable.createTHead();

                let rowZero = header.insertRow(0);

                let cellZero = rowZero.insertCell(0);
                cellZero.innerHTML = 'COD';

                let cellOne = rowZero.insertCell(1);
                cellOne.innerHTML = 'Nombre';

                let cellTwo = rowZero.insertCell(2);
                cellTwo.innerHTML = 'Apellido';

                let cellcinco = rowZero.insertCell(3);
                cellcinco.innerHTML = 'Identidad';

                let cellttres = rowZero.insertCell(4);
                cellttres.innerHTML = 'Telefono';
            })
    };

    // Eliminar Cliente
    deleteClientes() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/clientes/deleteClientes"

        const datos = {
            pID_Cli: this.pID_Cli.value,
            pNom_Cli: this.pNom_Cli.value,
            pApe_Cli: this.pApe_Cli.value,
            pNoID_Cli: this.pNoID_Cli.value,
            pTel_Cli: this.pTel_Cli.value,
            pEmail_Cli: this.pEmail_Cli.value,
            pDir_Cli: this.pDir_Cli.value
        }


        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'DELETE',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 'OK') {
                    // Swal.fire("Completado", "Registro actualizado", "success");   
                    console.log("todo bien");
                    alert('Elimino actualizado');
                    // window.location.reload();
                } else {
                    console.log("todo mal");
                    alert('No se elimino el registro');
                }
            })
    };

    // Insertar de Usuario
    putClientes() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/clientes/putClientes"

        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pID_Cli: this.pID_Cli.value,
            pNom_Cli: this.pNom_Cli.value,
            pApe_Cli: this.pApe_Cli.value,
            pNoID_Cli: this.pNoID_Cli.value,
            pTel_Cli: this.pTel_Cli.value,
            pEmail_Cli: this.pEmail_Cli.value,
            pDir_Cli: this.pDir_Cli.value
        }

        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 'OK') {
                    // Swal.fire("Completado", "Registro actualizado", "success");   
                    console.log("todo bien");
                    alert('Registro actualizado');
                    // window.location.reload();
                } else {
                    console.log("todo mal");
                    alert('No se actualizo el registro');
                }
                // Swal.fire("Error", "Ocurrio un problema al guardar el registro", "error");   //error

            })
    };

}
const clientes = new Clientes()

//Carga Inicial
window.onload = () => {
  clientes.getClientes();
  console.log("Me estoy cargando...");


}