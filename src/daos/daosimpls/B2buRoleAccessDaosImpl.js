/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');

const CommonSrvc = require('../../services/CommonSrvc');
const userRolesAcs = require('../../schemas/B2bUserRolesAccess');
const { rGrp, cuType } = require('../../consts/B2buRolesConsts.json');

const usrRlsAcsListQry = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  // const rsObj = reqBody?.status == 'Active' ? { rStatus: 'Active' } : {};
  const query = {
    delFlag: false,
    b2b: tData.b2b,
    $or: [
      { 'rName': { $regex: searchStr, $options: 'i' } },
      { 'rType': { $regex: searchStr, $options: 'i' } },
      { 'uName': { $regex: searchStr, $options: 'i' } },
      { 'uPrimary': { $regex: searchStr, $options: 'i' } },
    ]
  };

  const sort = { rType: -1, raSeq: 1, cDtStr: -1 };

  return { query, sort };
}

const rolesAcsData = (reqBody, tokenData) => {
  const currentUTC = CommonSrvc.currUTCObj();
  const schemaData = setRacsData(reqBody, tokenData, currentUTC);
  const roleData = new userRolesAcs(schemaData);
  return roleData;
}

const getQueryData = (_id, tData) => {
  return { _id, b2b: tData.b2b, delFlag: false };
}

const updateData = (reqBody, tokenData) => {
  const currentUTC = CommonSrvc.currUTCObj();
  return {
    raSeq: reqBody.raSeq,

    // org: reqBody.org || '',
    // orgName: reqBody.orgName || '',
    // orgCode: reqBody.orgCode || '',
    // orgs: reqBody.orgs || [],
    // orgNames: reqBody.orgNames || [],
    // obId: reqBody.obId || '',
    // obName: reqBody.obName || '',
    // obCode: reqBody.obCode || '',
    // obIds: reqBody.obIds || [],
    // team: reqBody.team || '',
    // tName: reqBody.tName || '',
    // tCode: reqBody.tCode || '',
    // teams: reqBody.tCode || [],

    access: reqBody.access,

    uuType: cuType,
    uUser: tokenData.iss,
    uuName: tokenData.fn + ' ' + tokenData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
}

const setAcsUsrQuery = (user, rType, rName, b2b) => {
  const usrQry = {user, b2b, delFlag: false };
  const roleQry = {rType, rName, b2b, delFlag: false };
  return { usrQry, roleQry };
}

module.exports = {
  usrRlsAcsListQry, rolesAcsData, getQueryData, updateData, setAcsUsrQuery
};

const setRacsData = (reqBody, tokenData, currentUTC) => {
  const uid = uuidv4();
  return {
    _id: uid,
    raSeq: reqBody.raSeq,

    b2b: tokenData.b2b,
    b2bName: tokenData.bn,
    b2bCode: tokenData.bc,
    role: reqBody.role,
    rGroup: rGrp,
    rType: reqBody.rType,
    rName: reqBody.rName,
    rCode: reqBody.rCode,

    user: reqBody.user || '',
    uName: reqBody.uName || '',
    urefUID: reqBody.urefUID || '',
    uPrimary: reqBody.uPrimary || '',

    org: reqBody.org || '',
    orgName: reqBody.orgName || '',
    orgCode: reqBody.orgCode || '',
    orgs: reqBody.orgs || [],
    orgNames: reqBody.orgNames || [],
    // obId: reqBody.obId || '',
    // obName: reqBody.obName || '',
    // obCode: reqBody.obCode || '',
    // obIds: reqBody.obIds || [],
    // team: reqBody.team || '',
    // tName: reqBody.tName || '',
    // tCode: reqBody.tCode || '',
    // teams: reqBody.tCode || [],

    access: reqBody.access,

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
