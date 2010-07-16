/*
 * @(#)sco_stub.js 2.0  2008-10-14
 *
 * Copyright (c) 2003-2008 Werner Randelshofer
 * Hausmatt 10, Immensee, CH-6405, Switzerland
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of 
 * Werner Randelshofer. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Werner Randelshofer.
 *
 */ 
/**
 * This file contains a stub for a Sharable Content Object (SCO) that complies
 * to the Sharable Content Object Reference Model (SCORM) 1.2 specification.  
 *
 * This file is intended to be included in each SCO.
 *
 * The stub is a JavaScript object named "stub". The stub object provides access
 * the following Learning Management System (LMS) API's: 
 *   LMSGetValue
 *   LMSSetValue
 *   LMSCommit
 *   LMSGetLastError
 *   LMSGetErrorString
 *   LMSGetDiagnostic
 *
 * If the stub is embedded correctly into a HTML file, it automatically calls
 * the following LMS API's. An SCO should never call these operations
 * on the stub directly. 
 *   LMSInitialize
 *   LMSFinish
 *
 * To example below shows how the stub must be embedded into a HTML file:
 * An SCO must call stub.initialize upon loading of the page and
 * must call stub.abnormalExit when the page is unloaded.
 *
 * Example:
 * <html>
 *   <head>
 *     <script language="JavaScript" src="sco_scripts/sco_stub.js" type="text/JavaScript"></script>
 *     <script type="text/javascript">stub.initialize();</script>
 *   </head>
 *   <body onunload="return stub.abnormalExit()">
 *   </body>
 * </html>
 *
 * Reference:
 * ADL (2001). Advanced Distributed Learning.
 * Sharable Content Object Reference Model (SCORM) Version 1.2. 
 * Internet (2003-01-20): http://www.adlnet.org
 *
 * @author Werner Randelshofer, Hausmatt 10, Immensee, CH-6405, Switzerland
 * @version 2.0 2008-10-13 Rewritten.
 * 1.1 2006-02-02 Revised. 
 * 1.0 2003-08-21 Do not print an alert if the LMS can not be found.
 * 0.1 2003-01-21 Created.
 */

/**
 * This is the constructor for a LMS stub.
 */
function LMSStub() {
  // Define exception/error codes
  this.NO_ERROR = "0";
  this.ERROR_GENERAL = "101";
  this.ERROR_INVALID_ARGUMENT = "201";
  this.ERROR_ELEMENT_CANNOT_HAVE_CHILDREN = "202";
  this.ERROR_ELEMENT_IS_NOT_AN_ARRAY = "203";
  this.ERROR_NOT_INITIALIZED = "301";
  this.ERROR_NOT_IMPLEMENTED = "401";
  this.ERROR_INVALID_SET_VALUE = "402";
  this.ERROR_ELEMENT_IS_READ_ONLY = "403";
  this.ERROR_ELEMENT_IS_WRITE_ONLY = "404";
  this.ERROR_INCORRECT_DATA_TYPE = "405";

  // the state of the Stub
  this.STATE_NOT_INITIALIZED = 0;
  this.STATE_INITIALIZED = 1;
  this.STATE_FINISHED = 2;
  this.state = this.STATE_NOT_INITIALIZED;

  // page scoped variable definitions
  this.theAPI = null;
  this.findAPITries = 0;

  // set this to true to turn debugging on
  this.debug = false;  
  this.debugResults = this.debug; 
  this.debugFailures = false; 
}
/**
 * Initialize communication with LMS by calling the LMSInitialize
 * function which will be implemented by the LMS.
 *
 * @return Returns true if the initialization was successful, or
 * false if the initialization failed.
 */
LMSStub.prototype.initialize = function() {
	return this.LMSInitialize();
}
/**
 * Initialize communication with LMS by calling the LMSInitialize
 * function which will be implemented by the LMS.
 *
 * @return Returns true if the initialization was successful, or
 * false if the initialization failed.
 */
LMSStub.prototype.LMSInitialize = function() {
  if (this.debug) alert("stub.LMSInitialize()");
	 
  var api = this.getAPI();
  if (api == null) {
     return false;
  }
	 
	if (this.state == this.STATE_NOT_INITIALIZED) {
  	var success = api.LMSInitialize("") == "true";
		this.state = (success) ? this.STATE_INITIALIZED : this.STATE_FINISHED;
	  if (this.debugResults) alert("stub.LMSInitialize():"+success);
		return success;
	} else { 
	  if (this.debugResults || this.debugFailures) alert("stub.LMSInitialize():false reason:state="+this.state);
   	return false;
	}
}


/**
 * Close communication with LMS by calling the LMSFinish
 * function which will be implemented by the LMS.
 *
 * @return Returns true if successful, false if failed.
 */
