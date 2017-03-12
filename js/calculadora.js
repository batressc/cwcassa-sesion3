var nuevaOperando = false;
var limpiarHistorial = false;
var operando1 = undefined;
var operando2 = undefined;
var operadorAnt = undefined;
var operadorAct = undefined;
var resultado = undefined;

function initializeComponents() {
    var btns = document.getElementsByTagName('input');
    for(var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute('type') === 'button') {
            btns[i].onclick = function() {
                btn(this.value);
            }
        }
    }
}

function limpiar() {
    limpiarHistorial = true;
    resultado = undefined;
    operando1 = undefined;
    operando2 = undefined;
    operadorAct = undefined;
    operadorAnt = undefined;
}

//Realiza el calculo de las operaciones introducidas
function btn(value) {
    if (!isNaN(value)) {
        if (limpiarHistorial) {
            document.getElementById('historial').value = '';
            limpiarHistorial = false;
        }
        if (nuevaOperando) {
            document.getElementById('resultado').value = value;
        } else {
            document.getElementById('resultado').value += value;
        }
        nuevaOperando = false;
    } else {
        operadorAnt = operadorAct;
        operadorAct = value;

        if (operando1 === undefined) {
            operando1 = +document.getElementById('resultado').value;
        } else if (operando2 === undefined) {
            operando2 = +document.getElementById('resultado').value;
        }

        if (operando1 !== undefined) {
            document.getElementById('historial').value += `${document.getElementById('resultado').value} ${operadorAct} `;
            switch (operadorAnt) {
                case '+':
                    resultado = operando1 + (isNaN(operando2) ? 0 : operando2);
                    break;
                case '/':
                    resultado = operando1 / (isNaN(operando2) ? 1 : operando2);
                    break;
                case '*':
                    resultado = operando1 * (isNaN(operando2) ? 1 : operando2);
                    break;
            }
            if (isNaN(resultado)) resultado = operando1;
            document.getElementById('resultado').value = resultado;
            if (operadorAct === '=') {
                limpiar();
            } else {
                operando1 = resultado;
                operando2 = undefined;
            }
        } else {
            limpiar();
        }
        nuevaOperando = true;
    }
}