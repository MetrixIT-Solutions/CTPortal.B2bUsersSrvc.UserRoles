/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');
var moment = require('moment');

const CommonSrvc = require('../../services/CommonSrvc');
const userRoles = require('../../schemas/B2bUserRoles');
const { c3Code, rGrp, cuType } = require('../../consts/B2buRolesConsts.json');

const postb2bUsrRlsList = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  const rsObj = reqBody?.status == 'Active' ? { rStatus: 'Active' } : {};
  const rType = reqBody.userType ? {rType: reqBody.userType} : {};
  const rsq =  reqBody.userType ? ((tData.ur !== 'Super Admin' && tData.ut !== 'App' && tData.ut !== 'Tech') ? {rSeq: {$gt: tData.urs}} : {}) : {};

  const query = {
    delFlag: false,
    b2b: tData.b2b,
    ...rsq,
    ...rsObj,
    ...rType,
    $or: [
      { 'rName': { $regex: searchStr, $options: 'i' } },
      { 'rCode': { $regex: searchStr, $options: 'i' } },
      { 'rStatus': { $regex: searchStr, $options: 'i' } }
    ]
  };

  const sort = { cDtStr: -1 };

  return { query, sort };
}

const crtRolesData = (reqBody, tokenData) => {
  const currentUTC = CommonSrvc.currUTCObj();
  const schemaData = setData(reqBody, tokenData, currentUTC);
  const roleData = new userRoles(schemaData);
  return roleData;
}

const getQueryData = (_id, tData) => {
  const queryData = { _id, b2b: tData.b2b, delFlag: false };
  return queryData;
}

const updateData = (reqBody, tokenData) => {
  const currentUTC = CommonSrvc.currUTCObj();
  return {
    rName: reqBody.roleName,
    rCode: reqBody.roleCode,
    rSeq: reqBody.roleSeq,
    rStatus: reqBody.roleStatus,
    rType: reqBody.rType,
    uuType: cuType,
    uUser: tokenData.iss,
    uuName: tokenData.fn + ' ' + tokenData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
}

const statusUpdateData = (reqBody, tokenData) => {
  const currentUTC = CommonSrvc.currUTCObj();
  return {
    rStatus: reqBody.roleStatus,

    uuType: cuType,
    uUser: tokenData.iss,
    uuName: tokenData.fn + ' ' + tokenData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
}

const rlsDeleteData = (_id, reqBody, tokenData) => {
  const query = { _id };

  const currentUTC = CommonSrvc.currUTCObj();
  const dtime = moment.utc().format('YYYYMMDDHHmmss');
  const updateData = {
    rName: reqBody.rName + '_DEL_' + dtime,
    rCode: reqBody.rCode + '_DEL_' + dtime,
    delFlag: true,

    uuType: cuType,
    uUser: tokenData.iss,
    uuName: tokenData.fn + ' ' + tokenData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr
  };

  return { query, updateData };
}

const raQry = (rName, tData) => {
  return { delFlag: false, b2b: tData.b2b, rName};
}

module.exports = {
  postb2bUsrRlsList, crtRolesData, getQueryData, updateData, statusUpdateData, rlsDeleteData, raQry
};

const setData = (reqBody, tokenData, currentUTC) => {
  const uid = uuidv4();
  return {
    _id: uid,
    idSeq: {
      seq: c3Code + currentUTC.currUTCYear + currentUTC.currUTCMnt + currentUTC.currUTCDay,
      cCode: c3Code,
      year: currentUTC.currUTCYear,
      month: currentUTC.currUTCMnt,
      day: currentUTC.currUTCDay
    },

    b2b: tokenData.b2b,
    b2bName: tokenData.bn,
    b2bCode: tokenData.bc,

    rGroup: rGrp,
    rType: reqBody.rType,
    rName: reqBody.roleName,
    rCode: reqBody.roleCode,
    rSeq: reqBody.roleSeq,
    rStatus: reqBody.roleStatus,

    cuType: cuType,
    cUser: tokenData.iss,
    cuName: tokenData.fn + ' ' + tokenData.ln,
    cDate: currentUTC.currUTCDtTm,
    cDtStr: currentUTC.currUTCDtTmStr,
    uuType: cuType,
    uUser: tokenData.iss,
    uuName: tokenData.fn + ' ' + tokenData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
}
