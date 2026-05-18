/*****************************************************************************
 * Challenge 2: Review the provided code.
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;

        gamesContainer.append(gameCard);
    }
}

// call the function using the games data
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page
*/

// 1. Total Contributions (Backers)
const contributionsCard = document.getElementById("num-contributions");
const totalBackers = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US');

// 2. Total Raised (Pledged)
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;

// 3. Total Number of Games
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    });
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company
*/

const descriptionContainer = document.getElementById("description-container");
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. 
Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? "game remains" : "games remain"} unfunded. 
We need your help to fund these amazing games!`;

const newParagraph = document.createElement("p");
newParagraph.innerHTML = displayStr;
descriptionContainer.appendChild(newParagraph);


/*************************************************************************************
 * Challenge 7: Select & display the top 2 games
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it
const firstGameDisplay = document.createElement("p");
firstGameDisplay.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameDisplay);

// do the same for the runner up item
const secondGameDisplay = document.createElement("p");
secondGameDisplay.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameDisplay);