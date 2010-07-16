/*
 * @(#)htmltree.js 1.0  2007-06-14
 *
 * Copyright (c) 2007 Werner Randelshofer
 * Hausmatt 10, Immensee, CH-6405, Switzerland
 * All rights reserved.
 *
 * The copyright of this software is owned by Werner Randelshofer. 
 * You may not use, copy or modify this software, except in  
 * accordance with the license agreement you entered into with  
 * Werner Randelshofer. For details see accompanying license terms. 
 */

/**
 * This file contains constructors for the following object:
 * - htmltree
 * 
 * htmltree can be used to turn a nested structure of <ul> and <li> elements
 * into a DHTML tree which can be collapsed and expanded by clicking on a 
 * [-] and a [+] icon.
 * 
 * Usage:
 *
 * 1. Create a HTML document with a body content similar to this one:
 *
 * <div id="mytree">
 * <ul>
 *   <li>A</li>
 *   <li>B<ul>
 *		 <li>B.1</li>
 *		 <li>B.2</li>
 *   </ul></li>
 *   <li class="exp">C<ul>
 *		 <li>C.1</li>
 *		 <li>C.2</li>
 *    </ul></li>
 * </ul>
 * </div>
 * 
 * Note: if you leave class='coll' away from <li> "C", then this tree
 * nodes will be collapsed in the beginning.
 *
 * Note: If you want to render tree lines, it is important that there
 * are no elements between </ul> and </li> at the end of a nested list.
 *
 * 2. Create a CSS document with a content similar to this one:
 *
 * 	2.a CSS when using an icon image:
 * 		#mytree ul {
 *			list-style-type: none;	
 * 		}
 * 		#mytree .coll ul {
 *			display: none;	
 * 		}
 * 		.minus {
 *      	margin-left: 20px;
 *      	background-image: minus.gif;
 *      	background-repeat: no-repeat;
 * 		}
 * 		.plus {
 *      	margin-left: 20px;
 *      	background-image: plus.gif;
 *      	background-repeat: no-repeat;
 * 		}
 *
 * 2.b CSS without icon image:
 * 		#mytree ul {
 *			list-style-type: none;	
 *			margin-left: 0;
 *			padding-left: 0;
 * 		}
 * 		#mytree .coll ul {
 *			display: none;	
 * 		}
 *		.minus, .plus, .leaf {
 *			background-repeat: no-repeat;
 *			padding-left: 16px;
 *			background-position: 0 4px;
 *		}
 * 		.minus {
 *			background-image: url(minus.gif);
 * 		}
 * 		.plus {
 *			background-image: url(plus.gif);
 * 		}
 * 		.leaf {
 *			background-image: url(leaf.gif);
 * 		}
 *
 * 	2.b CSS when using an icon image, and spans for rendering tree lines:
 * 		#mytree ul {
 *			list-style-type: none;	
 *          margin-left: 0px;
 *          padding-left: 0px;
 * 		}
 * 		#mytree .coll ul {
 *			display: none;	
 * 		}
 * 		.minus {
 *      	margin-left: 20px;
 *      	background-image: minus.gif;
 *      	background-repeat: no-repeat;
 * 		}
 * 		.plus {
 *      	margin-left: 20px;
 *      	background-image: plus.gif;
 *      	background-repeat: no-repeat;
 * 		}
 *      .nl, .vl, .el, .bl {
 *          padding-left: 20px;
 *			background-repeat: repeat-y;
 *			background-position: 4px 0px;
 *			overflow: hidden;
 *       }
 *       .vl {
 *			background-image: url(verticalLine.gif);
 *		}
 *		.bl {
 *			background-image: url(branchLine.gif);
 * 		}
 * 		.el {
 *			background-image: url(elbowLine.gif);
 *		}
 *
 * 3. Create an image for the [+] symbol to be shown for collapsed nodes,
 *    and an image for the [-] symbol to be shown for expanded nodes.
 * 
 * 4. Create the htmltree object, and initialize it using the following code:
 *
 * var t = new HTMLTree();
 * t.expandedClass = "exp";
 * t.collapsedClass = "coll";
 * t.leafClass = "leaf";
 * t.expandedImage = "minus.gif";
 * t.collapsedImage = "plus.gif";
 * t.leafImage = "leaf.gif";
 * t.noLineClass = "nl";
 * t.verticalLineClass = "vl";
 * t.elbowLineClass = "el";
 * t.branchLineClass = "bl";
 * t.treediv = document.getElementById("mytree");
 * t.init();
 *
 * Note: You can set expandedImage, collapsedImage and leafImage to null, 
 * if you don't want an <img> element to be inserted.
 * Note: You can set verticalLineClass, branchLineClass, elbowLineClass, noLineClass to null, 
 * if you don't want <span> elements to be inserted.
 *
 * 5. The function initTree adds <img> tags to each <li> element, which
 * has a <ul> element as a child. It sets the collapsedClass, if the
 * <li> element does not has the expandedClass. It adds a mouseclick 
 * listener on the <img> element, which is used to toggle the expanded
 * state of the tree. The resulting HTML structure looks like this:
 *
 * <div id="mytree">
 * <ul>
 *   <li class="leaf">A</li>
 *   <li class="coll"><span class="bl">&nbsp;</span><img src="plus.gif">B<ul>
 *		 <li class="leaf"><span class="vl">&nbsp;</span><span class="bl">&nbsp;</span><img src="leaf.gif">B.1</li>
 *		 <li class="leaf"><span class="vl">&nbsp;</span><span class="el">&nbsp;</span><img src="leaf.gif">B.2</li>
 *   </ul></li>
 *   <li class="exp"><span class="el">&nbsp;</span><img src="minus.gif">C<ul>
 *		 <li class="leaf"><span class="nl">&nbsp;</span><span class="bl">&nbsp;</span>C.1</li>
 *		 <li class="leaf"><span class="nl">&nbsp;</span><span class="el">&nbsp;</span>C.2</li>
 *   </ul></li>
 * </ul>
 * </div>
 * 
 */
