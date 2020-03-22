## OMERO parade-crossfilter

This is a prototype OMERO.web app, exploring the use of https://github.com/crossfilter/crossfilter in a new implementation of https://github.com/ome/omero-parade.

It uses [Create React App](https://github.com/facebook/create-react-app) 
with the cross-filter, https://dc-js.github.io/dc.js/ and React interaction
based on the blog post at https://www.lighttag.io/blog/react-dc-js/.

# Questions to Answer

This prototype aims to investigate the scope and technical solutions for a
data-visualization app based on ```omero-parade```.

Limitations of ```omero-parade``` include:

 - Data is tied to Images (in Dataset) or Wells (in Plate). Can't handle data linked to ROIS or to multiple Images in a Well.
 - Loads the same data from the server for filtering *again* for display.
 - Limited plots available (scatter plot only)

Particular questions:

 - Is crossfilter.js a suitable tool for filtering/grouping data?
 - What to use for Plots?
 - How do we handle hierarchy of multiple Images per Well, or ROIs per Image?
 - How much data processing is possible, while still being usable / generic?

# Development

You can run this project in development mode or as an OMERO.web Django app.

The notes below are largely from `Create React App` but have been updated with
changes made to connect to OMERO in dev or production modes.

To get started:

    $ cd parade-crossfilter
    $ npm install

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The app will try to connect to an OMERO.web server at http://localhost:4080
using an existing session.<br>
You will need to be logged-in to http://localhost:4080/webclient.<br>
To use a different server, edit `dev_omeroweb_index` in `public/index.html`.

### `npm run build`

Builds the app for production to the `build` folder and copies the
html and static files to the Django app in `parade_crossfilter`.<br>

You will need to have the app configured in your OMERO.web install:

    $ omero config append omero.web.apps '"react_webapp"'

The app will be run as an OMERO.web app at e.g. http://localhost:4080/parade_crossfilter/.

Add to 'open_with' config:

    $ omero config append omero.web.open_with '["Parade", "parade_crossfilter_index", {"supported_objects": ["project", "screen"]}]'
