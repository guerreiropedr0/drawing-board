import { mouse, pencil } from "./tools.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.querySelector('#color-picker');

// Set default color because on refresh it gets last color
colorPicker.value = '#000000';

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
  }
})

canvas.addEventListener('mouseup', () => {
  if (currentTool.name === 'pencil') {
    currentTool.stopPainting();
  }
})

canvas.addEventListener('mouseout', () => {
  if (currentTool.name === 'pencil') {
    currentTool.stopPainting();
  }
})

canvas.addEventListener('mousemove', () => {
  if (currentTool.name === 'pencil') {
    currentTool.paint();
  }
});

colorPicker.addEventListener('input', ({ target }) => {
  if (currentTool.name === 'pencil') {
    currentTool.changeColor(target.value);
  }
})

export default ctx;
