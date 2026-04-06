/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const B2bUserRolesAccess = require('../schemas/B2bUserRolesAccess');

const postb2bUsrRlsAcsList = (crntPgNum, rLimit, obj, callback) => {
  let resultObj = { rolesAcsCount: 0, rolesAcsList: [] };
  B2bUserRolesAccess.find(obj.query).sort(obj.sort).skip((crntPgNum - 1) * rLimit).limit(rLimit).then((resObj) => {
    if (resObj && resObj.length > 0) {
      urRlsAcsGetTotalCount(obj.query, resObj, callback);
    } else {
      const result = SetRes.noData(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Unknown Error in daos/B2buRolesAccessDao.js, at postb2bUsrRlsAcsList:' + error);
    const uke = SetRes.unKnownErr(resultObj);
    callback(uke);
  });
};

const postb2bUsrRlsAcsCreate = (roleData, callback) => {
  roleData.save().then((resObj) => {
    if (resObj && resObj._id) {
      const succ = SetRes.successRes(resObj);
      callback(succ);
    } else {
      const cf = SetRes.saveTrxFailed('Role creation failed');
      callback(cf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.rName || error.keyPattern && error.keyPattern.rCode) {
      const uniq = error.keyPattern.rName ? 'Role Name': 'Role Code';
      logger.error('Uniqueness Error in daos/B2buRolesAccessDao.js, at postb2bUsrRlsAcsCreate:' + error);
      const err = SetRes.uniqueErr(uniq + ' Already Exists');
      callback(err);
    } else {
      logger.error('Unknown Error in daos/B2buRolesAccessDao.js, at postb2bUsrRlsAcsCreate:' + error);
      const uke = SetRes.unKnownErr({});
      callback(uke);
    }
  });
}

const getB2BUsrRlsAcsView = (query, callback) => {
  B2bUserRolesAccess.findOne(query).then((resObj) =>{
    if(resObj && resObj._id){
      const res = SetRes.successRes(resObj);
     callback(res);
    } else {
      const emp = SetRes.noData();
      callback(emp);
    }
  }).catch((error) =>{
    logger.error('Unknown Error in daos/B2buRolesAccessDao.js, at getB2BUsrRlsAcsView:' + error);
    const uke = SetRes.unKnownErr({});
    callback(uke);  })
}

const putb2bUsrRlsAcsUpdate = (query, updateObj, callback) => {
  B2bUserRolesAccess.findOneAndUpdate(query, updateObj, {new: true}).then((resObj) => {
    if(resObj && resObj._id){
      const res = SetRes.successRes(resObj);
      callback(res); 
    } else {
      const cf = SetRes.saveTrxFailed('Update failed');
      callback(cf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.rName || error.keyPattern && error.keyPattern.rCode) {
      const uniq = error.keyPattern.rName ? 'Role Name': 'Role Code';
      logger.error('Uniqueness Error in daos/B2buRolesAccessDao.js, at putb2bUsrRlsAcsUpdate:' + error);
      const err = SetRes.uniqueErr(uniq + ' Already Exists');
      callback(err);
    } else {
      logger.error('Unknown Error in daos/B2buRolesAccessDao.js, at putb2bUsrRlsAcsUpdate:' + error);
      const uke = SetRes.unKnownErr({});
      callback(uke);
    }
  });
}

module.exports = {
  postb2bUsrRlsAcsList, postb2bUsrRlsAcsCreate, getB2BUsrRlsAcsView, putb2bUsrRlsAcsUpdate
};

const urRlsAcsGetTotalCount = (query, resObj, callback) => {
  let resultObj = { rolesAcsCount: resObj.length, rolesAcsList: resObj };
  B2bUserRolesAccess.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { rolesAcsCount: resultCount, rolesAcsList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((errCount) => {
    logger.error('Unknown Error in daos/B2buRolesAccessDao.js, at urRlsAcsGetTotalCount(countDocuments):' + errCount);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}