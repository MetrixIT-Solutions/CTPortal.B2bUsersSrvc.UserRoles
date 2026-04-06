/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const daoImpl = require('../daos/daosimpls/B2buRolesDaosImpl');
const B2buRolesDaos = require('../daos/B2buRolesDaos');
const B2buRolesAcsDaos = require('../daos/B2buRolesAccessDao');
const B2bUserAuthSrvc = require('../B2bUserAuthSrvc');
const SetRes = require('../SetRes');

const postb2bUsrRlsList = (reqBody, tData, callback) => {
  const obj = daoImpl.postb2bUsrRlsList(reqBody, tData);
  B2buRolesDaos.postb2bUsrRlsList(reqBody.actPgNum, reqBody.rLimit, obj, callback);
}

const postb2bUsrRlsCreate = (reqBody, tData, callback ) => {
  const roleData = daoImpl.crtRolesData(reqBody, tData);
  B2buRolesDaos.postb2bUsrRlsCreate(roleData, callback);
}

const getB2BUsrRlsView = (recordId, tData, callback) => {
  const query = daoImpl.getQueryData(recordId, tData);
  B2buRolesDaos.getB2BUsrRlsView(query, callback);
}

const postb2bUsrRlsUpdate = (reqBody, recordId, tData, callback) => {
  const query = daoImpl.getQueryData(recordId, tData);
  const UpdateObj = daoImpl.updateData(reqBody, tData);
  B2buRolesDaos.postb2bUsrRlsUpdate(query, UpdateObj, callback);
}

const postb2bUsrRlsStatusUpdate = (reqBody, recordId, tData, callback) =>{
  const query = daoImpl.getQueryData(recordId, tData);
  const UpdateObj = daoImpl.statusUpdateData(reqBody, tData);
  B2buRolesDaos.postb2bUsrRlsUpdate(query, UpdateObj, callback);
}

const postB2BUsrRlsDelete = (recordId, reqBody, tData, callback) => {
  const raQry = daoImpl.raQry(reqBody.rName, tData.tokenData);
  B2buRolesAcsDaos.getB2BUsrRlsAcsView(raQry, raRes => {
    if(raRes.status === '200') {
      const ue = SetRes.delRoleErr('You have dependent Roles Access');
      callback(ue);
    } else if(raRes.status == '204') {
      B2bUserAuthSrvc.getB2bRoleUser(reqBody.rName, tData.ctpb2batoken, (err, ruResObj) => {
        if (ruResObj?.status == '200') {
          const ue = SetRes.delRoleErr('You have dependent Admin Users');
          callback(ue);
        } else if (err && err.response && err.response?.data?.status == '204') {
          const updateObj = daoImpl.rlsDeleteData(recordId, reqBody, tData.tokenData);
          B2buRolesDaos.postb2bUsrRlsUpdate(updateObj.query, updateObj.updateData, resObj => {
            if(resObj.status === '200') {
              const result = SetRes.successRes('Role Deleted Successfully');
              callback(result);
            } else callback(resObj);
          });
        } else {
          const ue = SetRes.unKnownErr('');
          callback(ue);
        }
      });
    } else {
      const ue = SetRes.unKnownErr('');
      callback(ue);
    }
  });
}

module.exports = {
  postb2bUsrRlsList, postb2bUsrRlsCreate, getB2BUsrRlsView, postb2bUsrRlsUpdate, postb2bUsrRlsStatusUpdate,
  postB2BUsrRlsDelete
};
