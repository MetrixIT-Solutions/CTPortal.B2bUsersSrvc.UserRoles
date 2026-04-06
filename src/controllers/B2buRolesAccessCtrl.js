/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const token = require('../tokens');
const util = require('../lib/util');
const uracVldns = require('../controllers/apiVldns/B2buRolesAccessCtrlVldns');
const usrRarvc = require('../services/B2buRolesAccessSrvc');

const postb2bUsrRlsAcsList = (req, res) => {  
  const vldRes = uracVldns.postb2bRolesAcsListVldn(req);
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);  
      if (tokenValid.flag) {
        usrRarvc.postb2bUsrRlsAcsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const postb2bUsrRlsAcsCreate = (req, res) => {
  const vldRes = uracVldns.postb2bRolesAcsCrtVldn(req);
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {
        usrRarvc.postb2bUsrRlsAcsCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const getB2BUsrRlsAcsView = (req, res) => {
  const vldRes = uracVldns.postb2bRolesAcsViewVldn(req);
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {
        usrRarvc.getB2BUsrRlsAcsView(req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const postB2BUserRlsAcsUpdate = (req, res) => {  
  const vldRes = uracVldns.postb2bRolesAcsEditVldn(req);  
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {        
        usrRarvc.putb2bUsrRlsAcsUpdate(req.body, req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const getB2BUserRlsAcsRoleUser = (req, res) => {
  if (req.headers.ctpb2batoken) {
    const tData = token.userTokenDecode(req.headers.ctpb2batoken, res)
    const tokenValid = uracVldns.ssnRoleTokenVldn(tData);
    if (tokenValid.flag) {        
      usrRarvc.getB2BUserRlsAcsRoleUser(tData.tokenData, (resObj) => util.sendApiRes(res, resObj));
    } else util.sendApiRes(res, tokenValid.result);
  } else util.sendApiRes(res, SetRes.tokenRequired());
}

module.exports = {
  postb2bUsrRlsAcsList, postb2bUsrRlsAcsCreate, getB2BUsrRlsAcsView, postB2BUserRlsAcsUpdate, getB2BUserRlsAcsRoleUser
}
