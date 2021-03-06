let SHIP_ONE_INTERVAL, SHIP_TWO_INTERVAL, SHIP_THREE_INTERVAL

initGame();

function initGame() {

    const singlePlayerButton = document.querySelector('.single');
    const highScoreButton = document.querySelector('.high-score');
    const creditsButton = document.querySelector('.credits');
    const logoContainer = document.querySelector('.logo-container');
    const shipDevContainer = document.querySelector('.ship-choose');
    const bigContainer = document.querySelector('.container')
    let playerLife = document.querySelector('.lifescore')
    let playerScore = document.querySelector('.highscore')
    let currentScore = 0
    let objects = []

    SHIP_ONE_INTERVAL = 1500
    SHIP_TWO_INTERVAL = 6000
    SHIP_THREE_INTERVAL = 12000

    window.addEventListener("click", function () {
        logoContainer.style.visibility = 'visible'
    })

    singlePlayerButton.addEventListener("click", startGame)

    function drawShip(theChosenOne) {
        document.body.style.backgroundImage = 'url(images/level1.jpg)'
        const playerShip = document.querySelector(theChosenOne)
        playerShip.style.transform = 'scale(1)'
        playerShip.style.margin = 'auto'

    }

    const originalShootTop = shipDevContainer.offsetTop - 10 + 'px'

    function shootLaser() {

        const laserContainer = document.querySelector('.laser-container')
        const laser = document.querySelector('.laser-shoot')

        let shipTop = shipDevContainer.offsetTop

        laser.classList.remove('hidden')
        let left = laser.offsetLeft
        left += 20
        laser.style.left = left + 'px'
        if (laser.offsetLeft > 350) {
            laser.offsetTop = originalShootTop
        } else {
            laser.style.top = shipTop - 10 + 'px'
        }
        if (laser.offsetLeft < 2000) {
            requestAnimationFrame(shootLaser)
        }
        if (laser.offsetLeft > 2000) {
            laserContainer.innerHTML = '';
        }
        checkLaserHit()
    }

    function checkLaserHit() {

        const laser = document.querySelector('.laser-shoot')
        const enemyContainer = document.querySelectorAll('.enemy-container');

        for (let enemy of enemyContainer) {
            if (isColliding(laser, enemy) && laser.offsetLeft > enemy.offsetLeft) {
                enemy.remove()
                laser.remove()
                currentScore += 100
                playerScore.innerHTML = 'Score: ' + currentScore
            }
        }
    }

    function checkShipCollide() {

        const shipContainer = document.querySelector('.ship');
        const enemyContainer = document.querySelectorAll('.enemy-container');

        for (let enemy of enemyContainer) {
            console.log(enemy.offsetTop)
            console.log(shipContainer.offsetTop)
            if (isColliding(enemy, shipContainer) < 100 && shipContainer.offsetLeft > enemy.offsetLeft) {
                enemy.remove()
                playerLife -= 1
            }
        }
    }

    function isColliding(div1, div2) {
        let d1_height = div1.offsetHeight;
        let d1_width = div1.offsetWidth;
        let d1_distance_from_top = div1.offsetTop + d1_height;
        let d1_distance_from_left = div1.offsetLeft + d1_width;

        let d2_height = div2.offsetHeight;
        let d2_width = div2.offsetWidth;
        let d2_distance_from_top = div2.offsetTop + d2_height;
        let d2_distance_from_left = div2.offsetLeft + d2_width;

        let not_colliding =
            d1_distance_from_top < div2.offsetTop ||
            div1.offsetTop > d2_distance_from_top ||
            d1_distance_from_left < div2.offsetTop ||
            div1.offsetLeft > d2_distance_from_left;

        return !not_colliding;
    }


    function startGame() {

        document.querySelector('.intro').remove()
        // Hide Menu
        if (logoContainer.style.display === "none") {
            logoContainer.style.display = "block";
        } else {
            logoContainer.style.display = "none";
        }

        chooseShip()
    }

    function chooseShip() {

        let playerScore = document.querySelector('.highscore')

        // Display
        const shipChoose = document.querySelector('.ship-choose')

        shipChoose.style.display = 'block'

        // Select ships
        const ships = document.querySelectorAll('.ship')

        // Eventlisteners
        let chosenShipId = ''

        for (let ship of ships) {
            ship.addEventListener('click', function () {
                chosenShipId = ship.id

                // Hide other ships
                for (let shipStyle of ships) {
                    if (shipStyle.id !== chosenShipId) {
                        shipStyle.remove()
                        document.querySelector('.choose').style.display = 'none'
                        shipDevContainer.style.textAlign = 'left'
                        shipDevContainer.className += ' vertical'

                    }
                }
                document.body.style.backgroundImage = 'url(images/menu-background.jpg)'
                playerScore.style.visibility = 'visible'
                playerLife.style.visibility = 'visible'
                let audio = new Audio('sounds/xwing-fly.mp3')
                audio.volume = 0.07
                audio.loop = true
                audio.play()

                initMove()
                moveEnemy()

                if (playerScore > 3000) {
                    window.SHIP_ONE_INTERVAL = 1000
                    window.SHIP_TWO_INTERVAL = 5000
                    window.SHIP_THREE_INTERVAL = 8000
                }
                if (playerScore > 10000) {
                    window.SHIP_ONE_INTERVAL = 500
                    window.SHIP_TWO_INTERVAL = 3000
                    window.SHIP_THREE_INTERVAL = 6000
                }
                if (playerScore > 20000) {
                    window.SHIP_ONE_INTERVAL = 5000
                    window.SHIP_TWO_INTERVAL = 3000
                    window.SHIP_THREE_INTERVAL = 5000
                }

                console.log(playerScore)
                setInterval(drawEnemies, SHIP_ONE_INTERVAL)
                setInterval(drawEnemies, SHIP_TWO_INTERVAL)
                setInterval(drawEnemies, SHIP_THREE_INTERVAL)

                setInterval(checkShipCollide, 100)
                if (removedEnemy) {
                    drawEnemies()
                }


            })
        }
    }


    function showHighScore() {

    }

    function initMove() {
        let playerShip = document.querySelector('.ship-choose')
        const playerShipId = '#' + document.querySelector('.ship').getAttribute('id');
        const playerShipName = playerShipId.split('#')[1]
        let moveBy = 10;
        playerShip.style.left = 0;
        playerShip.style.top = '50%';


        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case ('ArrowUp'):
                    if (playerShip.style.top !== '10%') {
                        playerShip.style.top = parseInt(playerShip.style.top) - moveBy + '%';
                        document.querySelector(playerShipId).src = `images/${playerShipName}-up.png`
                    }
                    break;
                case 'ArrowDown':
                    if (playerShip.style.top !== '90%') {
                        playerShip.style.top = parseInt(playerShip.style.top) + moveBy + '%';
                        document.querySelector(playerShipId).src = `images/${playerShipName}-down.png`
                    }
                    break;
                case ' ':
                    const laserContainer = document.querySelector('.laser-container')
                    laserContainer.innerHTML += `<img class="laser-shoot hidden"  src="images/laser.png">`;
                    requestAnimationFrame(shootLaser)
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            document.querySelector(playerShipId).src = `images/${playerShipName}.png`
        });
    }

    let removedEnemy = false

    function drawEnemies() {

        let percentage = [20, 30, 40, 50, 60, 70, 80]

        let ship = ''
        if (Math.random() < 0.50) {
            ship = `<div class="enemy-container">
                                            <img class="tie" id="enemy"  src="images/tie.png"/>
                        </div>`;
        } else {
            ship = `<div class="enemy-container">
                                            <img class="interceptor" id="enemy"  src="images/interceptor.png"/>
                        </div>`;
        }
        let object = {
            html: ship,
            x: percentage[Math.floor(Math.random() * percentage.length)],
            y: 1300
        }

        objects = []
        objects.push(object)

        let randomTop = percentage[Math.floor(Math.random() * percentage.length)];

        for (let object of objects) {
            bigContainer.innerHTML += object.html
            const enemyContainers = document.querySelectorAll('.enemy-container');
            const container = enemyContainers[enemyContainers.length - 1]
            container.style.top = randomTop + '%'
            console.log(objects)
            if (removedEnemy) {
                objects.pop()
            }
        }

        const enemyContainer = document.querySelectorAll('.enemy-container');
        for (let enemy of enemyContainer) {
            let enemyLeft = enemy.offsetLeft
            if (enemy.offsetLeft <= 0) {
                enemy.remove()
                removedEnemy = true
            }
        }
    }

    function moveEnemy() {
        removedEnemy = false
        const enemyContainer = document.querySelectorAll('.enemy-container');
        for (let enemy of enemyContainer) {
            let enemyLeft = enemy.offsetLeft
            if (enemy.offsetLeft <= 0) {
                enemy.style.left = '2000px'
            } else if (enemy.offsetLeft > 0) {
                enemyLeft -= 2
                if (playerScore > 10000){
                    enemyLeft = 3
                }
                if (playerScore > 20000) {
                    enemyLeft = 4
                }
                enemy.style.left = enemyLeft + 'px'
            }
        }
        requestAnimationFrame(moveEnemy)
    }
}