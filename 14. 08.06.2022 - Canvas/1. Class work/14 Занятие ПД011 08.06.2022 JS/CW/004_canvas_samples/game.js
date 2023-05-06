window.addEventListener("load", startGame, false);

let centerX = 250,
    centerY = 200,
    
	radius = 15,
    ballColor = "lightseagreen",
	
	dx = 5,
	dy = 5,
	
	score = 0;
	
	gameWidth = 300,
	gameHeight = 500,
	
	racketWidth = 100,
	racketHeight = 25,
	racketLeft = 100,
	racketTop = 475,

	animation;  // таймер периодического запуска анимации
	
// запуск покадровой обработки 
function startGame() {
    animation = setInterval(newGame, 30);
}

function newGame() {
    if (centerY - radius > gameHeight) {
        document.getElementById("score").innerHTML = `Игра завершена. Вы набрали: ${score}.`;
        document.getElementById("score").style.border = "2px solid red";
        clearInterval(animation);
    }
    else {
        document.getElementById("curr_score").innerHTML = score;
        let canvas = document.getElementById("gameCanvas");
        let context = canvas.getContext("2d");
        
		// Каждый раз при отрисовке - очищаем холст
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Прорисовка мяча
        context.beginPath();    
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        context.stroke();
        context.fillStyle = ballColor;
        context.fill();

        //Перемещение мяча
        // если удар по вертикальной стенке - отражение по x
        if (centerX + radius === gameWidth || centerX - radius === 0) {
            dx = -dx;
            score++;
        }
        // если удар по гориизотальной стенке - отражение по y
        if (centerY - radius < 0) {
            dy = -dy;
            score++;
        }

        centerX = centerX + dx;
        centerY = centerY + dy;

        // Прорисовка ракетки
        context.fillStyle = "blue";
        context.fillRect(racketLeft, racketTop, racketWidth, racketHeight);

        // Проверка столкновения мяча с ракеткой
        checkCollision();
        function checkCollision() {
            if ((centerY + radius == racketTop) && (centerX >= racketLeft) && 
			    (centerX < (racketLeft + racketWidth))) {
                dy = -dy;
            }
        }
		
        // Движение ракетки производим с помощью управляющих клавиш (left, right)
        document.onkeydown = function () {
            switch (window.event.keyCode) {
                case 37:
                    racketLeft -= 20;
                    if (racketLeft < 0) {
                        racketLeft = 0;
                    }
                    break;
                case 39:
                    racketLeft += 20;
                    if (racketLeft + racketWidth > gameWidth) {
                        racketLeft = gameWidth - racketWidth;
                    }
                    break;
            }
        };
    }
}
