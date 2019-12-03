// TODO Use some type of requireJs or custom stuff like settingsUI
// require ViewMetadata from /js/view/ViewMetadata.js 
$(function () {
	var viewManager;
	
	// Setup pages
	var dataManager = new DataManager();
	var entitiesPage = new EntitiesPage(dataManager);
	var mainPage = new MainPage(dataManager, entitiesPage);
	var shareCredsPage = new ShareCredsPage(dataManager);
	new SettingsPage(dataManager);
	
	
	var runBefore = localStorage.getItem('ha-has-credentials');
	if (runBefore) {
		// Fetch initial data
		$('#main-spinner').removeClass('hidden');
		dataManager.load(function(){
			hideSpinner();
			entitiesPage.update();
		}.bind(this), hideSpinner);
	} else {
		shareCredsPage.show();
	}	
	
	// Handle hardware back button
	document.addEventListener('tizenhwkey', function onTizenhwkey(e) {
        if (e.keyName === 'back') {
            if (document.getElementsByClassName('ui-page-active')[0]
                    .id === 'main' && !tau.activePage
                    .querySelector('.ui-popup-active')) {
            	tizen.application.getCurrentApplication().exit();
            } else {
                history.back();
            }
        }
    });
	
	function hideSpinner() {
		$('#main-spinner').addClass('hidden');
	}
});