/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const buraCtrl = require('../controllers/B2buRolesAccessCtrl');

module.exports.controller = (app) => {
 
  app.post('/ctpb2b/v1/rolesaccess/list', buraCtrl.postb2bUsrRlsAcsList);
  app.post('/ctpb2b/v1/rolesaccess/create', buraCtrl.postb2bUsrRlsAcsCreate);
  app.get('/ctpb2b/v1/rolesaccess/view/:recordId', buraCtrl.getB2BUsrRlsAcsView);
  app.put('/ctpb2b/v1/rolesaccess/update/:recordId', buraCtrl.postB2BUserRlsAcsUpdate);
  app.post('/ctpb2b/v1/rolesaccess/role-user', buraCtrl.getB2BUserRlsAcsRoleUser);

};
