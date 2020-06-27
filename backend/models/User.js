const {Schema, model} = require("mongoose");

const userSchema = new Schema({
   userName:             {type: String, required: true, unique: true},
   email:                {type: String, required: true, unique: true},
   password:             {type: String, required: true},
   passwordRecoveryCode: {type: String},
   isAdmin:              {type: Boolean},
   forRef:               {type: String},
   server:               {type: Boolean},
   block:                {type: Boolean},
   power:        {
      litecoin:     {type: Number},
      usd:          {type: Number},
      ethereum:     {type: Number},
      bitcoin:      {type: Number},
   },
   money: {
      ghs:          {type: Number},
      litecoin:     {type: Number},
      usd:          {type: Number},
      ethereum:     {type: Number},
      bitcoin:      {type: Number},
      ref_money:    {type: Number},
   },
   ref: {
      ref_show:     {type: Number},
      ref_register: {type: Array}
   }
});

const User = new model("User", userSchema);

module.exports = User;