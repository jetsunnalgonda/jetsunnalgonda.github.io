console.log('sudoku')

const gameStatusIndicator = document.getElementById('status')

// const canvas = document.querySelector('#canvas');
// const canvas = document.getElementById('game')
// const width = canvas.width;// 500
// const height = canvas.height;// 300

// console.log(canvas.height)

// get the context
// let ctx = canvas.getContext('2d');

// set fill and stroke styles
// ctx.fillStyle = '#30373F';
// ctx.strokeStyle = '#1a1e23' //'#eaeaf4';

let cellWidth = 50
let solveOwnSudoku = false

let currentPuzzle = 0 // Currently displayed puzzle

let messageBox = document.querySelector('#messageBox');

var drawGame = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // draw a rectangle with fill and stroke
            ctx.fillRect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
            ctx.strokeRect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
        }
    }
    ctx.strokeStyle = '#1a1e23' //'#d5edf1'
    for (let i = 3; i < 9; i+=3) {
        ctx.strokeRect(i * cellWidth, 0, 1, 9 * cellWidth)
        ctx.strokeRect(0, i * cellWidth, 9 * cellWidth, 1)
    }
}

var numbers = [[0,0,9,0,0,2,0,0,5],
               [5,3,8,0,6,4,0,0,9],
               [1,6,2,0,0,0,0,3,0],
               [0,0,3,0,2,7,0,0,0],
               [0,5,4,6,0,0,1,0,0],
               [0,0,7,0,1,5,3,4,0],
               [3,0,0,8,0,1,9,0,6],
               [7,0,0,3,0,0,8,5,0],
               [0,9,1,0,0,0,4,7,0]]
var numbersSolved = numbers.map( (arr) => arr.slice())
var savedBoards = []

var drawNumbers = () => {
    ctx.font = "30px Trebuchet MS";
    ctx.fillStyle = "#dae0e5";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle'
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            ctx.fillText("1", (j * cellWidth) + cellWidth/2, (i * cellWidth) + cellWidth/2); 
        }
    }
    
}
let table = document.querySelector('#board')
var rows = []
var cells = []
// var cellRow = []

var drawGame2 = () => {
    
    // var tbody = document.createElement('tbody')
    // var tbody = table.createTBody();

    for (let i = 0; i < 9; i++) {
        // if (i % 3 == 0) {
        //     table.appendChild(tbody)
        // }
        rows[i] = table.insertRow(i)
        
        if (i % 3 == 0 && i != 0) rows[i].className = 'thickLines'

        for (let j = 0; j < 9; j++) {
            // cellRow[j] = rows[i].insertCell(j)
            // cellRow[j].innerHTML = "1"
            let cell = rows[i].insertCell(j)
            // cellRow[j].innerHTML = "1"            
            cells[i * 9 + j] = document.createElement('input')
            cells[i * 9 + j].setAttribute("type", "text");
            cells[i * 9 + j].setAttribute("maxlength", "2");
            // cellRow[j].setAttribute("oninput", "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)")
            cells[i * 9 + j].setAttribute("oninput", "javascript: if (isNaN(+this.value)) this.value = ''; if (this.value.length > 1) this.value = this.value.slice(1,2);")
            cells[i * 9 + j].addEventListener("keydown", keyDown)
            // cells[i * 9 + j].addEventListener('keypress', function(e){
            // cellRow[j].setAttribute("oninput", "javascript: console.log('+this.value = ' + +this.value)")
            cell.appendChild(cells[i * 9 + j])
            // cellRow[j].value = '2'
            // if (i > 2 && j > 6) cells[2][4].value = '3'
        }
        // cells.push(cellRow)
        // console.log(cells[i])
        // if (i > 1) console.log(cells[2][4].value)
    }
}

// document.addEventListener('keydown', function(e) {
//     console.log('key presssdcfsdfsdf')
//     console.log(e.key)
//     console.log(e.code)
//     var code = e.key
//     if (code == '38') {
//         // Up
//         console.log('up')
//     }
//     else if (code == '40') {
//         // Down
//     }
//     else if (code == '37') {
//        // Left
//     }
//     else if (code == '39') {
//        // Right
//     }
// })

