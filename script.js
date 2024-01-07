const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#FFF8DC';

const colorPicker = document.getElementById('color-picker');
const colorButton = document.getElementById('color')
const rainbowButton = document.getElementById('rainbow');
const eraserButton = document.getElementById('eraser');
const resetButton = document.getElementById('reset');
const sizeSlider = document.getElementById('size');
const sizeDiv = document.getElementById('size-value');
const container = document.querySelector('.container');
sizeDiv.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;

let isMouseDown = false;

function createGrid(gridNumber) {
    const total = gridNumber * gridNumber + gridNumber;
    const mod = gridNumber + 1;
    for (let i = 1; i <= total; i++) {
        const square = document.createElement('div');
        if (i % mod === 0) {
            square.classList.add('empty-div');
        } else {
            square.classList.add('div-style');
            square.style.cssText = `height: ${640 / gridNumber}px; width: ${640 / gridNumber}px;`;
        }
        container.appendChild(square);
        }
}

/* COLOR PICKER FUNCTIONALITY */

colorButton.addEventListener('click', () => {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('div-style')) {
            e.target.style.backgroundColor = colorPicker.value;
        }
    });
    container.addEventListener('mousedown', () => {
        isMouseDown = true;
    })
    container.addEventListener('mouseup', () => {
        isMouseDown = false;
    })
    container.addEventListener('mousemove', (e) => {
        if (isMouseDown && e.target.classList.contains('div-style')) {
        e.target.style.backgroundColor = colorPicker.value;
        }
    })
})

/* RAINBOW BUTTON FUNCTIONALITY */

function rainbowGradient() {
    let color = '#';
    const letters = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

rainbowButton.addEventListener('click', () => {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('div-style')) {
            e.target.style.backgroundColor = rainbowGradient();
        }
    })
    container.addEventListener('mousedown', () => {
        isMouseDown = true;
    })
    
    container.addEventListener('mouseup', () => {
        isMouseDown = false;
    })
    
    container.addEventListener('mousemove', (e) => {
        if (isMouseDown && e.target.classList.contains('div-style')) {
        e.target.style.backgroundColor = rainbowGradient();
        }
    })
})

/* RESET BUTTON FUNCTIONALITY */

resetButton.addEventListener('click', () => {
    container.innerHTML = "";
    updateGrid();
})

/* ERASER BUTTON FUNCTIONALITY */

eraserButton.addEventListener('click', () => {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('div-style')) {
            e.target.style.backgroundColor = DEFAULT_COLOR;
        }
    })
    container.addEventListener('mousedown', () => {
        isMouseDown = true;
    })
    
    container.addEventListener('mouseup', () => {
        isMouseDown = false;
    })
    container.addEventListener('mousemove', (e) => {
        if (isMouseDown && e.target.classList.contains('div-style')) {
        e.target.style.backgroundColor = DEFAULT_COLOR;
        }
    })
})

/* GRID SIZE FUNCTIONALITY */

sizeSlider.addEventListener('input', updateGrid);

function updateGrid() {
    container.innerHTML = '';
    const newGridNumber = +sizeSlider.value;
    sizeDiv.textContent = `${newGridNumber} x ${newGridNumber}`;
    createGrid(newGridNumber);
}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    sizeDiv.textContent = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;
}