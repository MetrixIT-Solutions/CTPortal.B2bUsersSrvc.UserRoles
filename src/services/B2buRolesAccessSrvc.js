/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const daoImpl = require('../daos/daosimpls/B2buRoleAccessDaosImpl');
const B2buRADaos = require('../daos/B2buRolesAccessDao');

const postb2bUsrRlsAcsList = (reqBody, tData, callback) => {
  const obj = daoImpl.usrRlsAcsListQry(reqBody, tData);
  B2buRADaos.postb2bUsrRlsAcsList(reqBody.actPgNum, reqBody.rLimit, obj, callback);
}

const postb2bUsrRlsAcsCreate = (reqBody, tData, callback ) => {
  const rolesAcsData = daoImpl.rolesAcsData(reqBody, tData);
  B2buRADaos.postb2bUsrRlsAcsCreate(rolesAcsData, callback);
}

const getB2BUsrRlsAcsView = (recordId, tData, callback) => {
  const query = daoImpl.getQueryData(recordId, tData);
  B2buRADaos.getB2BUsrRlsAcsView(query, callback);
}

const putb2bUsrRlsAcsUpdate = (reqBody, recordId, tData, callback) => {
  const query = daoImpl.getQueryData(recordId, tData);
  const UpdateObj = daoImpl.updateData(reqBody, tData);
  B2buRADaos.putb2bUsrRlsAcsUpdate(query, UpdateObj, callback);
}

const getB2BUserRlsAcsRoleUser = (tData, callback) => {
  const qry = daoImpl.setAcsUsrQuery(tData.iss, tData.ut, tData.ur, tData.b2b);
  B2buRADaos.getB2BUsrRlsAcsView(qry.usrQry, resObj => {
    if (resObj.status == '200') {
      callback(resObj);
    } else {
      B2buRADaos.getB2BUsrRlsAcsView(qry.roleQry, callback);
    }
  });
}

module.exports = {
  postb2bUsrRlsAcsList, postb2bUsrRlsAcsCreate, getB2BUsrRlsAcsView, putb2bUsrRlsAcsUpdate, getB2BUserRlsAcsRoleUser
};