function keyDown(e) {
    // console.log('key press')
    // console.log(e)
    let row = this.parentElement.parentElement.rowIndex
    let col = this.parentElement.cellIndex

    // console.log(cells[row,col])
    // console.log([row, col])
    if (e.key == 'ArrowRight') {
        console.log('right')
        let n = cells.length
        let i = row * 9 + col + 1
        for (; i < n; i++) {
            console.log('i = ' + i)
            if (cells[i].value == '') break
        }

        if (cells[i]) cells[i].focus()
    } else if (e.key == 'ArrowLeft') {
        console.log('left')
        let n = cells.length
        let i = row * 9 + col - 1
        for (; i >= 0; i--) {
            console.log('i = ' + i)
            if (cells[i].value == '') break
        }

        if (cells[i]) cells[i].focus()
    } else if (e.key == 'ArrowUp') {
        console.log('up')
        let n = cells.length
        let i = row * 9 + col - 9
        for (; i >= 0; i-= 9) {
            console.log('i = ' + i)
            if (cells[i].value == '') break
        }

        if (cells[i]) cells[i].focus()
    } else if (e.key == 'ArrowDown') {
        console.log('down')
        let n = cells.length
        let i = row * 9 + col + 9
        for (; i < n; i+= 9) {
            console.log('i = ' + i)
            if (cells[i].value == '') break
        }

        if (cells[i]) cells[i].focus()
    }

}

var fillNumbers = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // cells[i][j].value = numbers[i][j]
            if (numbers[i][j] != 0) {
                cells[i * 9 + j].value = numbers[i][j]
                cells[i * 9 + j].readOnly = 'true'
                cells[i * 9 + j].className = 'givenNumber'
            } else {
                cells[i * 9 + j].value = ''
                cells[i * 9 + j].readOnly = ''
                cells[i * 9 + j].className = ''
            }

            // console.log('cells[i][j].value = '+ cells[i][j].value)
            // console.log('numbers[i][j] = ' + numbers[i][j])
        }
    }
    
}

let checkButton
let solveButton
let resetButton
let solveOwnButton
let saveButton
let saveNewButton
let arrowLeftButton
let arrowRightButton

let testButton

// let checkValidDutch
let retrieveButtons = []

let wrapper

var drawButtons = () => {
    console.log('hello')
    wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    checkButton = document.createElement('button')
    solveButton = document.createElement('button')
    resetButton = document.createElement('button')
    solveOwnButton = document.createElement('button')
    saveButton = document.createElement('button')
    saveNewButton = document.createElement('button')

    // testButton = document.createElement('button')

    arrowLeftButton = document.createElement('button')
    arrowRightButton = document.createElement('button')
    // checkValidDutch = document.createElement('button')

    solveButton.className = 'btn-1'

    // checkButton.classList.add('btn-1')
    // solveButton = document.createElement('input')
    // solveButton.setAttribute("type", "text")
    checkButton.textContent = 'Check'
    solveButton.innerHTML = '<span>Solve</span>'
    resetButton.textContent = 'Reset'
    solveOwnButton.textContent = 'Solve your own Sudoku'
    saveButton.textContent = 'Save board state'
    saveNewButton.textContent = 'Save new board state'

    // testButton.textContent = 'Test'

    arrowLeftButton.textContent = '<'
    arrowRightButton.textContent = '>'
    // checkValidDutch.textContent = 'Check if valid Dutch so far'

    // solveButton.onclick = fillAll();// => { alert('blah'); };
    checkButton.setAttribute("onclick", "checkAndUpdateBoard();")
    solveButton.setAttribute("onclick", "solveBoard();")
    resetButton.setAttribute("onclick", "resetBoard();")
    solveOwnButton.setAttribute("onclick", "emptyBoard();")
    saveButton.setAttribute("onclick", "saveBoard();")
    saveNewButton.setAttribute("onclick", "saveNewBoard();")

    arrowLeftButton.setAttribute("onclick", "arrowLeft_click();")
    arrowRightButton.setAttribute("onclick", "arrowRight_click();")

    // testButton.setAttribute("onclick", "Test();")
    // checkValidDutch.setAttribute("onclick", "checkValidDutch();")

    checkButton.className = "checkButton"
    arrowLeftButton.className = "arrowLeft"
    arrowRightButton.className = "arrowRight"

    arrowLeftButton.classList.add('hidden')
    arrowRightButton.classList.add('hidden')

    // testButton.classList.add('test')

    wrapper.appendChild(checkButton)
    wrapper.appendChild(solveButton)
    wrapper.appendChild(resetButton)
    wrapper.appendChild(solveOwnButton)
    wrapper.appendChild(saveButton)
    wrapper.appendChild(saveNewButton)

    let arrows = document.getElementById('arrows')
    // let test = document.getElementById('test')
    arrows.appendChild(arrowLeftButton)
    arrows.appendChild(arrowRightButton)

    // test.appendChild(testButton)
    // wrapper.appendChild(checkValidDutch)
    document.body.appendChild(wrapper)
}

