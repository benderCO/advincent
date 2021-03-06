'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollegeSchema = new Schema({
  college: {
    type: String,
    required: 'ERROR: College Name is Required'
  },
  tuitionInState: {
    type: Number
  },
  tuitionOutState: {
    type: Number
  },
  roomAndBoard: {
    type: Number
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
}, {
    versionKey: false
});

CollegeSchema.virtual('totalInStateCost').get(function() {  
    return this.tuitionInState + this.roomAndBoard;
});

CollegeSchema.virtual('totalOutOfStateCost').get(function() {  
    return this.tuitionOutState + this.roomAndBoard;
});

CollegeSchema.query.byName = function(collegeName) {
    return this.where({ college: collegeName });
};

var CollegesSchema = new Schema([CollegeSchema]);

module.exports = mongoose.model('College', CollegeSchema);
module.exports = mongoose.model('Colleges', CollegesSchema);