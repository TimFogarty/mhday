var countryIds = {
    'Albania': 'Albania',
    'Andorra': 'Andorra',
    'Armenia': 'Armenia',
    'Austria': 'Austria',
    'Azerbaijan': 'Azerbaijan',
    'Brussels': 'Brussels',
    'Flemish': 'Flemish',
    'Bulgaria': 'Bulgaria',
    'BrckoDistrict': 'Brcko District',
    'Fed.ofBos.&Herz.': 'Fed. of Bos. & Herz.',
    'Rep.Srpska': 'Rep. Srpska',
    'Belarus': 'Belarus',
    'BouvetI.': 'Bouvet I.',
    'Walloon': 'Walloon',
    'Switzerland': 'Switzerland',
    'Cyprus': 'Cyprus',
    'CzechRep.': 'Czech Rep.',
    'Germany': 'Germany',
    'Bornholm': 'Bornholm',
    'Denmark': 'Denmark',
    'England': 'England',
    'CanaryIs.': 'Canary Is.',
    'BalearicIs.': 'Balearic Is.',
    'Estonia': 'Estonia',
    'Spain': 'Spain',
    'Finland': 'Finland',
    'Corsica': 'Corsica',
    'France': 'France',
    'Adjara': 'Adjara',
    'Georgia': 'Georgia',
    'Guadeloupe': 'Guadeloupe',
    'Greece': 'Greece',
    'FrenchGuiana': 'French Guiana',
    'Croatia': 'Croatia',
    'Hungary': 'Hungary',
    'Ireland': 'Ireland',
    'Iceland': 'Iceland',
    'Sardinia': 'Sardinia',
    'IsolePelagie': 'Isole Pelagie',
    'Pantelleria': 'Pantelleria',
    'Italy': 'Italy',
    'Sicily': 'Sicily',
    'Liechtenstein': 'Liechtenstein',
    'Lithuania': 'Lithuania',
    'Luxembourg': 'Luxembourg',
    'Latvia': 'Latvia',
    'Monaco': 'Monaco',
    'Moldova': 'Moldova',
    'Macedonia': 'Macedonia',
    'Malta': 'Malta',
    'Montenegro': 'Montenegro',
    'Martinique': 'Martinique',
    'Mayotte': 'Mayotte',
    'N.Ireland': 'N. Ireland',
    'JanMayenI.': 'Jan Mayen I.',
    'Netherlands': 'Netherlands',
    'CaribbeanNetherlands': 'Caribbean Netherlands',
    'Norway': 'Norway',
    'SvalbardIs.': 'Svalbard Is.',
    'Azores': 'Azores',
    'Madeira': 'Madeira',
    'Poland': 'Poland',
    'Portugal': 'Portugal',
    'Reunion': 'Reunion',
    'Romania': 'Romania',
    'Scotland': 'Scotland',
    'Ceuta': 'Ceuta',
    'Melilla': 'Melilla',
    'SanMarino': 'San Marino',
    'Serbia': 'Serbia',
    'Vojvodina': 'Vojvodina',
    'Slovakia': 'Slovakia',
    'Slovenia': 'Slovenia',
    'Sweden': 'Sweden',
    'Turkey': 'Turkey',
    'Ukraine': 'Ukraine',
    'Wales ': 'Wales '
};



$(document).ready(function(){

    mapping();
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
	    .attr("data-tooltip", function(d) { console.log(d.properties.name); return d.properties.name; })
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
