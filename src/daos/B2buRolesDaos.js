/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const b2vUsrRoles = require('../schemas/B2bUserRoles');

const postb2bUsrRlsList = (crntPgNum, rLimit, obj, callback) => {
  let resultObj = { rolesCount: 0, rolesList: [] };
  b2vUsrRoles.find(obj.query).sort(obj.sort).skip((crntPgNum - 1) * rLimit).limit(rLimit).then((resObj) => {
    if (resObj && resObj.length > 0) {
      urRlsGetTotalCount(obj.query, resObj, callback);
    } else {
      const result = SetRes.noData(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Unknown Error in daos/B2buRolesDaos.js, at postb2bUsrRlsList:' + error);
    const uke = SetRes.unKnownErr(resultObj);
    callback(uke);
  });
};

const postb2bUsrRlsCreate = (roleData, callback) => {
  roleData.save().then((resObj) => {
    if (resObj && resObj._id) {
      const succ = SetRes.successRes(resObj);
      callback(succ);
    } else {
      const cf = SetRes.saveTrxFailed('Role creation failed');
      callback(cf);
    }
  }).catch((error) => {
    if (error.errmsg && error.errmsg.indexOf('rName') > 0) {
      logger.error('There was an Uniqueness(rName) error occured in daos/B2buRolesDaos.js, at postb2bUsrRlsCreate:' + error);
      const nue = SetRes.saveTrxFailed('Role Name already exists');
      callback(nue);
    } else if (error.errmsg && error.errmsg.indexOf('rCode') > 0) {
      logger.error('There was an Uniqueness(rCode) error occured in daos/B2buRolesDaos.js, at postb2bUsrRlsCreate:' + error);
      const cue = SetRes.saveTrxFailed('Role Code already exists');
      callback(cue);
    } else {
      logger.error('Unknown Error in daos/B2buRolesDaos.js, at postb2bUsrRlsCreate:' + error);
      const uke = SetRes.unKnownErr({});
      callback(uke);
    }
  })
}

const getB2BUsrRlsView = (query, callback) => {
  b2vUsrRoles.findOne(query).then((resObj) =>{
    if(resObj && resObj._id){
      const res = SetRes.successRes(resObj);
     callback(res);
    } else {
      const emp = SetRes.noData();
      callback(emp);
    }
  }).catch((error) =>{
    logger.error('Unknown Error in daos/B2buRolesDaos.js, at getB2BUsrRlsView:' + error);
    const uke = SetRes.unKnownErr({});
    callback(uke);  })
}

const postb2bUsrRlsUpdate = (query, updateObj, callback) => {
  b2vUsrRoles.findOneAndUpdate(query, updateObj, {new: true}).then((resObj) => {
    if(resObj && resObj._id){
      const res = SetRes.successRes(resObj);
      callback(res); 
    } else {
      const cf = SetRes.saveTrxFailed('Update failed');
      callback(cf);
    }
  }).catch((error) => {
    if (error.errmsg && error.errmsg.indexOf('rName') > 0) {
      logger.error('There was an Uniqueness(rName) error occured in daos/B2buRolesDaos.js, at postb2bUsrRlsUpdate:' + error);
      const nue = SetRes.saveTrxFailed('Role Name already exists');
      callback(nue);
    } else if (error.errmsg && error.errmsg.indexOf('rCode') > 0) {
      logger.error('There was an Uniqueness(rCode) error occured in daos/B2buRolesDaos.js, at postb2bUsrRlsUpdate:' + error);
      const cue = SetRes.saveTrxFailed('Role Code already exists');
      callback(cue);
    } else {
      logger.error('Unknown Error in daos/B2buRolesDaos.js, at postb2bUsrRlsUpdate:' + error);
      const uke = SetRes.unKnownErr({});
      callback(uke);
    }
  })
}

module.exports = {
  postb2bUsrRlsList, postb2bUsrRlsCreate, getB2BUsrRlsView, postb2bUsrRlsUpdate
};

const urRlsGetTotalCount = (query, resObj, callback) => {
  let resultObj = { rolesCount: resObj.length, rolesList: resObj };
  b2vUsrRoles.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { rolesCount: resultCount, rolesList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((errCount) => {
    logger.error('Unknown Error in daos/B2buRolesDaos.js, at urRlsGetTotalCount(countDocuments):' + errCount);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}