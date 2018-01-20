var mongoose = require("mongoose");

// Mongoose Schema
var Schema = mongoose.Schema;

var scraperSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    summary: {
        type: String,
    } 
});
    
// create our model from above and export it
var Article = module.exports = mongoose.model("Article", scraperSchema);
