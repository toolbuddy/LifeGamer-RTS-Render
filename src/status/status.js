import statusCSS from './style.css' 


const CharPic = document.querySelector(".Status #Character .Container .Pic");
const p_Power = document.querySelector("#Power .Data p");
const p_People = document.querySelector("#People .Data p");
const p_Money = document.querySelector("#Money .Data p");
/**
 * Update the Character data get from Server
 * 
 * @function
 * 
 * @param {string} CharUrl - the character picture
 * @param {string} CharName - the character name
 * @param {string | int} Power - the value of Power
 * @param {string | int} People - the value of People
 * @param {string | int} Money - the value of Money
 */
function writeData(CharUrl, CharName, Power, People, Money){

    CharPic.style.backgroundImage = "url(" + CharUrl + ")";
    CharPic.title = CharName;

    p_Power.textContent = Power.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_People.textContent = People.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_Money.textContent = Money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

}

// The test for render
writeData("https://imgur.com/MTBIqnn.png", "Thrive", "123456", 456, 7890)