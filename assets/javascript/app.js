var topics = ["Pineapple", "Pina Colada", "Dragonfruit", "Passion Fruit", "Mango", "Kiwi"];
var key = "&api_key=fbzF3aFSYh2hH1RLHyZpOiDznroS0Rt4";
var apiSearch  = "https://api.giphy.com/v1/gifs/search?q=";
var limit = "&limit=10";

function getButtons() {
    $("#buttonArea").empty();
    for (var i = 0; i < topics.length; i++) {
        var x = $("<button>");
        x.addClass("flavorBtn");
        x.addClass("btn-secondary");
        x.attr("dataFlav", topics[i]);
        x.text(topics[i]);
        $("#buttonArea").append(x);
    }
};

getButtons();

$("#addFlavor").on("click", function(event) {
    event.preventDefault();
    var newFlavor = $("#flavorList").val().trim();
    topics.push(newFlavor);
    getButtons();
});

$("#buttonArea").on("click", ".flavorBtn", function() {
    var flavor = $(this).attr("dataFlav");
    var queryURL = apiSearch + flavor + key + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var e = 0; e < results.length; e++) {
            if (results[e].rating !== "r") {
                var rating = results[e].rating;
                var gifDiv = $("<div>");
                var rating = $("<h4>").text("Rating: " + rating);
                var flavorPic = $("<img>");
                flavorPic.attr("src", results[e].images.fixed_height_still.url);
                flavorPic.attr("data-still", results[e].images.fixed_height_still.url);
                flavorPic.attr("data-animate", results[e].images.fixed_height.url);
                flavorPic.attr("data-state", "still");
                flavorPic.addClass("gif");
                $("#gifArea").prepend(gifDiv);
                gifDiv.append(flavorPic);
                gifDiv.append(rating);
            }
        }
    });
});

$("#gifArea").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } 
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
});