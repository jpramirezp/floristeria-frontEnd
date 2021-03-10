
class Index {

    Productos:IProductos[]=[];
    divProductos=<HTMLDivElement>document.getElementById('divProductos');

    constructor(){        
    }

    getProductos(){
        let URL = "http://localhost:3500/api/productos/getProductos"
        
        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                
                this.Productos = res as IProductos[]
                //console.log(res as IProductos[])

                this.divProductos.innerHTML = '' //limpia
                this.Productos.forEach( producto=>{        
                    //console.log(producto.URL_Imagen)             
                    this.divProductos.innerHTML += `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="featured__item">
                      <div class="featured__item__pic set-bg" data-setbg="">
                      <img src="${producto.URL_Imagen}">
                        <ul class="featured__item__pic__hover">
                          <li><a href="#"><i class="fa fa-heart"></i></a></li>
                          <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                          <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                      </div>
                      <div class="featured__item__text">
                        <h6><a href="#">${producto.Nom_Prod}</a></h6>
                        <h5>L. ${producto.Precio}</h5>
                      </div>
                    </div>
                  </div>
                    `                    
                })
                



               
            })


    }




}

const index = new Index()

//Carga Inicial
window.onload = () => {
    index.getProductos()    
}

