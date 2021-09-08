

let planes = [
{ 
    estadia: 'Standard',
    precio: 200,
},
{
    estadia: 'Premium',
    precio: 400,
},
{
    estadia: 'Exclusive',
    precio: 700
},
{
    estadia: 'Suite',
    precio: 1000
}

]
let economico = planes.filter (plan => plan.precio <= 350 ) ;
let medio = planes.filter (plan => plan.precio <= 600);

function nombre () {
    let guardarNombre = localStorage.getItem(ingreseNombre);
    document.querySelector ('ingreseNombre').value = guardarNombre ;

}
let nom  = document.getElementById ("ingreseNombre");
let apellido = document.getElementById ("ingreseApellido");

nom.onchange = () => { console.log ("Nombre ingresado")};

 
  
let reservar = document.getElementById ("btnReserva")
reservar.addEventListener ("click", respuestaClick)
function respuestaClick (){ 
 swal.fire("Reservado con exito");
};

$("body").prepend('<button class="btn btn-primary" id="btnReserva" type="submit">Reservar</button>');
$("btnReserva").click(function() 
{ 
    console.log (this);
});