//This is the start of the Javascript
var firebaseConfig = {
    apiKey: "AIzaSyA83gj8o360QgTOBNMn5B8-jXlfDs3bQcw",
    authDomain: "projectonedatabase.firebaseapp.com",
    databaseURL: "https://projectonedatabase.firebaseio.com",
    projectId: "projectonedatabase",
    storageBucket: "",
    messagingSenderId: "727525162645",
    appId: "1:727525162645:web:bf420ddb47c0eed4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//Creating database which has a refence to firebase.database()
database = firebase.database();

//Declaring all global variables to be used in the code
var totalSupply = 0;
var circulatingSupply = 0;
var currentPrice = 0;
var exchange = "";
var image = "";
var homepage = "";

//Listening for an on click event on elements with an id of 'searchBtn'.
$("#searchBtn").on("click", function () {
    event.preventDefault();

    //Creating variable that has a value equal to an element with an id of 'searchInput' value
    var crypto = $("#searchInput").val().trim();
    var queryURLInformation = "https://api.coingecko.com/api/v3/coins/" + crypto;
    var queryURLExchange = "https://api.coingecko.com/api/v3/exchanges/Binance/tickers?coin_ids=" + crypto;

    $.ajax({
        url: queryURLInformation, queryURLExchange,
        method: "GET"
    }).then(function (response) {

        currentPrice = response.market_data.current_price.usd;
        circulatingSupply = response.market_data.circulating_supply;
        totalSupply = response.market_data.total_supply;
        homepage = response.links.homepage[0];
        image = response.image.large;
        exchange = response.tickers[0].trade_url
        

        console.log(response)

        $("#cryptoImg").attr("src", response.image.large);
        $("#current-price").text("Current Price: $" + currentPrice);
        $("#circulating-supply").text("Circulating Supply: $" + circulatingSupply);
        $("#total-supply").text("Total Supply: $" + totalSupply);
        $("#home-page").text("Visit Us @ " + homepage);
        $("#cryptoImg").attr("src", response.image.large);
        $("#crypto-exchange").text("Buy Here @ " + exchange);


        database.ref().push({
            cryptoCurrentPrice: currentPrice,
            cryptocirculatingSupply: circulatingSupply,
            cryptoTotalSupply: totalSupply,
            cryptoHomepage: homepage,
            cryptoImage: image,
            cryptoExchange: exchange

        })
    })




});

