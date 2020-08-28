const mongoose = require('mongoose')
const Notes = require('../models/Notes');
require('dotenv').config();

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await mongoose.connection.dropCollection('notes');
        const note = new Notes({
            title: "testNote",
            text: "text for test note"
        });
        const result = await note.save();
        mongoose.connection.close();
        console.log('DataBase seeded successfully with object', result);
    } catch (e) {
        console.log('failed to seed db');
        console.log(`Error message: ${e.message}`);
    }
})();
