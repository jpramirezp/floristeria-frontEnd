
class Productos {

    pNom_Prod = <HTMLInputElement>document.getElementById('inputNombre');
    pTipo_Prod = <HTMLInputElement>document.getElementById('inputTipo');
    pCant_Prod = <HTMLInputElement>document.getElementById('inputCantidad');

    constructor() {
    }


    postProducto() {
        // alert(`EL PRODUCTO ES: ${this.NombreProd.value} y la Cantidad es ${this.CantProd.value}`)
        let URL = "http://localhost:3500/api/productos/postProducto"

        const data = new URLSearchParams();
        data.append('pNom_Prod', this.pNom_Prod.value);
        data.append('pTipo_Prod', this.pTipo_Prod.value);
        data.append('pCant_Prod', this.pCant_Prod.value);

        console.log(data)
        //Metodo para llamar APIS, 
        fetch(URL, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(datos => {
                alert(datos)
            })
    }

}

const producto = new Productos()