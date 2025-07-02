// ------------------------------------------ Variable Declaration ------------------------------------------
// Declare DOM elements
const canvas = document.querySelector(".canvas");
const canvasSizeInfo = document.querySelector("#canvasSizeInfo");
const canvasSizeInput = document.querySelector("#canvasSize");
const newCanvasBtn = document.querySelector("#newCanvasBtn");

const colorPickerTool = document.querySelector("#colorPickerTool");
const pencilTool = document.querySelector("#pencilTool");
const eraserTool = document.querySelector("#eraserTool");
const rainbowTool = document.querySelector("#rainbowTool");
const resetTool = document.querySelector("#resetTool");

// Declare constant variables
const DEFAULT_CANVAS_SIZE = 600;
const DEFAULT_CELL_SIZE = 16;
const DEFAULT_CELL_COLOR = "white";
const DEFAULT_CURRENT_COLOR = "black";
const DEFAULT_CURRENT_TOOL = "pencil";

// Declare global variables
let currentColor = DEFAULT_CURRENT_COLOR;
let currentTool = DEFAULT_CURRENT_TOOL;
let isMouseDown = false;

// Declare global functions
document.body.addEventListener("mousedown", () => (isMouseDown = true));
document.body.addEventListener("mouseup", () => (isMouseDown = false));

// ------------------------------------------ Function Declaration ------------------------------------------
// Populate the canvas with a grid
function populateCanvas(size = DEFAULT_CELL_SIZE) {
  // Clear the canvas then add the new cells
  const cellSize = DEFAULT_CANVAS_SIZE / size;
  canvas.innerHTML = "";

  for (let i = 0; i < size * size; i++) {
    // Create a new cell
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.style.backgroundColor = DEFAULT_CELL_COLOR;
    cell.dataset.permanentColor = DEFAULT_CELL_COLOR;

    // Hover preview functionality
    cell.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        cell.style.cursor = "cell";
        applyTool(cell);
      }
    });

    // Paint functionality
    cell.addEventListener("mousedown", () => {
      cell.style.cursor = "cell";
      applyTool(cell);
    });

    canvas.appendChild(cell);
  }

  // Update the information about current canvas size
  canvasSizeInfo.textContent = `${size}x${size}`;
}

// Get a random color for the rainbow tool
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Apply the selected tool to the cell
function applyTool(cell) {
  let colorToApply;

  if (currentTool === "pencil") {
    colorToApply = currentColor;
  } else if (currentTool === "eraser") {
    colorToApply = DEFAULT_CELL_COLOR;
  } else if (currentTool === "rainbow") {
    colorToApply = getRandomColor();
  }

  cell.style.backgroundColor = colorToApply;
  cell.dataset.permanentColor = colorToApply;
}

// ------------------------------------------ On Page Load ------------------------------------------

// Initial population of the canvas
populateCanvas();
pencilTool.classList.add("active");

// Event listener for the canvas size input
newCanvasBtn.addEventListener("click", () => {
  const sizeInput = canvasSizeInput.value;

  // Validate the input
  if (sizeInput < 1 || sizeInput > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  // Populate the canvas with the new size
  populateCanvas(sizeInput);
});

// Color picker tool functionality
colorPickerTool.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

// Tool selection functionality
pencilTool.addEventListener("click", () => {
  currentTool = "pencil";
  currentColor = colorPickerTool.value;
  pencilTool.classList.add("active");
  eraserTool.classList.remove("active");
  rainbowTool.classList.remove("active");
});

eraserTool.addEventListener("click", () => {
  currentTool = "eraser";
  currentColor = DEFAULT_CELL_COLOR;
  pencilTool.classList.remove("active");
  eraserTool.classList.add("active");
  rainbowTool.classList.remove("active");
});

rainbowTool.addEventListener("click", () => {
  currentTool = "rainbow";
  pencilTool.classList.remove("active");
  eraserTool.classList.remove("active");
  rainbowTool.classList.add("active");
});

// Reset tool functionality
resetTool.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = DEFAULT_CELL_COLOR;
    cell.dataset.permanentColor = DEFAULT_CELL_COLOR;
  });
});
