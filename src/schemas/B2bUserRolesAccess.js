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

// --- Begin: B2B User Roles Access Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  raSeq: {type: Number, required: true},
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  role: {type: String, required: true}, // Role ID(_id)
  rGroup: {type: String, required: true}, // Role Group: Level01
  rType: {type: String, required: true, trim: true}, // Role Type: Principal, Master; App(Super User), Management(Director, CEO, CFO, etc), Employee(Onsite Manager, Offshore Manager)
  rName: {type: String, required: true, trim: true}, // Role Name
  rCode: {type: String, required: true}, // Role Code

  user: {type: String, required: false},
  uName: {type: String, required: false},
  urefUID: {type: String, required: false},
  uPrimary: {type: String, required: false},

  org: {type: String, required: false},
  orgName: {type: String, required: false},
  orgCode: {type: String, required: false},
  orgs: {type: [String], required: false}, // Organizations IDs(_id): Allowed Organizations Users
  orgNames: {type: [String], required: false},
  obId: {type: String, required: false}, // Org Branch Record ID
  obName: {type: String, required: false}, // Org Branch Name
  obCode: {type: String, required: false}, // Org Branch Code
  obIds: {type: [String], required: false}, // Org Branches IDs(_id): Allowed Branches Users
  obNames: {type: [String], required: false},
  team: {type: String, required: false},
  tName: {type: String, required: false}, // Team Name
  tCode: {type: String, required: false}, // Team Code
  teams: {type: [String], required: false}, // Org Teams IDs(_id): Allowed Teams Users
  tNames: {type: [String], required: false},

  access: [{
    _id: {type: String, required: true}, // Page Name: 101.pName
    pName: {type: String, required: true}, // Page Name
    isAlwd: {type: Boolean, required: true},
    actions: [{
      _id: {type: String, required: true}, // Action Name: 101.aName
      aName: {type: String, required: true}, // Action Name
      isAlwd: {type: Boolean, required: true},
    }],
  }],

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

schema.index({raSeq: 'text', rName: 'text', rType: 'text', uName: 'text', uPrimary: 'text', orgNames: 'text', obNames: 'text', tNames: 'text'});
schema.index({b2b: 1, org: 1, obId: 1, team: 1, rGroup: 1, rName: 1, user: 1}, {unique: true});
schema.index({b2b: 1, org: 1, obId: 1, team: 1, rGroup: 1, rCode: 1, user: 1}, {unique: true});
schema.index({b2b: 1, delFlag: -1, org: 1, obId: 1, team: 1, rGroup: 1, rType: 1, rName: 1});
schema.index({b2b: 1, delFlag: -1, user: 1});
schema.index({rType: -1, raSeq: 1, cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BUserRolesAccess, schema);
// --- End: B2B User Roles Access Schema --- //
