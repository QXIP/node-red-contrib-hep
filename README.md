node-red-contrib-hep
=======================

<a href="http://nodered.org" target="_new">Node-RED</a> function that takes the <b>msg.payload</b> and converts it to/from hep data.

Installation
------------

Either use the Manage Palette option in the Node-RED Editor menu, or run the following command in your Node-RED user directory - typically `~/.node-red`

        npm i node-red-contrib-hep

Usage
-----

If the input is a buffer it tries to parse it as hep and creates a javascript object.
If the input is a javascript object w/ HEP rcinfo and payload, it will create a HEPv3 buffer.

