const {Schema, model} = require("mongoose");

const paySchema = new Schema({
    userName:     {type: String},
    email:        {type: String},
    system:       {type: String},
    number:       {type: String},
    ip:           {type: String},
    money:        {type: Number},
    confirmation: {type: String},
    date:         {type: Date}
});

const Pay = new model("Pay", paySchema);

module.exports = Pay;