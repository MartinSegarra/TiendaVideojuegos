
//SI EXISTE LISTA VIDEOJUEGOS LO TRAIGO, SINO ARRAY VACÍO PARA EMPEZAR
let listaVideojuegos = localStorage.listaVideojuegos ? JSON.parse(localStorage.listaVideojuegos) : [];
const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

console.log(listaVideojuegos)

//SI EL ARRAY ESTÁ VACIO, TRAIGO EL JSON DESDE CERO, SI NO, TRAIGO LOS QUE QUEDARON


if (listaVideojuegos.length <= 0) {
  $( () => {
    $.getJSON("data/videojuegos.json",(respuesta, estado) => {
        if (estado === "success") {
          listaVideojuegos = respuesta ;
          mostrarVideojuegos()
        }
      })
  })
}else {
mostrarVideojuegos()
$("#botonCarrito").html(`<button type="submit" class="btn_1">VER CARRITO</button>`)
}

//FUNCION GENERADORA DE VIDEOJUEGOS

function mostrarVideojuegos () {
  listaVideojuegos.sort(function(a, b) {
    return a.id - b.id;
  });
  $("#todosLosVideojuegos"). empty ()
  listaVideojuegos.forEach ((juego) => {

    $("#todosLosVideojuegos").append (`<div id ="${juego.nombre}" class="wow flipInY col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <input value = "${juego.id}" type="hidden">
    <div class="single-popular-items mb-50 text-center">
    <div class="popular-img">
      <img src="${juego.cover}">
      <div class="img-cap">
      <span onclick="agregarCarrito(${listaVideojuegos.indexOf(juego)})">Añadir al carrito</span>
    </div>
    </div>
    <div class="popular-caption">
      <h3>${juego.nombre}</h3>
      <span>${juego.precio}$</span>
    </div>
    </div>`)
  })}

  //FUNCION GENERADORA DEL BOTON DE CARRITO

    function agregarCarrito (index) {
      let juegoSumado = listaVideojuegos [index];
      carrito.push (juegoSumado);
      listaVideojuegos.splice (listaVideojuegos.indexOf(juegoSumado),1)
      $('#notificacion').html(`<h5 class="row section-tittle mb-7">Agregaste ${juegoSumado.nombre} al carrito </h5>`);
      mostrarVideojuegos();
      $("#notificacion").fadeIn(750).fadeOut(750,()=>{ 
        localStorage.carrito = JSON.stringify(carrito)
        $("#botonCarrito").html(`<button type="submit" class="btn_1">VER CARRITO</button>`)
         localStorage.listaVideojuegos = JSON.stringify(listaVideojuegos)})}

  // SI NO HAY NINGUN VIDEOJUEGO EN EL CARRITO, DESAPAREZCO EL BOTON DE CARRITO

    if(carrito.length <= 0) {
      $("#botonCarrito").empty()
    }else{
      $("#botonCarrito").html(`<button type="submit" class="btn_1">VER CARRITO</button>`)
      }







