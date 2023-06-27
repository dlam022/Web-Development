x_o_checker = new Boolean(false);
gameover = new Boolean(false);
timerleft = new Boolean(true);

function clicked(event) {
    // let p = document.querySelector("body > div > div:nth-child(1) > div.two")
    console.log(event + ' clicked');


}
  
// let counter = 0;
let gameBoard = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
];

let row = -1;
let column = -1;
let xscore = 0;
let oscore = 0;

//document.write(xscore);

document.getElementsByClassName("display_player")[0].innerHTML = "Player X";

document.getElementsByClassName("display_xscore")[0].innerHTML = +xscore
document.getElementsByClassName("display_oscore")[0].innerHTML = +oscore;

function somefunction() {
    secondsleft--;
}


function myTimer() {
    timer.value = secondsleft;
    timer.textContent = secondsleft+ " seconds";
    secondsleft -= 1;
}


function checkClicked(){
    console.log("clicked");
    console.log(this.className);
    if (this.querySelector("span").textContent.length == 0 && gameover == false) {
        timerleft = true
        if (x_o_checker){
            let timer = document.querySelector("#timer"),
                        secondsleft = 10;
            var downloadTimer = setInterval(()=> {
                if(x_o_checker || timerleft === false) clearInterval(downloadTimer);
                

                if(secondsleft <= 0) {
                    clearInterval(downloadTimer);
                    // document.getElementById("notime").innerHTML = "no time";
                    if(x_o_checker){
                        document.getElementById("notime").innerHTML = "X has no time left. Skipped.";
                        document.getElementsByClassName("display_player")[0].innerHTML = "Player O";
                    }
                    else{
                        document.getElementById("notime").innerHTML = "O has no time left. Skipped.";
                        document.getElementsByClassName("display_player")[0].innerHTML = "Player X";
                    }
                    x_o_checker = !x_o_checker;
                }
                timer.value = secondsleft;
                timer.textContent =  secondsleft+ " seconds";
                secondsleft -= 1;

                if(!AIOff){
                    timer.textContent =  "You will need all the time ;)";
                    timer.value = 10;   
                }
            }, 1000)
            document.getElementsByClassName("display_player")[0].innerHTML = "Player O";
            this.querySelector("span").textContent = "x"
            if (this.className == "one") {
                gameBoard[0][0] = 1; // can probably move to the end and use gameBoard[row][column]
                row = 0;
                column = 0;
            }
            if (this.className == "two") {
                gameBoard[1][0] = 1;
                row = 1;
                column = 0;
            }
            if (this.className == "three") {
                gameBoard[2][0] = 1;
                row = 2;
                column = 0;
            }
            if (this.className == "four") {
                gameBoard[0][1] = 1;
                row = 0;
                column = 1;
            }
            if (this.className == "five") {
                gameBoard[1][1] = 1;
                row = 1;
                column = 1;
            }
            if (this.className == "six") {
                gameBoard[2][1] = 1;
                row = 2;
                column = 1;
            }
            if (this.className == "seven") {
                gameBoard[0][2] = 1;
                row = 0;
                column = 2;
            }
            if (this.className == "eight") {
                gameBoard[1][2] = 1;
                row = 1;
                column = 2;
            }
            if (this.className == "nine") {
                gameBoard[2][2] = 1;
                row = 2;
                column = 2;
            }
            // switch time thing
            // console.log("x placed")
        }
        else {
            let timer = document.querySelector("#timer"),
            secondsleft = 10;
            var downloadTimer = setInterval(()=> {
                if(!x_o_checker || timerleft === false) clearInterval(downloadTimer);

                if(secondsleft <= 0) {
                    clearInterval(downloadTimer);
                    // document.getElementById("notime").innerHTML = "no time";
                    if(x_o_checker){
                        document.getElementById("notime").innerHTML = "X has no time left. Skipped.";
                        document.getElementsByClassName("display_player")[0].innerHTML = "Player O";
                    }
                    else{
                        document.getElementById("notime").innerHTML = "O has no time left. Skipped.";
                        document.getElementsByClassName("display_player")[0].innerHTML = "Player X";
                    }
                    x_o_checker = !x_o_checker;
                }

                timer.value = secondsleft;
                timer.textContent =  secondsleft+ " seconds";
                secondsleft -= 1;
                // console.log(gameover)

            }, 1000)
            
            document.getElementsByClassName("display_player")[0].innerHTML = "Player X";
            this.querySelector("span").textContent = "o"
            if (this.className == "one") {
                gameBoard[0][0] = 0;
                row = 0;
                column = 0;

            }
            if (this.className == "two") {
                gameBoard[1][0] = 0;
                row = 1;
                column = 0;
            }
            if (this.className == "three") {
                gameBoard[2][0] = 0;
                row = 2;
                column = 0;
            }
            if (this.className == "four") {
                gameBoard[0][1] = 0;
                row = 0;
                column = 1;
            }
            if (this.className == "five") {
                gameBoard[1][1] = 0;
                row = 1;
                column = 1;
            }
            if (this.className == "six") {
                gameBoard[2][1] = 0;
                row = 2;
                column = 1;
            }
            if (this.className == "seven") {
                gameBoard[0][2] = 0;
                row = 0;
                column = 2;
            }
            if (this.className == "eight") {
                gameBoard[1][2] = 0;
                row = 1;
                column = 2;
            }
            if (this.className == "nine") {
                gameBoard[2][2] = 0;
                row = 2;
                column = 2;
            }
            // switch time thing here
            // console.log("o placed")
        }
        x_o_checker = !x_o_checker;
        checkFinish(row,column);
        // clearInterval(myInterval);
        if(!AIOff){
            let mostProbableMove = AIBestNextMove();
            console.log(mostProbableMove)
            if(mostProbableMove.row < 0){
                // console.log("inside")
                if(checkTie()){
                    document.getElementById("winner").innerHTML = "There is a tie!"
                    timerleft = false;
                    gameover = true;
                    NewGame();
                    return;
                }
            }
            row = mostProbableMove.row;
            column =  mostProbableMove.column;
            gameBoard[row][column] = 0;
            checkFinish(row,column);
            document.getElementsByClassName("display_player")[0].innerHTML = "Player X";
            // this.querySelector("span").textContent = "o"
            x_o_checker = !x_o_checker;
            if (row == 0 && column == 0){
                clicked_one.querySelector("span").textContent = "o"
            }
            if (row == 1 && column == 0){
                clicked_two.querySelector("span").textContent = "o"
            }
            if (row == 2 && column == 0){
                clicked_three.querySelector("span").textContent = "o"
            }
            if (row == 0 && column == 1){
                clicked_four.querySelector("span").textContent = "o"
            }
            if (row == 1 && column == 1){
                clicked_five.querySelector("span").textContent = "o"
            }
            if (row == 2 && column == 1){
                clicked_six.querySelector("span").textContent = "o"
            }
            if (row == 0 && column == 2){
                clicked_seven.querySelector("span").textContent = "o"
            }
            if (row == 1 && column == 2){
                clicked_eight.querySelector("span").textContent = "o"
            }
            if (row == 2 && column == 2){
                clicked_nine.querySelector("span").textContent = "o"
            }
        }
    }
    if (gameover === true){
        clearInterval(downloadTimer);
        console.log("GAME OVER APPARENTLY")
    }

    if (gameover === true && !AIOff){
        // clearInterval(downloadTimer);
        // console.log("GAME OVER APPARENTLY")
        console.log("LOST TO AI")
        var myWindow = window.open("", "MsgWindow","width = 700, height = 400");
        myWindow.document.write("<img src='lose.gif'> YOU LOST TO THE AI. If you won, you probably cheated.");
    }
    // check if game ends
    //secondsleft = 10;
    document.getElementById("notime").innerHTML = "";
    NewGame();
    resetFunction();
    console.log(gameBoard);

}

