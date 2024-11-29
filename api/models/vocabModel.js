const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Format for model 'VocabSchema'
//creating an instance of the Schema class
const VocabSchema = new Schema(// 3 attributes: english and german
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: 'German word cannot be blank'
        },
        vietnamese: {
            type: String,
            required: 'Vietnamese word cannot be blank'
        }
    },
    {collection: 'vocab'}// specifying a name for collection
);
//solidify Schema as a data model and export for use in other areas of project
module.exports = mongoose.model('Vocab', VocabSchema);