/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const sRes = require('../../SetRes');
const {utApp, utech, utm, sa} = require('../../consts/B2buRolesConsts.json');

const tokenVldn = (tData) => {
  if (!tData) {
    const result = sRes.tokenInvalid();
    return { flag: false, result };
  } else if (tData.isExpired) {
    const result = sRes.tokenExpired();
    return { flag: false, result };
  } else if (!tData.tokenData) {
    const result = sRes.tokenSsnErr();
    return { flag: false, result };
  } else if (tData.tokenData?.ut !== utApp && tData.tokenData?.ut !== utech && (tData.tokenData?.ut == utm && tData.tokenData?.ur !== sa)) {
    const result = sRes.accessDenied();
    return { flag: false, result };
  } else {
    return { flag: true, result: tData.tokenData };
  }
}

const ssnRoleTokenVldn = (tData) => {
  if (!tData) {
    const it = sRes.tokenInvalid();
    return { flag: false, result: it };
  } else if (tData.isExpired) {
    const te = sRes.tokenExpired();
    return { flag: false, result: te };
  } else {
    return { flag: true };
  }
}

const postb2bRolesAcsListVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.actPgNum || !reqBody.rLimit) {
    const ad = sRes.mandatory();
    return { flag: false, result: ad };
  } else {
    return { flag: true };
  }
}

const postb2bRolesAcsCrtVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else {
    const data = b2bValidData(reqBody);
    if (!data) {
      const mandatoryResult = sRes.mandatory();
      return { flag: false, result: mandatoryResult };
    } else {
      return { flag: true };
    }
  }
}

const postb2bRolesAcsViewVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId) {
    const ad = sRes.mandatory();
    return { flag: false, result: ad };
  } else {
    return { flag: true };
  }
}

const postb2bRolesAcsEditVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId || !reqBody.raSeq || !reqBody.access) {
    const mandatoryResult = sRes.mandatory();
    return { flag: false, result: mandatoryResult };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenVldn, ssnRoleTokenVldn, postb2bRolesAcsListVldn, postb2bRolesAcsCrtVldn, postb2bRolesAcsViewVldn, postb2bRolesAcsEditVldn
}

const b2bValidData = (reqBody) => {
  if (reqBody.raSeq && reqBody.role && reqBody.rType && reqBody.rName && reqBody.rCode && reqBody.access) {
    return true;
  } else {
    return false;
  }
}