function checkTie(){
    for(let i = 0; i < 3; i++){ // rows
        for( let j = 0; j < 3; j++){ // columns
            if (gameBoard[i][j] == '-1')
                return false; // found -1, aka a move exists 
        }
    }
    return true; // no more moves left.
}


class nextMove{
    constructor(){
        let row,column;
    }
}

// implementing  http://goo.gl/sJgv68 to give a value for the AI move
function evaluate(){
    for (let i = 0; i < 3; i++){
        if((gameBoard[i][0] == gameBoard[i][1]) && (gameBoard[i][1] == gameBoard[i][2])){
            
            if(gameBoard[i][0] == 0){
                return +10;
            }
            else if (gameBoard[i][0] == 1){ 
                return -10;
            }
        }
    }
    for(let i = 0; i < 3 ; i++){
        if(gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i]){
            // console.log(gameBoard[0][i])
            if(gameBoard[0][i] == 0){
                return +10;
            }
            else if (gameBoard[0][i] == 1){
                return -10;
            }
        }
    }
    
    if(gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]){
        if (gameBoard[0][0] == 0){
            return +10;
        }
        else if (gameBoard[0][0] == 1){
            return -10;
        }
    }

    if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]){
        if (gameBoard[0][2] == 0) {
            return +10;
        }
        else if (gameBoard[0][2] == 1){
            return -10;
        }
    }
    return 0;
}

