import ctx from "./script.js";

const mouse = {
  x: null,
  y: null,
}

const update = (state) => {
  return {
    positions: () => {
      state.x = mouse.x;
      state.y = mouse.y;
    }
  }
}

const painter = (state) => {
  return {
    startPainting: () => state.isPainting = true,
    stopPainting: () => state.isPainting = false,
    paint: () => {
      if (state.isPainting) {
        update(state).positions();

        ctx.lineWidth = state.width;
        ctx.lineCap = "round";
        ctx.strokeStyle = state.color;

        ctx.lineTo(state.x, state.y);
        ctx.stroke();
      } else {
        ctx.beginPath();
      }
    }
  }
}

const colorChanger = (state) => {
  return {
    changeColor: (color) => state.color = color,
  }
}

const clearer = () => {
  return {
    clearAll: () => ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}

const erase = (state) => {
  return {
    startErasing: () => state.isErasing = true,
    stopErasing: () => state.isErasing = false,
    erase: () => {
      if (state.isErasing) {
        update(state).positions();

        ctx.lineWidth = state.width;
        ctx.lineCap = "round";
        ctx.strokeStyle = 'white';

        ctx.lineTo(state.x, state.y);
        ctx.stroke();
      }
    },
  }
}

const createPencil = () => {
  let state = {
    name: 'pencil',
    isPainting: false,
    x: null,
    y: null,
    color: 'black',
    width: 5,
  }

  return Object.assign(
    state,
    painter(state),
    colorChanger(state),
    clearer()
  )
}

const createEraser = () => {
  let state = {
    name: 'eraser',
    isErasing: false,
    x: null,
    y: null,
    width: 10,
  }

  return Object.assign(
    state,
    erase(state),
    clearer()
  )
}

const pencil = createPencil();
const eraser = createEraser();

export { mouse, pencil, eraser };