LMSStub.prototype.LMSFinish = function() {
   if (this.debug) alert("stub.LMSFinish()");

   var api = this.getAPI();
   if (api == null) {
	   return false;
	 }
	 
	if (this.state == this.STATE_INITIALIZED) {
  	var success = api.LMSFinish("") == "true";
		this.state = this.STATE_FINISHED;
	  if (this.debugResults) alert("stub.LMSFinish():"+success);
		return success;
	} else { 
	  if (this.debugResults || this.debugFailures) alert("stub.LMSFinish():false reason:state="+this.state);
   	return false;
	}
}

/**
 * Wraps the call to the LMS LMSGetValue method
 *
 * @param  key  String representing the cmi data model defined category or
 *             element (e.g. cmi.core.student_id)
 *
 * @return The value presently assigned by the LMS to the cmi data model
 *       element defined by the element or category identified by the name
 *       input value.
 */
LMSStub.prototype.LMSGetValue = function(key) {
   if (this.debug) alert("stub.LMSGetValue("+key+")");

   var api = this.getAPI();
   if (api == null) {
      return "";
   }
	 
	if (this.state == this.STATE_INITIALIZED) {
   	var value = api.LMSGetValue(key);
	  if (this.debugResults) alert("stub.LMSGetValue("+key+"):"+value);
		return value;
	} else { 
	  if (this.debugResults || this.debugFailures) alert("stub.LMSGetValue("+key+"):'' reason:state="+this.state);
   	return "";
	}
}


/**
 * Wraps the call to the LMS LMSSetValue function.
 *
 * @param key String representing the data model defined category or element.
 * @param value The value that the named element or category will be assigned.
 *
 * @return Returns true if successful, false if failed.
 */
LMSStub.prototype.LMSSetValue = function(key, value) {
   if (this.debug) alert("stub.LMSSetValue("+key+","+value+")");

   var api = this.getAPI();
   if (api == null) {
      return false;
   }
	 
	if (this.state == this.STATE_INITIALIZED) {
   	var success = api.LMSSetValue(key, value) == "true";
	  if (this.debugResults) alert("stub.LMSSetValue("+key+","+value+"):"+success);
		return success;
	} else { 
	  if (this.debugResults || this.debugFailures) alert("stub.LMSSetValue("+key+","+value+"):false reason:state="+this.state);
   	return false;
	}
}

/**
 * Calls the LMSCommit function.
 *
 * @return Returns true if successful, false if failed.
 */
LMSStub.prototype.LMSCommit = function() {
   if (this.debug) alert("stub.LMSCommit()");

   var api = this.getAPI();
   if (api == null) {
      return false;
   }
	 
	if (this.state == this.STATE_INITIALIZED) {
   	var success = api.LMSCommit("") == "true";
	  if (this.debugResults) alert("stub.LMSCommit():"+success);
		return success;
	} else { 
	  if (this.debugResults || this.debugFailures) alert("stub.LMSCommit():false reason:state="+this.state);
   	return false;
	}
}


/**
 * Returns the error code that was set by the last LMS function call as an integer number.
 */
LMSStub.prototype.LMSGetLastError = function() {
   if (this.debug) alert("stub.LMSGetLastError()");

   var api = this.getAPI();
   if (api == null) {
      return this.ERROR_GENERAL;
   }
	 
   var result = api.LMSGetLastError().toString();
   if (this.debugResults) alert("stub.LMSGetLastError():"+result);
	 return result;
}

/**
 * Calls the LMSGetErrorString function
 * @param errorCode A String representing an error code.
 * @return The textual description that corresponds to the input error code.
 */
LMSStub.prototype.LMSGetErrorString = function(errorCode) {
   if (this.debug) alert("stub.LMSGetErrorString("+errorCode+")");

   var api = this.getAPI();
   if (api == null) {
      return "General Exception";
   }
	 
	 var result = api.LMSGetErrorString(errorCode).toString();
   if (this.debugResults) alert("stub.LMSgetErrorString("+errorCode+"):"+result);
   return result;
}

/**
 * Calls the LMSGetDiagnostic function.
 *
 * @param  errorCode - Error Code(String), or null
 * @return The vendor specific textual description that corresponds to the
 *         input error code
 */
LMSStub.prototype.LMSGetDiagnostic = function(errorCode) {
   if (this.debug) alert("stub.LMSGetDiagnostic("+errorCode+")");

   var api = this.getAPI();
   if (api == null) {
      return "LMS API not found";
   }
	 
  var result = api.LMSGetDiagnostic(errorCode).toString();
  if (this.debugResults) alert("stub.LMSGetDiagnostic("+errorCode+"):"+result);
	return result;
}


