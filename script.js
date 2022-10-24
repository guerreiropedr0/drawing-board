const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const colorButtons = document.querySelectorAll('.color');
const colorPicker = document.querySelector('#color-picker');

// Set default color because on refresh it gets last color
colorPicker.value = '#000000';

canvas.width = 600;
canvas.height = 600;

const mouse = {
  x: null,
  y: null,
}

const pencil = {
  isDrawing: false,
  x: mouse.x,
  y: mouse.y,
  color: 'black',
  width: 3,
}

let currentTool = pencil;

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
})

const updateToolPositions = (tool) => {
  const updatedTool = tool;

  updatedTool.x = mouse.x;
  updatedTool.y = mouse.y;

  return updatedTool;
}

const draw = (tool) => {
  if (tool.isDrawing) {
    updateToolPositions(tool);

    ctx.lineWidth = tool.width;
    ctx.lineCap = "round";
    ctx.strokeStyle = tool.color;

    ctx.lineTo(tool.x, tool.y);
    ctx.stroke();
  } else {
    ctx.beginPath();
  }
}

const changeToolColor = (tool, color) => {
  let changedTool = tool;

  changedTool.color = color;

  return changedTool;
}

canvas.addEventListener('mousedown', () => {
  currentTool.isDrawing = true;
  draw(currentTool); // Enable taps(dots) on the canvas
})

canvas.addEventListener('mouseup', () => {
  currentTool.isDrawing = false;
})

canvas.addEventListener('mouseout', () => {
  currentTool.isDrawing = false;
})

canvas.addEventListener('mousemove', () => {
  draw(currentTool);
});

colorButtons.forEach(colorButton => {
  colorButton.addEventListener('click', (event) => {
    const color = event.target.value;

    changeToolColor(currentTool, color);
  })
})

colorPicker.addEventListener('input', (event) => {
  const color = event.target.value;

  changeToolColor(currentTool, color);
})
