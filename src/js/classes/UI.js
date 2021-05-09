export class UI{

    insertarPresupuesto(cantidad){
        const { presupuesto, restante } = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(msj, tipo, formulario){
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = msj;

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    nuevoGastoHtml({ gastos }, gastoListado){
        //limpiar html
        this.limpiarHtml(gastoListado);

        gastos.forEach(gasto => {
            const { cantidad, nombreGasto, id } = gasto;
            //crear li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;
            nuevoGasto.innerHTML = `${nombreGasto} <span class = "badge badge-primary badge-pill"> $${cantidad} </span>`;
            
            //boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.textContent = 'X';
            nuevoGasto.appendChild(btnBorrar);
            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHtml(gastoListado){
        while(gastoListado.firstChild){
            gastoListado.firstChild.remove();
        }
    }

    comprobarPresupuesto({presupuesto, restante}){
        const restanteDiv = document.querySelector('.restante');
        if(restante <= (presupuesto/4)){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if(restante <= (presupuesto/2)){
            restanteDiv.classList.remove('alert-success', 'alert-danger');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }
    }
}