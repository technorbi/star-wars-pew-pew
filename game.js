initGame();

function initGame() {

    const theChosenOne = ''
    const singlePlayerButton = document.querySelector('.single');
    const highScoreButton = document.querySelector('.high-score');
    const creditsButton = document.querySelector('.credits');
    const logoContainer = document.querySelector('.logo-container');
    const shipDevContainer = document.querySelector('.ship-choose');
    singlePlayerButton.addEventListener("click", startGame)


    function drawShip(theChosenOne) {
        const playerShip = document.querySelector(theChosenOne)
        playerShip.style.transform = 'scale(1)'
        playerShip.style.margin = 'auto'
        let audio = new Audio('sounds/xwing-fly.mp3')
        audio.volume = 0.07
        audio.loop = true
        // audio.play()
    }

    function drawShoot() {
        const laser = document.querySelector('.laser-container')
        laser.style.display = 'block'
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
    move()

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
                drawShip(theChosenOne)
                for (let shipStyle of ships) {
                    if ('#' + shipStyle.getAttribute('id') !== theChosenOne) {
                        shipStyle.style.display = 'none'
                        document.querySelector('.choose').style.display = 'none'
                        shipDevContainer.style.textAlign = 'left'
                        shipDevContainer.className += ' vertical'
                    }
                }
            })
        }
    }

    function goBack() {

    }

    function showHighScore() {

    }

    function move() {
        let playerShip = document.querySelector('.ship-choose');
        let moveBy = 15;
        window.addEventListener('load', () => {
            playerShip.style.position = 'absolute';
            playerShip.style.left = 0;
            playerShip.style.top = 0;
        });


        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    playerShip.style.top = parseInt(playerShip.style.top) - moveBy + 'px';
                    break;
                case 'ArrowDown':
                    playerShip.style.top = parseInt(playerShip.style.top) + moveBy + 'px';
                    break;
            }
        });
    }
}
