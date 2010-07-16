/*
 * @(#)Cookies.js 2.0  2008-10-27
 *
 * Copyright (c) 2003-2008 Werner Randelshofer
 * Hausmatt 10, Immensee, CH-6405, Switzerland
 * All rights reserved.
 *
 * The copyright of this software is owned by Werner Randelshofer. 
 * You may not use, copy or modify this software, except in  
 * accordance with the license agreement you entered into with  
 * Werner Randelshofer. For details see accompanying license terms. 
 */

/**
 * This file contains functions for cookie access.
 *
 * This file is intended to be included in the head of a HTML document.
 *
 * Example:
 * <html>
 *   <head>
 *     <title>Learning Management System</title>
 *     <script language="JavaScript" src="ListLogger.js" type="text/JavaScript"></script>
 *     <script language="JavaScript" src="Collections.js" type="text/JavaScript"></script>
 *     <script language="JavaScript" src="Cookies.js" type="text/JavaScript"></script>
 *   </head>
 * </html>
 *
 *
 * @author Werner Randelshofer, Hausmatt 10, Immensee, CH-6405, Switzerland
 * @version 2.0 2008-10-27 Rewritten.
 * 0.1 2003-01-21 Created.
 */

/**
 * This is the constructor for a Cookies singleton.
 */
function Cookies() {
    
}

/**
 * Sets cookie values for the specified document. Expiration date is optional.
 * @param doc A document.
 * @param name A String.
 * @param value A String.
 * @param expire A Date.
 */
Cookies.prototype.setCookieForDocument = function(doc, name, value, expire) {
  	LoggerSingleton.write(LoggerSingleton.INTERNAL,"cookies.js setCookieForDocument("+doc+","+name+","+value+","+expire+")");
  doc.cookie = name + "=" + escape(value)
  + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()))

}
/**
 * Sets cookie values for the current document. Expiration date is optional.
 * @param name A String.
 * @param value A String.
 * @param expire A Date.
 */
Cookies.prototype.setCookie = function(name, value, expire) {
  this.setCookieForDocument(document, name, value, expire);
}

/**
 * Gets a cookie value from the specified document, given the name of the cookie.
 *
 * @param doc A document.
 * @param name A String. 
 * @return Returns the value of the cookie or null, if the cookie was not found.
 */
Cookies.prototype.getCookieFromDocument = function(doc, name) {
  LoggerSingleton.write(LoggerSingleton.INTERNAL,"cookies.js getCookieFromDocument("+doc+","+name+")");
  var search = name + "="
  if (doc.cookie.length > 0) {
		// if there are any cookies
    var offset = doc.cookie.indexOf(search)
    if (offset != -1) {
		  // if cookie exists
      offset += search.length

      // set index of beginning of value
      var end = doc.cookie.indexOf(";", offset)

      // set index of end of cookie value
      if (end == -1)
        end = doc.cookie.length;
      var value = unescape(doc.cookie.substring(offset, end));
  	LoggerSingleton.write(LoggerSingleton.INTERNAL_SUCCESS,"cookies.js getCookieFromDocument("+doc+","+name+") value="+value);
	  return value;
    }
  }
  	LoggerSingleton.write(LoggerSingleton.INTERNAL_FAILURE,"cookies.js getCookieFromDocument("+doc+","+name+") no cookie found!");
  return null;
}

/**
 * Gets a cookie value from the current document, given the name of the cookie.
 * @param name A String.
 * @return Returns the value of the cookie or null, if the cookie was not found.
 */
Cookies.prototype.getCookie = function(name) {
  LoggerSingleton.write(LoggerSingleton.INTERNAL,"cookies.js getCookie("+name+")");
  return this.getCookieFromDocument(document, name);
}

var CookiesSingleton = new Cookies();
