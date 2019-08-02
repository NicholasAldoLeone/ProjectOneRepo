//This is the start of the Javascript

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

//Listening for an on click event on elements with an id of 'searchBtn'.
$("#searchBtn").on("click", function () {
    event.preventDefault();

    //Creating variable that has a value equal to an element with an id of 'searchInput' value
    var crypto = $("#searchInput").val().toLowerCase().trim();
    var queryURLInformation = "https://api.coingecko.com/api/v3/coins/" + crypto;
    var queryURLExchange = "https://api.coingecko.com/api/v3/exchanges/Binance/tickers?coin_ids=" + crypto;

    $.ajax({
        url: queryURLInformation, queryURLExchange,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        name = response.id;
        symbol = response.symbol;
        description = response.description.en;

        currentPrice = response.market_data.current_price.usd;
        circulatingSupply = response.market_data.circulating_supply;
        totalSupply = response.market_data.total_supply;
        homepage = response.links.homepage[0];
        image = response.image.large;
        exchange = response.tickers[0].trade_url

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
        var homepage = $("<li>").attr("id", "homepage").addClass("list-group-item").html(`Vist Us @ <a href ='${homepage}'>${homepage}</a>`);
        var exchange = $("<li>").attr("id", "exchange").addClass("list-group-item").html(`Buy here @ <a href ='${exchange}'>${exchange}</a>`);

        cryptoList.append(price);
        cryptoList.append(circulating);
        cryptoList.append(total);
        cryptoList.append(homepage);
        cryptoList.append(exchange);

        var cryptoCardFooter = $("<div>").addClass("card-footer text-muted").text("Copyright &copy")


        cryptoInfo.append(cryptoName);
        cryptoInfo.append(cryptoTitleBody);
        cryptoInfo.append(cryptoInfoImg);
        cryptoInfo.append(cryptoCardBody);
        cryptoInfo.append(cryptoList);
        cryptoInfo.append(cryptoCardFooter);

        $("#cryptoInformation").prepend(cryptoInfo);
        
    })
});