var debug = true;

/**
 * This is the constructor for the HTMLTree object.
 */
function HTMLTree() {
	// The <div> element which contains the tree.
 	this.treediv = null;
	
	// HTML Classes for the <li> element which represent tree nodes.
  	this.expandedClass = "exp";
 	this.collapsedClass = "coll";
	this.leafClass = "leaf";
	
	// Image URL's for the <img> elements which are used to display the [+] and [-] icons. 
	// Set these to null, if you don't want <img> elements to be inserted.
 	this.expandedImage = "minus.gif";
 	this.collapsedImage = "plus.gif";
	this.leafImage = "leaf.gif";
	this.imageClass = null;

	// HTML classes for the <span> elements which are used to display tree lines. 
	// Set these to null, if you don't want <span> elements to be inserted.
	this.verticalLineClass = null;
	this.branchLineClass = null;
	this.elbowLineClass = null;
	this.noLineClass = null;
	
	// You can register here a function which is called, when a 
	// tree element has been expanded.
	// the <li> which was expanded is passed as a parameter.
	this.elementExpanded = null;
	
	// You can register here a function which is called, when a 
	// tree element has been collapsed.
	// the <li> which was expanded is passed as a parameter.
	this.elementCollapsed = null;
}
/**
 * Initializes the HTML tree.
 */
HTMLTree.prototype.init = function() {
	if (this.treediv == null) {
		alert("HTMLTree_init: variable this.treediv is null, it should contain a <div> element");
	}
	this.initHTMLElements(this.treediv, new Array());
}

/**
 * Recursively initializes the HTML elements of the tree.
 *
 * @param elem A HTML element inside of the <div> element which contains the tree
 * @param path This variable contains an array with all the <li> elements we encountered 
 *   on our way down to the current element.
 */
HTMLTree.prototype.initHTMLElements = function(elem, path) {
	if (elem.tagName != null && elem.tagName.toLowerCase() == "li") {
		path = path.concat(elem);
		this.initLiElement(elem, path);
	}

	if (elem.childNodes != null) {
		for (var i = 0; i < elem.childNodes.length; i++) {
			this.initHTMLElements(elem.childNodes[i], path);
		}
	}
}
/**
 * Initializes a <li> element of the tree.
 *
 * @param elem A <li> element inside of the <div> element which contains the tree
 * @param path This variable contains an array with all the <li> elements we encountered 
 *   on our way down to the current element.
 */
