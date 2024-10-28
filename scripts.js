let global_size = 5;
let box_grid = [];

window.addEventListener("load", (event) => {
    // Add event listeners to the buttons on the page.
    document.getElementById("size-button").addEventListener("click", getSize);
    document.getElementById("display-button").addEventListener("click", displayGrid);
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
  
    //Enter the for loop that will add create and add the boxes to the grid
    for(let i = 0; i < global_size; i++ ) {

        // Create new row element
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

            // Add the html element to the 2D grid. 
            box_grid[i][j] = cellDiv;
            newRow.appendChild(cellDiv);  // Add the cell to the main grid div
        }

        // Add the new row to document
        theDiv.appendChild(newRow);
    }
}

//Simple function to display the BOX GRID elements to the console. 
function displayGrid() {
    for(let i = 0; i < box_grid.length; i++ ) {
        for(let j = 0; j < box_grid[i].length; j++) {
            console.log(i, j, box_grid[i][j]);
        }
    }
}

//Simple function to generate random 4 letter words
function generateRandomString() {
    //String of acceptable characters
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    
    // For loop to generate a random number and pull the character from the above string and add it to the results
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    return result;
}

// Function for when you click on a cell
function handleCellClick(e) {
    //First we check if theres a search term
    const searchTerm = document.getElementById("search-string").value;
    if(searchTerm.length == 0) {
        alert("Need a search term");
        return;
    }

    // Get the data stored in the cell and use it to start the recursion function
    const cell = e.target;
    const initialRow = parseInt(cell.getAttribute("data-row"));
    const initialCol = parseInt(cell.getAttribute("data-column"));
    performRecursiveSearch(initialRow, initialCol, searchTerm);
}


// Here is the recursive search function
// We are taking the value that was in the search box and then checking every cell recusively 
// to see if we find a matching string. 
function performRecursiveSearch(row, col, search) {
    //check if in bounds
    if(row < 0 || col < 0 || row >= global_size || col >= global_size) return;
    console.log({row, col, search});

    //Check if vistited
    const visted = parseInt(box_grid[row][col].getAttribute("data-visited"));
    if(visted > 1) return;

    // Indicate that the cell has been visted
    box_grid[row][col].setAttribute("data-visited", 2);
    box_grid[row][col].style.background = "yellow";


    if(box_grid[row][col].textContent.includes(search)) {
        // If theres a match, make it green
        setTimeout(() => box_grid[row][col].style.background = "green", 1000);
    } else {
        // If no match, make it red
        setTimeout(() => box_grid[row][col].style.background = "red", 1000);
    }

    // Call this function on the cells above, below, left and to the right. 
    setTimeout(() => performRecursiveSearch(row - 1, col, search), 2000);
    setTimeout(() => performRecursiveSearch(row + 1, col, search), 2000);
    setTimeout(() => performRecursiveSearch(row, col - 1, search), 2000);
    setTimeout(() => performRecursiveSearch(row, col + 1, search), 2000);
}