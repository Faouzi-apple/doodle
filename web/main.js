window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    canvas.setAttribute("tabindex", 0);
    canvas.focus();

    canvas.width = 360;
    canvas.height = 640;

    var Xcar = 100;
    var Ycar = 600;
    var sizecar = 25;
    var colorcar = "red";
    var grav = 1;
    var soPower = 15;
    var velo = 0;
    var tombe = true;
    var so = false;

    var platforms = [];
    var lineWidth = 2;
    var colorbord = "green";

    var moveSpeed = 5;
    var platformSpeed = 2; // Nouvelle variable pour la vitesse des plateformes
    var gauche = false;
    var droite = false;

    var nmbrTP = 0;
    var bgColor = "lightblue"; // Couleur de fond par défaut
    var score = 0;

    // Créez une grande plateforme tout en bas
    platforms.push({ x: 0, y: canvas.height - 10, width: canvas.width, height: 10 });

    function drawSquare() {
        ctx.fillStyle = colorcar;
        ctx.fillRect(Xcar, Ycar, sizecar, sizecar);
        ctx.strokeStyle = colorbord;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(Xcar, Ycar, sizecar, sizecar);
    }

    function drawPlatform() {
        ctx.fillStyle = "green";
        for (var i = 0; i < platforms.length; i++) {
            var platform = platforms[i];
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.strokeStyle = "white";
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        }
    }

    function drawBackground(color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function handleCollisions() {
        var squareLeft = Xcar;
        var squareRight = Xcar + sizecar;
        var squareTop = Ycar;
        var squareBottom = Ycar + sizecar;

        for (var i = 0; i < platforms.length; i++) {
            var platform = platforms[i];

            if (
                squareRight > platform.x &&
                squareLeft < platform.x + platform.width &&
                squareBottom > platform.y &&
                squareTop < platform.y + platform.height
            ) {
                Ycar = platform.y - sizecar;
                velo = 0;
                so = false;
            }
        }
    }

    function generatePlatform() {
        var lastPlatform = platforms[platforms.length - 1];
        var newY = lastPlatform.y - 60;
        var width = Math.floor(Math.random() * 50) + 50;
        var x = Math.floor(Math.random() * (canvas.width - width));
        platforms.push({ x: x, y: newY, width: width, height: 10 });
    }

    function teleportAndIncrementScore() {
        Ycar = canvas.height - sizecar;
        velo = 0;
        so = false;
        nmbrTP++;
        score++;

        console.log("Nombre de téléportations : " + nmbrTP);
        console.log("Score : " + score);

        // Changer la couleur de fond aléatoirement
        bgColor = getRandomColor();

        // Déplacez les plateformes de manière aléatoire à chaque augmentation de score
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].x = Math.floor(Math.random() * (canvas.width - platforms[i].width));
        }
    }

    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function update() {
        velo += grav;
        Ycar += velo;

        if (Ycar < 0) {
            teleportAndIncrementScore();
        }

        if (Ycar + sizecar >= canvas.height) {
            Ycar = canvas.height - sizecar;
            velo = 0;
            tombe = true;
        }

        handleCollisions();

        if (gauche) {
            if (Xcar - moveSpeed >= 0) {
                Xcar -= moveSpeed;
            }
        }
        if (droite) {
            if (Xcar + sizecar + moveSpeed <= canvas.width) {
                Xcar += moveSpeed;
            }
        }

        generatePlatform();

        drawBackground(bgColor);
        drawPlatform();
        drawSquare();
        drawScore();
        requestAnimationFrame(update);
    }

    window.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            droite = true;
        } else if (event.key === "ArrowLeft") {
            gauche = true;
        } else if (event.key === "ArrowUp" && !so) {
            so = true;
            velo = -soPower;
        }
    });

    window.addEventListener("keyup", function (event) {
        if (event.key === "ArrowRight") {
            droite = false;
        } else if (event.key === "ArrowLeft") {
            gauche = false;
        }
    });

    function drawScore() {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 20, 30);
    }

    function drawGameOver() {
        ctx.fillStyle = "red";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }

    function drawUI() {
        drawScore();
        if (nmbrTP === 2) {
            clearInterval(update);
            drawGameOver();
        }
    }

    function draw() {
        drawBackground(bgColor);
        drawPlatform();
        drawSquare();
        drawUI();
    }

    setInterval(draw, 100);

    update();
};