/**
 * This function looks for an object named API in parent and opener windows.
 *
 * @param win A Window Object.
 * @return If an API object is found, it's returned, otherwise null is returned
 */
LMSStub.prototype._findAPI = function(win) {
  if (this.debug) alert("stub.findAPI("+win+")");

   while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (++this.findAPITries > 7) {
         if (this.debugFailures) alert("Error finding LMS API -- too deeply nested.");
         return null;
      }

      win = win.parent;
   }
   return win.API;
}


/**
 * This function looks for an object named API, first in the current window's
 * frame hierarchy and then, if necessary, in the current window's opener window
 * hierarchy (if there is an opener window).
 *
 * @return If an API object is found, it's returned, otherwise null is returned.
 */
LMSStub.prototype.getAPI = function() {
   if (this.debug) alert("stub.getAPI()");
	
   if (this.theAPI != null) return this.theAPI;
	 
   this.theAPI = this._findAPI(window);
   if ((this.theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
      this.theAPI = this._findAPI(window.opener);
   }
   if (this.theAPI == null) {
      if (this.debugFailures) alert("Unable to find an API adapter for the Learning Management System.");
   }
   return this.theAPI;
}

/**
 * This function returns the current date in CMIDate format.
 * @return Current Date in CMIDate format.
 */
LMSStub.prototype.getCMICurrentDate = function() {
  if (this.debug) alert("stub.getCMICurrentDate()");
   var todayDate = new Date();

   var theMonth = todayDate.getMonth();
   theMonth++;   // the month is zero based
   if(theMonth < 10) {
      theMonth = "0" + theMonth;
   }

   var theDay = todayDate.getDate();
   if(theDay < 10) {
      theDay = "0" + theDay;
   }
   var cmiDateToday = todayDate.getYear() + "/";
   cmiDateToday += theMonth + "/";
   cmiDateToday += theDay;

   return cmiDateToday;
}

/**
 * Converts totalTime to seconds, with the tenths and hundreds of
 * inputted seconds returned as the decimal portion of the return.
 *
 * @param totalTime Value of cmi.core.total_time in the calling fuction
 * @return Value in Milliseconds,
 */
LMSStub.prototype.totalTimeToMillis = function(totalTime) {
  if (this.debug) alert("stub.totalTimeToMillis()");
   var lTotalTime = 0.0;
   var numArray;
   var hourVal, minVal, secVal;

   numArray = totalTime.split(":");
   hourVal = parseFloat(numArray[0]);
   hourVal *= 3600; //3600 equals 60 times 60 (hours times minutes)

   minVal = parseFloat(numArray[1]);
   minVal *= 60;

   secVal = parseFloat(numArray[2]);

   lTotalTime = hourVal + minVal + secVal;

   return lTotalTime;
}

/**
 * Makes the appropriate calls for a normal exit calling LMSFinish and
 * setting cmi.core.exit to "" for a normal exit
 */
LMSStub.prototype.normalExit = function() {
  if (this.debug) alert("stub.normalExit()");
  // do not call a set after finish was called
  if (this.state == this.STATE_INITIALIZED) {
    this.LMSSetValue( "cmi.core.exit", "" );
    this.LMSFinish();
  }
}

/**
 * Makes the appropriate calls for an abnormal exit calling LMSFinish
 * and setting cmi.core.exit to suspend.
 *
 * It is recommended as a best practice to supply an onunload event handler 
 * at the body tag to accommodate situations in which content is abnormally
 * closed (e.g., user closes window). This is a error-handling practice to
 * ensure that LMSFinish() is called if the user exits in an unpredictable
 * manner (such as not logging out of the LMS properly). The onunload also
 * will be called on a normal exit.
 * Example:
 * <body onunload="return abnormalExit()">
 */
LMSStub.prototype.abnormalExit = function() {
  if (this.debug) alert("stub.abnormalExit()");
  // do not call a set after finish was called
  if (this.state == this.STATE_INITIALIZED) {
    this.LMSSetValue( "cmi.core.exit", "suspend" );
    this.LMSFinish();
  }
}
/**
 * Makes the appropriate calls for a logout exit calling LMSFinish and
 * setting cmi.core.exit to "logut" for a logout.
 */
LMSStub.prototype.logoutExit = function() {
  if (this.debug) alert("stub.logoutExit()");
  // do not call a set after finish was called
  if (this.state == this.STATE_INITIALIZED) {
    this.LMSSetValue( "cmi.core.exit", "logout" );
    this.LMSFinish();
  }
}

/**
 * The stub variable is the only thing of the stub that may be accessed from the SCO.
 */
var stub = new LMSStub();
