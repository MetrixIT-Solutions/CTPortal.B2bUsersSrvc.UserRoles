/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const sRes = require('../../SetRes');

const postb2bRolesListVldn = (req) => {
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

const postb2bRolesCrtVldn = (req) => {
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

const postb2bRolesViewVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.id) {
    const ad = sRes.mandatory();
    return { flag: false, result: ad };
  } else {
    return { flag: true };
  }
}

const postb2bRolesEditVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else {
    const data = b2bEditValidData(reqBody);
    if (!data || !req.params.id) {
      const mandatoryResult = sRes.mandatory();
      return { flag: false, result: mandatoryResult };
    } else {
      return { flag: true };
    }
  }
}

const postb2bUsrRlsStatusUpdateVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.id || !reqBody.roleStatus) {
    const ad = sRes.mandatory();
    return { flag: false, result: ad };
  } else {
    return { flag: true };
  }
}

const postB2BUsrRlsDelete = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.id || !reqBody.rCode || !reqBody.rName) {
    const ad = sRes.mandatory();
    return { flag: false, result: ad };
  } else {
    return { flag: true };
  }
}

module.exports = {
  postb2bRolesListVldn, postb2bRolesCrtVldn, postb2bRolesViewVldn, postb2bRolesEditVldn, postb2bUsrRlsStatusUpdateVldn,
  postB2BUsrRlsDelete
};

const b2bValidData = (reqBody) => {
  if (reqBody.roleName && reqBody.roleCode && reqBody.roleSeq && reqBody.roleStatus) {
    return true;
  } else {
    return false;
  }
}

const b2bEditValidData = (reqBody) => {
  if (reqBody.roleName && reqBody.roleCode && reqBody.roleSeq && reqBody.roleStatus) {
    return true;
  } else {
    return false;
  }
}