document.addEventListener('DOMContentLoaded', mostrarTabla);
let miURL = "https://web-unicen.herokuapp.com/api/groups/SierraReyes/Tabla/";
let actualizando;

async function mostrarTabla() {
  let tableDPS = document.querySelector("#tableDPS");
  clearInterval(actualizando);
  tableDPS.innerHTML = "";
  await fetch(miURL, {
    method: "GET",
    mode: "cors"
  }
  ).then(function (r) {
    if (!r.ok) {
      console.log("error");
    }
    else {
      console.log("todo ok");
      return r.json();
    }
  }
  ).then(function (json) {
    let indiceBotones = 0;
    actualizando = setInterval(autoActualizar, 5000, json, "mostrarTabla");
    for (let clases of json.Tabla) {
      mostrarClase(clases, indiceBotones);
      indiceBotones++;
    }
    return;
  })
    .catch(function (e) {
      console.log(e);
    });
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.querySelector("#tableDPS");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


async function addClass() {
  let nombre = document.querySelector("#nombre");
  let clase = document.querySelector("#clase");
  let especialidad = document.querySelector("#especialidad");
  let damage = document.querySelector("#damage");
  let clasePersonal = {
    "thing": {
      class: clase.value,
      name: nombre.value,
      specs: [{
        name: especialidad.value,
        dps: damage.value
      }]
    }
  };
  await fetch(miURL, {

    "method": "POST",
    "mode": "cors",
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(clasePersonal)

  }).then(function (r) {
    if (!r.ok) {
      console.log("error");
    }
    else {
      mostrarTabla();
    }
  }).catch(function (e) {
    console.log(e);
  })
}

async function addPreset() {
  clearInterval(actualizando);
  let loader = document.querySelector("#loaderPreset");
  loader.style.visibility = "visible";
  let clasesPreset = [{
    "thing": {
      class: "Warrior",
      name: "Warrior",
      specs: [{
        name: "Fury",
        dps: 2980
      }, {
        name: "Arms",
        dps: 2750
      }]
    },
  }, {
    "thing": {
      class: "Rogue",
      name: "Rogue",
      specs: [{
        name: "Subtlety",
        dps: 3980
      }, {
        name: "Outlaw",
        dps: 3570
      }, {
        name: "Assassination",
        dps: 2830
      }],
    }
  }, {
    "thing": {
      class: "Druid",
      name: "Druid",
      specs: [{
        name: "Balance",
        dps: 2450
      }, {
        name: "Feral",
        dps: 2390
      }],
    }
  }, {
    "thing": {
      class: "Mage",
      name: "Mage",
      specs: [{
        name: "Arcane",
        dps: 3760
      }, {
        name: "Frost",
        dps: 3420
      }, {
        name: "Fire",
        dps: 2530
      }
      ],
    }
  }, {
    "thing": {
      class: "DeathKnight",
      name: "DeathKnight",
      specs: [{
        name: "Frost",
        dps: 3060
      }, {
        name: "Unholy",
        dps: 2530
      }],
    }
  }, {
    "thing": {
      class: "DemonHunter",
      name: "DemonHunter",
      specs: [{
        name: "Havoc",
        dps: 3060
      }],
    }
  }, {
    "thing": {
      class: "Monk",
      name: "Monk",
      specs: [{
        name: "Windwalker",
        dps: 3280
      }],
    }
  }, {
    "thing": {
      class: "Paladin",
      name: "Paladin",
      specs: [{
        name: "Retribution",
        dps: 3090
      }],
    }
  }, {
    "thing": {
      class: "Hunter",
      name: "Hunter",
      specs: [{
        name: "Beast Master",
        dps: 3250
      }, {
        name: "Marksmanship",
        dps: 3380
      }, {
        name: "Survival",
        dps: 3450
      }],
    }
  }, {
    "thing": {
      class: "Priest",
      name: "Priest",
      specs: [{
        name: "Shadow",
        dps: 3090
      }]
    }
  }, {
    "thing": {
      class: "Warlock",
      name: "Warlock",
      specs: [{
        name: "Affliction",
        dps: 3610
      }, {
        name: "Demonology",
        dps: 3000
      }, {
        name: "Destruction",
        dps: 3600
      }],
    }
  }, {
    "thing": {
      class: "Shaman",
      name: "Shaman",
      specs: [{
        name: "Elemental",
        dps: 2460
      }, {
        name: "Enhancement",
        dps: 2540
      }],
    }
  }];
  ;
  for (let i = 0; i < clasesPreset.length; i++) {
    await fetch(miURL, {

      "method": "POST",
      "mode": "cors",
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify(clasesPreset[i])

    }).then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      else {
        console.log("todo ok");
      }
    }).catch(function (e) {
      console.log(e);
    })
  }
  loader.style.visibility = "hidden";
  mostrarTabla();
}

