let X, Y, L, n, m;
let currentI = 0, currentJ = 0;
let isPlaying = false;
let animationTimeout;
const ANIMATION_DELAY = 500; // Default animation delay

function startVisualization() {
    X = document.getElementById('stringX').value;
    Y = document.getElementById('stringY').value;
    n = X.length;
    m = Y.length;
    
    // Initialize L matrix with zeros properly
    L = [];
    for (let i = 0; i <= n; i++) {
        L[i] = [];
        for (let j = 0; j <= m; j++) {
            L[i][j] = 0;
        }
    }
    
    currentI = 0;
    currentJ = 0;
    isPlaying = false;
    clearTimeout(animationTimeout);
    
    createTable();
    
    document.getElementById('result').innerHTML = '';
    document.getElementById('playBtn').textContent = 'Auto Play';
    document.getElementById('statusMessage').textContent = 'Click "Step Forward" or "Auto Play" to begin';
    clearCodeHighlights();
}

function createTable() {
    const table = document.getElementById('lcsTable');
    table.innerHTML = '';
    
    // Create header row with Y characters
    let headerRow = table.insertRow();
    headerRow.insertCell().className = 'header'; // Empty corner cell for X labels
    headerRow.insertCell().className = 'header'; // Empty corner cell for X indices
    headerRow.insertCell().className = 'header'; // Empty cell above index 0
    for (let j = 0; j < m; j++) {
        let cell = headerRow.insertCell();
        cell.className = 'header';
        cell.textContent = Y[j];
    }
    
    // Create index row
    let indexRow = table.insertRow();
    indexRow.insertCell().className = 'header'; // Empty cell below X labels
    indexRow.insertCell().className = 'header'; // Empty cell below X indices
    for (let j = 0; j <= m; j++) {
        let cell = indexRow.insertCell();
        cell.className = 'header';
        cell.textContent = j;
    }
    
    // Create data rows
    for (let i = 0; i <= n; i++) {
        let row = table.insertRow();
        
        // First cell for X character
        let headerCell = row.insertCell();
        headerCell.className = 'header';
        headerCell.textContent = i === 0 ? '' : X[i - 1];
        
        // Second cell for X index
        let indexCell = row.insertCell();
        indexCell.className = 'header';
        indexCell.textContent = i;
        
        // Data cells
        for (let j = 0; j <= m; j++) {
            let cell = row.insertCell();
            cell.id = `cell-${i}-${j}`;
            cell.textContent = '0';
            cell.setAttribute('data-value', '0');
        }
    }
}

function clearCodeHighlights() {
    document.getElementById('code-condition').classList.remove('code-highlight');
    document.getElementById('code-match').classList.remove('code-highlight');
    document.getElementById('code-max').classList.remove('code-highlight');
}

function stepForward() {
    if (currentI === 0 && currentJ === 0) {
        currentI = 1;
        currentJ = 1;
    }
    
    if (currentI <= n && currentJ <= m) {
        // Clear previous current highlight only
        document.querySelectorAll('.current').forEach(cell => {
            cell.classList.remove('current');
        });
        clearCodeHighlights();
        
        // Update current cell
        let currentCell = document.getElementById(`cell-${currentI}-${currentJ}`);
        currentCell.classList.add('current');
        
        // Show comparison
        document.getElementById('statusMessage').textContent = 
            `Comparing X[${currentI-1}]='${X[currentI-1]}' with Y[${currentJ-1}]='${Y[currentJ-1]}'`;
        
        document.getElementById('code-condition').classList.add('code-highlight');
        
        setTimeout(() => {
            clearCodeHighlights();
            currentCell.classList.remove('current');
            
            // Calculate the value
            if (X[currentI - 1] === Y[currentJ - 1]) {
                // Characters match - take diagonal value + 1
                L[currentI][currentJ] = L[currentI - 1][currentJ - 1] + 1;
                currentCell.classList.add('matched');
                currentCell.innerHTML = L[currentI][currentJ] + '<span class="arrow diagonal">↖</span>';
                document.getElementById('code-match').classList.add('code-highlight');
                document.getElementById('statusMessage').textContent += ' - Match!';
            } else {
                // Characters don't match - take max of left or top
                L[currentI][currentJ] = Math.max(L[currentI - 1][currentJ], L[currentI][currentJ - 1]);
                currentCell.innerHTML = L[currentI][currentJ];
                document.getElementById('code-max').classList.add('code-highlight');
                document.getElementById('statusMessage').textContent += ' - No match';
                
                if (L[currentI - 1][currentJ] >= L[currentI][currentJ - 1]) {
                    currentCell.innerHTML = L[currentI][currentJ] + '<span class="arrow up">↑</span>';
                } else {
                    currentCell.innerHTML = L[currentI][currentJ] + '<span class="arrow left">←</span>';
                }
            }
            
            // Store the value permanently
            currentCell.setAttribute('data-value', L[currentI][currentJ]);
            
            // Move to next cell
            currentJ++;
            if (currentJ > m) {
                currentJ = 1;
                currentI++;
            }
            
            if (currentI > n) {
                // Visualization complete
                setTimeout(() => {
                    clearCodeHighlights();
                    document.getElementById('statusMessage').textContent = 'Visualization complete!';
                    showResult();
                    backtrack();
                }, 500);
            }
        }, 300);
    }
}

