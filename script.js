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

clearBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('#sudoku-grid input');
        inputs.forEach(input => input.value = '');
        errorMessage.textContent = '';
});