function minmax(depth, isMax){
    let score = evaluate();

    if (score == 10){
        return score;
    }

    if (score == -10){
        return score;
    }
    // console.log(checkTie())
    if (checkTie()){
        return 0;
    }

    if (isMax){
        let bestVal = -1000;

        for (let i =0; i<3; i++){
            for (let j =0; j<3; j++){
                if (gameBoard[i][j] == -1){
                    gameBoard[i][j] = 0;
                    // console.log(gameBoard)
                    bestVal = Math.max(bestVal, minmax(depth+1, !(isMax)));

                    gameBoard[i][j] = -1;
                }
            }
        }
        return bestVal;
    }
    else {
        let bestVal = 1000;
        
        for (let i =0; i<3; i++){
            for (let j =0; j<3; j++){
                if (gameBoard[i][j] == -1){
                    gameBoard[i][j] = 1;

                    bestVal = Math.min(bestVal, minmax(depth+1, !(isMax)));

                    gameBoard[i][j] = -1;
                }
            }
        }
        return bestVal;
    }
}

function AIBestNextMove(){
    let val = -1000;
    let mostProbableMove = new nextMove()
    mostProbableMove.column = -1;
    mostProbableMove.row = -1;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(gameBoard[i][j] == -1){ // check if row, col is empty
            
                gameBoard[i][j] = 0; // make a move

                let currMove = minmax(0, false); // calculate

                gameBoard[i][j] = -1; // undo the move
                if (currMove > val){
                    mostProbableMove.row = i;
                    mostProbableMove.column =j;
                    val = currMove;
                }
            }
        }

    }
    console.log("The value of the best Move is : " + val)
    return mostProbableMove;

}



function checkFinish(row,column) {
    let counter = 0;
    // check column
    if(checkTie()){
        document.getElementById("winner").innerHTML = "There is a tie!"
        timerleft = false;
        gameover = true;
        NewGame();
        return;
    }
    for(let i = 0; i < 3; i++){
        if (gameBoard[row][i] == -1){
            break;
            
        }
        counter = gameBoard[row][i] + counter;
        if (counter == 3){
            console.log("win x");
            xscore++;
            console.log(xscore);
            document.getElementById("winner").innerHTML = "Player X Win Game Over"
            timerleft = false;
            gameover = true;
            // clearInterval(downloadTimer);
            NewGame();
        }
        console.log(counter)
        if (counter == 0 && i == 2){
            console.log("win o");
            oscore++;
            console.log(oscore);
            document.getElementById("winner").innerHTML = "Player O Win Game Over"
            timerleft = false;
            gameover = true;
            NewGame();
        }
    }
    // check row
    counter = 0;
    for(let i = 0; i < 3; i++){
        if (gameBoard[i][column] == -1){
            break;
            
        }
        counter = gameBoard[i][column] + counter;
        if (counter == 3){
            console.log("win x");
            xscore++;
            console.log(xscore);
            document.getElementById("winner").innerHTML = "Player X Win Game Over"
            timerleft = false;
            gameover = true;
            NewGame();
        }
        console.log(counter)
        if (counter == 0 && i == 2){
            console.log("win o");
            oscore++;
            console.log(oscore);
            document.getElementById("winner").innerHTML = "Player O Win Game Over"
            timerleft = false;
            gameover = true;
            NewGame();
        }
    }
    // check diagonal
    counter = 0;
    if (column == row) {
        for (let i = 0; i < 3; i++){
            if (gameBoard[i][i] == -1){
                break;
            }
            counter = gameBoard[i][i] + counter;
            if (counter == 3){
                console.log("win x");
                xscore++;
                console.log(xscore);
                document.getElementById("winner").innerHTML = "Player X Win Game Over"
                timerleft = false;
                gameover = true;
                NewGame();
            }
            console.log(counter)
            if (counter == 0 && i == 2){
                console.log("win o");
                oscore++;
                console.log(oscore);
                document.getElementById("winner").innerHTML = "Player O Win Game Over"
                timerleft = false;
                gameover = true;
                NewGame();
            }
        }
    }

    // other diagonal
    counter = 0;
    if (column + row == 2) { // checks [1][1] [0][2] [2][0]
        for (let i = 0; i< 3; i++){
            if (gameBoard[i][2-i] == -1){
                break;
            }
            counter = gameBoard[i][2-i] + counter;
            if (counter == 3){
                console.log("win x");
                xscore++;
                console.log(xscore);
                document.getElementById("winner").innerHTML = "Player X Win Game Over"
                timerleft = false;
                gameover = true;
                NewGame();
            }
            console.log(counter)
            if (counter == 0 && i == 2){
                console.log("win o");
                oscore++;
                console.log(oscore);
                document.getElementById("winner").innerHTML = "Player O Win Game Over"
                timerleft = false;
                gameover = true;
                NewGame();
            }
        }
    }
    document.getElementsByClassName("display_xscore")[0].innerHTML = +xscore;
    document.getElementsByClassName("display_oscore")[0].innerHTML = +oscore;
}

