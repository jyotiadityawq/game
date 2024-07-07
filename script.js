document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.getElementById('maze');
    const message = document.getElementById('message');
    const mazeSize = 20;
    let playerPosition = { x: 0, y: 0 };

    function generateMaze(size) {
        const maze = Array.from({ length: size }, () => Array(size).fill('W'));
        const directions = [
            [0, -1], // up
            [1, 0],  // right
            [0, 1],  // down
            [-1, 0]  // left
        ];

        function carveMaze(x, y) {
            directions.sort(() => Math.random() - 0.5);

            for (const [dx, dy] of directions) {
                const nx = x + dx * 2;
                const ny = y + dy * 2;

                if (nx >= 0 && nx < size && ny >= 0 && ny < size && maze[ny][nx] === 'W') {
                    maze[ny - dy][nx - dx] = ' ';
                    maze[ny][nx] = ' ';
                    carveMaze(nx, ny);
                }
            }
        }

        maze[0][0] = ' ';
        carveMaze(0, 0);
        maze[0][0] = 'P'; // Player start position
        maze[size - 1][size - 1] = 'G'; // Goal position
        return maze;
    }

    function renderMaze(maze) {
        mazeContainer.innerHTML = '';
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (maze[y][x] === 'W') {
                    cell.classList.add('wall');
                } else if (maze[y][x] === 'P') {
                    cell.classList.add('player');
                } else if (maze[y][x] === 'G') {
                    cell.classList.add('goal');
                }
                mazeContainer.appendChild(cell);
            }
        }
    }

    function movePlayer(maze, dx, dy) {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
        if (newX < 0 || newX >= mazeSize || newY < 0 || newY >= mazeSize || maze[newY][newX] === 'W') {
            return;
        }
        maze[playerPosition.y][playerPosition.x] = ' ';
        playerPosition = { x: newX, y: newY };
        if (maze[newY][newX] === 'G') {
            alert('Congratulations! You reached the goal!');
        }
        maze[newY][newX] = 'P';
        renderMaze(maze);
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                movePlayer(maze, 0, -1);
                break;
            case 'ArrowDown':
                movePlayer(maze, 0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(maze, -1, 0);
                break;
            case 'ArrowRight':
                movePlayer(maze, 1, 0);
                break;
        }
    });

    const maze = generateMaze(mazeSize);
    renderMaze(maze);
});