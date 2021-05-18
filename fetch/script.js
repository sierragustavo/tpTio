let botonFetch = document.querySelector("#hacerFetch");
let botonBorrar = document.querySelector("#hacerDELETE");
let botonGET = document.querySelector("#hacerGET");
let mostrar = document.querySelector("#resultado");
let botonDeleteID = document.querySelector("#deleteID");
let botonPreset = document.querySelector("#botonPreset");


botonDeleteID.addEventListener("click", remove);
botonFetch.addEventListener("click", postFetch);
botonGET.addEventListener("click", getDatos);
botonBorrar.addEventListener("click", borrarTodo);
botonPreset.addEventListener("click", addPreset);
let miURL = "https://web-unicen.herokuapp.com/api/groups/Sierr/Tabla";

function addPreset() {
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
        fetch(miURL, {

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
                return r.json();
            }
        }).then(function (json) {
            getDatos();
        }).catch(function (e) {
            console.log(e);
        })
    }
}
function borrarTodo() {
    fetch(miURL, {
        method: "GET",
        mode: "cors"
    }
    ).then(function (r) {
        if (!r.ok) {
            console.log("error");
        }
        else {
            return r.json();
        }
    }
    ).then(function (json) {
        console.log("trabajando con la function(json)" + json);
        for (let data of json.Tabla) {

        }
    }).catch(function (e) {

    })
}

function remove() {
    let inputID = document.querySelector("#inputID");
    fetch(miURL + "/" + inputID, {
        method: 'DELETE'
    }).then(() => {
        console.log('removed');
    }).catch(err => {
        console.error(err)
    });
}

async function borrar_fila(i) {
    let respuesta = await fetch(miURL);
    let json = await respuesta.json();
    await fetch(miURL + json.Equipos[i]._id, {
        "method": "DELETE",
    });

    console.log("llega porfavor")
}

function getDatos() {

    fetch(miURL, {
        method: "GET",
        mode: "cors"
    }
    ).then(function (r) {
        if (!r.ok) {
            console.log("error");
        }
        else {
            return r.json();
        }
    }
    )
        .then(function (json) {
            console.log(json);
            mostrar.innerHTML = "";
            for (let data of json.Tabla) {
                mostrar.innerHTML += "nombre: " + data.thing.name + " ";
                mostrar.innerHTML += "class: " + data.thing.class + "<br>";
            }
        }
        )
        .catch(function (e) {
            console.log(e);
        })
}

function postFetch() {
    let inputNombre = document.querySelector("#nombre").value;
    let inputClase = document.querySelector("#clase").value;
    let clase = {
        "thing": {
            "class": inputClase,
            "name": inputNombre,
            "specs": [
                {
                    "name": "Balance",
                    "dps": 3450
                },
                {
                    "name": "Feral",
                    "dps": 3240
                }
            ]
        }
    }
        ;

    fetch(miURL, {

        "method": "POST",
        "mode": "cors",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(clase)

    }).then(function (r) {
        if (!r.ok) {
            console.log("error");
        }
        else {
            console.log("todo ok");
            return r.json();
        }
    }).then(function (json) {
        getDatos();
    }).catch(function (e) {
        console.log(e);
    })
        ;
}