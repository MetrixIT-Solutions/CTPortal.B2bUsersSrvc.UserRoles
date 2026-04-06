/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const burCtrl = require('../controllers/B2buRolesCtrl');

module.exports.controller = (app) => {

  app.get('/', burCtrl.apiServerStatus);

  app.post('/ctpb2b/v1/useroles/list', burCtrl.postb2bUsrRlsList);
  app.post('/ctpb2b/v1/useroles/active/list', burCtrl.postb2bUsrRlsActiveList);
  app.post('/ctpb2b/v1/useroles/create', burCtrl.postb2bUsrRlsCreate);
  app.get('/ctpb2b/v1/useroles/:id', burCtrl.getB2BUsrRlsView);
  app.put('/ctpb2b/v1/useroles/update/:id', burCtrl.postB2BUserRoleUpdate);
  app.put('/ctpb2b/v1/useroles/status-update/:id', burCtrl.postB2BUsrRlsStatusUpdate);
  app.delete('/ctpb2b/v1/useroles/delete/:id', burCtrl.postB2BUsrRlsDelete);

};
