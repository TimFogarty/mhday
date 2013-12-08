var countryIds = [
    'Albania',
    'Austria',
    'Bulgaria',
    'Germany',
    'Denmark',
    'England',
    'Estonia',
    'Spain',
    'Finland',
    'France',
    'Greece',
    'Croatia',
    'Hungary',
    'Ireland',
    'Italy',
    'Lithuania',
    'Latvia',
    'Moldova',
    'Macedonia',
    'Netherlands',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Scotland',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Sweden',
    'Turkey',
    'Ukraine',
    'Wales '
];

var quizon = false;

var chosenCountry = countryIds[Math.floor(Math.random()*32)];
var artist_number = Math.floor(Math.random()*5 + 1);

var artist_name, deezer_id, artist_img, artist_desc = '';

$(document).ready(function(){

    mapping();
    player();

    
    $.ajax({
	url: "http://developer.echonest.com/api/v4/artist/search?api_key=OHZTN1ZZTYPWLDB7A&format=json&artist_location="+chosenCountry+"&results=1&start=2&bucket=biographies&bucket=images&bucket=id:deezer"
    }).done(function(data){
	artist_name = data.response.artists[0].name;
	deezer_id = data.response.artists[0].foreign_ids[0].foreign_id.split(":").pop();
	artist_img = data.response.artists[0].images[0].url;
	artist_desc = data.response.artists[0].biographies[0].text;
	console.log(artist_name);
	console.log(deezer_id);
	console.log(artist_img);
	console.log(artist_desc);
    });
    
});


function mapping(){


    var projection = d3.geo.albers()
	.center([20, 70])
	.rotate([4.4, 0])
	.parallels([50, 60])
	.scale(1300)
	.translate([$("#container").width() / 2, $("#container").height() / 2]);

    var path = d3.geo.path()
	.projection(projection);

    var svg = d3.select("#container")
	.append("svg")
	.append("g");
    
    d3.json("eu.json", function(error, eu) {
	svg.selectAll(".subunit")
	    .data(topojson.feature(eu, eu.objects.subunits).features)
	    .enter().append("path")
	    .attr("class", function(d) { return "subunit " + d.properties.name.replace(/\s+/g, ''); })
	    .attr("data-tooltip", function(d) { return d.properties.name; })
	    .attr("d", path);

	
	hoverCountryHandling();

    });

    

    d3.select("g").attr("transform", "scale(" + $("#container").width()/900 + ")");
    $("svg").height($("#container").width()*0.88);

    function sizeChange() {
	d3.select("g").attr("transform", "scale(" + $("#container").width()/900 + ")");
	$("svg").height($("#container").width()*0.88);
    }

    d3.select(window)
    	.on("resize", sizeChange);

}


function hoverCountryHandling() {

    $('.subunit').qtip({ // Grab some elements to apply the tooltip to
	content: {
            attr: 'data-tooltip'
	},
	position: {
            my: 'center right',  // Position my top left...
            at: 'center center'
	},
	style: {
	    classes: 'qtip-tipsy'
	},
	hide: {
            fixed: true,
            delay: 100
        }
    });
    
}


function player(){
    DZ.init({
	appId  : '129015',
	channelUrl : 'http://folkr.herokuapp.com/channel.html',
	player : {
	    onload : playhandle
	}
    });
}

function playhandle() {

    $("#fplay").fadeIn("slow");

    $("#fplay").click(function(){
	$(".intro").fadeOut("medium", function() {
	    $(".quiz").fadeIn("medium");
	    quizon = true;
	    DZ.player.playSmartRadio(deezer_id);
	    return false;
	});
    });

    $(".pauseplay").click(function(){
	if ($(".pauseplay .glyphicon").hasClass("glyphicon-pause")) {
	    DZ.player.pause();
	    $(".pauseplay .glyphicon").removeClass("glyphicon-pause").addClass("glyphicon-play");
	    $(".playing-message").text("Stopped Playing.");
	    return false;
	} else {
	    DZ.player.play();
	    $(".pauseplay .glyphicon").removeClass("glyphicon-play").addClass("glyphicon-pause");
	    $(".playing-message").text("Now Playing...");
	    return false;
	}
    });

    $(".subunit").click(function(){
	if (quizon === true) {
	    $(this).css({"fill": "#C44D58"});
	    var thisname = $(this).attr("class").split(" ")[1];
	    
	    if (chosenCountry === thisname) {
		$(this).css({"fill": "#C7F464"});
		$("#solution").text("Well done! The music was from " + thisname + "!");
	    } else {
		$(this).css({"fill": "#C44D58"});
		$("."+chosenCountry).css({"fill": "#C7F464"});
		$("#solution").text("Sorry. The music was from " + chosenCountry + ".");
	    }

	    $("#deezer").attr("href", "http://www.deezer.com/artist/" + deezer_id);
	    $(".artist-name").text(artist_name);
	    $(".artist-description").text(artist_desc);
	    $(".artist-image").attr("src", artist_img);
	    var tweet_text = "I just found a new artist, " + artist_name + ", at ";
	    tweet_text = encodeURI(tweet_text);
	    tweet_url = encodeURI("http://euphorics.herokuapp.com/");
	    $("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + tweet_text + "&url="+tweet_url);
	    
	    $(".quiz").fadeOut("medium", function(){
		$(".answer").fadeIn("medium");
	    });
	}
    });


    $("#playagain").click(function(){
	$(".subunit").css({'fill': '#45ADA8'});
	
	$(".answer").fadeOut("medium", function() {
	    $(".quiz").fadeIn("medium");
	    quizon = true;
	    chosenCountry = countryIds[Math.floor(Math.random()*32)];
	    artist_number = Math.floor(Math.random()*5 + 1);
	    $.ajax({
		url: "http://developer.echonest.com/api/v4/artist/search?api_key=OHZTN1ZZTYPWLDB7A&format=json&artist_location="+chosenCountry+"&results=1&start=2&bucket=biographies&bucket=images&bucket=id:deezer"
	    }).done(function(data){
		artist_name = data.response.artists[0].name;
		deezer_id = data.response.artists[0].foreign_ids[0].foreign_id.split(":").pop();
		artist_img = data.response.artists[0].images[0].url;
		artist_desc = data.response.artists[0].biographies[0].text;
		console.log(artist_name);
		console.log(deezer_id);
		console.log(artist_img);
		console.log(artist_desc);

		if ($(".quiz .pauseplay .glyphicon").hasClass("glyphicon-play")) {
		    $(".pauseplay .glyphicon").removeClass("glyphicon-play").addClass("glyphicon-pause");
		    $(".playing-message").text("Now Playing...");
		}

		
		DZ.player.playSmartRadio(deezer_id);
		return false;
		
	    });
	});
    });
}
