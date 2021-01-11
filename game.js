initGame();

function initGame() {

    const singlePlayerButton = document.querySelector('.single');
    const highScoreButton = document.querySelector('.high-score');
    const creditsButton = document.querySelector('.credits');
    const logoContainer = document.querySelector('.logo-container');

    singlePlayerButton.addEventListener("click", startGame)

    function drawShip() {

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

    function chooseShip(){

        // Display
        const shipChoose = document.querySelector('.ship-choose')
        shipChoose.style.display = 'block'

        // Select ships
        const xWing = document.querySelector('.xwing')
        const slaveOne = document.querySelector('.slave')
        const milleniumFalcon = document.querySelector('.falcon')

        // Eventlisteners
        let chosenShip = ''
        xWing.addEventListener('click', chooseShip)
        slaveOne.addEventListener('click', chooseShip)
        milleniumFalcon.addEventListener('click', chooseShip)

        console.log(chosenShip)

        // Ship choose
        function chooseShip() {
            chosenShip = // TODO ship id!!!

            // Hide container
            shipChoose.style.display = 'none'

            return chosenShip
        }





    }

    function showCredits(){

    }
    function goBack(){

    }
    function showHighScore(){

    }




}
