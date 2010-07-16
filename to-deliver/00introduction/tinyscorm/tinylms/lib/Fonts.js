/*
 * @(#)Fonts.js  2.0.1  2009-09-09
 *
 * Copyright (c) 2003-2009 Werner Randelshofer
 * Hausmatt 10, Immensee, CH-6405, Switzerland
 * All rights reserved.
 *
 * The copyright of this software is owned by Werner Randelshofer. 
 * You may not use, copy or modify this software, except in  
 * accordance with the license agreement you entered into with  
 * Werner Randelshofer. For details see accompanying license terms. 
 */


/**
 * This file contains utility functions related to fonts.
 *
 * @author Werner Randelshofer, Hausmatt 10, Immensee, CH-6405, Switzerland
 * @version 2.0.1 Fixed null pointer exception when calling cropString with
 *                s = null.
 * 2.0 2008-10-27 Rewritten.
 * 0.1 2003-03-26 Created.
 */
var debug = false;

/**
 * This is the constructor for a Fonts singleton.
 */
function Fonts() {
    
}

Fonts.prototype.verdanaWidth = function(aChar) {
  switch (aChar) {
     case 'c':
     case 's':
     case 'z':
       return 10 / 12;
     case 'j':
       return 10 / 18;
     case 'm':
       return 10 / 6;
     case ' ':
     case 'w':
       return 10 / 7.25;
     case 'W':
       return 10 / 6;
     case 'M':
       return 10 / 7;
     case 'A':
     case 'B':
     case 'C':
     case 'K':
     case 'R':
     case 'S':
     case 'V':
     case 'X':
       return 10 / 9;
     case 'D':
     case 'G':
     case 'H':
     case 'N':
     case 'O':
     case 'Q':
     case 'U':
        return 10 / 8;
     case 'F':
     case 'L':
     case 'T':
       return 10 / 11;
     case 'J':
     case 'r':
       return 10 / 13;
     case 'I':
     case 't':
     case 'f':
       return 10 / 16;
     case 'l':
     case 'i':
       return 10 / 24;
     default:
       return 1;
  }
}


/**
 * Crops the string to the specified maximal length.
 * The length is actually a character width unit. The character width
 * is determined by function verdanaWidth.
 * This function deals properly with HTML meta characters (i.e. �).
 * @param s The String to be cropped.
 * @param maxLength the length in character width units. 
 */
Fonts.prototype.cropString = function(s, maxLength) {
  if (s == null) {
      return "";
  }
  
  var cropped = "";
  var count = 0;
  var i;
  for (i = 0; i < s.length && count < maxLength - 3; i++) {
    if (s.charAt(i) == '&') {
      for (; i < s.length && s.charAt(i) != ';'; i++) {
	    cropped += s.charAt(i);
	  }
	  if (i < s.length) cropped += s.charAt(i);
  	} else {
      cropped += s.charAt(i);
	  }
	  count += this.verdanaWidth(s.charAt(i));
  }
  if (s.length - i < 3) cropped += s.substring(i); 
  else cropped += '...';
  return cropped;
}

var FontsSingleton = new Fonts();
