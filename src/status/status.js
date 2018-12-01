import statusCSS from './style.css' 

const UpperLimit = 9999999;
const p_Power = document.querySelector("#Power .Data p");
const p_People = document.querySelector("#People .Data p");
const p_Money = document.querySelector("#Money .Data p");
/**
 * Update the Character data get from Server
 * 
 * @function
 * 
 * @param {string | int} Power - the value of Power
 * @param {string | int} People - the value of People
 * @param {string | int} Money - the value of Money
 */
function writeData(Power, People, Money){

    Power = (Power>UpperLimit)? UpperLimit : Power;
    People = (People>UpperLimit)? UpperLimit : People;
    Money = (Money>UpperLimit)? UpperLimit : Money;

    p_Power.textContent = Power.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_People.textContent = People.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_Money.textContent = Money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

// The test for render
writeData("123456789", 456, 12345678)