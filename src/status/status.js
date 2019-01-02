import statusCSS from './style.css'


const UpperLimit = 9999999;
const p_Power = document.querySelector("#Power > .Data");
const p_People = document.querySelector("#People > .Data");
const p_Money = document.querySelector("#Money > .Data");
/**
 * Update the Character data get from Server
 *
 * @function
 *
 * @param {Object} userData - contains Population, PopulationCap, Money, Power, and PowerMax
 */

/*
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
}*/


export default function writeData(userData){

    let Power = (userData.Power > UpperLimit) ? UpperLimit : userData.Power,
        PowerMax = (userData.PowerMax > UpperLimit) ? UpperLimit : userData.PowerMax,
        Population = (userData.Population > UpperLimit) ? UpperLimit : userData.Population,
        PopulationCap = (userData.PopulationCap > UpperLimit) ? UpperLimit : userData.PopulationCap,
        Money = (userData.Money > UpperLimit) ? UpperLimit : userData.Money

    p_Power.textContent = `${Power} / ${PowerMax}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_People.textContent = `${Population} / ${PopulationCap}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    p_Money.textContent = `${Money}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}