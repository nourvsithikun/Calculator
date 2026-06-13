const result = document.getElementById('result');

let current = '0';
let previous = null;
let operator = null;
let resetNext = false;

function updateDisplay() {
  result.textContent = current;
}

function inputDigit(d) {
  if (resetNext) {
    current = '0';
    resetNext = false;
  }
  if (current === '0') current = d;
  else current += d;
}

function inputDot() {
  if (resetNext) {
    current = '0';
    resetNext = false;
  }
  if (!current.includes('.')) current += '.';
}

function setOperator(op) {
  if (operator && previous !== null && !resetNext) {
    compute();
  }
  previous = parseFloat(current);
  operator = op;
  resetNext = true;
}

function compute() {
  if (operator === null || previous === null) return;
  const curr = parseFloat(current);
  let res;
  switch (operator) {
    case '+': res = previous + curr; break;
    case '-': res = previous - curr; break;
    case 'x': res = previous * curr; break;
    case '/': res = curr === 0 ? 'Error' : previous / curr; break;
  }
  current = res === 'Error' ? 'Error' : String(res);
  operator = null;
  previous = null;
  resetNext = true;
}

function deleteLast() {
  if (resetNext) return;
  current = current.length > 1 ? current.slice(0, -1) : '0';
}

function reset() {
  current = '0';
  previous = null;
  operator = null;
  resetNext = false;
}

document.getElementById('keypad_7').addEventListener('click', () => { inputDigit('7'); updateDisplay(); });
document.getElementById('keypad_8').addEventListener('click', () => { inputDigit('8'); updateDisplay(); });
document.getElementById('keypad_9').addEventListener('click', () => { inputDigit('9'); updateDisplay(); });
document.getElementById('keypad_4').addEventListener('click', () => { inputDigit('4'); updateDisplay(); });
document.getElementById('keypad_5').addEventListener('click', () => { inputDigit('5'); updateDisplay(); });
document.getElementById('keypad_6').addEventListener('click', () => { inputDigit('6'); updateDisplay(); });
document.getElementById('keypad_1').addEventListener('click', () => { inputDigit('1'); updateDisplay(); });
document.getElementById('keypad_2').addEventListener('click', () => { inputDigit('2'); updateDisplay(); });
document.getElementById('keypad_3').addEventListener('click', () => { inputDigit('3'); updateDisplay(); });
document.getElementById('keypad_0').addEventListener('click', () => { inputDigit('0'); updateDisplay(); });
document.getElementById('keypad_dot').addEventListener('click', () => { inputDot(); updateDisplay(); });

document.getElementById('keypad_plus').addEventListener('click', () => { setOperator('+'); updateDisplay(); });
document.getElementById('keypad_minus').addEventListener('click', () => { setOperator('-'); updateDisplay(); });
document.getElementById('keypad_mul').addEventListener('click', () => { setOperator('x'); updateDisplay(); });
document.getElementById('keypad_div').addEventListener('click', () => { setOperator('/'); updateDisplay(); });

document.getElementById('keypad_del').addEventListener('click', () => { deleteLast(); updateDisplay(); });
document.getElementById('keypad_reset').addEventListener('click', () => { reset(); updateDisplay(); });
document.getElementById('keypad_equal').addEventListener('click', () => { compute(); updateDisplay(); });