import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState('');
  const [currentOperation, setCurrentOperation] = useState(null);
  const [shouldResetScreen, setShouldResetScreen] = useState(false);

  const appendNumber = (number) => {
    if (display === '0' || shouldResetScreen) {
      setDisplay(number);
      setShouldResetScreen(false);
    } else if (display.length < 9) {
      setDisplay(display + number);
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand('');
    setCurrentOperation(null);
    setShouldResetScreen(false);
  };

  const toggleSign = () => {
    setDisplay((-parseFloat(display)).toString());
  };

  const percentage = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const setOperation = (operator) => {
    if (currentOperation !== null) evaluate();
    setFirstOperand(display);
    setCurrentOperation(operator);
    setShouldResetScreen(true);
  };

  const evaluate = () => {
    if (currentOperation === null || shouldResetScreen) return;
    const secondOperand = display;
    let result;

    switch (currentOperation) {
      case '+':
        result = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case '−':
        result = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case '×':
        result = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case '÷':
        result = parseFloat(firstOperand) / parseFloat(secondOperand);
        break;
      default:
        return;
    }

    // Format the result
    result = parseFloat(result.toFixed(7));
    
    if (Math.abs(result) > 999999999) {
      setDisplay(result.toExponential(3));
    } else {
      setDisplay(result.toString().slice(0, 9));
    }

    setCurrentOperation(null);
    setShouldResetScreen(true);
  };

  const handleButtonClick = (value) => {
    if (value >= '0' && value <= '9' || value === '.') {
      appendNumber(value);
    } else if (value === 'AC') {
      clear();
    } else if (value === '±') {
      toggleSign();
    } else if (value === '%') {
      percentage();
    } else if (['+', '−', '×', '÷'].includes(value)) {
      setOperation(value);
    } else if (value === '=') {
      evaluate();
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="function" onClick={() => handleButtonClick('AC')}>AC</button>
        <button className="function" onClick={() => handleButtonClick('±')}>±</button>
        <button className="function" onClick={() => handleButtonClick('%')}>%</button>
        <button className="operator" onClick={() => handleButtonClick('÷')}>÷</button>
        
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button className="operator" onClick={() => handleButtonClick('×')}>×</button>
        
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button className="operator" onClick={() => handleButtonClick('−')}>−</button>
        
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button className="operator" onClick={() => handleButtonClick('+')}>+</button>
        
        <button className="zero" onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button className="equals" onClick={() => handleButtonClick('=')}>=</button>
      </div>
    </div>
  );
}

export default App;