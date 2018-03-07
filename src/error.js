/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const utls = require('utls');
class JsonRpcError {
	/**
	 *
	 * @param message
	 * @param code
	 */
	constructor(message, code) {
		this.code = 0;
		this.message = '';
		if (typeof  message === 'object') {
			code = message.code;
			message = message.message;
		}
		if (typeof message === 'string') {
			this.setMessage(message);
		}
		if (typeof code === 'string') {
			this.setCode(code);
		}
	}

	/**
	 *
	 * @returns {Number}
	 */
	getCode() {
		return this.code;
	}

	/**
	 *
	 * @returns {String}
	 */
	getMessage() {
		return this.message;
	}

	/**
	 *
	 * @param code
	 * @returns {JsonRpcError}
	 */
	setCode(code) {
		if (typeof code !== 'string') {
			throw new Error('(JsonRpcError) -> setCode(): Code must be number');
		}
		this.code = code;
		return this;
	}

	/**
	 *
	 * @param message
	 * @returns {JsonRpcError}
	 */
	setMessage(message) {
		if (typeof message !== 'string' && !message.length) {
			throw new Error('(JsonRpcError) -> setMessage(): Message must be non-zero length string');
		}
		this.message = message;
		return this;
	}

	/**
	 *
	 * @param error
	 * @returns {Boolean}
	 */
	static isValid(error) {
		return error instanceof JsonRpcError || (typeof error === 'object' && error !== null && utls.equals(Object.getOwnPropertyNames(error).sort(), [
				'code',
				'message'
			]) && typeof error.code === 'string' && typeof error.message === 'string' && !!error.message.length);
	}
}
/**
 * Parse error
 * @type {{code: number, message: string}}
 */
JsonRpcError.E_PARSE = {
	code : 'E_PARSE',
	message : 'Parse error'
};
/**
 * Invalid Request
 * @type {{code: number, message: string}}
 */
JsonRpcError.E_INVALID_REQUEST = {
	code : 'E_INVALID_REQUEST',
	message : 'Invalid Request'
};
/**
 * Resource not found
 * @type {{code: number, message: string}}
 */
JsonRpcError.E_RESOURCE_NOT_FOUND = {
	code : 'E_RESOURCE_NOT_FOUND',
	message : 'Resource not found'
};
/**
 * Method not found
 * @type {{code: number, message: string}}
 */
JsonRpcError.E_METHOD_NOT_FOUND = {
	code : 'E_METHOD_NOT_FOUND',
	message : 'Method not found'
};
/**
 * Invalid params
 * @type {{code: number, message: string}}
 */
JsonRpcError.E_INVALID_PARAMS = {
	code : 'E_INVALID_PARAMS',
	message : 'Invalid params'
};
/**
 * Internal error
 * @type {{code: number, message: string}}
 */
JsonRpcError.E_INTERNAL = {
	code : 'E_INTERNAL',
	message : 'Internal error'
};
module.exports = JsonRpcError;