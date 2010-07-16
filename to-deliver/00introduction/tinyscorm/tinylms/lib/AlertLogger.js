/*
 * @(#)AlertLogger.js 2.0  2008-10-21
 *
 * Copyright (c) 2004-2008 Werner Randelshofer
 * Hausmatt 10, Immensee, CH-6405, Switzerland
 * All rights reserved.
 *
 * The copyright of this software is owned by Werner Randelshofer. 
 * You may not use, copy or modify this software, except in  
 * accordance with the license agreement you entered into with  
 * Werner Randelshofer. For details see accompanying license terms. 
 */ 
 
/**
 * This file provides logging functionality.
 *
 * @author Werner Randelshofer
 * @version 2.0 2008-10-21 Rewrote using prototype functions instead of global 
 * functions. 
 * <br>1.0 2004-06-13 Created.
 */

/**
 * This is the constructor for an AlertLogger object.
 */
function AlertLogger() {
	// the title of the logger
	// Note: This is not used by the alertlogger, but the scriptloggger.js does.
	this.title = "Log";
	/**
	 * Message types.
	 */
	this.MILESTONE = 1;
	this.INFO = 2;
	this.API_FAILURE = 3;
	this.API_SUCCESS = 4;
	this.API = 5;
	this.INTERNAL_FAILURE = 6;
	this.INTERNAL_SUCCESS = 7;
	this.INTERNAL = 8;

	/**
	 * Enables log output for specific types.
	 * Number between 0 and 8. This correspondes more or less with
	 * the message types. In general, The higher the level, 
	 * the more messages are logged.
	 */
	this.level = 0;
}


/**
 * Opens the logger.
 */
AlertLogger.prototype.open = function() {
	// nothing to do
}
/**
 * Closes the logger.
 */
AlertLogger.prototype.close = function() {
	// nothing to do
}

/**
 * Logs a message.
 * 
 * @param type   Type of the message.
 * @param message String The message.
 */
AlertLogger.prototype.write = function(type, message) {
	if (type <= this.level && type > this.INFO) {
		alert(message);
	}
}

/**
 * Create the logger singleton object.
 */
var LoggerSingleton = new AlertLogger();