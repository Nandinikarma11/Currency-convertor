const formAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const formCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer= document.querySelector('.container');


// Array tto populate the selected tags with these contries
const countries = [
    {code: "USD", name: "United state Dollars"},
    {code: "INR", name: "Indian rupee"},
    {code: "AUD", name: "Australian Dollar"},
    {code: "CAD", name: "Canadian Dollar"},
    {code: "EGP", name: "Egyptian Dollar"},
    {code: "CLP", name: "Chilean Peso"},
    {code: "BRL", name: "Brazalian Real"},
    {code: "COP", name: "Colombian Peso"},
    {code: "EUR", name: "Euro"},
    {code: "IND", name: "Indian rupee"},
    {code: "GBP", name: "Btitish pound sterlling"},
    {code: "TRY", name: "Turkish Lira"},

];

// showing countries from array to select tag

countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');



    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = ` ${country.code}  (${country.name})`;
    formCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2)



    // setting default value  selector
    formCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
    

});

const getExchangeRate =async () => {
    const amount = parseFloat(formAmountElement.value);
    const formCurrency = formCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates...";

    try{
    // fetch data from api
    const response = await fetch(` https://api.exchangerate-api.com/v4/latest/${formCurrency}`);
     const data = await response.json();

     const  conversionRate = data.rates[toCurrency];
     const convertedAmount = (amount * conversionRate).toFixed(2);

     if(typeof conversionRate === `undefined`){
        resultElement.textContent = `Exchange rate data is not available for selected  countries `;
        convertedAmountElement = ""; 
     }

     convertedAmountElement.value = convertedAmount
     resultElement.textContent = `${amount} ${formCurrency} = ${convertedAmount }  ${toCurrency}`;
    //   console.log(data);

}catch (error){
    converterContainer.innerHTML = `<h2> Error while fetching exchange eates!!</h2>`


}
}
// fetching exchange rate 
formAmountElement.addEventListener('input', getExchangeRate );

// fetching exchange rate when user change currency
formCurrencyElement.addEventListener('change', getExchangeRate );
toCurrencyElement.addEventListener('change', getExchangeRate );


window.addEventListener('load', getExchangeRate );