function NewGame() {
    //const restartGame = document.getElementsByClassName("reset");
    const restartGame = document.querySelector("body > button.new_game");
    restartGame.addEventListener("click", () => {
        const xo = document.querySelectorAll(".xo");
        gameBoard = [
            [-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]
        ];
    
        row = -1;
        column = -1;

        xo.forEach(xo => xo.textContent = "");
        x_o_checker = true;
        document.getElementsByClassName("display_player")[0].innerHTML = "Player X";
        gameover = false;
        document.getElementById("winner").innerHTML = "";
        timerleft = false;

    });

}

function resetFunction() {
    const resetScore = document.querySelector("body > button.reset");
    resetScore.addEventListener("click", () => {
        const xo = document.querySelectorAll(".xo");
        gameBoard = [
            [-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]
        ];
    
        row = -1;
        column = -1;

        xo.forEach(xo => xo.textContent = "");
        x_o_checker = true;
        document.getElementsByClassName("display_player")[0].innerHTML = "Player X";
        gameover = false;
        xscore = 0;
        oscore = 0;
        document.getElementsByClassName("display_xscore")[0].innerHTML = +xscore;
        document.getElementsByClassName("display_oscore")[0].innerHTML = +oscore;  
        timerleft = false;
    });
}

gameBoard_blank = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
];

let AIOff = new Boolean(true);
function AIToggle(){
    AIOff = !AIOff;
    if (gameBoard != gameBoard_blank && !x_o_checker && (gameover == false || !gameover)){
        let mostProbableMove = AIBestNextMove();
        console.log(mostProbableMove)
        if(mostProbableMove.row < 0){
            // console.log("inside")
            if(checkTie()){
                document.getElementById("winner").innerHTML = "There is a tie!"
                gameover = true;
                NewGame();
                return;
            }
        }
        row = mostProbableMove.row;
        column =  mostProbableMove.column;
        gameBoard[row][column] = 0;
        checkFinish(row,column);
        document.getElementsByClassName("display_player")[0].innerHTML = "Player X";
        // this.querySelector("span").textContent = "o"
        x_o_checker = !x_o_checker;
        if (row == 0 && column == 0){
            clicked_one.querySelector("span").textContent = "o"
        }
        if (row == 1 && column == 0){
            clicked_two.querySelector("span").textContent = "o"
        }
        if (row == 2 && column == 0){
            clicked_three.querySelector("span").textContent = "o"
        }
        if (row == 0 && column == 1){
            clicked_four.querySelector("span").textContent = "o"
        }
        if (row == 1 && column == 1){
            clicked_five.querySelector("span").textContent = "o"
        }
        if (row == 2 && column == 1){
            clicked_six.querySelector("span").textContent = "o"
        }
        if (row == 0 && column == 2){
            clicked_seven.querySelector("span").textContent = "o"
        }
        if (row == 1 && column == 2){
            clicked_eight.querySelector("span").textContent = "o"
        }
        if (row == 2 && column == 2){
            clicked_nine.querySelector("span").textContent = "o"
        }
    }
}


const clicked_one = document.querySelector("body > div > div:nth-child(1) > div.one")
const clicked_two = document.querySelector("body > div > div:nth-child(1) > div.two")
const clicked_three = document.querySelector("body > div > div:nth-child(1) > div.three")
const clicked_four = document.querySelector("body > div > div:nth-child(2) > div.four")
const clicked_five = document.querySelector("body > div > div:nth-child(2) > div.five")
const clicked_six = document.querySelector("body > div > div:nth-child(2) > div.six")
const clicked_seven = document.querySelector("body > div > div:nth-child(3) > div.seven")
const clicked_eight = document.querySelector("body > div > div:nth-child(3) > div.eight")
const clicked_nine = document.querySelector("body > div > div:nth-child(3) > div.nine")

// console.log(clicked_two);
clicked_one.addEventListener("click", checkClicked, false);
clicked_two.addEventListener("click", checkClicked, false);
clicked_three.addEventListener("click", checkClicked, false);
clicked_four.addEventListener("click", checkClicked, false);
clicked_five.addEventListener("click", checkClicked, false);
clicked_six.addEventListener("click", checkClicked, false);
clicked_seven.addEventListener("click", checkClicked, false);
clicked_eight.addEventListener("click", checkClicked, false);
clicked_nine.addEventListener("click", checkClicked, false);