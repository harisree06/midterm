// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'Customers'
const SurveySchema = new Schema({
    surveyId: { type: String, unique: true, required: true },
    gameGenre: String,
    daysPerYear: Number,
    age: String
});



// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
SurveySchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Survey', SurveySchema);