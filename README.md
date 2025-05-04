# LCS Algorithm Visualization

An interactive web-based visualization tool for understanding the Longest Common Subsequence (LCS) algorithm through step-by-step animation.

![LCS Visualization Demo](https://img.shields.io/badge/Demo-Live-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## LIVE DEMO
- https://mouazkass.github.io/LCS-ALGO-VISUALISATION/

## 🚀 Features

- **Interactive Visualization**: Step-by-step animation of the LCS algorithm
- **Custom Input**: Enter your own strings to see how the algorithm works
- **Educational Code Display**: Highlighted code execution synchronized with the visualization
- **Automatic Backtracking**: Visual representation of the path to find the LCS
- **Intuitive UI**: Clean, modern interface with helpful status messages

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- No external dependencies required

## 🎯 How It Works

The Longest Common Subsequence (LCS) algorithm finds the longest subsequence that appears in both input strings in the same order (but not necessarily consecutively).

### Algorithm Steps:
1. Create a matrix L[n+1][m+1] where n and m are the lengths of the input strings
2. Initialize the first row and column with zeros
3. For each cell L[i][j]:
   - If characters match: L[i][j] = L[i-1][j-1] + 1
   - If characters don't match: L[i][j] = max(L[i-1][j], L[i][j-1])
4. The length of LCS is found in L[n][m]
5. Backtrack through the matrix to find the actual subsequence

## 🚀 Getting Started

### Option 1: Direct Usage
1. Open `index.html` in your web browser
2. Enter two strings to compare
3. Click "Start Visualization"
4. Use "Step Forward" to advance manually or "Auto Play" for automatic animation

### Option 2: Clone Repository
```bash
git clone https://github.com/yourusername/lcs-visualization.git
cd lcs-visualization
# Open index.html in your browser
```

## 📖 Usage Guide

1. **Input Strings**: Enter two strings in the input fields
2. **Start Visualization**: Click to initialize the algorithm
3. **Step Forward**: Manually advance through each step
4. **Auto Play**: Watch the algorithm run automatically
5. **Reset**: Clear the current visualization and start over

### Color Coding:
- 🟨 **Yellow**: Current cell being calculated
- 🟩 **Green**: Matching characters
- 🔵 **Blue**: Path taken during backtracking
- 🔴 **Red Arrows**: Direction indicators (↖ for match, ↑ or ← for max)

## 🎓 Educational Purpose

This visualization helps students and developers understand:
- Dynamic programming concepts
- Matrix-based algorithms
- The relationship between recursion and iteration
- How to optimize overlapping subproblems

## 🔧 Customization

The code is designed to be easily customizable:
- Modify colors in the CSS section
- Adjust animation timing (default: 500ms)
- Add new features or visualizations
- Integrate with educational platforms

## 📝 Algorithm Complexity

- **Time Complexity**: O(mn) where m and n are the lengths of the input strings
- **Space Complexity**: O(mn) for the DP matrix

## 🙏 Acknowledgments

- I thank Dr. Reham Aburas for this opportunity 
- Inspired by the need for better algorithm visualization tools
- Thanks to all contributors and users who provide feedback
- Built for educational purposes
