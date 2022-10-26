import { mouse, pencil, eraser } from "./tools.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const controlPanel = document.querySelector('#control_panel');
const pencilBtn = document.querySelector('#pencil');
const pencilModal = document.querySelector('#pencil_modal');
const colorPicker = document.querySelector('#color_picker');
const pencilSizeIncrement = document.querySelector('#pencil_size_increment');
const pencilSizeEle = document.querySelector('#pencil_size');
const pencilSizeDecrement = document.querySelector('#pencil_size_decrement');
const eraserBtn = document.querySelector('#eraser');
const eraserModal = document.querySelector('#eraser_modal');
const eraserSizeIncrement = document.querySelector('#eraser_size_increment');
const eraserSizeEle = document.querySelector('#eraser_size');
const eraserSizeDecrement = document.querySelector('#eraser_size_decrement');
const clearAllBtn = document.querySelector('#clear_all');
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

pencilBtn.addEventListener('mouseover', () => {
  if (currentTool.name === 'pencil') {
    pencilModal.style.display = 'block';
  }
})

pencilModal.addEventListener('mouseleave', () => {
  pencilModal.style.display = 'none';
})

pencilBtn.addEventListener('click', () => {
  currentTool = pencil;
  pencilBtn.classList.add('selected');
  eraserBtn.classList.remove('selected');
  pencilModal.style.display = 'block';
  eraserModal.style.display = 'none';
})

pencilSizeDecrement.addEventListener('click', () => {
  if (currentTool.size > 1) {
    currentTool.size -= 1;
    pencilSizeEle.textContent = currentTool.size;
  }
})

pencilSizeIncrement.addEventListener('click', () => {
  if (currentTool.size < 50) {
    currentTool.size += 1;
    pencilSizeEle.textContent = currentTool.size;
  }
})

eraserBtn.addEventListener('mouseover', () => {
  if (currentTool.name === 'eraser') {
    eraserModal.style.display = 'block';
  }
})

eraserModal.addEventListener('mouseleave', () => {
  eraserModal.style.display = 'none';
})

eraserBtn.addEventListener('click', () => {
  currentTool = eraser;
  eraserBtn.classList.add('selected');
  pencilBtn.classList.remove('selected');
  eraserModal.style.display = 'block';
  pencilModal.style.display = 'none';
})


eraserSizeDecrement.addEventListener('click', () => {
  if (currentTool.size > 1) {
    currentTool.size -= 1;
    eraserSizeEle.textContent = currentTool.size;
  }
})

eraserSizeIncrement.addEventListener('click', () => {
  if (currentTool.size < 50) {
    currentTool.size += 1;
    eraserSizeEle.textContent = currentTool.size;
  }
})

clearAllBtn.addEventListener('click', () => {
  currentTool.clearAll();
})

fillColor.addEventListener('click', () => {
  currentTool.fill();
})

export default ctx;
