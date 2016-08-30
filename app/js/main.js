var myApp = new Framework7({
  modalTitle: 'Scratch',
  material: true,
  precompileTemplates: true
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
  if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
    // Don't show preloader for autocomplete demo requests
    return;
  }
  myApp.showIndicator();
});

$$(document).on('ajaxComplete', function (e) {
  if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
    // Don't show preloader for autocomplete demo requests
    return;
  }
  myApp.hideIndicator();
});
