const {Schema, model} = require("mongoose");

const replenishmentSchema = new Schema({
    userId:       {type: String},
    userName:     {type: String},
    system:       {type: String},
    number:       {type: String},
    money:        {type: Number},
    usd:          {type: Number},
    date:         {type: Date}
});

const Replenishment = new model("replenishment", replenishmentSchema);

module.exports = Replenishment;