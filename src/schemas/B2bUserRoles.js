/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: B2B User Roles Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  idSeq: {
    seq: {type: String, required: true}, // Country, State and Year(2022) Moth(10) Day(10)
    cCode: {type: String, required: false}, // Country Code: IND
    sCode: {type: String, required: false}, // State Code: TS
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true}
  },
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  rGroup: {type: String, required: true}, // Role Group: Level01
  rType: {type: String, required: true, trim: true}, // Role Type: Principal, Master; App(Super User), Management(Director, CEO, CFO, etc), Employee(Onsite Manager, Offshore Manager)
  rName: {type: String, required: true, trim: true}, // Role Name
  rCode: {type: String, required: true}, // Role Code
  rSeq: {type: Number, required: true},
  rStatus: {type: String, required: true}, // Role Status: Active, Inactive

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDate: {type: Date, required: true}, // Date & Time
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({idSeq: 'text', rType: 'text', rName: 'text', rCode: 'text'});
schema.index({b2b: 1, rGroup: 1, rName: 1}, {unique: true});
schema.index({b2b: 1, rGroup: 1, rCode: 1}, {unique: true});
schema.index({b2b: 1, delFlag: -1});
schema.index({b2b: 1, delFlag: -1, rSeq: 1, rType: 1, rStatus: 1});
schema.index({rType: -1, rSeq: 1, cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BUserRoles, schema);
// --- End: B2B User Roles Schema --- //
