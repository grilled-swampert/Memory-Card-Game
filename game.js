document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'anubis', img: 'images/anubis.png' }, { name: 'anubis', img: 'images/anubis.png' },
        { name: 'bad-gnome', img: 'images/bad-gnome.png' }, { name: 'bad-gnome', img: 'images/bad-gnome.png' },
        { name: 'beast-eye', img: 'images/beast-eye.png' }, { name: 'beast-eye',  img: 'images/beast-eye.png'}, 
        { name: 'bestial-fangs', img: 'images/bestial-fangs.png' }, { name: 'bestial-fangs', img: 'images/bestial-fangs.png' },
        { name: 'carnivorous-plant', img: 'images/carnivorous-plant.png' }, { name: 'carnivorous-plant', img: 'images/carnivorous-plant.png'},
        { name: 'dinosaur-bones', img: 'images/dinosaur-bones.png' }, { name: 'dinosaur-bones', img: 'images/dinosaur-bones.png' },
        { name: 'double-dragon', img: 'images/double-dragon.png' }, { name: 'double-dragon', img: 'images/double-dragon.png'},
        { name: 'goblin', img: 'images/goblin.png' }, { name: 'goblin', img: 'images/goblin.png' },
        { name: 'haunting', img: 'images/haunting.png' }, { name: 'haunting', img: 'images/haunting.png' },
        { name: 'kraken-tentacle', img: 'images/kraken-tentacle.png' }, { name: 'kraken-tentacle', img: 'images/kraken-tentacle.png' },
        { name: 'mermaid', img: 'images/mermaid.png' }, { name: 'mermaid', img: 'images/mermaid.png' },
        { name: 'metroid', img: 'images/metroid.png'}, { name: 'metroid', img: 'images/metroid.png' },
        { name: 'mummy-head', img: 'images/mummy-head.png' }, { name: 'mummy-head', img: 'images/mummy-head.png' },
        { name: 'pretty-fangs', img: 'images/pretty-fangs.png' }, { name: 'pretty-fangs', img: 'images/pretty-fangs.png' },
        { name: 'purple-tentacle', img: 'images/purple-tentacle.png' }, { name: 'purple-tentacle', img: 'images/purple-tentacle.png' }, 
        { name: 'sasquatch', img: 'images/sasquatch.png' }, { name: 'sasquatch', img: 'images/sasquatch.png' },
        { name: 'transparent-slime', img: 'images/transparent-slime.png' }, { name: 'transparent-slime', img: 'images/transparent-slime.png' },
        { name: 'unicorn', img: 'images/unicorn.png' }, { name: 'unicorn', img: 'images/unicorn.png' },
        { name: 'brute', img: 'images/brute.png' }, { name: 'brute', img: 'images/brute.png' },
        { name: 'vampire-dracula', img: 'images/vampire-dracula.png' }, { name: 'vampire-dracula', img: 'images/vampire-dracula.png' }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    // creating gameboard
    const grid = document.querySelector('.grid')
    var score = 0;
    var seconds = 0; 
    var minutes = 0;
    var timeTaken = 0;
    var highscore = 0;
    var isGameCompleted = false;
    var hasGameStarted = false;
    var cardsChosen = []
    var cardsChosenID = []
    var cardsWon = []
    const resultDisplay = document.querySelector('#result')
    resultDisplay.textContent = score;
    const timeDisplay = document.querySelector('#time');
    timeDisplay.textContent = timeTaken;
    const displayHS = document.querySelector('#highscore');
    displayHS.textContent = highscore;
    var canClick = true;

    const timeGenerator = () => {
        if(hasGameStarted != false ) {
            if (isGameCompleted != true) {
                seconds += 1;
                //minutes logic
                if (seconds >= 60) {
                    minutes += 1;
                    seconds = 0;
                }
                //format time before displaying
                let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
                let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
                timeDisplay.textContent = `${minutesValue}:${secondsValue}`;
                checkGameCompletion();
            }
        };
    }

    function createBoard() {
        for(let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/perspective-dice-six-faces-random.png')
            card.setAttribute('data-id', i)
            card.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.8)'; 
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
        setInterval(timeGenerator, 1000);
    }

    function addClickEvent(cards) {
        cards.forEach(card => {
            if (card.getAttribute('src') === 'images/perspective-dice-six-faces-random.png') {
                card.addEventListener('click', flipCard);
            }
        });
        canClick = true; // enable clicking again
    }

    function saveScore() {
        localStorage.setItem('highscore', highscore);
    }
    
    // function to load highscore from localStorage
    function loadScore() {
        const savedHighscore = localStorage.getItem('highscore');
        if (savedHighscore !== null) {
            highscore = parseInt(savedHighscore);
            displayHS.textContent = highscore;
        }
    }

    // matcher check
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenID[0]
        const optionTwoId = cardsChosenID[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            cardsWon.push(cardsChosen); // push the cards into cardsWon first
            score += 5;
            resultDisplay.textContent = score;
            setTimeout(() => {
                cards[optionOneId].style.boxShadow = 'none';
                cards[optionTwoId].style.boxShadow = 'none';
                cards[optionOneId].setAttribute('src', 'images/transparent-tile.png');
                cards[optionTwoId].setAttribute('src', 'images/transparent-tile.png');
                addClickEvent(cards);
            }, 1000);
        } else {
            setTimeout(() => {
                score -= 1; // seduct 1 point for an incorrect match
                resultDisplay.textContent = score;
                cards[optionOneId].setAttribute('src', 'images/perspective-dice-six-faces-random.png');
                cards[optionTwoId].setAttribute('src', 'images/perspective-dice-six-faces-random.png');
                addClickEvent(cards);
            }, 1000); // sdjust the delay time as needed
        }
        cardsChosen = []
        cardsChosenID = []
        resultDisplay.textContent = score;
        if (cardsWon.length === cardArray.length / 2) {
            if (score > highscore) {
                highscore = score;
                displayHS.textContent = highscore;
                saveScore(); // save the highscore to localStorage
            }
            hasGameStarted = false;
            isGameCompleted = true;
        }        
    }

    // flipping the omelette
    function flipCard() {
        if (!canClick) {
            return; // don't allow clicking on more cards until matching is checked
        }
        
        hasGameStarted = true;
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenID.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
    
        // remove the click event temporarily to prevent further clicks
        this.removeEventListener('click', flipCard);
    
        if (cardsChosen.length === 2) {
            canClick = false; // disable further clicking
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard()
    loadScore()
    grid.classList.remove('depth-effect');
})


