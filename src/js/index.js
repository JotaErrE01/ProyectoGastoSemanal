"use stric";
import { Presupuesto } from './classes/Presupuesto';
import { UI } from './classes/UI';

//variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
const ui = new UI();
let presupuesto;


//funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = Number(prompt('¿Cuál es tu Presupuesto?').trim());
    
    if(!presupuestoUsuario || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();//recarga la pagina
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    // console.log(presupuestoUsuario)
    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();
    const nombreGasto = formulario.querySelector('#gasto').value.trim().toUpperCase();
    const cantidad = Number(formulario.querySelector('#cantidad').value.trim());

    if(!nombreGasto || !isNaN(nombreGasto)){
        ui.imprimirAlerta('El Nombre no es Válido', 'error', formulario);
        return;
    }else if(isNaN(cantidad) || cantidad <= 0 || !cantidad){
        ui.imprimirAlerta('Cantidad no Válida', 'error', formulario);
        return;
    }

    //Generar un objeto con el gasto
    const gasto = { nombreGasto, cantidad, id: Date.now() };

    //añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);
    ui.imprimirAlerta('Gasto Agregado Correctamente', '', formulario);
    formulario.reset();

    //insertar nuevo gasto en el html
    ui.nuevoGastoHtml(presupuesto, gastoListado);

    //insertar cantidad restante en el html
    ui.insertarPresupuesto(presupuesto);

    //comprobar presupuesto
    ui.comprobarPresupuesto(presupuesto);
}

function borrarGasto(e){
    if(e.target.classList.contains('borrar-gasto')){
        presupuesto.borrarGasto(e.target.parentElement.dataset.id);
        ui.nuevoGastoHtml(presupuesto, gastoListado);
        ui.insertarPresupuesto(presupuesto);
        ui.comprobarPresupuesto(presupuesto);
    }
}

//eventos
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);

    gastoListado.addEventListener('click', borrarGasto);
}

eventListeners();
