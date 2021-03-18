class Carrito {

    Productos:IProductos[]=[];

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
                <button class="btn btn-danger btn-sm" type="button" title="Delete"><i class="fa fa-trash"></i></button>                
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


            //console.log(this.Productos)

        }


    }



}

const carrito = new Carrito()

//Carga Inicial
window.onload = () => {
  carrito.cargarCarrito()
}