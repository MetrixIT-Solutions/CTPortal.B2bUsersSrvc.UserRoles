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
const urcVldns = require('../controllers/apiVldns/B2buRolesCtrlVldns');
const usrRlsSrvc = require('../services/B2buRolesSrvc');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiRes(res, resObj);
}

const postb2bUsrRlsList = (req, res) => {  
  const vldRes = urcVldns.postb2bRolesListVldn(req);
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {
        usrRlsSrvc.postb2bUsrRlsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const postb2bUsrRlsActiveList = (req, res) => {
  const vldRes = urcVldns.postb2bRolesListVldn(req);
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.ssnRoleTokenVldn(tData);
      if (tokenValid.flag) {
        usrRlsSrvc.postb2bUsrRlsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const postb2bUsrRlsCreate = (req, res) => {
  const vldRes = urcVldns.postb2bRolesCrtVldn(req);
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {
        usrRlsSrvc.postb2bUsrRlsCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const getB2BUsrRlsView = (req, res) => {
  const vldRes = urcVldns.postb2bRolesViewVldn(req);
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {
        usrRlsSrvc.getB2BUsrRlsView(req.params.id, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const postB2BUserRoleUpdate = (req, res) => {  
  const vldRes = urcVldns.postb2bRolesEditVldn(req);  
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {        
        usrRlsSrvc.postb2bUsrRlsUpdate(req.body, req.params.id, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const postB2BUsrRlsStatusUpdate = (req, res) => {
  const vldRes = urcVldns.postb2bUsrRlsStatusUpdateVldn(req);  
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {        
        usrRlsSrvc.postb2bUsrRlsStatusUpdate(req.body, req.params.id, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

const postB2BUsrRlsDelete = (req, res) => {
  const vldRes = urcVldns.postB2BUsrRlsDelete(req);    
  if (vldRes.flag) {
    token.refreshToken(req.headers.ctpb2batoken, res, tData => {      
      const tokenValid = uracVldns.tokenVldn(tData);
      if (tokenValid.flag) {  
        usrRlsSrvc.postB2BUsrRlsDelete(req.params.id, req.body, tData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, vldRes.result);
}

module.exports = {
  apiServerStatus, postb2bUsrRlsList,postb2bUsrRlsActiveList,  postb2bUsrRlsCreate, getB2BUsrRlsView, postB2BUserRoleUpdate, postB2BUsrRlsStatusUpdate,
  postB2BUsrRlsDelete
};
