var http = require('http');
var app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT =  process.env.PORT || 3000;

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        http.createServer(app).listen(PORT, () => {
            console.log(`API server now on port ${PORT}!`);
        });
    } catch (e) {
        console.log('could not connect to db in some reasons');
        console.error(e.message);
    }
})();



