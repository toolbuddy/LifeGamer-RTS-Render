import statusCSS from './style.css' 


const CharPic = document.querySelector(".Status #Character .Container .Pic");
const p_Power = document.querySelector("#Power .Data p");
const p_People = document.querySelector("#People .Data p");
const p_Money = document.querySelector("#Money .Data p");

function writeData(CharUrl, CharName, Power, People, Money){

    CharPic.style.backgroundImage = "url(" + CharUrl + ")";
    CharPic.title = CharName;

    p_Power.textContent = Power.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_People.textContent = People.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_Money.textContent = Money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

}
writeData("https://imgur.com/MTBIqnn.png", "Thrive", 123, 456, 7890)