initGame();

function initGame() {

    let theChosenOne = ''
    const singlePlayerButton = document.querySelector('.single');
    const highScoreButton = document.querySelector('.high-score');
    const creditsButton = document.querySelector('.credits');
    const logoContainer = document.querySelector('.logo-container');
    const shipDevContainer = document.querySelector('.ship-choose');
    const enemyDevContainer = document.querySelector('.enemy-container');
    singlePlayerButton.addEventListener("click", startGame)


    function drawShip(theChosenOne) {
        document.body.style.backgroundImage = 'url(images/level1.jpg)'
        const playerShip = document.querySelector(theChosenOne)
        playerShip.style.transform = 'scale(1)'
        playerShip.style.margin = 'auto'
        let audio = new Audio('sounds/xwing-fly.mp3')
        audio.volume = 0.07
        audio.loop = true
        // audio.play()
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
            laserContainer.innerHTML =  '';
        }
    }


    function startGame(){

        // Hide Menu
        if (logoContainer.style.display === "none") {
            logoContainer.style.display = "block";
            }
        else {
            logoContainer.style.display = "none";
            }
        chooseShip()
    }

    function chooseShip(theChosenOne) {

        // Display
        const shipChoose = document.querySelector('.ship-choose')

        shipChoose.style.display = 'block'

        // Select ships
        const ships = document.querySelectorAll('.ship')

        // Eventlisteners
        let chosenShip = ''

        for (let ship of ships) {
            ship.addEventListener('click', function () {
                chosenShip = ship.getAttribute('id')

                // Hide other ships
                theChosenOne = '#' + chosenShip
                for (let shipStyle of ships) {
                    if ('#' + shipStyle.getAttribute('id') !== theChosenOne) {
                        shipStyle.remove()
                        document.querySelector('.choose').style.display = 'none'
                        shipDevContainer.style.textAlign = 'left'
                        shipDevContainer.className += ' vertical'
                    }
                }
                move()
                drawEnemies()
            })
        }
    }

    function goBack() {

    }

    function showHighScore() {

    }

    function move() {
        let playerShip = document.querySelector('.ship-choose')
        const playerShipId = '#' + document.querySelector('.ship').getAttribute('id');
        const playerShipName = playerShipId.split('#')[1]
        let moveBy = 10;
        window.addEventListener('load', () => {
            playerShip.style.left = 0;
            playerShip.style.top = '50%';
        });


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
    move()
    function drawEnemies() {
        let enemyContainer = document.querySelector('.enemy-container');
        enemyContainer.innerHTML += `<img class="enemy"  src="images/tie.png">`
        enemyDevContainer.className += ' vertical'
        enemyDevContainer.style.textAlign = 'right'
    }
}