var drawRetrieveButtons = () => {
    let newButton = document.createElement('button')
    let counter = (retrieveButtons.length + 1)
    newButton.textContent = 'Puzzle ' + counter
    newButton.addEventListener('click', function(e) {
        retrieveState(e, this);
      });
    wrapper.appendChild(newButton)

    retrieveButtons.push(newButton)

}

let puzzleNo = 0

var retrieveState = (e, theObject) => {
    // console.log('e = ')
    // console.log(e)
    // console.log('object = ')
    // console.log(theObject)
    
    puzzleNo = theObject.textContent.slice(7) - 1
    console.log('retrieving this state:')
    console.log(savedBoards[puzzleNo])
    // resetSolvedNumbers(savedBoards[puzzleNo])
    

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            savedBoards[puzzleNo][i][j] != 0 ? 
            cells[i * 9 + j].value = savedBoards[puzzleNo][i][j] :
            cells[i * 9 + j].value = ''
        }
    } 
    // numbersSolved = savedBoards[puzzleNo]
    // updateBoard()

}

var bstatus = 0
const solution_limit = 13413

var checkAndUpdateBoard = () => {
    bstatus = checkBoard()
    changeStatusIndicator()
}
var checkBoard = () => {
    
    // alert('Checking...')
    // let status = 0
    // Check all the rows
    console.log('checking the board')
    bstatus = 1
    for (let i = 0; i < 9; i++) {
        let sum = 0, rows = {}
        for (let j = 0; j < 9; j++) {
            // console.log('rows[cells[i * 9 + j].value] = ' + rows[cells[i * 9 + j].value])
            if (rows[cells[i * 9 + j].value] != undefined) {
                bstatus = 0
            }
            
            sum += +cells[i * 9 + j].value
            if (cells[i * 9 + j].value == '') return 0 // Incomplete puzzle 
            rows[cells[i * 9 + j].value] = 1
            console.log('rows = ' + rows)
        }
        console.log(sum)
        if (sum != 45) {
            bstatus = 4
            // break
        }
    }

    return bstatus
    // bstatus = 1
    // if (bstatus == 0)
    //     gameStatusIndicator.textContent = 'The game is incomplete'
    // else if (bstatus == 1) 
    //     gameStatusIndicator.textContent = 'You solved the puzzle!'
    
}
var changeStatusIndicator = () => {
    if (bstatus == 0)
        gameStatusIndicator.textContent = 'The game is incomplete'
    else if (bstatus == 1)
        gameStatusIndicator.textContent = 'You solved the puzzle!'
    else if (bstatus == 2)
        gameStatusIndicator.textContent = 'The puzzle is solved'
    else if (bstatus == 3)
        gameStatusIndicator.textContent = 'The puzzle is unsolvable'
    else if (bstatus == 4)
        gameStatusIndicator.textContent = 'The solution is wrong'
    else if (bstatus == 5)
        gameStatusIndicator.textContent = 'There are ' + solutions.length + ' solutions'
    else if (bstatus == 6)
        gameStatusIndicator.textContent = 'There are ' + solutions.length + '+ solutions'        
}
var solveBoard = () => {
    console.log('solving board...')
    console.log('cells[0].value = ' + cells[0].value)
    console.log('cells[1].value = ' + cells[1].value)
    console.log('solveOwnSudoku = ' + solveOwnSudoku)
    solutions = []
    if (solveOwnSudoku) {
        resetSolvedNumbers(numbersSolved)
        console.log('changed the numbers to be solved')
    }
    console.log('isBoardValid() = ' + isBoardValid())
    counter = 0
    // if (isBoardValid()) {
    //     solve() ? bstatus = 2 : bstatus = 3
    // } else bstatus = 3
    if (isBoardValid()) solve()
    if (solutions.length == 0) {
        arrowLeftButton.classList.add('hidden')
        arrowRightButton.classList.add('hidden')
        bstatus = 3
    }
    else if(solutions.length == 1) {
        switchSolutions(0)
        bstatus = 2
    }
    else {
        switchSolutions(0)
        solutions.length == solution_limit ? bstatus = 6 : bstatus = 5
    }
        

    console.log('counter = ' + counter)
    // if (bstatus == 3) resetSolvedNumbers()
    if (solutions.length > 1) {
        arrowLeftButton.classList.remove('hidden')
        arrowRightButton.classList.remove('hidden')
    }
    updateBoard()
    changeStatusIndicator()
}

