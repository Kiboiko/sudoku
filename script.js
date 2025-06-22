class SudokuSolver {
    constructor(field) {
        this._field = Array(9).fill().map(() => Array(9).fill(0));
    }

    loadFromInputs() {
    const inputs = document.querySelectorAll('#sudoku-grid input');
    console.log(inputs.length)
    let row = 0;
    let col = 0;
    for (let i = 0;i < 81;i++){
        const value = parseInt(inputs[i].value) || 0;
        this._field[row][col] = value;
        if (row === 8){
            row = 0;
            col++;
        } else {
            row++;
        }
    }
    row = 0;
    col = 0;
    for (let i = 0;i < 81;i++){
        console.log(this._field[row][col])
        if (col === 8){
            col = 0;
            row++;
        } else {
            col++;
        }
    }
    
    }

    writeToInputs() {
    const inputs = document.querySelectorAll('#sudoku-grid input');
    let row = 0;
    let col = 0;
    for (let i = 0;i < 81;i++){
        const value = parseInt(inputs[i].value) || 0;
        input.value = this._field[row][col] || '';
        if (row === 8){
            row = 0;
            col++;
        } else {
            row++;
        }
    }
    }
    solve() {
        const backTracking = () => {
            if (this.isSolutionFound()) {
                return true;
            } else {
                const freeCells = this.getFreeCells();
                for (const cell of freeCells) {
                    for (let number = 1; number <= 9; number++) {
                        if (this.checkMoveForFairness(cell, number)) {
                            this._field[cell.i][cell.j] = number;
                            if (backTracking()) {
                                return true;
                            }
                            this._field[cell.i][cell.j] = 0;
                        }
                    }
                }
            }
            return false;
        };

        return backTracking();
    }

    isSolutionFound() {
        return this._field.every(row => row.every(cell => cell !== 0));
    }

    getFreeCells() {
        const freeCells = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this._field[i][j] === 0) {
                    freeCells.push({i, j});
                }
            }
        }
        return freeCells;
    }

    checkMoveForFairness(cell, number) {
        // Проверка корректности значения
        if (number < 1 || number > 9) {
            return false;
        }
        
        // Проверка, что клетка уже не занята
        if (this._field[cell.i][cell.j] !== 0) {
            return false;
        }
        
        // Проверка всех клеток по вертикали и горизонтали
        for (let k = 0; k < 9; k++) {
            if (this._field[k][cell.j] === number || this._field[cell.i][k] === number) {
                return false;
            }
        }
        
        // Поиск левого верхнего угла блока
        const cornerX = Math.floor(cell.i / 3) * 3;
        const cornerY = Math.floor(cell.j / 3) * 3;
        
        // Проверка внутри блока
        for (let i = cornerX; i < cornerX + 3; i++) {
            for (let j = cornerY; j < cornerY + 3; j++) {
                if (this._field[i][j] === number) {
                    return false;
                }
            }
        }

        return true;
    }
}

const grid = document.getElementById('sudoku-grid');
const solveBtn = document.getElementById('solve-btn');
const clearBtn = document.getElementById('clear-btn');
const errorMessage = document.getElementById('error-message');


for (let i = 0; i < 81; i++) {
        let input = document.createElement('input');
        input.type = 'number';
        if (((i+1) % 3 === 0) && ((i+1) % 9 != 0)){
            input.classList.add('rig');
        }
        if (((i+1) >= 19 && (i+1) <= 27) || ((i+1) >= 46 && (i+1) <= 54) ){
            input.classList.add('bot');
        }
        input.min = '1';
        input.max = '9';
        input.addEventListener('input', () => {
            if (input.value.length > 1) {
                input.value = input.value.slice(0, 1);
            }
        });
        grid.appendChild(input);
}
const solver = new SudokuSolver();


clearBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('#sudoku-grid input');
        inputs.forEach(input => input.value = '');
        errorMessage.textContent = '';
});
solveBtn.addEventListener('click',()=>{
    const inputs = document.querySelectorAll('#sudoku-grid input');
    
    // for (let i = 0;i < 81;i++){
    //     console.log(i,parseInt(inputs[i].value));
    // }
    solver.loadFromInputs();
});




// const field = Array(9).fill().map(() => Array(9).fill(0)); // Пустое поле
// const solver = new SudokuSolver(field);
// solver.solve();
