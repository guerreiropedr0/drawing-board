import { mouse, pencil, eraser } from "./tools.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const controlPanel = document.querySelector('#control_panel');
const pencilBtn = document.querySelector('#pencil');
const pencilModal = document.querySelector('#pencil_modal');
const colorPicker = document.querySelector('#color_picker');
const pencilWidthIncrement = document.querySelector('#pencil_width_increment');
const pencilWidth = document.querySelector('#pencil_width');
const pencilWidthDecrement = document.querySelector('#pencil_width_decrement');
const eraserBtn = document.querySelector('#eraser');
// const clearAllBtn = document.querySelector('#clear_all');
const fillColor = document.querySelector('#fill_color');
const DEFAULT_COLOR_PICKER_COLOR = '#000000';

colorPicker.value = DEFAULT_COLOR_PICKER_COLOR;

canvas.width = window.innerWidth - 150;
canvas.height = window.innerHeight - 100;
controlPanel.style.width = canvas.width + 'px';

let currentTool = pencil;

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
})

canvas.addEventListener('mousedown', () => {
  if (currentTool.name === 'pencil') {
    currentTool.startPainting();
    currentTool.paint(); // Enable taps(dots) on the canvas
  } else if (currentTool.name === 'eraser') {
    currentTool.startErasing();
    currentTool.erase(); // Enable taps(dots) on the canvas
  }
})

canvas.addEventListener('mouseup', () => {
  if (currentTool.name === 'pencil') {
    currentTool.stopPainting();
  } else if (currentTool.name === 'eraser') {
    currentTool.stopErasing();
  }
})

canvas.addEventListener('mouseout', () => {
  if (currentTool.name === 'pencil') {
    currentTool.stopPainting();
  } else if (currentTool.name === 'eraser') {
    currentTool.stopErasing();
  }
})

canvas.addEventListener('mousemove', () => {
  if (currentTool.name === 'pencil') {
    currentTool.paint();
  } else if (currentTool.name === 'eraser') {
    currentTool.erase();
  }
});

colorPicker.addEventListener('input', ({ target }) => {
  if (currentTool.name === 'pencil') {
    currentTool.changeColor(target.value);
  }
})

eraserBtn.addEventListener('click', () => {
  currentTool = eraser;
  eraserBtn.classList.add('selected');
  pencilBtn.classList.remove('selected');
})

pencilBtn.addEventListener('mouseover', () => {
  pencilModal.style.display = 'block';
})

pencilModal.addEventListener('mouseleave', () => {
  pencilModal.style.display = 'none';
})

pencilBtn.addEventListener('click', () => {
  currentTool = pencil;
  pencilBtn.classList.add('selected');
  eraserBtn.classList.remove('selected');
})

pencilWidthDecrement.addEventListener('click', () => {
  if (currentTool.width > 1) {
    currentTool.width -= 1;
    pencilWidth.textContent = currentTool.width;
  }
})

pencilWidthIncrement.addEventListener('click', () => {
  if (currentTool.width < 50) {
    currentTool.width += 1;
    pencilWidth.textContent = currentTool.width;
  }
})

// clearAllBtn.addEventListener('click', () => {
//   currentTool.clearAll();
// })

fillColor.addEventListener('click', () => {
  currentTool.fill();
})

export default ctx;
