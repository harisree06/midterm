
// Load the 'index' controller
const index = require('../controllers/index.server.controller');
const survey = require('../controllers/surveys.server.controller');

// Define the routes module' method
module.exports = function(app) {
    // Mount the 'index' controller's 'render' method
app.get('/', index.render);

 app.get('/newsurvey',survey.createSurvey)
app.post('/createSurvey',survey.newSurvey); 
app.get('/allSurvey', survey.display);
app.get('/newsurvey/:surveyId',survey.createSurvey)
app.post('/updateSurvey',survey.updateBySurveyId)
app.get('/deletesurvey/:surveyId',survey.deleteBySurveyId)
// app.get('/show',survey.show);

// app.get('/showTable',survey.showtable)
// .post('/showTable',survey.editrow);

};