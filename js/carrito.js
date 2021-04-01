
carrito = JSON.parse(localStorage.getItem("carrito"))
listaVideojuegos = JSON.parse(localStorage.getItem("listaVideojuegos"))

mostrarCarrito()

console.log(carrito)


function mostrarCarrito () {
    carrito.sort(function(a, b) {
        return a.id - b.id;
      });
    $("#juegosCarrito").empty()
    $("#botonIndex").empty()
    $("#finalizarCompra").empty()
    if(carrito.length == 0) {
        $("#notificacionCarrito").html(`<h3>No tenés videojuegos en el carrito</h3>`)
        $("#botonIndex").html(`<button type="submit" class="btn_1">AÑADIR VIDEOJUEGOS</button>`)
    }else{
        var total = 0;
        carrito.forEach ((item) => {
            $("#juegosCarrito").append(`<div id ="${item.nombre}" class="wow flipInY col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <input value = "${item.id}" type="hidden">
            <div class="single-popular-items mb-50 text-center">
            <div class="popular-img">
              <img src="${item.cover}">
              <div class="img-cap">
              <span onclick="quitarVideojuego(${carrito.indexOf(item)})">Quitar del carrito</span>
            </div>
            </div>
            <div class="popular-caption">
              <h3>${item.nombre}</h3>
              <span>${item.precio}$</span>
            </div>
            </div>`)
            total = total + item.precio; 
        })

       
        $("#botonIndex").append(`<button type="submit" class="btn_1">AÑADIR VIDEOJUEGOS</button>`)
        $("#finalizarCompra").append(`<h3>TOTAL: $${total}</h3>
                                <button class="btn_1" onclick="finalizarCompra()" >FINALIZAR COMPRA</button>`)
    
    }

}

function quitarVideojuego (index) {
    let quitado = carrito [index];
    listaVideojuegos.push(quitado);
    carrito.splice(carrito.indexOf(quitado),1)
    mostrarCarrito()
    $('#notificacionQuitaste').html(`<h5 class="row section-tittle mb-7">Quitaste ${quitado.nombre} del carrito </h5>`);
    $("#notificacionQuitaste").fadeIn(750).fadeOut(750,() => { 
   
        localStorage.carrito = JSON.stringify(carrito)
        localStorage.listaVideojuegos = JSON.stringify(listaVideojuegos)
    })}

    function finalizarCompra () {
        $("#juegosCarrito").empty()
        $("#botonIndex").empty()
        $("#finalizarCompra").empty()
        $("#mensajeFinal").empty()
        $("#mensajeFinal").prepend(`<h2>Gracias por tu compra!</h2>`)
    }



