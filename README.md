Shopify Application iFrame Integration Demo
===========================================

The 2.0 version of Shopify Applications has the app living inside an iframe nested in the Shopify admin. Communication between the application and the Shopify admin for per-page customization is done via a postMessage API. Shopify provides a Javascript file that can be included into apps that wraps that functionality in an API. This project is a very simple Rails app that demonstrates this.

In the interest of simplicty, this application is assumed to be running locally and does not do authentication. It is exclusively a demo of the Javascript app integration.


## Setting up this application

Clone the repo from git:

    git clone https://github.com/kmcphillips/iframedemo.git
    cd iframedemo

Install the gems:

    bundle install

Create the DB:

    bundle exec rake db:create
    bundle exec rake db:migrate

Run the server:

    bundle exec rails server -p 3001


## Integration with Shopify for development

The scope of this demo app, for the time being, is limited so it makes some big assumptions:

* You are developing with Shopify running locally.
* You are running Shopify on port 3000.
* You are running this application on port 3001.
* You are using the Shopify bootstrap shop.
* You have a hosts entry stating `127.0.0.1 shop1.localhost`.

These can all be worked around pretty easily with a small amount of cleverness.

Create an application API client running locally. Be sure the callback URL is set to `http://localhost:3001/` and the `embedded` flag is set to `true`. The embedded flag is passed into the application when it loads and is used by the admin to decide if the app should be launched in an iframe or in a window like the existing default behaviour.


## Integration

The Shopify admin provides a Javascript file that loads an API pointing to the shop admin. It should be loaded before other JS files. It has no dependencies but plays well with other libs like jQuery.

    <script src="http://shop1.localhost:3000/admin/api/api.js" type="text/javascript"></script>

This makes the `Shopify.API` object available.


### Methods

#### `Shopify.API.ready(fn)`

Works similarly to jQuery's `ready()` function. It can be called many times on a page, it accepts functions, and when the Admin and the app are loaded it will call the functions in order.

    Shopify.API.ready(function(){
      alert("Ready");
    });
    

#### `Shopify.API.pushState(path)`

Used to rewrite the current URL. This is called automatically and probably doesn't need to be explicitly set.

#### `Shopify.API.flashNotice(message)`

Displays a message in the Shopify admin chrome styled as a notice.

    Shopify.API.flashNotice("Unicorn was created successfully.");

#### `Shopify.API.flashError(message)`

Displays a message in the Shopify admin chrome styled as an error.

    Shopify.API.flashError("Unicorn could not be created.");

#### `Shopify.API.addMessageHandler(message, fn)` or `Shopify.API.addMessageHandler(fn)`

Adds a handler that listens for messages from the Shopify admin and calls the function when they are received. If called with just a function, it will execute on every message.

    Shopify.API.addMessageHandler('a_message' function(){
      alert("received 'a_message' from the admin");
    });

#### `Shopify.API.clearMessageHandlers(message)`

Removes all previously defined handlers (as above) for the passed in message. If the message is undefined, all handlers are removed.

#### `Shopify.API.Bar.initialize(config)`

Accepts an object that defines how the top bar and buttons will look and behave. This should almost always be called in the `ready()` method. Default behaviour if `initialize` is never called will result in some pretty safe defaults, except that the loading spinner will never stop spinning.

The config object has a number of keys, all optional.

* `primaryButton`: An object describing the primary (green) button displayed in the top bar.
* `buttons`: An array of objects describing the secondary buttons displayed in the top bar, up to a maximum of 4.
* `title`: The title string displayed in the header behind the application's name.
* `icon`: An image file used as the icon in the top bar. If omitted, a default app icon will be used.

A button object has a required `label` field for the button text. It has optional fields for `message` which is the postMessage the admin will send when the button is clicked. It also accepts an `action` function that is called on click.

    Shopify.API.Bar.initialize({
      'primaryButton': {label: "Save", message: 'bar_save'},
      'buttons': [ 
        { label: "Help", action: function(){ alert('help'); } }, 
        { label: "Cancel", action: function(){ alert('cancel'); } }
      ],
      'title': 'Page Title',
      'icon': 'https://example.com/path/to/icon.png'
    });

#### `Shopify.API.Bar.loadingOff()`

Stops the loading spinner. Should probably be called on every page in `ready()`.

#### `Shopify.API.Bar.loadingOn()`

Restarts the spinner.

#### `Shopify.API.Bar.setTitle(title)`

Manually set the title string in the top bar. See `initialize()`.

#### `Shopify.API.Bar.setIcon(icon)`

Manually set the icon of the top bar from a URL. See `initialize()`.

#### `Shopify.API.Modal.open`

Opens a modal dialog in the Shopify admin that in turn loads an iframe inside of it with the passed in URL. It accepts a `src` URL to be loaded, a `title` for the top of the bar, and a configuration of primary and secondary buttons identical to `Bar.initialize()`. It also accepts a callback function that is called when the modal is closed.

    Shopify.API.Modal.open({
      'src': 'https://example.com/app/path',
      'title': 'A new modal', 
      'primaryButton': { label: "OK" },
      'buttons': [ { label: "Cancel" } ], 
    }, function(result, data){
      alert("result: " + result + "   data: " + data);
    });

#### `Shopify.API.Modal.alert(message, fn)`

Opens a Javascript style `alert()` in the admin. When the modal is closed the optional callback is called and a modal close message is sent.

    Shopify.API.Modal.alert("An alert message", function(message, data){
      alert("The modal was closed.");
    });

#### `Shopify.API.Modal.confirm(message, fn)`

Opens a Javascript style `confirm()` in the admin. When the modal is closed the optional callback is called and a modal close message is sent. The callback has the status of the closure passed in.

    Shopify.API.Modal.confirm("Are you sure you want to?", function(message, data){
      if(message){
        alert("yeah they're sure");
      }
      else{
        alert("no, lets not");
      }
    });

#### `Shopify.API.Modal.input(message, fn)`

Opens a Javascript style `input()` dialog in the admin. When the modal is closed the optional callback is called and a modal close message is sent. The callback has the status of the closure and the contents of the input box passed in.

    Shopify.API.Modal.input("Please enter some data.", function(message, data){
      if(message){
        alert("entered" + data);
      }
      else{
        alert("cancelled");
      }
    });

#### `Shopify.API.debug`

A property that defaults to false. Can be set to true and will safely `console.log()` all sent and received postMessages.

    Shopify.API.debug = true;


## Problems, questions, or contributions

This API is in development and may change. If you are having problems or have questions contact Kevin McPhillips.

