class Carrito {

    Productos:IProductos[]=[];

    pNom_Fact = <HTMLInputElement>document.getElementById('txtNombre');
    pDireccion_Fact=<HTMLInputElement>document.getElementById('txtDireccion');
    pCorreo_Fact=<HTMLInputElement>document.getElementById('txtEmail');
    
    cargarCarrito(){

        let total = 0

        if (localStorage.getItem('arrayCarrito')){

            //llena el array a partir de un local storage, se usa el JSON.parse dado que estan almacenado como texto
            this.Productos= JSON.parse(String(localStorage.getItem('arrayCarrito')))
            let UL_listaProductos = <HTMLUListElement>document.getElementById('listaProductos_UL')

            this.Productos.forEach(producto=>{

                total += parseFloat(producto.Precio ?producto.Precio:'0')

                UL_listaProductos.innerHTML += `
                <li class="list-group-item d-flex justify-content-between lh-condensed">                
                <button class="btn btn-danger btn-sm" type="button" title="Delete" onclick="carrito.removerItem(${producto.id})"><i class="fa fa-trash"></i></button>                
                <div>
                <h6 class="my-0">${producto.Nom_Prod}</h6>
                <small class="text-muted">${producto.Descripcion}</small>
                </div>
                <span class="text-muted">L. ${producto.Precio}</span>
                </li>
                `
            });

            
            UL_listaProductos.innerHTML +=`
            <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>L ${total}</strong>
            </li>
            `
        }
    }

    removerItem(id:any){

        let nuevoCarrito = this.Productos.filter(producto=> producto.id !=id)

        //setea el array como como tipo string
        localStorage.setItem('arrayCarrito',JSON.stringify(nuevoCarrito))

        //limpia el anterior
        let UL_listaProductos = <HTMLUListElement>document.getElementById('listaProductos_UL')
        UL_listaProductos.innerHTML=''

        //recarga el carrito    
        this.cargarCarrito()

    }

    postFactura() {        
        
        let URL="http://localhost:3500/api/facturas/postFactura"
       
               
        //Se arma el Objeto que se enviara en el BODY
        const datos = {            
            pNom_Fact: this.pNom_Fact.value, 
            pDireccion_Fact: this.pDireccion_Fact.value,
            pCorreo_Fact: this.pCorreo_Fact.value,
            detalle:[...this.Productos]         //destructuracion en un array
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
                let NuevoID = parseInt(res[0].NuevoID)
                if(NuevoID > 0)
                swal("Completado", `La Factura Registrada es la 00000${NuevoID}, se le enviara por correo !!`, "success").then((res: any)=>{
                   //limpia el carrito  envia a la tienda de nuevo
                    localStorage.removeItem('arrayCarrito')
                    window.location.href="../../index.html";  
                })                               
                else
                swal("Error", "Ocurrio un problema al guardar el registro", "error");   //error               
            })
    };


}

const carrito = new Carrito()

//Carga Inicial
window.onload = () => {
  carrito.cargarCarrito()
}