function autoPlay() {
    if (isPlaying) {
        isPlaying = false;
        clearTimeout(animationTimeout);
        document.getElementById('playBtn').textContent = 'Auto Play';
    } else {
        isPlaying = true;
        document.getElementById('playBtn').textContent = 'Pause';
        playStep();
    }
}

function playStep() {
    if (isPlaying && currentI <= n) {
        stepForward();
        animationTimeout = setTimeout(playStep, ANIMATION_DELAY);
    } else {
        isPlaying = false;
        document.getElementById('playBtn').textContent = 'Auto Play';
    }
}

function showResult() {
    document.getElementById('result').innerHTML = 
        `<strong>Length of Longest Common Subsequence: ${L[n][m]}</strong>`;
}

function backtrack() {
    let i = n, j = m;
    let lcs = '';
    let path = [];
    
    // Trace back through the table to find path and LCS
    while (i > 0 && j > 0) {
        let currentCell = document.getElementById(`cell-${i}-${j}`);
        path.push({cell: currentCell, i: i, j: j});
        
        if (X[i - 1] === Y[j - 1]) {
            // Characters match - we took the diagonal
            lcs = X[i - 1] + lcs;
            i--;
            j--;
        } else if (L[i - 1][j] > L[i][j - 1]) {
            // Came from above
            i--;
        } else {
            // Came from left
            j--;
        }
    }
    
    // Continue path to origin if needed
    while (i > 0) {
        let currentCell = document.getElementById(`cell-${i}-${j}`);
        path.push({cell: currentCell, i: i, j: j});
        i--;
    }
    while (j > 0) {
        let currentCell = document.getElementById(`cell-${i}-${j}`);
        path.push({cell: currentCell, i: i, j: j});
        j--;
    }
    
    // Add the origin cell
    let originCell = document.getElementById(`cell-0-0`);
    path.push({cell: originCell, i: 0, j: 0});
    
    // Reverse path to go from origin to end
    path.reverse();
    
    // Highlight the path after a short delay
    setTimeout(() => {
        path.forEach((item, index) => {
            setTimeout(() => {
                item.cell.classList.add('path');
            }, index * 100);
        });
    }, 300);
    
    // Display the result
    setTimeout(() => {
        document.getElementById('result').innerHTML += 
            `<br><strong>Longest Common Subsequence: "${lcs}"</strong>` +
            `<br><em>Found by tracing back through the blue cells</em>`;
    }, path.length * 100 + 500);
}

function reset() {
    currentI = 0;
    currentJ = 0;
    isPlaying = false;
    clearTimeout(animationTimeout);
    document.getElementById('playBtn').textContent = 'Auto Play';
    document.getElementById('result').innerHTML = '';
    document.getElementById('statusMessage').textContent = 'Click "Step Forward" or "Auto Play" to begin';
    clearCodeHighlights();
    startVisualization();
}

// Initialize on load
window.onload = function() {
    startVisualization();
};