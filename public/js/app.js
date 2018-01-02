(function(global) {
  'use strict';
  var qs = document.querySelector.bind(document),
      qsAll = document.querySelectorAll.bind(document),
      reloadPage = global.location.reload.bind(global.location);

  qs('#reload-button').addEventListener('click', reloadPage);
  qs('#grant-control').addEventListener('click', function() { aeCOBROWSE.API.grantControl() });
  qs('#revoke-control').addEventListener('click', function() { aeCOBROWSE.API.revokeControl() });
  qs('#gen-key').addEventListener('click', function() { aeCOBROWSE.API.generateRoomKey() });
  qs('#do-connect').addEventListener('click', function() {
    aeCOBROWSE.API.doConnect('Dikshant', aeCOBROWSE.API.roomKey);
    window.open('https://localhost/load/' + aeCOBROWSE.tenantId + '/agent.html?nameHandle=Goku&roomKey=' + aeCOBROWSE.API.roomKey, '_blank');
  });
  qs('#do-disconnect').addEventListener('click', function() { aeCOBROWSE.API.doDisconnect() });
  console.log('Client socket script loaded successfully!');

  $(document).ready(function() {
    $('.collapsible').collapsible({
      accordion: false
    });
  });
})(window);