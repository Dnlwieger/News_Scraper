// require our npm packages
//======================================================
// Parses the HTML and helps us find elements in the sites code
var cheerio = require("cheerio");
// makes HTTP request for HTML page
var request = require("request");

// log to console what we are doing:
console.log("cheerio grabbing results....");


request("https://www.cbr.com/category/movies/news-movies/", function(error, response, html) {

// Load html into cheerio as variable '$' for shorthand use
var $ = cheerio.load(html);

// add in an empty array to save scraped data
var results = [];

// using cheerio, we pull our data using tags and classes
// i: iterator, element: the current element
$("strong.title").each(function(i, element) {

    // save the text of the element to the title variable
    var title = $(element).text();
    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");
    // push what cheerio grabs into the results array and print out our variables values
    results.push({
        title: title,
        link: link
    });
});

console.log(results);
});