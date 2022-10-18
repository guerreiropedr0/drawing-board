const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: null,
  y: null,
}

const pencil = {
  isPainting: false,
  x: mouse.x,
  y: mouse.y,
  color: 'white',
  width: 10,
}

let currentTool = pencil;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
})

const updateToolPositions = (tool) => {
  const updatedTool = tool;

  updatedTool.x = mouse.x;
  updatedTool.y = mouse.y;

  return updatedTool;
}

const paint = (tool) => {
  if (tool.isPainting) {
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

canvas.addEventListener('mousedown', () => {
  currentTool.isPainting = true;
})

canvas.addEventListener('mouseup', () => {
  currentTool.isPainting = false;
})

canvas.addEventListener('mouseout', () => {
  currentTool.isPainting = false;
})


canvas.addEventListener('mousemove', () => {
  paint(currentTool);
});
