/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const JsonRpc = require("./jsonrpc");
const ExtError = require("exterror");
module.exports = {
	getCallback,
	getError,
	getId,
	getMethod,
	getParams,
	getResource,
	getResult,
	getVersion,
	setCallback,
	setError,
	setId,
	setMethod,
	setParams,
	setResource,
	setResult,
	setVersion,
	toJSON,
	toString
};

/**
 * Gets message schema version
 * @returns {String}
 */
function getVersion() {
	return this.message.version;
}

/**
 * Sets message schema version
 */
function setVersion(version) {
	if (JsonRpc.version !== version) {
		throw new ExtError("ERR_CANT_OVERWRITE_VERSION", "Can't overwrite version");
	}
}

/**
 * Gets message id
 * @returns {Number}
 */
function getId() {
	return this.message.id;
}

/**
 * Sets message id
 * @param {Number} id
 * @returns {JsonRpc}
 */
function setId(id) {
	if (typeof id !== "number") {
		throw new Error("Id must be 'integer'");
	}
	this.message.id = id;
	return this;
}

/**
 * Gets message resource for method
 * @returns {String}
 */
function getResource() {
	return this.message.resource;
}

/**
 * Sets message resource for method
 * @param {String} resource
 * @returns {JsonRpc}
 */
function setResource(resource) {
	if (typeof resource !== "string") {
		throw new ExtError("Resource must be 'String' type");
	}
	this.message.resource = resource;
	return this;
}

/**
 * Gets message method
 * @returns {String}
 */
function getMethod() {
	return this.message.method;
}

/**
 * Sets message method
 * @param {String} method
 * @returns {JsonRpc}
 */
function setMethod(method) {
	if (typeof method !== "string") {
		throw new ExtError("", "Method must be 'String' type");
	}
	this.message.method = method;
	return this;
}

/**
 * Gets message callback
 * @returns {Function|undefined}
 */
function getCallback() {
	return typeof this.jr.callbacks[this.message.id] === "object" ? this.jr.callbacks[this.message.id].cb : undefined;
}

/**
 * Sets message callback
 * @param {Function} callback Callback to be fired when got response
 * @param {Number} [tls] Time in ms how long keep uncalled callback
 * @returns {JsonRpc}
 */
function setCallback(callback, tls) {
	tls = tls || this.jr.options.callbacksTimeout;
	if (typeof callback !== "function") {
		throw new ExtError("", "Callback must be function");
	}
	const timeout = setTimeout(() => {
		this.jr.removeCallback(this.message.id);
	}, tls);
	this.jr.callbacks[this.message.id] = {
		cb: callback,
		timeout: timeout
	};
	return this;
}

/**
 * Gets message parameters for method
 * @returns {Object}
 */
function getParams() {
	return this.message.params;
}

/**
 * Sets message parameters for method
 * @param {Object} params
 * @returns {JsonRpc}
 */
function setParams(params) {
	if (typeof params !== "object" || params === null) {
		throw new ExtError("", "Params must be 'Object' type");
	}
	this.message.params = params;
	return this;
}

/**
 * Gets message result
 * @returns {*}
 */
function getResult() {
	return this.message.result;
}

/**
 * Sets message result
 * @param {*} result
 * @returns {JsonRpc}
 */
function setResult(result) {
	this.message.result = result;
	return this;
}

/**
 * Gets message Error
 * @returns {ExtError}
 */
function getError() {
	return this.message.error;
}

/**
 * Sets message
 * @param {ExtError|Object} error
 * @returns {JsonRpc}
 */
function setError(error) {
	if (error) {
		if (!(error instanceof ExtError)) {
			error = new ExtError(error.code, error.message);
		}
		this.message.error = error;
	}
	return this;
}

/**
 *
 * @returns {{version: *, id: *, resource: *, method: *, params: *, callback: *}}
 */
function toJSON() {
	return this.message;
}

/**
 *
 * @returns {String}
 */
function toString() {
	return this.jr.options.encoder.stringify(this.message);
}
