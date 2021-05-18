let miURL = "https://web-unicen.herokuapp.com/api/groups/SierraReyes/Contact/";
let captcha = document.getElementById("cod-captcha");
let entry = document.getElementById("entry-captcha");
let characterCheck = document.getElementById("characterCheck");
let comprobacion = false;

//INPUTS PARA EL FORM
let formName = document.getElementById("formName");
let formEmail = document.getElementById("formEmail");
let formDate = document.getElementById("formDate");
let formText = document.getElementById("formText");
let datosVer = document.getElementById("datosVer");

//BOTONES FORM
document
  .getElementById("buttonGenerate")
  .addEventListener("click", generateCaptcha);
document.getElementById("buttonTry").addEventListener("click", compareCaptcha);
document.getElementById("buttonSend").addEventListener("click", comprobarMail);
document
  .querySelector("#botonMostrarTodos")
  .addEventListener("click", mostrarMensajesTodos);
document
  .querySelector("#botonMostrarActual")
  .addEventListener("click", mostrarMensajeActual);
function generateCaptcha() {
  let a = parseInt(Math.random() * 9 + 1);
  let b = parseInt(Math.random() * 9 + 1);
  let c = parseInt(Math.random() * 9 + 1);
  let d = parseInt(Math.random() * 9 + 1);
  let e = parseInt(Math.random() * 9 + 1);
  let code = "" + a + b + c + d + e;
  captcha.innerHTML = code;
}

function compareCaptcha() {
  console.log(captcha.innerHTML);
  console.log(entry.value);
  if (entry.value == captcha.innerHTML) {
    characterCheck.innerHTML = "✔";
    comprobacion = true;
    characterCheck.classList.add("valid-string");
    characterCheck.classList.remove("invalid-string");
  } else {
    comprobacion = false;
    characterCheck.innerHTML = "✘";
    characterCheck.classList.add("invalid-string");
    characterCheck.classList.remove("valid-string");
  }
}

function comprobarMail() {
  let check1 = false;
  let check2 = false;
  let check3 = false;
  let check4 = false;
  if (formName.value.length == 0) check1 = false;
  else check1 = true;
  if (formEmail.value.length == 0) check2 = false;
  else check2 = true;
  if (formDate.value.length == 0) check3 = false;
  else check3 = true;
  if (formText.value.length == 0) check4 = false;
  else check4 = true;
  console.log(check1, check2, check3, check4, comprobacion);
  if (
    check1 == true &&
    check2 == true &&
    check3 == true &&
    check4 == true &&
    comprobacion == true
  ) {
    enviarMensaje();
  } else {
    datosVer.innerHTML = "At least one of the inputs contains erros";
    datosVer.classList.remove("valid-string");
    datosVer.classList.add("invalid-string");
  }
}

async function enviarMensaje() {
  let mensaje = {
    thing: {
      nombre: formName.value,
      mailPersonal: formEmail.value,
      texto: formText.value,
      fecha: formDate.value,
    },
  };
  await fetch(miURL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mensaje),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      } else {
        datosVer.innerHTML = "Message Sent!";
        datosVer.classList.add("valid-string");
        datosVer.classList.remove("invalid-string");
      }
    })
    .catch(function (e) {
      console.log(e);
    });
}

async function mostrarMensajesTodos() {
  let selectMensajes = document.querySelector("#selectMensajes");
  while (selectMensajes.firstChild){
    selectMensajes.removeChild(selectMensajes.lastChild);
  }
  await fetch(miURL, {
    method: "GET",
    mode: "cors",
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      } else {
        console.log("todo ok");
        return r.json();
      }
    })
    .then(function (json) {
      for (let mensajes of json.Contact) {
        let nodoOption = document.createElement("OPTION");
        let textoOption = document.createTextNode(mensajes.thing.nombre);
        nodoOption.appendChild(textoOption);
        selectMensajes.appendChild(nodoOption);
        nodoOption.setAttribute("id", mensajes._id);
      }
      return;
    })
    .catch(function (e) {
      console.log(e);
    });
}

async function mostrarMensajeActual() {
  let posicion = document.querySelector("#selectMensajes").selectedIndex;
  console.log(posicion);
  await fetch(miURL, {
    method: "GET",
    mode: "cors",
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      } else {
        console.log("todo ok");
        return r.json();
      }
    })
    .then(function (json) {
      let mostrarNombre = document.querySelector("#mostrar-nombre");
      let mostrarMail = document.querySelector("#mostrar-mail");
      let mostrarFecha = document.querySelector("#mostrar-fecha");
      let mostrarMensaje = document.querySelector("#mostrar-mensaje");
      mostrarNombre.innerHTML = "Nombre: " + json.Contact[posicion].thing.nombre;
      mostrarMail.innerHTML = "Mail: " + json.Contact[posicion].thing.mailPersonal;
      mostrarFecha.innerHTML = "Fecha de Nacimiento: " + json.Contact[posicion].thing.fecha;
      mostrarMensaje.innerHTML = "Mensaje: " + json.Contact[posicion].thing.texto;
      return;
    })
    .catch(function (e) {
      console.log(e);
    });
}
