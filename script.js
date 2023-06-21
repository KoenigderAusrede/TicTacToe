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
playWin = new Audio('audio/winning.mp3')

function init(){
    render();
}

function aniCircle(element) {
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90px" height="90px">
      <path fill="none" stroke="red" stroke-width="10" d="M45 10 a35 35 0 0 1 0 70 a35 35 0 0 1 0 -70">
        <animate attributeName="stroke-dasharray" dur="0.7s" from="0 220" to="220 0" repeatCount="1" />
      </path>
    </svg>`;
    playCircle.play();
  }
  
  function aniCross(element) {
    element.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90px" height="90px">
      <path fill="none" stroke="green" stroke-width="10" d="M20 20 L70 70" stroke-dasharray="100" stroke-dashoffset="100">
        <animate attributeName="stroke-dashoffset" dur="0.5s" from="100" to="0" repeatCount="1" fill="freeze" />
      </path>
      <path fill="none" stroke="green" stroke-width="10" d="M70 20 L20 70" stroke-dasharray="100" stroke-dashoffset="100">
        <animate attributeName="stroke-dashoffset" begin="0.7s" dur="0.5s" from="100" to="0" repeatCount="1" fill="freeze" />
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
      checkWin();
    }
  }
  render()

  function checkWin() {
    // Definiere die Gewinnkombinationen (waagerecht, senkrecht und diagonal)
    const winCombinations = [
      [0, 1, 2], // erste Reihe
      [3, 4, 5], // zweite Reihe
      [6, 7, 8], // dritte Reihe
      [0, 3, 6], // erste Spalte
      [1, 4, 7], // zweite Spalte
      [2, 5, 8], // dritte Spalte
      [0, 4, 8], // Diagonale von links oben nach rechts unten
      [2, 4, 6]  // Diagonale von rechts oben nach links unten
    ];
  
    // Überprüfe jede Gewinnkombination
    for (let combination of winCombinations) {
      const [index1, index2, index3] = combination;
      const symbol1 = fields[index1].symbol;
      const symbol2 = fields[index2].symbol;
      const symbol3 = fields[index3].symbol;
  
      // Wenn alle Symbole in der Kombination gleich sind und nicht null, dann gibt es einen Gewinner
      if (symbol1 !== null && symbol1 === symbol2 && symbol2 === symbol3) {
        // Gewinner gefunden, handle den Gewinn (z.B. Anzeige einer Nachricht)
        const winner = symbol1;
        console.log(`Spieler ${winner} hat gewonnen!`);
        drawWinningLine(index1, index2, index3);
        return; // Beende die Funktion, da ein Gewinner gefunden wurde
      }
    }
  
    // Es gibt keinen Gewinner, Spiel geht weiter
    console.log('Kein Gewinner');
  }
  

  function drawWinningLine(index1, index2, index3) {
    playWin.play();
    const cell1 = document.getElementById(`cell${index1}`);
    const cell2 = document.getElementById(`cell${index2}`);
    const cell3 = document.getElementById(`cell${index3}`);
  
    const content = document.getElementById("content");
  
    // Erzeuge die Gewinnlinie als SVG-Element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = content.offsetTop + "px";
    svg.style.left = content.offsetLeft + "px";
  
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", "gold");
    line.setAttribute("stroke-width", "6");
  
    // Bestimme die Position und Ausrichtung der Linie
    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();
    const rect3 = cell3.getBoundingClientRect();
  
    const x1 = rect1.left + rect1.width / 2 - content.offsetLeft;
    const y1 = rect1.top + rect1.height / 2 - content.offsetTop;
    const x2 = rect3.left + rect3.width / 2 - content.offsetLeft;
    const y2 = rect3.top + rect3.height / 2 - content.offsetTop;
  
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
  
    svg.appendChild(line);
    content.appendChild(svg);
  }

  function restartGame() {
    fields = [
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
      render();
 }