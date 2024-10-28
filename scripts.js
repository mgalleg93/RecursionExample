let global_size = 5;
let box_grid = [];

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  
  document.getElementById("size-button").addEventListener("click", getSize);
  document.getElementById("display-button").addEventListener("click", displayGrid);

//   document.getElementById("search-button").addEventListener("click", performRecursiveSearch);
});

function getSize() {
  let size = parseInt(document.getElementById("size-input").value);
  if(!isNaN(size)) global_size = size;
  populateGrid();
}

function populateGrid() {
  const theDiv = document.getElementById("grid-div");
  
  // Clear the existing grid content
  theDiv.innerHTML = '';

  // Initialize box_grid as a 2D array
  box_grid = Array.from({ length: global_size }, () => Array(global_size).fill(''));
  
//   console.log({box_grid, global_size});
  for(let i = 0; i < global_size; i++ ) {
    const newRow = document.createElement("div");
    newRow.className = "grid-row"
    for(let j = 0; j < global_size; j++) {
        const randoString = generateRandomString();
        
        // Create a new div element for each grid cell
        const cellDiv = document.createElement("div");
        cellDiv.className = "box";
        cellDiv.textContent = randoString;  // Set the content to the random string
        cellDiv.setAttribute("data-row", i);
        cellDiv.setAttribute("data-column", j);
        cellDiv.setAttribute("data-visited", 1);

        cellDiv.addEventListener("click", handleCellClick);

        box_grid[i][j] = cellDiv;
        newRow.appendChild(cellDiv);  // Add the cell to the main grid div
    }
    theDiv.appendChild(newRow);
  }
}

function displayGrid() {
  console.log("Display Grid", box_grid);
  for(let i = 0; i < box_grid.length; i++ ) {
    for(let j = 0; j < box_grid[i].length; j++) {
      console.log(i, j, box_grid[i][j]);
    }
  }
}

function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  
  return result;
}

function handleCellClick(e) {
    console.log(e.target);
    const searchTerm = document.getElementById("search-string").value;
    if(searchTerm.length == 0) {
        alert("Need a search term");
        return;
    }
    const cell = e.target;
    const initialRow = parseInt(cell.getAttribute("data-row"));
    const initialCol = parseInt(cell.getAttribute("data-column"));
    performRecursiveSearch(initialRow, initialCol, searchTerm);
}

function performRecursiveSearch(row, col, search) {
    //check if in bounds
    if(row < 0 || col < 0 || row >= global_size || col >= global_size) return;
    console.log({row, col, search});
    //Check if vistited
    const visted = parseInt(box_grid[row][col].getAttribute("data-visited"));
    if(visted > 1) return;
    box_grid[row][col].setAttribute("data-visited", 2);
    box_grid[row][col].style.background = "yellow";
    if(box_grid[row][col].textContent.includes(search)) {
        setTimeout(() => box_grid[row][col].style.background = "green", 1000);
    } else {
        setTimeout(() => box_grid[row][col].style.background = "red", 1000);
    }
    setTimeout(() => performRecursiveSearch(row - 1, col, search), 2000);
    setTimeout(() => performRecursiveSearch(row + 1, col, search), 2000);
    setTimeout(() => performRecursiveSearch(row, col - 1, search), 2000);
    setTimeout(() => performRecursiveSearch(row, col + 1, search), 2000);
}


// 1. Describe a professional situation where you felt stuck and how you were able to overcome that feeling.
// 2. Describe how you would determine the dominant color on the page of a given URL.
// 3. Our company's values are Start with trust, Seek understanding, Think big, Say what you think and 
//    do what you say, Move forward, Bring the energy, and Pursue Excellence. Which one do you align with 
//    most, and why?
// 4. Create a whimsical function that utilizes recursion (please include a screen recording).