function deleteTable() {
  clearInterval(actualizando);
  let loader = document.querySelector("#loaderDelete");
  loader.style.visibility = "visible";
  fetch(miURL, {
    method: "GET",
    mode: "cors"
  }
  ).then(function (r) {
    if (!r.ok) {
      console.log("error");
    }
    else {
      console.log("ok delete");
      return r.json();
    }
  }
  ).then(async function (json) {
    for (let i = 0; i < json.Tabla.length; i++) {
      try {
        await fetch(miURL + json.Tabla[i]._id, {
          "method": "DELETE"
        })
      }
      catch {
      }
    }
    loader.style.visibility = "hidden";
    mostrarTabla();
  })
}

async function borrarFila(i) {
  let respuesta = await fetch(miURL);
  let json = await respuesta.json();
  fetch(miURL + json.Tabla[i]._id, {
    "method": "DELETE"
  }).then(mostrarTabla);
}

async function editarFila(i) {
  console.log("editando: " + i);
  let nombre = document.querySelector("#nombre");
  let clase = document.querySelector("#clase");
  let especialidad = document.querySelector("#especialidad");
  let damage = document.querySelector("#damage");
  let clasePersonal = {
    "thing": {
      class: clase.value,
      name: nombre.value,
      specs: [{
        name: especialidad.value,
        dps: damage.value
      }]
    }
  };
  try {
    let respuesta = await fetch(miURL);
    let json = await respuesta.json();
    fetch(miURL + json.Tabla[i]._id, {
      "method": "PUT",
      "mode": "cors",
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify(clasePersonal)
    }).then(mostrarTabla);
  } catch (e) {
    console.log(e);
  };
}

async function filtrarTabla() {
  let tableDPS = document.querySelector("#tableDPS");
  let valorFiltro = document.querySelector("#clase").value;
  let botonesClase = document.getElementsByClassName("botonClase");
  for (let b of botonesClase) {
    b.removeAttribute("botonClase");
  }
  tableDPS.innerHTML = "";
  await fetch(miURL, {
    method: "GET",
    mode: "cors"
  }
  ).then(function (r) {
    if (!r.ok) {
      console.log("error");
    }
    else {
      console.log("todo ok");
      return r.json();
    }
  }
  ).then(function (json) {
    let indice = 0;
    clearInterval(actualizando);
    actualizando = setInterval(autoActualizar, 5000, json, "filtraTabla");
    for (let clases of json.Tabla) {
      if (valorFiltro === "MostrarTodos") {
        mostrarTabla();
        return;
      }
      if (valorFiltro === clases.thing.class) {
        mostrarClase(clases, indice);
      }
      indice++;
    }
    return;
  })
    .catch(function (e) {
      console.log(e);
    });
}

