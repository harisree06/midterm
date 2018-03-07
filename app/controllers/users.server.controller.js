// Load the 'User' Mongoose model
const User = require('mongoose').model('User');
var moment = require('moment');


// 'create' controller method to create a new user
exports.create = function(req, res, next) {
	// Create a new instance of the 'User' Mongoose model
	const user = new User(req.body);

	// Use the 'User' instance's 'save' method to save a new user document
	user.save((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
            // Use the 'response' object to send a JSON response
           
            res.render('index', {
                title: 'Login',
                user : user.email
            });

		}
	});
};

// 'list' controller method to display all users in raw json format
exports.list = function(req, res, next) {
	// Use the 'User' static 'find' method to retrieve the list of users
	User.find({}, (err, users) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(users);
		}
	});
};

// 'display' controller method to display all users in friendly format
exports.display = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    User.find({}, (err, users) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('listall', {
                title: 'List All Users',
                users: users,
                moment: moment
            });
        }
    });
};
//




//update a user by username
exports.updateByUsername = function (req, res, next) {
    req.user = req.body //read the user from request's body
    console.log(req.user)
    //initialize findOneAndUpdate method arguments
    var query = { "email": req.user.email };
    var update = req.body;
    var options = { new: true };

    // Use the 'User' static 'findOneAndUpdate' method to update a specific user by user name
    User.findOneAndUpdate(query, update, options, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            req.user = user;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log("...............")
            console.log(jsonUser)
            //display edit page and pass user properties to it
            res.render('thankyou', { title: 'Thank you', user: jsonUser} );

            // Call the next middleware
            next();
        }
    })
};




// 'userByID' controller method to find a user by its id or username
//  the code is using the username field instead of id
exports.userByID = function (req, res, next, username) {
	// Use the 'User' static 'findOne' method to retrieve a specific user
	User.findOne({
		username: username //using the username instead of id
	}, (err, user) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
            req.user = user;
            console.log(user);
			// Call the next middleware
			next();
		}
	});
};

// 'userByUsername' controller method to find a user by its username
// and display the result in edit.ejs file
exports.userByUsername = function (req, res, next) {
    // Use the 'User' static 'findOne' method to retrieve a specific user
    var username = req.body.email;
    var password = req.body.password;
    console.log(username)
    User.findOne({ 'email': username, 'password': password }, function (err, user) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
           
                req.user = user;
                //parse it to a JSON object
                var jsonUser = JSON.parse(JSON.stringify(user));
                console.log(jsonUser)
                //display edit page and pass user properties to it
                if (user.isAdmin){
                    res.redirect('/display');
                } else {
                    res.render('feedback', { title: 'Feedback Form', user: jsonUser} );
                }
           
    
                // Call the next middleware
                next();
            }
           
        
    });
}
    