var Patient = require('../models/patient');
var moment = require('moment');

// function to insert documents in db
exports.postpatient = function(req, res) {
    Patient.create(req.body, function (err, post) {
          if (err) {
            res.send(err);
            }
            res.send(post);
          });
};

//function to retrive all documents in db
exports.getallrecords = function(req, res) {
  Patient.find(function(err, records) {
          if (err)
              res.send(err);
          var formattedrecords=[];
          for(var i = 0;i<records.length;i++){
            formattedrecords.push(
              {
                "firstname":records[i].firstname,
                "lastname":records[i].lastname,
                "age":records[i].age,
                "dob":records[i].dob,
                "gender":records[i].gender,
                "phone":records[i].phone
              }
            )
          }
          res.json(formattedrecords);
      });
};


exports.findByName = function(req, res) {
    Patient.find({$or:[{"firstname":req.body.name},{"lastname":req.body.name}]}, function (err, post) {
          if (err) {
            res.send(err);
            }
            res.send(post);
          });
};