function calculateTier(clase) {
  let totalDPS = 0;
  let promedio;
  let tier;
  for (let i = 0; i < clase.specs.length; i++) {
    totalDPS += clase.specs[i].dps;
  }
  promedio = totalDPS / clase.specs.length;
  switch (true) {
    case (promedio > 3400):
      tier = 'A';
      break;
    case (promedio > 3100 && promedio <= 3400):
      tier = 'B';
      break;
    case (promedio > 2800 && promedio <= 3100):
      tier = 'C';
      break;
    case (promedio > 2500 && promedio <= 2800):
      tier = 'D';
      break;
    case (promedio <= 2500):
      tier = 'F';
      break;
    default:
      tier = 'X';
      break;
  }
  return tier;
}

function mostrarClase(clases, indice) {
  let nodoTR = document.createElement("TR");
  //NOMBRE Y CLASE
  let nodoTD = document.createElement("TD");
  let textoNAME = document.createTextNode(clases.thing.name);
  nodoTD.appendChild(textoNAME);
  nodoTD.className = clases.thing.class;
  nodoTR.appendChild(nodoTD);
  //SPEC
  let nodoSPEC = document.createElement("TD");
  for (let j = 0; j < clases.thing.specs.length; j++) {
    let textoSPEC = document.createTextNode(clases.thing.specs[j].name);
    nodoSPEC.appendChild(textoSPEC);
    if (clases.thing.specs.length > 1) {
      let nodoBR = document.createElement("BR");
      nodoSPEC.appendChild(nodoBR);
    }
  }
  nodoTR.appendChild(nodoSPEC);
  //DPS
  let nodoDPS = document.createElement("TD");
  for (let j = 0; j < clases.thing.specs.length; j++) {
    let textoDPS = document.createTextNode(clases.thing.specs[j].dps);
    nodoDPS.appendChild(textoDPS);
    if (clases.thing.specs.length > 1) {
      let BRDPS = document.createElement("BR");
      nodoDPS.appendChild(BRDPS);
    }
  }
  nodoTR.appendChild(nodoDPS);
  //TIER
  let nodoTIER = document.createElement("TD");
  let textoTIER = document.createTextNode(calculateTier(clases.thing));
  nodoTIER.appendChild(textoTIER);
  nodoTR.appendChild(nodoTIER);
  //BOTONES
  let botonDELETE = document.createElement("button");
  let textoDELETE = document.createTextNode("Borrar");
  let botonEDIT = document.createElement("button");
  let textoEDIT = document.createTextNode("Editar");
  botonDELETE.appendChild(textoDELETE);
  botonDELETE.setAttribute("onclick", "borrarFila(" + indice + ")");
  botonDELETE.setAttribute("class", "botonClase");
  botonEDIT.appendChild(textoEDIT);
  botonEDIT.setAttribute("onclick", "editarFila(" + indice + ")");
  botonEDIT.setAttribute("class", "botonClase");
  nodoTR.appendChild(botonDELETE);
  nodoTR.appendChild(botonEDIT);
  //AGREGAR TODO LO DE ARRIBA A LA TABLA
  document.querySelector("#tableDPS").appendChild(nodoTR);
}

async function autoActualizar(jsonCache, textointervalo) {
  await fetch(miURL, {
    method: "GET",
    mode: "cors"
  }
  ).then(function (r) {
    if (!r.ok) {
      console.log("error");
    }
    else {
      console.log("todo ok");
      return r.json();
    }
  }
  ).then(function (json) {
    console.log(textointervalo);
    let b = 0;

    if (json.Tabla.length != jsonCache.Tabla.length) {
      console.log("distinto length, actualizando");
      clearInterval(actualizando);
      mostrarTabla();
      return;
    }
    for (let a = 0; a < json.Tabla.length; a++) {
      if (json.Tabla[a]._id != jsonCache.Tabla[b]._id) {
        console.log("distinto, actualizando");
        clearInterval(actualizando);
        mostrarTabla();
        return;
      }
      b++;
    }
    console.log("no hubo diferencias");
    /*if (jsonCache.Tabla == json.Tabla) {
      console.log("es la misma tabla");
    } else {
      console.log("es distinta, actualizando");
    }*/
  }).catch(function (e) {
    console.error(e);
  })
}