/*
 * main.js
 * 
 * Program controls how data from SongList.json is displayed on index.html
 * Features: Display buttons; user selects which part of assignment to view, 
 *          or show all part (raw, friendly format, filtered songs)
 *
 * Author: Amy Bui
 * Comp20
 * Spring 2021
 */

var jsonFile = "https://atrinh1996.github.io/SongList2/SongList.json";

$(document).ready(function() {
    $(".block").hide(); // hide all information section

    $.getJSON(jsonFile, function(SongList){
        serialize(SongList);            // Part 2
        friendlyDisplay(SongList);      // Part 3

        makeGenreSelect(SongList);      // Part 4
        filter(SongList);               // Part 4
    });

    // display information section user picks (or show all)
    $("#displayChoice input[type='button']").click(function() {
        idx = $("#displayChoice input[type='button']").index(this);
        displaySection(idx);
    });
});

// display data from SongList.json as raw string
// (default stringify)
function serialize(list) {
    raw = JSON.stringify(list);
    $("#part2").html(raw);

}

// display each block of song between p tags
function friendlyDisplay(list) {
    let s = "";
    list.forEach(function(currObj) {
        s += displaySong(currObj);
    });

    $(".block:eq(1)").append(s);    // Display under correct div!
}

// displays ONE json song object in friendly format, format per spec
function displaySong(songObj) {
    let s = "";
    s += "<p>";
        
    s += "<span>"
    s += songObj["title"];
    s += "</span><br>";

    s += "Artist: " + songObj["artist"];
    s += "<br>";

    s += "Genre: ";
    songObj["genre"].forEach(function(genre, idx) {
        if (idx > 0) s += ", ";
        s += genre;
    });
    s += "<br>";
    
    s += "Released " + songObj["year"];

    s += "</p> <br>";

    return s;
}

// creates the html for select tag for genres
function makeGenreSelect(list) {
    let genre = [];
    getGenre(genre, list);

    let g = "";
    g += "<select name='genreSelect'>"
    g += "<option selected='selected'>Pick a genre</option>";
    genre.forEach(function(currGenre) {
        g += "<option>" + currGenre + "</option>";
    });
    g += "</select>";

    $("#filterForm").prepend(g);
}

// puts all possible genres in list. No repeated elements
function getGenre(glist, SongList) {
    SongList.forEach(function(currObj) {
        currObj["genre"].forEach(function(currGenre) {
            if (!glist.includes(currGenre))
                glist.push(currGenre);
        });
    });
    glist.sort();
}

// Display songs filtered by genre when user clicks filter btn.
// Note: Assume at least one song per genre
function filter(SongList) {
    $("input[name='filterBtn']").on("click", function() {
        let pickedGenre = $("select[name='genreSelect'] option:selected").val();

        // clear current display before showing new display
        $("#filteredSongs").html("");
        SongList.forEach(function(currObj) {
            if (currObj["genre"].includes(pickedGenre))
                $("#filteredSongs").append(displaySong(currObj));
        });
    });
}

// Display information from ONLY selected category, 
// Hides other sections. 
// Note: there is a display all option. It is handled here.
function displaySection(showIdx) {
    if (showIdx == 3) $(".block").show();   // show all selected
    else {
        $(".block").each(function(currBlockIdx) {
            if (currBlockIdx == showIdx)
                $(this).show();
            else
                $(this).hide();
        });
    }
}