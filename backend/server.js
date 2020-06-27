require('body-parser');
const express       = require('express'),
      config        = require('config'),
      mongoose      = require('mongoose'),
      swaggerUi     = require('swagger-ui-express'),
      swagger       = require("./config/swagger.js")

const app           = express();

const {StartMining} = require('./utils/start.mining.utils');

const PORT          = config.get('PORT'),
      DB_URL        = config.get('DB_URL');

app.use(express.json({ extended: true }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/api/ref', require('./routes/ref.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/news', require('./routes/news.routes'));
app.use('/api/ticets', require('./routes/ticets.routes'));
app.use('/api/statistic', require('./routes/statistic.routes'));
app.use('/auth/', require('./routes/auth.routes'));
app.use('/api/pay', require('./routes/pay.routes'));
app.use('/api/balance', require('./routes/balance.routes'));
app.use('/api/password', require('./routes/select_password.routes'));

(async () => {
   try{
       await mongoose.connect(DB_URL, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true});

       await StartMining();

       app.listen(PORT, () => {
           console.log("Connect on port ", PORT);
       })
   } catch (e) {
       console.log(e.message);
   }
})();

module.exports = { mongoose };