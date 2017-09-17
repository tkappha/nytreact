// NYT API key: dbc719dc0e374c52b424362ae9b02a49

// ********* Variables ******************
const authKey = "dbc719dc0e374c52b424362ae9b02a49";

// Search parameters
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// NYT Base URL
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

//number of Articles
var articleCounter = 0; 

// *********** Functions ****************

function runQuery(numArticles, queryURL){
	$.ajax({url: queryURL, method: "GET"})
		//NYTData is the whole object 
		.done(function(NYTData) {

			for (var i=0; i < numArticles; i++) {
				console.log("Headline");
				console.log("--------------------------------------");
				console.log(NYTData.response.docs[i].headline.main);

				//Place query results in results panel of index.html
				var wellSection = $('<div>');
				wellSection.addClass("well");
				wellSection.attr('id', 'articleWell-' + i);
				$('#wellSection').append(wellSection);

				//insert content
				$("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
				$("#articleWell-" + i).append("<h2>" + NYTData.response.docs[i].section_name + "</h2>");
			}

			// error checking (to console)
			console.log(queryURL);
			console.log(NYTData);
			console.log(numArticles);
		})
}

// *********** Main *********************

$('#searchButton').on('click', function(){

	// captures search term from html page
	queryTerm = $('#search').val().trim();

	var newURL = queryURLBase + "&q=" + queryTerm;

	// captures number of records from index.html
	numResults = $('#numRecords').val();

	// captures start & end years from index.html
	startYear = $('#startYear').val().trim();
	endYear = $('#endYear').val().trim();

	// Search terms include startYear only if one is entered on index.html
	if(parseInt(startYear)) {
		//must include 0101 as month/day for nyt api
		startYear = startYear + "0101";

		newURL = newURL + "&begin_date=" + startYear;
	}

	// Search terms include endYear only if one is entered on index.html
	if(parseInt(endYear)) {
		//must include 0101 as month/day for nyt api
		endYear = endYear + "0101";

		newURL = newURL + "&end_date=" + endYear;
	}

	runQuery(numResults, newURL);

	return false;
});