var switchSolutions = (n) => {
    currentPuzzle = n
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            numbersSolved[i][j] = solutions[n][i][j]
        }
    }
}

var arrowLeft_click = () => {
    if (currentPuzzle == 0) return
    switchSolutions(currentPuzzle - 1)
    updateBoard()
}
var arrowRight_click = () => {
    if (currentPuzzle == solutions.length) return
    switchSolutions(currentPuzzle + 1)
    updateBoard()
}

var resetSolvedNumbers = (solvedNumbers) => {
    // numbersSolved = []
    // let row = []
    let s = solvedNumbers
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells[i * 9 + j].value == '' ? s[i][j] = 0 : s[i][j] = +cells[i * 9 + j].value
            // cells[i * 9 + j].value == '' ? row.push(0) : row.push(+cells[i * 9 + j].value)
        }
        // numbersSolved.push(row)
    }
    console.log('solvedNumbers = ')
    console.log(s)
}

var isValid_old = (number, posX, posY) => {
    // Check the row
    for (let i = 0; i < 9; i++) {
        if (numbersSolved[posY][i] == number && i != posX) return false
        // if (cells[posY * 9 + i] == number && i != posX) return false
    }
    // Check the column
    for (let i = 0; i < 9; i++) {
        if (numbersSolved[i][posX] == number && i != posY) return false
        // if (cells[i * 9 + posX] == number && i != posY) return false
    }
    // Check the box
    let startX = Math.floor(posX / 3) * 3
    let startY = Math.floor(posY / 3) * 3
    for (let j = startY; j < startY + 3; j++) {
        for (let i = startX; i < startX + 3; i++) {
            if (numbersSolved[j][i] == number && i != posX && j != posY) return false
            // if (cells[j * 9 + i] == number && i != posX && j != posY) return false
        }
    }
    return true
}

