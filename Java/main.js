var productosElegidos = new Set(); 
var PRODUCTOS = [];
var contadorCarrito = 0;

$("h2").hide();
$("h3").hide();
$("#contenidoGenerado").hide();
$("#titulo2").hide();
$("#notificaciones").hide();

$("h2")
    .fadeIn(3500);
$("h3")
    .delay(1500)
    .slideDown(2000);


    //Guardo JSON para traer los productos
$(()=>{
$.getJSON("data/PRODUCTOS.json",(respuesta)=>{ 
        PRODUCTOS = respuesta;
        console.log(PRODUCTOS);

        if (PRODUCTOS.length % 3 > 0){
            cantidadFilas = parseInt((PRODUCTOS.length/3)) + 1; 
        } else {
            cantidadFilas = PRODUCTOS.length / 3;
        }
        let cantidadColumnas = 3;
        let contadorProductos = 0;

        //GENERACION DEL CONTENIDO
        for (i=0; i<cantidadFilas; i++){
            $("#contenidoGenerado").append(`<div class="row" id="fila${i+1}"></div>`);
            for (j=0; j<cantidadColumnas; j++){
                if (contadorProductos == (PRODUCTOS.length)) {break;} //Cuando la variable contador sea igual al largo del array, para for para que no lance error.
                $(`#fila${i+1}`).append(crearComponente(PRODUCTOS[contadorProductos]));
                contadorProductos +=1;
            }
        }

        generacionEscuchas(); 
        $("#contenidoGenerado")
            .delay(3000)
            .toggle("slow");
        $("#titulo2").
            delay(3000).
            fadeIn("slow");
    })
})
function generacionEscuchas(){
$('button[id^="botonAgregar"]').click((e) =>{ 
    let idProducto = parseInt(e.target.id.substr(12)); 
    productosElegidos.add(PRODUCTOS[idProducto-1]);
    agregarCarrito();
    anularBotonAgregar(idProducto);
    habilitarBotonRemover(idProducto);
    console.log(productosElegidos + " " + contadorCarrito); 
    $("#notificaciones").html(`Seleccionaste el paquete: ${PRODUCTOS[idProducto-1].descripcion}`)
    $("#notificaciones").toggle(500).delay(1000).toggle(500);
    if (productosElegidos.size =!0 && contadorCarrito ==0){
        $("#carrito").toggle(1000);
        contadorCarrito +=1;
    }
})

$('button[id^="botonRemover"]').click((e)=>{ 
    let idProducto = parseInt (e.target.id.substr(12));
    productosElegidos.delete(PRODUCTOS[idProducto-1]); 
    removerCarrito(PRODUCTOS[idProducto-1].descripcion);
    habilitarBotonAgregar(idProducto);
    anularBotonRemover(idProducto);
    console.log(productosElegidos); 
    $("#notificaciones").html(`Deseleccionaste el paquete: ${PRODUCTOS[idProducto-1].descripcion}`);
    $("#notificaciones").toggle(500).delay(1000).toggle(500);
    if (productosElegidos.size == 0){
        $("#carrito").toggle(1000);
        contadorCarrito = 0;
    }
})

$('#enviarPost').click((e)=>{
    $("#contenidoPost h6").remove();
    productosElegidos.forEach(producto => enviarPost(producto));
    $("contenidoPost").fadeIn(3000).fadeOut(3000);
})
}

function crearComponente (producto){
    return `<div id="${producto.descripcion.toLowerCase()}" class="column" style="text-align:center;">
                <img src="${producto.imagen}" id="imagen${producto.id}" style="width: 500px; height: 500px;">
                <div class="container">
                    <h4>${producto.descripcion}</h4>
                    <h4>Precio: $${producto.precio}</h4>
                    <button id="botonAgregar${producto.id}">AGREGAR</button>
                    <button id="botonRemover${producto.id}" style="display:none;">REMOVER</button>
                </div>
            </div>`;
}


function habilitarBotonAgregar (id){
    $(`#botonAgregar${id}`).fadeIn(600);
    //console.log("Se habilitó el boton Agregar");
}

function anularBotonAgregar (id){
    $(`#botonAgregar${id}`).fadeOut(600);
    //console.log("Se inhabilitó el boton Agregar");

}

function habilitarBotonRemover (id){
    $(`#botonRemover${id}`).fadeIn(600);
    //console.log("Se habilitó el boton Remover");
}

function anularBotonRemover (id){
    $(`#botonRemover${id}`).fadeOut(600);
    //console.log("Se inhabilitó el boton Remover");
}

function enviarPost(producto){
    $.post("https://jsonplaceholder.typicode.com/posts", producto, (data, status)=>{
        if(status === "success"){
          $("#contenidoPost").append(`<h6>ID - ${data.id} - descripcion: ${data.descripcion} - precio: ${data.precio} </h6>`);
        }
    })
}

function agregarCarrito(){
    let contenidoGenerado = `<h3> Carrito   
                             <img class="carritoSVG" src="img/carrito.svg">
                             </h3>`;
    let precioTotal = 0;
    let id = 1;
    for (producto of productosElegidos){
        contenidoGenerado += `<h5 id="${producto.descripcion}">${id}) ${producto.descripcion}, $${producto.precio}</h5>`;
        precioTotal += producto.precio;
        id ++;
    }
    contenidoGenerado += `<h5 style="font-weight:900;"> Total: $${precioTotal} </h5>
                          <button id="Confirmar compra">Confirmar reserva</button>`;
    $("#carrito").html(contenidoGenerado);
}

function removerCarrito(id){
    console.log (id);
    $(`#${id}`).remove();
    let contenidoGenerado = `<h3> Carrito  
                             <img class= "carritoSVG" src="img/carrito.svg">
                             </h3>`;
    let precioTotal = 0;
    let numero = 1;
    for (producto of productosElegidos){
        contenidoGenerado += `<h5 id="${producto.descripcion}">${numero}) ${producto.descripcion}, $${producto.precio}</h5>`;
        precioTotal += producto.precio;
        numero ++;
    }
    contenidoGenerado += `<h5 style="font-weight:900;"> Total: $${precioTotal} </h5>
                          <button id="Confirmar compra">Confirmar reserva</button>`;
    $("#carrito").html(contenidoGenerado);
}