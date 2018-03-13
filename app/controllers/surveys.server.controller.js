// Load the 'Survey' Mongoose model
const Survey = require('mongoose').model('Survey');
var moment = require('moment');

//---------------------------------------------------------------
// 'create' controller method to create a new survey
exports.newSurvey = function(req, res, next) {
	// Create a new instance of the 'Survey' Mongoose model
	const survey = new Survey(req.body);

	// Use the 'Survey' instance's 'save' method to save a new survey document
	survey.save((err) => {
		if (err) {
			// Call the next middleware with an error message
            return next(err);
            
		} else {
            // Use the 'response' object to send a JSON response
           
            res.render('index', {
                title: 'Home',
        
            });

		}
	});
};
//-------------------------------------------------------------------------

//-------------------------------------------------------------------------
exports.createSurvey = function(req, res, next) {
    if(req.params.surveyId != null ){
        Survey.findOne({ 'surveyId': req.params.surveyId }, function (err, survey) {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Set the 'req.survey' property
               
                    req.survey = survey;
                    var jsonSurvey = JSON.parse(JSON.stringify(survey));
                    console.log(jsonSurvey)
                    res.render('createSurvey',{
                        title: 'Update survey',
                        survey: jsonSurvey,
                        moment: moment
                    });
            }
        });
    }
    else {
        res.render('createSurvey',{
            title: 'Add survey',
            survey: '',
            moment: moment
        });
    }
   
};
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// 'display' controller method to display all surveys in friendly format
exports.display = function (req, res, next) {
    // Use the 'Survey' static 'find' method to retrieve the list of surveys
    Survey.find({}, (err, surveys) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('listall', {
                title: 'List All Surveys',
                surveys: surveys,
                moment: moment
            });
        }
    });
};
//
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
exports.updateBySurveyId = function (req, res, next) {
    req.survey = req.body //read the survey from request's body
    console.log(req.survey)
    //initialize findOneAndUpdate method arguments
    var query = { "surveyId": req.survey.surveyId };
    var update = req.body;
    var options = { new: true };

    // Use the 'Survey' static 'findOneAndUpdate' method to update a specific survey by survey name
    Survey.findOneAndUpdate(query, update, options, (err, survey) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            req.survey = survey;
            //parse it to a JSON object
            var jsonSurvey = JSON.parse(JSON.stringify(survey));
            console.log("...............")
            console.log(jsonSurvey)
            //display edit page and pass survey properties to it
            res.redirect('/');
            // Call the next middleware
            next();
        }
    })
};
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
exports.deleteBySurveyId = function(req,res,next){
    console.log(req.params.surveyId);
    Survey.findOneAndRemove({
    surveyId:req.params.surveyId
    }, function (err, user) {
    if (err) throw err;
    console.log("Success");
    });
    
    res.redirect('/allSurvey'); 
    }


// // 'list' controller method to display all surveys in raw json format
// exports.list = function(req, res, next) {
// 	// Use the 'Survey' static 'find' method to retrieve the list of surveys
// 	Survey.find({}, (err, surveys) => {
// 		if (err) {
// 			// Call the next middleware with an error message
// 			return next(err);
// 		} else {
// 			// Use the 'response' object to send a JSON response
// 			res.json(surveys);
// 		}
// 	});
// };







//update a survey by surveyname





// 'surveyByID' controller method to find a survey by its id or surveyname
//  the code is using the surveyname field instead of id
// exports.surveyByID = function (req, res, next, surveyname) {
// 	// Use the 'Survey' static 'findOne' method to retrieve a specific survey
// 	Survey.findOne({
// 		surveyname: surveyname //using the surveyname instead of id
// 	}, (err, survey) => {
// 		if (err) {
// 			// Call the next middleware with an error message
// 			return next(err);
// 		} else {
// 			// Set the 'req.survey' property
//             req.survey = survey;
//             console.log(survey);
// 			// Call the next middleware
// 			next();
// 		}
// 	});
// };

// // 'surveyBySurveyname' controller method to find a survey by its surveyname
// // and display the result in edit.ejs file
// exports.surveyBySurveyname = function (req, res, next) {
//     // Use the 'Survey' static 'findOne' method to retrieve a specific survey
//     var surveyname = req.body.email;
//     var password = req.body.password;
//     console.log(surveyname)
//     Survey.findOne({ 'email': surveyname, 'password': password }, function (err, survey) {
//         if (err) {
//             // Call the next middleware with an error message
//             return next(err);
//         } else {
//             // Set the 'req.survey' property
           
//                 req.survey = survey;
//                 //parse it to a JSON object
//                 var jsonSurvey = JSON.parse(JSON.stringify(survey));
//                 console.log(jsonSurvey)
//                 //display edit page and pass survey properties to it
//                 if (survey.isAdmin){
//                     res.redirect('/display');
//                 } else {
//                     res.render('feedback', { title: 'Feedback Form', survey: jsonSurvey} );
//                 }
           
    
//                 // Call the next middleware
//                 next();
//             }
           
        
//     });
// }
    