//= require jquery
//= require jquery_ujs
//= require_tree .

Shopify.API.debug = true;

Shopify.API.ready(function(){
  Shopify.API.Bar.initialize({
    'primaryButton': {label: "Save", message: 'bar_save'},
    'buttons': [ 
      { label: "Help", action: function(){ alert('help'); } }, 
      { label: "Cancel", action: function(){ alert('cancel'); } }
    ]
  });

  Shopify.API.Bar.loadingOff();
});

// Shopify.API.addMessageHandler(function(message, data) {
//   // called on every message received
// });

// Shopify.API.addMessageHandler('bar_help', function(message, data) {
//   alert('No help here');
// });

window.newThingModal = function(path){
  Shopify.API.Modal.open({
    'src': path,
    'title': 'New Thing', 
    'primaryButton': { label: "OK", message: 'modal_ok'},
    'buttons': [ { label: "Cancel", message: 'modal_cancel'} ], 
  }, function(result, data){
    alert("result: " + result + "   data: " + data);
  });

  Shopify.API.addMessageHandler('modal_cancel', function(message, data) {
    Shopify.API.Modal.close();  // optionally close with a data set
  });
}

// Make a delete form and submit it, non AJAX.
window.deleteFormSubmit = function(location) {
  var form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', location);
  var h = document.createElement('input');
  h.setAttribute('type', 'hidden');
  h.setAttribute('name', '_method');
  h.setAttribute('value', 'delete');
  form.appendChild(h);
  document.body.appendChild(form);
  form.submit(); 
}

window.shopifyDeleteConfirm = function(location, message) {
  if(!message) {
    message = 'Are you sure you want to delete this?';
  }
  Shopify.API.Modal.confirm(message, function(data){
    if(data.result){
      deleteFormSubmit(location);
    }
  });
}