var isBoardValid = () => {
    let uniques = new Set()
    let numberCount = 0

    // Check the rows
    for (let i = 0; i < 9; i++) {
        numberCount = 0
        uniques.clear()
        for (let j = 0; j < 9; j++) {
            if (numbersSolved[i][j] != 0) {
                uniques.add(numbersSolved[i][j])
                numberCount++
            }
        }
        if (uniques.size != numberCount) return false
    }

    // Check the columns
    for (let i = 0; i < 9; i++) {
        numberCount = 0
        uniques.clear()
        for (let j = 0; j < 9; j++) {
            if (numbersSolved[j][i] != 0) {
                uniques.add(numbersSolved[j][i])
                numberCount++
            }
        }
        if (uniques.size != numberCount) return false
    }

    // Check the boxes
    for (let posY = 0; posY < 9; posY += 3) {
        for (let posX = 0; posX < 9; posX += 3) {
            numberCount = 0
            uniques.clear()
            let startX = Math.floor(posX / 3) * 3
            let startY = Math.floor(posY / 3) * 3
            for (let j = startY; j < startY + 3; j++) {
                for (let i = startX; i < startX + 3; i++) {
                    if (numbersSolved[j][i] != 0) {
                        uniques.add(numbersSolved[j][i])
                        numberCount++ 
                    } 
                }
            }
            if (uniques.size != numberCount) return false
        }
    }

    return true

}
// let first = true
var isValid = (number, posX, posY) => {
    let uniques = new Set()
    let numberOfElements = 1
    // console.log('checking the number: ' + number)
    // if (first) console.log('numbersSolved = ' + numbersSolved), first = false
    // Check the row
    uniques.add(number)
    for (let i = 0; i < 9; i++) {
        if (numbersSolved[posY][i] != 0) {
            uniques.add(numbersSolved[posY][i])
            numberOfElements++
            // console.log('adding to uniques: ' + numbersSolved[posY][i])
        }
        
    }
    // console.log('row uniques = ' + uniques)
    // console.log('uniques.size = ' + uniques.size)
    // console.log('number of elements = ' + numberOfElements)
    if (uniques.size != numberOfElements) {
        // console.log('row - returning false for number ' + number)
        return false
    }
    uniques.clear()
    numberOfElements = 1

    // Check the column
    uniques.add(number)
    for (let i = 0; i < 9; i++) {
        if (numbersSolved[i][posX] != 0) {
            uniques.add(numbersSolved[i][posX])
            numberOfElements++
        }
    }
    // console.log('column uniques = ' + uniques)
    if (uniques.size != numberOfElements) {
        // console.log('column - returning false for number ' + number)
        return false
    }
    uniques.clear()
    numberOfElements = 1

    // Check the box
    uniques.add(number)
    let startX = Math.floor(posX / 3) * 3
    let startY = Math.floor(posY / 3) * 3
    for (let j = startY; j < startY + 3; j++) {
        for (let i = startX; i < startX + 3; i++) {
            if (numbersSolved[j][i] != 0) {
                uniques.add(numbersSolved[j][i])
                numberOfElements++ 
            } 
        }
    }
    // console.log('box uniques = ' + uniques)
    if (uniques.size != numberOfElements) {
        // console.log('box - returning false for number ' + number)
        return false
    }

    // console.log('number ' + number + ' is valid')
    return true
}

function checkValidDutch() {
    console.log('Checking validity of the board...')
    isValid_dutch(5,3,3)

}

var Test = () => {
    console.log('testing')
    isValid_dutch(cells[8],0,2)
}

