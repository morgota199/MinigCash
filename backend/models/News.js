const {Schema, model} = require("mongoose");

const newsSchema = new Schema({
    title: {type: String},
    text:  {type: String}
});

const News = new model("News", newsSchema);

module.exports = News;