//Declaring all global variables to be used in the code
var totalSupply = 0;
var circulatingSupply = 0;
var currentPrice = 0;
var exchange = "";
var image = "";
var homepage = "";
var description = "";
var name = "";

var name = "";
var symbol = "";
var description = "";

function generateCryptoInformation() {
    var cryptoInfo = $("<div>").attr("id", "information");

    var cryptoName = $("<h3>").attr("id", "card-name-input").addClass("card-header").text(name);

    var cryptoTitleBody = $("<div>").addClass("card-body");
    var specialTitle = $("<h5>").addClass("card-title").text(symbol);

    cryptoTitleBody.append(specialTitle);

    var cryptoInfoImg = $("<img>").attr("id", "cryptoImg").attr("src", image);
    cryptoInfoImg.attr("style", "height: 200px; width: 200px; display: block;");
    cryptoInfoImg.attr("alt", "Card Image");

    var cryptoCardBody = $("<div>").addClass("card-body");
    var cardPara = $("<p>").addClass("card-text").attr("id", "imageText").html(description);

    cryptoCardBody.append(cardPara);

    var cryptoList = $("<ul>").addClass("list-group list-group-flush");

    var price = $("<li>").attr("id", "current-price").addClass("list-group-item").text("Current Price: " + currentPrice);
    var circulating = $("<li>").attr("id", "circulating-supply").addClass("list-group-item").text("Circulating Supply: " + circulatingSupply);
    var total = $("<li>").attr("id", "total-supply").addClass("list-group-item").text("Total Supply: " + totalSupply);
    var homepageLink = $("<li>").attr("id", "homepage").addClass("list-group-item").html(`Visit Us @ <a href ='${homepage}'target = "_blank">${homepage}</a>`);
    var exchangeLink = $("<li>").attr("id", "exchange").addClass("list-group-item").html(`Buy here @ <a href ='${exchange}'target = "_blank">${exchange}</a>`);

    cryptoList.append(price);
    cryptoList.append(circulating);
    cryptoList.append(total);
    cryptoList.append(homepageLink);
    cryptoList.append(exchangeLink);

    cryptoInfo.append(cryptoName);
    cryptoInfo.append(cryptoTitleBody);
    cryptoInfo.append(cryptoInfoImg);
    cryptoInfo.append(cryptoCardBody);
    cryptoInfo.append(cryptoList);

    $("#cryptoInformation").prepend(cryptoInfo);

}

for (var i = 0; i < sessionStorage.length; i++) {
    var obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));

    var cryptoInfo = $("<div>").attr("id", "information");
    var cryptoName = $("<h3>").attr("id", "card-name-input").addClass("card-header").text(obj.nameInfo);

    var cryptoTitleBody = $("<div>").addClass("card-body");
    var specialTitle = $("<h5>").addClass("card-title").text(obj.symbol);

    cryptoTitleBody.append(specialTitle);

    var cryptoInfoImg = $("<img>").attr("id", "cryptoImg").attr("src", obj.image);
    cryptoInfoImg.attr("style", "height: 200px; width: 200px; display: block;");
    cryptoInfoImg.attr("alt", "Card Image");

    var cryptoCardBody = $("<div>").addClass("card-body");
    var cardPara = $("<p>").addClass("card-text").attr("id", "imageText").html(obj.description);

    cryptoCardBody.append(cardPara);

    var cryptoList = $("<ul>").addClass("list-group list-group-flush");

    var price = $("<li>").attr("id", "current-price").addClass("list-group-item").text("Current Price: " + obj.currentPrice);
    var circulating = $("<li>").attr("id", "circulating-supply").addClass("list-group-item").text("Circulating Supply: " + obj.circulatingSupply);
    var total = $("<li>").attr("id", "total-supply").addClass("list-group-item").text("Total Supply: " + obj.totalSupply);
    var homepageLink = $("<li>").attr("id", "homepage").addClass("list-group-item").html(`Visit Us @ <a href ='${obj.homepage}'target = "_blank">${obj.homepage}</a>`);
    var exchangeLink = $("<li>").attr("id", "exchange").addClass("list-group-item").html(`Buy here @ <a href ='${obj.exchange}'target = "_blank">${obj.exchange}</a>`);

    cryptoList.append(price);
    cryptoList.append(circulating);
    cryptoList.append(total);
    cryptoList.append(homepageLink);
    cryptoList.append(exchangeLink);

    cryptoInfo.append(cryptoName);
    cryptoInfo.append(cryptoTitleBody);
    cryptoInfo.append(cryptoInfoImg);
    cryptoInfo.append(cryptoCardBody);
    cryptoInfo.append(cryptoList);

    $("#cryptoInformation").prepend(cryptoInfo);

}

