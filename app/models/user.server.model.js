// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'Customers'
const Customers = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		// Set an email index
		index: true,
		// Validate the email format
		match: /.+\@.+\..+/,

		unique: true,

		required: true

	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password.length >= 6,
			'Password Should Be Longer'
		]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	feedback: {
		type: String
	},
	website: {
        type: String,
        // Use a setter property to validate protocol existance in 'website' field
        set: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }

                return url;
            }
        }
	},
	skill: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});

// Set the 'fullname' virtual property
Customers.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Create the 'findOneByUsername' static method
Customers.statics.findOneByUsername = function(username, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
		email: username
	}, callback);
};

// Create the 'authenticate' instance method
Customers.methods.authenticate = function(password) {
	return this.password === password;
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
Customers.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', Customers);