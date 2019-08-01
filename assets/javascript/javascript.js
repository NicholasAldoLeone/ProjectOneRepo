//This is the start of the Javascript

var queryURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response){

    console.log(response);

});

