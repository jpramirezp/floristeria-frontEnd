//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Clientes {

    //Crea propiedades a partir de los controles INPUTS
    pID = <HTMLInputElement>document.getElementById('inputID');
    pNom_Cli = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Cli = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Cli = <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Cli = <HTMLInputElement>document.getElementById('inputTelefono');
    pEmail_Cli = <HTMLInputElement>document.getElementById('inputEmail');
    pDir_Cli = <HTMLInputElement>document.getElementById('inputDireccion');

    //Crea propiedades los botones
    btnRegistrar = <HTMLButtonElement>document.getElementById('btnRegistrar');
    btnEliminar = <HTMLButtonElement>document.getElementById('btnEliminar');
    btnModificar = <HTMLButtonElement>document.getElementById('btnModificar');

    Clientes: IClientes[] = [];
    bodyListaClientes = <HTMLTableElement>document.getElementById('bodyListaClientes');

    constructor() {
    }

    postClientes(opcion?: any) {

        //decide a que ruta enviar'  1=Registro nuevo, 2= Actualizacion
        let URL
        if (opcion == 1) {
            URL = "http://localhost:3500/api/clientes/postCliente"
        } else {
            URL = "http://localhost:3500/api/clientes/putClientes"
        }

        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pOpcion: opcion,                            //opcion=1 Registrar, opcion=2 Actualizar   
            pID: this.pID.value ? this.pID.value : '0',
            pNom_Cli: this.pNom_Cli.value,
            pApe_Cli: this.pApe_Cli.value,
            pNoID_Cli: 'vacio',
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
                if (res.status == 'OK')
                    swal("Completado", "Registro actualizado", "success").then((res: any) => {
                        //recarga la lista
                        cliente.getClientes()
                        //deshabilita los botones
                        this.btnRegistrar.disabled = true
                        this.btnEliminar.disabled = true
                        this.btnModificar.disabled = true
                    })
                else
                    swal("Error", "Ocurrio un problema al guardar el registro", "error");   //error               
            })
    };

    //Llena la Tabla de Productos
    getClientes() {
        let URL = "http://localhost:3500/api/clientes/getClientes"
        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.Clientes = res as IClientes[]

                //limpia siempre la tabla
                this.bodyListaClientes.innerHTML = ''

                //llena de manera dinamica la tabla
                this.Clientes.forEach((cli, index) => {
                    this.bodyListaClientes.innerHTML += `
            <tr>
            <td>${cli.id}</td>
            <td>${cli.Nom_Cli}</td>
            <td>${cli.Ape_Cli}</td>
            <td>${cli.Tel_Cli}</td>    
            <td>
            <button type="button" id="btnSelect${index}" class="btn btn-info btn-sm" title="Seleccionar" onclick="producto.seleccionarProducto(${cli.id})">
            <i class="fa fa-list"></i>
            </button>
            </td>       
          </tr>
            `
                })
            })
    }

    seleccionarCliente(cli: any) {
        //Filtra del array principal el Id Seleccionado  
        let clienteSeleccionado = this.Clientes.filter(cliente => cliente.id == cli)

        //luego llena los textbox, usando el operador condicional ? para evitar el error de nulos
        this.pID.value = clienteSeleccionado[0].id ? clienteSeleccionado[0].id : ''
        this.pNom_Cli.value = clienteSeleccionado[0].Nom_Cli ? clienteSeleccionado[0].Nom_Cli : ''
        this.pApe_Cli.value = clienteSeleccionado[0].Ape_Cli ? clienteSeleccionado[0].Ape_Cli : ''
        this.pNoID_Cli.value = clienteSeleccionado[0].NoID_Cli ? clienteSeleccionado[0].NoID_Cli : ''
        this.pTel_Cli.value = clienteSeleccionado[0].Tel_Cli ? clienteSeleccionado[0].Tel_Cli : ''
        this.pEmail_Cli.value = clienteSeleccionado[0].Email_Cli ? clienteSeleccionado[0].Email_Cli : ''
        this.pDir_Cli.value = clienteSeleccionado[0].Dir_Cli ? clienteSeleccionado[0].Dir_Cli : ''

        //habilita los botones
        this.btnEliminar.disabled = false
        this.btnModificar.disabled = false
        this.btnRegistrar.disabled = true
    }
    // Eliminar Producto
    deleteCliente() {
        let URL = "http://localhost:3500/api/clientes/deleteCliente"

        const datos = {
            pID: this.pID.value
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
                    alert('Cliente eliminado');

                    //recarga la lista
                    cliente.getClientes()

                    //limpia
                    cliente.limpiar()

                    //deshabilitar botones
                    this.btnEliminar.disabled = true
                    this.btnModificar.disabled = true

                } else {
                    console.log("todo mal");
                    alert('No se elimino el registro');
                }
            })
    };

    limpiar() {
        this.pID.value = ''
        this.pNom_Cli.value = ''
        this.pApe_Cli.value = ''
        this.pNoID_Cli.value = '0'
        this.pTel_Cli.value = ''
        this.pEmail_Cli.value = ''
        this.pDir_Cli.value = '0'

        //habilita el boton registrar
        this.btnRegistrar.disabled = false
        this.btnEliminar.disabled = true
        this.btnModificar.disabled = true
    }

};

const cliente = new Clientes()

//Carga Inicial
window.onload = () => {
    cliente.getClientes()
}