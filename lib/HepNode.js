'use strict'
var RED
var typeOf = require('typeof')
const HEPjs = require('hep-js');

function HepNode (node, pattern) {
    var parser, serializer
    this.node = node
    // create Hep enc/dec
    this.encode = HEPjs.encapsulate;
    this.decode = HEPjs.decapsulate;
}

HepNode.prototype.handleInputEvent = function (msg) {
    var value = RED.util.getMessageProperty(msg,this.node.property);
    if (value !== undefined) {
        var t = typeOf(value);
        if (t == 'object') { // serialize object
	    if(value.rcinfo && value.payload){
		    var result = this.encode(value.payload,value.rcinfo);
	            this._sendMessage(result, msg)
	    }
        } else if (Buffer.isBuffer(value)) { // parse buffer
	    var result = this.decode(value);
            this._sendMessage(result, msg)
        } else {
            throw new Error('invalid input')
        }
    }
}

HepNode.prototype.handleCloseEvent = function () {}

HepNode.prototype._sendMessage = function (payload, msg) {
    // create message
    var m = RED.util.cloneMessage(msg);
    RED.util.setMessageProperty(m,this.node.property,payload);
    m.original = msg.payload;
    this.node.send(m)
}

module.exports = function (runtime) {
    RED = runtime
    return HepNode
}