//Listening for an on click event on elements with an id of 'searchBtn'.
$("#searchBtn").on("click", function () {
    event.preventDefault();

    //Creating variable that has a value equal to an element with an id of 'searchInput' value
    var crypto = $("#searchInput").val().toLowerCase().trim();
    // replaces "spaces" with "-" for user input in search box
    crypto = crypto.replace(" ", "-");
    
    $("#searchInput").val("");
    
    var queryURLInformation = "https://api.coingecko.com/api/v3/coins/" + crypto;
    var queryURLExchange = "https://api.coingecko.com/api/v3/exchanges/Binance/tickers?coin_ids=" + crypto;
    // ajax call to get data from API
    $.ajax({
        url: queryURLInformation, queryURLExchange, 
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // targeting data from a specific area off the array
        name = response.id;
        symbol = response.symbol;
        description = response.description.en;
        currentPrice = response.market_data.current_price.usd;
        circulatingSupply = response.market_data.circulating_supply;
        totalSupply = response.market_data.total_supply;
        homepage = response.links.homepage[0];
        image = response.image.large;
        exchange = response.tickers[0].trade_url
        
        var information = {
            "nameInfo": name,
            "symbol": symbol,
            "description": description,
            "currentPrice": currentPrice,
            "circulatingSupply": circulatingSupply,
            "totalSupply": totalSupply,
            "homepage": homepage,
            "image": image,
            "exchange": exchange
            
        };
        
        var keyName = name + "-information"
        sessionStorage.setItem(keyName, JSON.stringify(information));
        generateCryptoInformation();
        
    })
    .catch(function (error) {
        
        var alertModal = $("<div>").addClass("alert alert-warning").attr("role", "alert").html("Please enter in a valid Cryptocurrency")
        $("#alertDiv").append(alertModal);
        
        setTimeout(clearAlert, 5000);
        
        function clearAlert() {
            $("#alertDiv").empty();
            
        }
    })
});

$("#clearBtn").on("click", function () {
    event.preventDefault();
    
    sessionStorage.clear();
    $("#cryptoInformation").empty();
    
})

$("#gifBtn").on("click", function () {
    event.preventDefault();
    
    var queryURLGify = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=cryptocurrency";
    
    $.ajax({
        url: queryURLGify, 
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var gifyImage = $("<img>").attr("src", response.data.images.fixed_height_small.url).attr("id", "cryptoGif");

        $("#gifsAppearHere").append(gifyImage);

    })
});

$("#randomBtn").on("click", function(){
    event.preventDefault();
    var queryURLCoins = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

    $.ajax({
        url: queryURLCoins,
        method: "GET"
    }).then(function (response) {
        var length = Math.floor(Math.random()* 100);
        console.log(length);

        console.log(response);

        var crypto = response[length].id;
        
        var queryURLInformation = "https://api.coingecko.com/api/v3/coins/" + crypto;
        var queryURLExchange = "https://api.coingecko.com/api/v3/exchanges/Binance/tickers?coin_ids=" + crypto;

        $.ajax({
            url: queryURLInformation, queryURLExchange, 
            method: "GET"
        }).then(function (response) {

            name = response.id;
            symbol = response.symbol;
            description = response.description.en;

            currentPrice = response.market_data.current_price.usd;
            circulatingSupply = response.market_data.circulating_supply;
            totalSupply = response.market_data.total_supply;
            homepage = response.links.homepage[0];
            image = response.image.large;
            exchange = response.tickers[0].trade_url

            var information = {
                "nameInfo": name,
                "symbol": symbol,
                "description": description,
                "currentPrice": currentPrice,
                "circulatingSupply": circulatingSupply,
                "totalSupply": totalSupply,
                "homepage": homepage,
                "image": image,
                "exchange": exchange

            };
            
            var keyName = name + "-information"
            sessionStorage.setItem(keyName, JSON.stringify(information));
            generateCryptoInformation();

        });
    });
});

