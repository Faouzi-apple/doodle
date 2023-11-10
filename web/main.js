// load window before code
window.onload = function () {
    // get canvas
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    // for accept keybord
    canvas.setAttribute("tabindex", 0);
    canvas.focus();
    // size canvas
    canvas.width = 360;
    canvas.height = 640;
    // thing red cube
    let Xcar = 100;
    let Ycar = 600;
    let sizecar = 25;
    let colorcar = "red";
    let grav = 1; // gravity
    let jumpPower = 15; // power jump
    let velo = 0; // velocity, vertical speed red cube
    // platforms table
    let platforms = [];
    let blackBlock = null; // black cube
    let lineWidth = 2; // width hitbox
    let colorbord = "green"; // color bordure platforms
    // displacement variable
    let moveSpeed = 5;
    let gauche = false;
    let droite = false;
    let jumping = false;
    // letiables de score et de jeu
    let bgColor = "lightblue"; // background-color
    let score = 0; // score
    let gameStarted = false; // if gamme started
    // speed black cube

    let blackBlockSpeed = 2;
    let blackBlockDirection;

    let globalData;
    let names;
    let namesRayan;

    function getPlayers() {
        return new Promise((resolve, reject) => {
            fetch('/doodle/php/getplayer.php')
            .then((response) => {
              console.log(response);  // Move this line here to log the response
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              globalData = data;
              console.log(globalData);
              names = data[0].name;
              namesRayan = data[2].name;
              blackBlockDirection = data[3].blockdirection;
              console.log(blackBlockDirection);
              console.log(namesRayan)
              console.log(names);
              resolve(data);
            })
            .catch((error) => {
              console.log('There has been a problem:', error);
              reject(error);
            });
        });
      }
      
      getPlayers();
      

    // create first plate
    platforms.push({ x: 0, y: canvas.height - 10, width: canvas.width, height: 10 });
    // draw red square
    function drawCar() {
        ctx.fillStyle = colorcar;
        ctx.fillRect(Xcar, Ycar, sizecar, sizecar);
        ctx.strokeStyle = colorbord;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(Xcar, Ycar, sizecar, sizecar);
    }
    // draw plate
    function drawPlateform() {
        ctx.fillStyle = "green";
        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.strokeStyle = "white";
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        }
    }
    // draw black cube
    function drawBlackCar() {
        if (blackBlock) {
            ctx.fillStyle = "black";
            ctx.fillRect(blackBlock.x, blackBlock.y, sizecar, sizecar);
        }
    }
    // dwan backgrond with he's spécifically color
    function drawBackground(color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // Gère les collisions avec les plates-formes et le cube noir
    // je comprend plus le code (ulcère/20)
    function handleCollisions() {
        let leftcar = Xcar;
        let rightcar = Xcar + sizecar;
        let topcar = Ycar;
        let botcar = Ycar + sizecar;
        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];
            if (
                rightcar > platform.x &&
                leftcar < platform.x + platform.width &&
                botcar > platform.y &&
                topcar < platform.y + platform.height
            ) {
                // Ajuste la position du cube rouge en cas de collision avec une plate-forme
                Ycar = platform.y - sizecar;
                velo = 0;
                jumping = false;
            }
        }
    }
    // create a new platform up of canva
    function createPlateform() {
        let lastPlatform = platforms[platforms.length - 1];
        let newY = lastPlatform.y - 60;
        let width = Math.floor(Math.random() * 50) + 50;
        let x = Math.floor(Math.random() * (canvas.width - width));
        platforms.push({ x: x, y: newY, width: width, height: 10 });
    }
    // create the black cube after socore supp than 1
    function createBlackCar() {
        if (score >= 1 && !blackBlock) {
            let x = Math.floor(Math.random() * canvas.width);
            let y = Math.floor(Math.random() * canvas.height);
            blackBlock = { x: x, y: y };
        }
    }
    // tp red cube down and add 1 to score
    function tpAndAddOne() {
        Ycar = canvas.height - sizecar;
        velo = 0;
        score++;
        console.log("Score : " + score);
        // change color back random
        bgColor = createRandomColor();
        // reinisilise position plat
        for (let i = 0; i < platforms.length; i++) {
            platforms[i].x = Math.floor(Math.random() * (canvas.width - platforms[i].width));
        }
        // create black cube
        if (Ycar < 0) {
            createBlackCar();
        }
    }
    // create a hexa color in random (trouvé sur internet)
    function createRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    // function update
    function update() {
        // Apply gravity and update the position of the red cube
        velo += grav;
        Ycar += velo;
        // tp red cube down and add 1 to score (comme a la ligne 125 mais si j'enlève 1 des deux ne marche plus (ça aussi ulcère/20))
        if (Ycar < 0) {
            tpAndAddOne();
        }
        // Prevent the red cube from passing through the bottom of the canvas
        if (Ycar + sizecar >= canvas.height) {
            Ycar = canvas.height - sizecar;
            velo = 0;
            jumping = false;
        }
        // manage collision between plate and cube
        handleCollisions();
        // move red cube left
        if (gauche) {
            if (Xcar - moveSpeed >= 0) {
                Xcar -= moveSpeed;
            }
        }
        // move red cube right
        if (droite) {
            if (Xcar + sizecar + moveSpeed <= canvas.width) {
                Xcar += moveSpeed;
            }
        }
        // create new platforme and black cube
        createPlateform();
        createBlackCar();
        // move black cube left to the right
        if (blackBlock) {
            blackBlock.x += blackBlockSpeed * blackBlockDirection;
            // and right to left when he touch the bordure of canva
            if (blackBlock.x < 0 || blackBlock.x + sizecar > canvas.width) {
                blackBlockDirection *= -1;
            }
        }
        // Draw the background, platforms, the black cube, and the red cube
        drawBackground(bgColor);
        drawPlateform();
        drawBlackCar();
        drawCar();
        drawScore();
        // request new animation
        requestAnimationFrame(update);
    }
    // draw the score
    function drawScore() {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 300, 30);
    }
    // draw start screen
    function drawStartScreen() {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);
    }
    // clear screen start and start game
    function clearStartScreen() {
        gameStarted = true;
        requestAnimationFrame(update);
    }
    window.addEventListener("keypress", function (event) {
        if (!gameStarted && event.key === "Enter") {
            clearStartScreen();
        }
    });
    window.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            droite = true;
        } else if (event.key === "ArrowLeft") {
            gauche = true;
        } else if (event.key === "ArrowUp" && !jumping) {
            jumping = true;
            velo = -jumpPower;
        }
    });
    window.addEventListener("keyup", function (event) {
        if (event.key === "ArrowRight") {
            droite = false;
        } else if (event.key === "ArrowLeft") {
            gauche = false;
        }
    });
    // Draw the game screen continuously at regular intervals
    function draw() {
        drawBackground(bgColor);
        if (gameStarted) {
            drawPlateform();
            drawBlackCar();
            drawCar();
        } else {
            drawStartScreen();
        }
    }
    // Call the draw function every 100 milliseconds
    setInterval(draw, 100);
};
