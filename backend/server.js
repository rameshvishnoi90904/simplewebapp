var express = require('express'),
 patient = require('./routes/patientroutes')
var app = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/patientdb1').then(() =>  console.log('connection succesfull'))
  .catch((err) => console.error(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow cross origin requests on server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
});
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our Patient module apis' });
});

// add new patient 
router.route('/postpatient').post(patient.postpatient);
// retrieve all records
router.get('/getallrecords',patient.getallrecords);
// get patient by name
router.route('/findByName').post(patient.findByName);


app.use('/api', router);
var port = process.env.PORT || 3000;
app.listen(port);
console.log("serve listening on port 3000");