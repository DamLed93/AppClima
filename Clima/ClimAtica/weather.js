const appKey = "e49ed0de25dcb29c168ca49eebd3385b";
var ciudad = "Buenos Aires, AR";
var btnRecargar = document.getElementById("refrescar");
var pImagen = document.getElementById("imagen");
var lCiudad = document.getElementById("ciudad");

// ETIQUETAS PARA VISUALIZAR EL ESTADO DEL TIEMPO 
var lTemp = document.getElementById("temperatura");
var lHume = document.getElementById("humedad");
var lPres = document.getElementById("presion");
var lVien = document.getElementById("viento");
var lPron = document.getElementById("descripcion");
var lMima = document.getElementById("minimax");
var lUact = document.getElementById("actualizacion");
var Rueda = document.getElementById("rueda");

btnRecargar.addEventListener("click", obtenerDatosDelClima);

document.addEventListener("DOMContentLoaded", obtenerDatosDelClima);

function cargando(s) {
    switch(s) {
        case "a": Rueda.classList.add("active"); break;
        case "i": Rueda.classList.remove("active"); break;
    }
}

function obtenerDatosDelClima() {
    cargando("a");
    if (ciudad.value === "") {
        alert("Debe ingresar una búsqueda valida.");
    } else {
        var URLowm = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(ciudad) + "&appid="+appKey+"&units=metric&lang=ES";
        peticionHTTPAsincronica(URLowm, respuesta);
    }
}

function peticionHTTPAsincronica(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => { 
        if (req.readyState == 4 && req.status == 200) callback(req.responseText);
    }
    req.open("GET", url, true); //método asincrónico
    req.send();
}

function respuesta(r) {
    let clima = JSON.parse(r);
    lCiudad.innerHTML  = clima.name + ", " + clima.sys.country;
    lTemp.innerHTML = "Temperatura: " + clima.main.temp.toFixed(1) + "° C";
    lHume.innerHTML = "Humedad: " + parseInt(clima.main.humidity) + "%"
    lPres.innerHTML = "Presión: " + parseInt(clima.main.pressure) + " hPa";
    lVien.innerHTML = "Viento: " + parseInt(clima.wind.speed * 3.6) + " Km/h";
    lPron.innerHTML = "Se espera: " + clima.weather[0].description;
    lMima.innerHTML = "Mínima: " + parseInt(clima.main.temp_min) +"° / Máxima: " + parseInt(clima.main.temp_max) +"°";
    pImagen.src = "http://openweathermap.org/img/w/" + clima.weather[0].icon + ".png";
    pImagen.setAttribute("width", "90px");
    lUact.innerHTML = ultimaActualizacion();
    cargando("i");
}

function ultimaActualizacion() {
    d = new Date();
    f = d.getDate(); if (f < 10) {f = "0" + f};
    m =  (d.getMonth() + 1); if (m < 10) {m = "0" + m};
    actualizacionFecha = f + "/" + m + "/" + d.getFullYear();
    actualizacionHora = d.getHours() + ":" + d.getMinutes() + " hs.";
    return actualizacionFecha + " " + actualizacionHora;
}

const boton = document.getElementById("accion")

console.dir(boton)

