

let planes = [
{   id: 1,
    estadia: 'Standard',
    precio: 200,
},
{
    id: 2,
    estadia: 'Premium',
    precio: 400,
},
{
    id: 3,
    estadia: 'Exclusive',
    precio: 700
},
{
    id: 4,
    estadia: 'Suite',
    precio: 1000
}

]


for ( const plan of planes) {
    $("#app").append(`          <button type="button" class="btn btn-primary standard probando">Standard</button>
    `);
    $(`#btn${plan.id}`).on('click', function () {
        console.log(`Compreaste ${plan.estadia}`);
    });
}



let economico = planes.filter (plan => plan.precio <= 350 ) ;
let medio = planes.filter (plan => plan.precio <= 600);

function nombre () {
    let guardarNombre = localStorage.getItem(ingreseNombre);
    document.querySelector ('ingreseNombre').value = guardarNombre ;

}
let nom  = document.getElementById ("ingreseNombre");
let apellido = document.getElementById ("ingreseApellido");

nom.onchange = () => { console.log ("Nombre ingresado")};

 
  
let reservas = document.getElementById ("btnReserva")
reservas.addEventListener ("click", respuestaClick)
function respuestaClick (){ 
 swal.fire("Reservado con exito");
};

//$("body").prepend('<button class="btn btn-primary" id="btnReserva" type="submit">Reservar</button>');
//$("btnReserva").click(function() 
//{ 
  //  console.log (this);
//});


$("body").prepend("<h1 class='hotelTitulo'> HOTEL BASTILLE, HOTEL EN BUENOS AIRES</h1>");

$("h1").fadeIn(2000, () =>
  $("h1").fadeOut(2000, () =>
    $("body").prepend("<h1 class='hotelTitulo'> HOTEL BASTILLE, HOTEL EN BUENOS AIRES</h1>"),

  )
)
;


$("body").prepend("<img src='img/eventos 1-min.jpg' class='card-img-bottom slide-in-left' alt='...'>");
$("img").fadeIn(2000, () =>
$("img").fadeOut(2000, () =>
$("body").prepend("<img src='img/eventos 1-min.jpg' class='card-img-bottom slide-in-left' alt='...'>"),
)
)
;