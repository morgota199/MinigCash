const {Schema, model} = require("mongoose");

const ticetSchema = new Schema({
    userName:     {type: String},
    email:        {type: String},
    theme:        {type: String},
    question:     {type: String},
    answer:       {type: String},
    state:        {type: String},
    date:         {type: Date}
});

const Ticet = new model("Ticet", ticetSchema);

module.exports = Ticet;