//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
//declare var swal: any;

class Proveedores {

    arregloProveedores: IProveedores[] = [];
    ProvTable = <HTMLTableElement>document.getElementById('ProvTable');

    pID_Prov = <HTMLInputElement>document.getElementById('inputID');
    pNom_Prov = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Prov = <HTMLInputElement>document.getElementById('inputApellido');
    pDir_Prov = <HTMLInputElement>document.getElementById('inputDireccion');
    pCorreo_Prov = <HTMLInputElement>document.getElementById('inputEmail');
    pNoID_Prov = <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Prov = <HTMLInputElement>document.getElementById('inputTelefono');

    constructor() {
    }

    // Inserción de Usuario
    postProveedores() {

        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/proveedores/postProveedores"

        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pNom_Prov: this.pNom_Prov.value,
            pApe_Prov: this.pApe_Prov.value,
            pDir_Prov: this.pDir_Prov.value,
            pCorreo_Prov: this.pCorreo_Prov.value,
            pNoID_Prov: this.pNoID_Prov.value,
            pTel_Prov: this.pTel_Prov.value,
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
                alert(JSON.stringify(res))
                if (res.status == 'OK') {
                    // Swal.fire("Completado", "Registro actualizado", "success");   
                    console.log("todo bien");
                    alert("todo macizo");
                    // window.location.reload();
                } else
                    console.log("todo mal");
                alert("la cagamos");
                // Swal.fire("Error", "Ocurrio un problema al guardar el registro", "error");   //error

            })
    };

    // Obtener Proveedor
    getProveedores() {
        console.log("obteniendo proveeodres");

        //alert(`EL PROVEEDOR ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/proveedores/getProveedores"

        //Se arma el Objeto que se enviara en el BODY
        // const datos = {
        //     pNom_Prov: this.pNom_Prov.value,
        //     pApe_Prov: this.pApe_Prov.value,
        //     pDir_Prov: this.pDir_Prov.value,
        //     pCorreo_Prov: this.pCorreo_Prov.value,
        //     pNoID_Prov: this.pApe_Prov.value,
        //     pTel_Prov: this.pTel_Prov.value,
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
                console.log("res", res);

                this.arregloProveedores = res as IProveedores[]

                this.ProvTable.innerHTML = '';


                this.arregloProveedores.forEach(proveedor => {
                    let newRow = this.ProvTable.insertRow(0);
                    let cellId = newRow.insertCell(0)
                    let cellFirst = newRow.insertCell(1);
                    let cellLast = newRow.insertCell(2);
                    let cellHandle = newRow.insertCell(3);

                    cellId.innerHTML = proveedor.id.toString()
                    cellFirst.innerHTML = proveedor.Nom_Prov
                    cellLast.innerHTML = proveedor.Ape_Prov
                    cellHandle.innerHTML = proveedor.Tel_Prov
                })

                let header = this.ProvTable.createTHead();

                let rowZero = header.insertRow(0);
                let cellZero = rowZero.insertCell(0);
                cellZero.innerHTML = 'COD';

                let cellOne = rowZero.insertCell(1);
                cellOne.innerHTML = 'Nombre';

                let cellTwo = rowZero.insertCell(2);
                cellTwo.innerHTML = 'Apellido';

                let cellTres = rowZero.insertCell(3);
                cellTres.innerHTML = 'Telefono';



            })
    };



    // Eliminar Usuario
    deleteProveedores() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/proveedores/deleteProveedores"

        const datos = {
            pID_Prov: this.pID_Prov.value,
            pNom_Prov: this.pNom_Prov.value,
            pApe_Prov: this.pApe_Prov.value,
            pDir_Prov: this.pDir_Prov.value,
            pCorreo_Prov: this.pCorreo_Prov.value,
            pNoID_Prov: this.pNoID_Prov.value,
            pTel_Prov: this.pTel_Prov.value,
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
    putProveedores() {
        //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
        let URL = "http://localhost:3500/api/proveedores/putProveedores"

        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pID_Prov: this.pID_Prov.value,
            pNom_Prov: this.pNom_Prov.value,
            pApe_Prov: this.pApe_Prov.value,
            pDir_Prov: this.pDir_Prov.value,
            pCorreo_Prov: this.pCorreo_Prov.value,
            pNoID_Prov: this.pNoID_Prov.value,
            pTel_Prov: this.pTel_Prov.value,
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

const proveedores = new Proveedores()

//Carga Inicial
window.onload = () => {
    proveedores.getProveedores();
    console.log("Me estoy cargando...");

}
