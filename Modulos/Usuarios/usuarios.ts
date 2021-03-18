//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
// const Swal = require("sweetalert2");
class Usuarios {

  arregloUsuarios: IUsuarios[] = [];
  userTable = <HTMLTableElement>document.getElementById('userTable');

  pID_Usuario = <HTMLInputElement>document.getElementById('inputID');
  pNom_Usuario = <HTMLInputElement>document.getElementById('inputNombre');
  pApe_Usuario = <HTMLInputElement>document.getElementById('inputApellido');
  pNoID_Usuario = <HTMLInputElement>document.getElementById('inputIdentidad');
  pTipo_Usuario = <HTMLInputElement>document.getElementById('inputTipo');
  pArea_Usuario = <HTMLInputElement>document.getElementById('inputArea');
  pUser_Usuario = <HTMLInputElement>document.getElementById('inputUsuario');
  pClave_Usuario = <HTMLInputElement>document.getElementById('inputClave');

  constructor() {
  }

  // Inserción de Usuario
  postUsuarios() {
    //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
    let URL = "http://localhost:3500/api/usuarios/postUsuarios"

    //Se arma el Objeto que se enviara en el BODY
    const datos = {
      pNom_Usuario: this.pNom_Usuario.value,
      pApe_Usuario: this.pApe_Usuario.value,
      pNoID_Usuario: this.pNoID_Usuario.value,
      pTipo_Usuario: this.pTipo_Usuario.value,
      pArea_Usuario: this.pArea_Usuario.value,
      pUser_Usuario: this.pUser_Usuario.value,
      pClave_Usuario: this.pClave_Usuario.value
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
  getUsuarios() {
    //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
    let URL = "http://localhost:3500/api/usuarios/getUsuarios"

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
        this.arregloUsuarios = res as IUsuarios[]

        this.userTable.innerHTML = '';


        this.arregloUsuarios.forEach(usuario => {
          let newRow = this.userTable.insertRow(0);
          let cellId = newRow.insertCell(0)
          let cellFirst = newRow.insertCell(1);
          let cellLast = newRow.insertCell(2);
          let cellHandle = newRow.insertCell(3);

          cellId.innerHTML = usuario.id.toString()
          cellFirst.innerHTML = usuario.Nom_Usuario
          cellLast.innerHTML = usuario.Ape_Usuario
          cellHandle.innerHTML = usuario.User_Usuario
        })

        let header = this.userTable.createTHead();

        let rowZero = header.insertRow(0);
        
        let cellZero = rowZero.insertCell(0);
        cellZero.innerHTML = 'COD';

        let cellOne = rowZero.insertCell(1);
        cellOne.innerHTML = 'Nombre';

        let cellTwo = rowZero.insertCell(2);
        cellTwo.innerHTML = 'Apellido';

        let cellTres = rowZero.insertCell(2);
        cellTres.innerHTML = 'Usuario';



      })
  };



  // Eliminar Usuario
  deleteUsuarios() {
    //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
    let URL = "http://localhost:3500/api/usuarios/deleteUsuarios"

    const datos = {
      pID_Usuario: this.pID_Usuario.value,
      pNom_Usuario: this.pNom_Usuario.value,
      pApe_Usuario: this.pApe_Usuario.value,
      pNoID_Usuario: this.pNoID_Usuario.value,
      pTipo_Usuario: this.pTipo_Usuario.value,
      pArea_Usuario: this.pArea_Usuario.value,
      pUser_Usuario: this.pUser_Usuario.value,
      pClave_Usuario: this.pClave_Usuario.value
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
  putUsuarios() {
    //alert(`EL USUARIO ES AHORA: ${this.pNom_Emp.value} y la Cantidad es ${this.pCant_Prod.value}`)
    let URL = "http://localhost:3500/api/usuarios/putUsuarios"

    //Se arma el Objeto que se enviara en el BODY
    const datos = {
      pID_Usuario: this.pID_Usuario.value,
      pNom_Usuario: this.pNom_Usuario.value,
      pApe_Usuario: this.pApe_Usuario.value,
      pNoID_Usuario: this.pNoID_Usuario.value,
      pTipo_Usuario: this.pTipo_Usuario.value,
      pArea_Usuario: this.pArea_Usuario.value,
      pUser_Usuario: this.pUser_Usuario.value,
      pClave_Usuario: this.pClave_Usuario.value
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

const usuarios = new Usuarios()

//Carga Inicial
window.onload = () => {
  usuarios.getUsuarios();
  console.log("Me estoy cargando...");


}