var isValid_dutch = (number, posX, posY) => {
    let uniques = new Set()
    let numberOfElements = 1
    // console.log('isValid dutch')
    // console.log('checking the number: ' + number)
    // console.log('numbersSolved = ' + numbersSolved)
    // if (first) console.log('numbersSolved = ' + numbersSolved), first = false
    // Check the row
    uniques.add(number)
    for (let i = 0; i < 9; i++) {
        if (numbersSolved[posY][i] != 0) {
            uniques.add(numbersSolved[posY][i])
            numberOfElements++
            // console.log('adding to uniques: ' + numbersSolved[posY][i])
        }
        
    }
    // console.log('row uniques = ' + uniques)
    // console.log('uniques.size = ' + uniques.size)
    // console.log('number of elements = ' + numberOfElements)
    if (uniques.size != numberOfElements) {
        // console.log('row - returning false for number ' + number)
        return false
    }
    uniques.clear()
    numberOfElements = 1

    // Check the column
    uniques.add(number)
    for (let i = 0; i < 9; i++) {
        if (numbersSolved[i][posX] != 0) {
            uniques.add(numbersSolved[i][posX])
            numberOfElements++
        }
    }
    // console.log('column uniques = ' + uniques)
    if (uniques.size != numberOfElements) {
        // console.log('column - returning false for number ' + number)
        return false
    }
    uniques.clear()
    numberOfElements = 1

    // Check the box
    uniques.add(number)
    let startX = Math.floor(posX / 3) * 3
    let startY = Math.floor(posY / 3) * 3
    for (let j = startY; j < startY + 3; j++) {
        for (let i = startX; i < startX + 3; i++) {
            if (numbersSolved[j][i] != 0) {
                uniques.add(numbersSolved[j][i])
                numberOfElements++ 
            } 
        }
    }
    // console.log('box uniques = ' + uniques)
    if (uniques.size != numberOfElements) {
        // console.log('box - returning false for number ' + number)
        return false
    }
    uniques.clear()
    numberOfElements = 1

    // Check the diagonal
    uniques.add(number)
    // console.log('uniques before:')
    // console.log(uniques)
    let diagonalShift = Math.max(posX, posY)
    let i = posX - diagonalShift
    for (let j = posY + diagonalShift; j >= 0; j--) {
        if (numbersSolved[j] && numbersSolved[j][i]) {
            if (numbersSolved[j][i] != 0) {
                uniques.add(numbersSolved[j][i])
                numberOfElements++
                // console.log('diagonal - numbersSolved[j][i] = ' + numbersSolved[j][i])
            }
        }
        i++
        if (i >= 9) break    
    }
    // console.log('diagonal uniques = ')
    // console.log(uniques)
    if (uniques.size != numberOfElements) {
        // console.log('diagonal - returning false for number ' + number)
        return false
    }
    uniques.clear()
    numberOfElements = 1

    // Check the adjacent cells
    let adjacentPos = [[posY - 1, posX - 1],
                       [posY + 1, posX + 1],
                       [posY - 1, posX + 1],
                       [posY + 1, posX - 1]]
    let adjacentCells = 0
    let validAdjacentCells = 0
    for (let i = 0; i < adjacentPos.length; i++) {
        let x = adjacentPos[i][0]
        let y = adjacentPos[i][1]
        // console.log('adjacent x = ' + x + ', y = ' + y)
        if (numbersSolved[y] && numbersSolved[y][x]) {
            adjacentCells++
            // console.log('adjacent cell: ' + numbersSolved[y][x])
            if (Math.abs((number - numbersSolved[y][x])) > 3) {
                validAdjacentCells++
            }
        }
    }
    
    // console.log('box uniques = ' + uniques)
    if (validAdjacentCells != adjacentCells) {
        // console.log('adjacent cells - returning false for number ' + number)
        // console.log('adjacentCells = ' + adjacentCells)
        // console.log('validAdjacentCells = ' + validAdjacentCells)
        return false
    }

    // console.log('number ' + number + ' is valid')
    return true
}

