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


## Documentation

All docs have been moved here:

https://gist.github.com/kmcphillips/2ea9849619eeb27396e0


## Problems, questions, or contributions

This API is in development and may change. If you are having problems or have questions contact Kevin McPhillips.

