var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PatientSchema   = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
    dob: {type: Date, required: true},
    gender: {type: String, required: true},
    phone: {type: String,required:true}
});

module.exports = mongoose.model('Patient', PatientSchema);
