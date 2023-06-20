let currentPlayer = "circle";
let fields = [
  { symbol: null, animated: false },
  { symbol: null, animated: false },
  { symbol: null, animated: false },
  { symbol: null, animated: false },
  { symbol: null, animated: false },
  { symbol: null, animated: false },
  { symbol: null, animated: false },
  { symbol: null, animated: false },
  { symbol: null, animated: false },
];

playCross = new Audio("audio/cross.mp3")
playCircle = new Audio("audio/circle.mp3")

function init(){
    render();
}

function aniCircle(element) {
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90px" height="90px">
      <path fill="none" stroke="red" stroke-width="10" d="M45 10 a35 35 0 0 1 0 70 a35 35 0 0 1 0 -70">
        <animate attributeName="stroke-dasharray" dur="1s" from="0 220" to="220 0" repeatCount="1" />
      </path>
    </svg>`;
    playCircle.play();
  }
  
  function aniCross(element) {
    element.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90px" height="90px">
      <path fill="none" stroke="green" stroke-width="10" d="M20 20 L70 70" stroke-dasharray="100" stroke-dashoffset="100">
        <animate attributeName="stroke-dashoffset" dur="1s" from="100" to="0" repeatCount="1" fill="freeze" />
      </path>
      <path fill="none" stroke="green" stroke-width="10" d="M70 20 L20 70" stroke-dasharray="100" stroke-dashoffset="100">
        <animate attributeName="stroke-dashoffset" begin="1s" dur="1s" from="100" to="0" repeatCount="1" fill="freeze" />
      </path>
    </svg>`;
    playCross.play()
  }
  

function render() {
    let content = document.getElementById("content");
    let tableHtml = '<table>';
  
    for (let i = 0; i < 3; i++) {
      tableHtml += '<tr>';
  
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const { symbol, animated } = fields[index];
        let symbolHtml = '';
  
        const cellId = `cell${index}`;
        
        if (fields[index].animated === true) {
            console.log('läuft')
            return;
        } else {

        if (animated) {
          if (symbol === 'circle') {
            symbolHtml = aniCircle();
          } else if (symbol === 'cross') {
            symbolHtml = aniCross();
          }
        }
    }
        tableHtml += `<td onclick="cellClick(${index})" id="${cellId}">${symbolHtml}</td>`;
      }
  
      tableHtml += '</tr>';
    }
  
    tableHtml += '</table>';
    content.innerHTML = tableHtml;
  }
  
  function cellClick(index) {
    if (fields[index].symbol === null && !fields[index].animated) {
      fields[index].symbol = currentPlayer;
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
  
      const cellId = `cell${index}`;
      const element = document.getElementById(cellId);
  
      if (fields[index].symbol === 'circle') {
        aniCircle(element);
      } else if (fields[index].symbol === 'cross') {
        aniCross(element);
      }
  
      fields[index].animated = true;
  
      render();
    }
  }
  
  render()