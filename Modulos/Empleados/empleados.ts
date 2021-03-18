//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
//declare var swal: any;

class Empleados {
    arregloEmpleados: IEmpleados[] = [];
    empTable = <HTMLTableElement>document.getElementById('empTable');

    pID_Emp = <HTMLInputElement>document.getElementById('inputID');
    pNom_Emp = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Emp = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Emp = <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Emp = <HTMLInputElement>document.getElementById('inputTelefono');
    pCargo_Emp = <HTMLInputElement>document.getElementById('inputCargo');
    pArea_Emp = <HTMLInputElement>document.getElementById('inputArea');
    pDir_Emp = <HTMLInputElement>document.getElementById('inputDireccion');
    pEstado_Emp = <HTMLInputElement>document.getElementById('inputEstado');
    pFec_Ingreso = <HTMLInputElement>document.getElementById('inputFecIngreso');
    pFec_Salida = <HTMLInputElement>document.getElementById('inputFecSalida');

    constructor() {
    }

    // Inserción de Usuario
    postEmpleados() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/empleados/postEmpleados"

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
        //Aquí código de sweetalert2 para confirmar
        // Swal.fire({
        //     title: '¿Esta seguro de querer salvar usuario?',
        //     showDenyButton: true,
        //     showCancelButton: true,
        //     confirmButtonText: `Guardar`,
        //     denyButtonText: `No guardar`,
        //   }).then((result:any) => {
        //     /* Read more about isConfirmed, isDenied below */
        //     if (result.isConfirmed) {
        //       Swal.fire('¡Guardado!', '', 'success')
        //     } else if (result.isDenied) {
        //       Swal.fire('¡El usuario no ha sido guardado!', '', 'info')
        //     }
        //   })


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
    getEmpleados() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/empleados/getEmpleados"

        //Se arma el Objeto que se enviara en el BODY
        // const datos = {
        //     pNom_Usuario: this.pNom_Usuario.value,
        //     pApe_Usuario: this.pApe_Usuario.value,
        //     pNoID_Usuario: this.pNoID_Usuario.value,
        //     pTipo_Usuario: this.pTipo_Usuario.value,
        //     pArea_Usuario: this.pApe_Usuario.value,
        //     pUser_Usuario: this.pUser_Usuario.value,
        //     pClave_Usuario: this.pClave_Usuario.value
        // }
        //Aquí código de sweetalert2 para confirmar
        // Swal.fire({
        //     title: '¿Esta seguro de querer salvar usuario?',
        //     showDenyButton: true,
        //     showCancelButton: true,
        //     confirmButtonText: `Guardar`,
        //     denyButtonText: `No guardar`,
        //   }).then((result:any) => {
        //     /* Read more about isConfirmed, isDenied below */
        //     if (result.isConfirmed) {
        //       Swal.fire('¡Guardado!', '', 'success')
        //     } else if (result.isDenied) {
        //       Swal.fire('¡El usuario no ha sido guardado!', '', 'info')
        //     }
        //   })


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
                this.arregloEmpleados = res as IEmpleados[]

                this.empTable.innerHTML = '';


                this.arregloEmpleados.forEach(empleado => {
                    let newRow = this.empTable.insertRow(0);
                    let cellId = newRow.insertCell(0)
                    let cellFirst = newRow.insertCell(1);
                    let cellLast = newRow.insertCell(2);
                    let cellHandle = newRow.insertCell(3);
                    let cellLeaves = newRow.insertCell(4);
                    let cellk = newRow.insertCell(5);
                    let cellm = newRow.insertCell(6);
                    let celln = newRow.insertCell(7);

                    cellId.innerHTML = empleado.id.toString()
                    cellFirst.innerHTML = empleado.Nom_Emp
                    cellLast.innerHTML = empleado.Ape_Emp
                    cellHandle.innerHTML = empleado.Area_Emp
                    cellLeaves.innerHTML = empleado.NoID_Emp
                    cellk.innerHTML = empleado.Cargo_Emp
                    cellm.innerHTML = empleado.Estado_Emp
                    celln.innerHTML = empleado.Tel_Emp.toString()
                })

                let header = this.empTable.createTHead();

                let rowZero = header.insertRow(0);
                
                let cellZero = rowZero.insertCell(0);
                cellZero.innerHTML = 'COD';

                let cellOne = rowZero.insertCell(1);
                cellOne.innerHTML = 'Nombre';

                let cellTwo = rowZero.insertCell(2);
                cellTwo.innerHTML = 'Apellido';

                let cellTres = rowZero.insertCell(3);
                cellTres.innerHTML = 'Area';

                let cellfour = rowZero.insertCell(4);
                cellfour.innerHTML = 'Identidad';

                let cell5 = rowZero.insertCell(5);
                cell5.innerHTML = 'Cargo';

                let cell6 = rowZero.insertCell(6);
                cell6.innerHTML = 'Estado';

                let celln = rowZero.insertCell(7);
                celln.innerHTML = 'Telefono';

            })
    };



    // Eliminar Usuario
    deleteEmpleados() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/empleados/deleteEmpleados"

        const datos = {
            pID_Emp: this.pID_Emp.value,
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

    // Eliminar de Usuario
    putEmpleados() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/empleados/putEmpleados"

        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pID_Emp: this.pID_Emp.value,
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

const empleados = new Empleados()

//Carga Inicial
window.onload = () => {
    empleados.getEmpleados();
    console.log("Me estoy cargando...");


}