var findEmpty = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (numbersSolved[i][j] == 0) return [i, j]
        }
    }
    return [-1, -1]
}
let counter = 0
var solutions = []
var solve = () => {
    counter++
    if (counter >500000) return false
    if (solutions.length > solution_limit) return false
    let [y, x] = findEmpty()

    // if (counter % 100000 == 0) updateBoard()
    // console.log('x = ' + x + ' y = ' + y)
    if (x == -1) {
        // console.log('first true')
        var temp = [] // numbersSolved.map( (arr) => arr.slice())
        
        for (let i = 0; i < 9; i++) {
            let row = new Array(9).fill(0)
            temp.push(row)
        }
            

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                temp[i][j] = numbersSolved[i][j]
            }
        }
        solutions.push(temp)
        return true
        // return true
    }
    for (let num = 1; num <= 9; num++) {
        // console.log('for loop, num = ' + num)
        if (isValid(num, x, y)) {
            // console.log('yes it\'s valid, num = ' + num + ' for x = ' + x + ', y = ' + y)
            numbersSolved[y][x] = num
            // solve()
            // if (solve()) {
                // console.log('second true')
                // return true
            // }
            // if (solve()) {
            //     // solutions.push(numbersSolved[0][0])
            //     return true
            // }
            solve()
            
            // console.log('second x = ' + x + ' y = ' + y)
            // console.log('numbersSolved[y][x] = ' + numbersSolved[y][x])
            // if (numbersSolved[y][x] != 0) 
            numbersSolved[y][x] = 0
        }
    }
    // console.log('cannot solve')
    // solutions.push(numbersSolved)
    return false
    
}
// Dutch miracle
// https://www.youtube.com/watch?v=wUnnXwLTbnA
var solve_dutch = () => {
    counter++
    if (counter >5123000) return false
    if (solutions.length > solution_limit) return false
    let [y, x] = findEmpty()
    if (counter % 100000 == 0) updateBoard()
    // console.log('x = ' + x + ' y = ' + y)
    if (x == -1) {
        // console.log('first true')
        var temp = [] // numbersSolved.map( (arr) => arr.slice())
        
        for (let i = 0; i < 9; i++) {
            let row = new Array(9).fill(0)
            temp.push(row)
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                temp[i][j] = numbersSolved[i][j]
            }
        }
        solutions.push(temp)
        return true
        // return true
    }
    for (let num = 1; num <= 9; num++) {
        console.log('for loop, num = ' + num)
        if (isValid_dutch(num, x, y)) {
            console.log('yes it\'s valid, num = ' + num + ' for x = ' + x + ', y = ' + y)
            numbersSolved[y][x] = num
            solve_dutch()
            numbersSolved[y][x] = 0
        }
    }
    return false
    
}

var resetBoard = () => {
    fillNumbers()
    // checkBoard()
    resetSolvedNumbers(numbersSolved)
    solveOwnSudoku = false
}
var updateBoard = () => {
    console.log(numbersSolved)
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            numbersSolved[i][j] != 0 ? 
            cells[i * 9 + j].value = numbersSolved[i][j] :
            cells[i * 9 + j].value = ''
        }
    }  
}
var emptyBoard = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells[i * 9 + j].value = ''
            cells[i * 9 + j].readOnly = ''
            cells[i * 9 + j].className = ''
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            numbersSolved[i][j] = 0
        }

    }
    solveOwnSudoku = true
    // numbersSolved = cells.map ( (arr) => +arr.value.slice())
    console.log('numbersSolved: ')
    console.log(numbersSolved)
}
var saveBoard = () => {
    console.log('saving board state')
    var temp = [] // numbersSolved.map( (arr) => arr.slice())
    let n = puzzleNo
    if (!savedBoards[0]) saveNewBoard()
        
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            savedBoards[n][i][j] = +cells[i * 9 + j].value
        }
    }
    
    
}

var saveNewBoard = () => {
    console.log('saving new board state')
    var temp = [] // numbersSolved.map( (arr) => arr.slice())
        
    for (let i = 0; i < 9; i++) {
        let row = new Array(9).fill(0)
        temp.push(row)
    }
        
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            temp[i][j] = +cells[i * 9 + j].value
        }
    }
    // console.log('temp = ' + temp)
    savedBoards.push(temp)
    console.log('saved board:')
    console.log(savedBoards[savedBoards.length - 1])
    drawRetrieveButtons()
}

drawGame2()
fillNumbers()
drawButtons()
// cells[0][0].value = 'a'
// console.log(cells[2][3].innerHTML)
// console.log(cells[4][4].value)
// drawGame()
// drawNumbers()