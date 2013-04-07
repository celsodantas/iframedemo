//= require jquery
//= require jquery_ujs
//= require_tree .

Shopify.API.debug = true;


window.newModal = function(path, title){
  Shopify.API.Modal.open({
    'src': path,
    'title': title, 
    'primaryButton': { label: "OK" },
    'buttons': [ { label: "Cancel" } ], 
  }, function(result, data){
    alert("result: " + result + "   data: " + data);
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
