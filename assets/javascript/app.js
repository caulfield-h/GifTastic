var subjects = ["Elliot Alderson", "Angela Moss", "Darlene Alderson", "White Rose", "Mr. Robot", "Leon Joey Badass", "Evil Corp", "Fsociety", "Five Nine"];

var button;
var chooseTopic = "";

var buttonLoop = function() {
    $("#buttonZone").empty();
    for (i = 0; i < subjects.length; i++) {
        button = $("<button type=" + "button" + ">" + subjects[i] + "</button>").addClass("btn btn-info").attr("data", subjects[i]);
        $("#buttonZone").append(button);
    };
}


$("#buttonZone").on("click", ".btn", function() {
    var genItem = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + genItem + "&api_key=kIkDXFuikhFIeluwIapRNKUq0Q035T8h&limit=10";



    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");

            var p = $("<p>");
            p.text(results[i].rating);
            var p = $("<p>").text("Rating: " + results[i].rating);

            var topicImage = $("<img>").addClass("borderClass");

            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still")
            topicImage.addClass("gif");

            topicDiv.append(topicImage);
            topicDiv.append(p);
            $("#gifZone").prepend(topicDiv);
        }
    })
})


$("#gifZone").on("click", ".gif", function(event) {
    event.preventDefault();

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})




$(".submit").on("click", function(event) {
    event.preventDefault();

    console.log("submit");
    chooseTopic = $("#topic-input").val();
    subjects.push(chooseTopic);
    console.log(subjects);
    buttonLoop();
});



buttonLoop();