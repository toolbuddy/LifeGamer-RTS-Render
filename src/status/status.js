import statusCSS from './style.css' 

const UpperLimit = 999999;
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
    p_Power.textContent = thousandDots(numberJudge(Power));
    p_People.textContent = thousandDots(numberJudge(People));
    p_Money.textContent = thousandDots(numberJudge(Money));
}

function numberJudge(str){
	if(str.split("/")[1]==null){
		return (str>UpperLimit)? thousandToK(str):str;
	}else{
		return ((str.split("/")[0]>UpperLimit)? thousandToK(str.split("/")[0]):str.split("/")[0]) + "/" +
				((str.split("/")[1]>UpperLimit)? thousandToK(str.split("/")[1]):str.split("/")[1]) ;
	}
}

function thousandToK(number){
	return number.slice(0,-3).concat("k");
}

function thousandDots(number){
	return number.toString().replace(/(\d{1,3})(?=(\d{3})+\k)/g, "$1,")
}

// The test for render
writeData("2000/3000000", "4007/1000000", "1234567")