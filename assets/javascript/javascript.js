//This is the start of the Javascript
var whatever = "bitcoin"
var queryURL = "https://api.coingecko.com/api/v3/coins/bitcoin";


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
    

});