HTMLTree.prototype.initLiElement = function(elem, path) {
	// determine whether the element is a leaf-element or a composite element
	var isLeaf = true;
        var i;
	if (elem.childNodes != null) {
		for (i = 0; i < elem.childNodes.length; i++) {
			if (elem.childNodes[i].tagName != null && 
					elem.childNodes[i].tagName.toLowerCase() == 'ul') {
				isLeaf = false;
				break;
			}
		}
	}

        var img;
	if (isLeaf)	{
		if (this.leafImage != null) {
			// inject img tag
			img = document.createElement("img");
			img.setAttribute("src", this.leafImage);
			elem.insertBefore(img, elem.firstChild);
		}
		if (this.leafClass != null) {
			elem.className = this.leafClass;
		}
	} else {
		// initialze class of the composite element
		var isExpanded;
		if (elem.className != this.expandedClass) {
			elem.className = this.collapsedClass;
			isExpanded = false;
		} else {
			isExpanded = true;
		}
		
		var self = this;
		if (this.collapsedImage != null) {
			// inject img tag
			img = document.createElement("img");
			img.setAttribute("src", (isExpanded) ? this.expandedImage : this.collapsedImage);
			if (this.imageClass != null) {
				img.className = this.imageClass;
			}
			img.onclick = function(evt) { self.handleClick(evt, elem); };
			elem.insertBefore(img, elem.firstChild);
		} else {
			elem.onclick = function(evt) { self.handleClick(evt, elem); };
		}
	}
	
	for (i=path.length - 1; i >= 1; i--) {
		var parent = path[i];
		var span = null;
		var lastChild = parent.parentNode.lastChild;
		while (lastChild.tagName == null) {
			lastChild = lastChild.previousSibling;
		}
		if (i == path.length - 1) {
			if (parent == lastChild && this.elbowLineClass != null) {
				span = document.createElement("span");
				span.className = this.elbowLineClass;
			} else if (this.branchLineClass != null) {
				span = document.createElement("span");
				span.className = this.branchLineClass;
			}
		} else {
			if (parent == lastChild && this.noLineClass != null) {
				span = document.createElement("span");
				span.className = this.noLineClass;
			} else if (this.verticalLineClass != null) {
				span = document.createElement("span");
				span.className = this.verticalLineClass;
			}
		}
		if (span != null) {
			span.innerHTML = "&nbsp;";
			elem.insertBefore(span, elem.firstChild);
		}
	}

}
/**
 * Handles a click event on the specified element.
 *
 * @param evt The Event-Object.
 * @param elem A <li> element.
 */
HTMLTree.prototype.handleClick = function(evt, elem) {
	var target;
	if (evt == null) {
		// special treatment for IE
		evt = window.event;
		evt.cancelBubble = true;
		target = evt.srcElement;
	} else {
		evt.stopPropagation();
		target = evt.target;
	}
	if (target == elem || this.expandedImage != null) {
		if (evt.ctrlKey || evt.altKey || evt.shiftKey) {
			// toggle all nodes when a modifier key is pressed
			if (this.isExpanded(elem)) {
				this.collapseAll(elem);
			} else {
				this.expandAll(elem);
			}
		} else { 
			// toggle a single node when a 
			this.toggle(elem);
		}
	}
}
/**
 * Returns true if the specified list element is expanded.
 *
 * @param elem A <li> element.
 */
HTMLTree.prototype.isExpanded = function(elem) {
	return elem.className == this.expandedClass;
}
/**
 * Toggles the expanded state of an element.
 *
 * @param elem The <li> element which needs to be expanded or collapsed.
 */
HTMLTree.prototype.toggle = function(elem) {
	if (this.isExpanded(elem)) {
		this.collapse(elem);
	} else {
		this.expand(elem);
	}
}
/**
 * Collapses an element.
 *
 * @param elem The <li> element which needs to be collapsed.
 */
HTMLTree.prototype.collapse = function(elem) {
	elem.className = this.collapsedClass;
	if (this.collapsedImage != null) {
		var img = elem.firstChild;
		while (img.tagName == null || img.tagName.toLowerCase() != 'img') {
			img = img.nextSibling;
		}
		img.setAttribute("src", this.collapsedImage);
	}
	if (this.elementCollapsed != null) {
		this.elementCollapsed(elem);
	}
}
/**
 * Expands an element.
 *
 * @param elem The <li> element which needs to be expanded.
 */
HTMLTree.prototype.expand = function(elem) {
	elem.className = this.expandedClass;
	if (this.expandedImage != null) {
		var img = elem.firstChild;
		while (img.tagName == null || img.tagName.toLowerCase() != 'img') {
			img = img.nextSibling;
		}
		img.setAttribute("src", this.expandedImage);
	}
	if (this.elementExpanded != null) {
		this.elementExpanded(elem);
	}
}

/**
 * Recursively collapses all elements.
 *
 * @param elem The <li> where collapsing starts, specifying null collapses
 * the whole tree. 
 */
HTMLTree.prototype.collapseAll = function(elem) {
	if (elem == null) {
		elem = this.treediv;
	}
	
	if (elem.tagName != null && 
			elem.tagName.toLowerCase() == "li" && 
			elem.className == this.expandedClass) {
		this.collapse(elem);
	}
	
	if (elem.childNodes != null) {
		for (var i = 0; i < elem.childNodes.length; i++) {
			this.collapseAll(elem.childNodes[i]);
		}
	}
}
/**
 * Recursively expands all elements.
 *
 * @param elem The <li> where expansion starts, specifying null expands
 * the whole tree. 
 */
HTMLTree.prototype.expandAll = function(elem) {
	if (elem == null) {
		elem = this.treediv;
	}
	
	if (elem.tagName != null && 
			elem.tagName.toLowerCase() == "li" && 
			elem.className == this.collapsedClass) {
		this.expand(elem);
	}
	
	if (elem.childNodes != null) {
		for (var i = 0; i < elem.childNodes.length; i++) {
			this.expandAll(elem.childNodes[i]);
		}
	}
}


//if (debug) alert('HTMLTree');
