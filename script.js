import { mouse, pencil, eraser } from "./tools.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.querySelector('#color_picker');
const eraserBtn = document.querySelector('#eraser');
const clearAllBtn = document.querySelector('#clear_all');
const fillColor = document.querySelector('#fill_color');
const DEFAULT_COLOR_PICKER_COLOR = '#000000';

colorPicker.value = DEFAULT_COLOR_PICKER_COLOR;

canvas.width = 600;
canvas.height = 600;

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
})

clearAllBtn.addEventListener('click', () => {
  currentTool.clearAll();
})

fillColor.addEventListener('click', () => {
  currentTool.fill();
})

export default ctx;
