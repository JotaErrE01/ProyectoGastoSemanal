export class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        //calcular restante
        this.calcularRestante();
    }

    calcularRestante(){
        // this.restante = this.presupuesto;
        // this.gastos.forEach(gasto => {
        //     this.restante = this.restante - gasto.cantidad;
        // }); o tambien como abajo
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);//0 es el indice donde comenzará a recorrer
        this.restante = this.presupuesto - gastado;
    }

    borrarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== parseInt(id));
        this.calcularRestante();
    }
}