let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
msgRef.innerText = "Bora bill";
//winning patters array || matriz de padrões vencedores
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// player 'X' plays first || jogador 'X' joga primeiro
let xTurn = true;
let count = 0;

//disable all buttons ||  desativar todos os botões
const disableButtons = () => {
    btnRef.forEach((element) => { element.disabled = true });
    //enable popup
    popupRef.classList.remove("hide");
};

//enable all buttons (for new games and restart)
//ativar todos os botões (para novos jogos e reiniciar)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    // disable popup || desativar pop-up
    popupRef.classList.add("hide");
}

// this function is executed when a player wins
// esta função é executada quando um jogador ganha
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br>O 'X' ganhou";
    } else {
        msgRef.innerHTML = "&#x1F389; <br>O '0' ganhou";
    }
};

// function of draw || funcao de empate
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F389; <br>Deu empate";
}

// new gamer || novo jogo
newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// win logic || logica ganhar
const winChecker = () => {
    //loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        // check if elements are filled 
        // verifique se os elementos estão preenchidos
        // if 3 empty elements are same and would give win as would
        // se 3 elementos vazios forem iguais e dariam vitória como daria
        if (element1 != "" && (element2 != "") && (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //  if all 3 buttons have same values then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
};


// Display X/0 on click || Exibir X/0 ao clicar
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            // Display 0
            element.innerText = "0";
            element.disabled = true;
        }
        // increment count on cach click
        // contagem de incremento em cada clique
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        // Check for win on every click
        // Verifique se há vitória em cada clique
        winChecker();
    });
});

// Enable Buttons and disable popup on page load
// Ativar botões e desativar pop-up no carregamento da página
window.onload = enableButtons;




