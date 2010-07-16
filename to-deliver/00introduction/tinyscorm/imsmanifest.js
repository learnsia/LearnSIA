/*
 * @(#)imsmanifest.js 1.9 2010-02-10
 *
 * Copyright (c) 2003-2009 Werner Randelshofer
 * Hausmatt 10, Immensee, CH-6405, Switzerland
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * Werner Randelshofer. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Werner Randelshofer.
 */
/**
 * This file represents the Java Script version of a Content Aggregation Model (CAM).
 *
 * Reference:
 * ADL (2001a). Advanced Distributed Learning.
 * Sharable Content Object Reference Model (SCORM) Version 1.2.
 * Internet (2003-01-20): http://www.adlnet.org
 *
 * ADL (2001b). Advanced Distributed Learning.
 * SCORM 1.2 Runtime Environment.
 * Internet (2003-01-20): http://www.adlnet.org
 *
 * IMPORTANT! This file MUST be plain ASCII.
 * All non-ASCII characters MUST be encoded using HEXADECIMAL HTML entities.
 * Other encodings are not supported and will lead into incorrect display of the
 * labels.
 *
 * @author Werner Randelshofer, Hausmatt 10, Immensee, CH-6405, Switzerland
 * @version 1.9 2010-02-10
 */

// Content Aggregation Model
// -------------------------
API.cam = new ManifestElement("MANIFEST_D2FE2A9DFBAD26840D806C2D2FB924CC","null",
  new OrganizationsElement([
    new OrganizationElement("0","",[
      new ItemElement("1","","2",null,null,[]),
      new ItemElement("3","1. Introduction to Principles of Survivability and Information Assurance","4",null,null,[]),
      new ItemElement("5","2. Reading Assignments","6",null,null,[]),
      new ItemElement("7","3. Topics","8",null,null,[]),
      new ItemElement("9","4. Learning outcomes","a",null,null,[]),
      new ItemElement("b","5. Topics","c",null,null,[]),
      new ItemElement("d","6. SIA Curriculum Goals","e",null,null,[]),
      new ItemElement("f","7. Topics","g",null,null,[]),
      new ItemElement("h","8. Course introduction","i",null,null,[]),
      new ItemElement("j","9. Topics","k",null,null,[]),
      new ItemElement("l","10. The 10 SIA Principles","m",null,null,[]),
      new ItemElement("n","11. Principles of Survivability and Information Assurance","o",null,null,[]),
      new ItemElement("p","12. Principle 1 - Survivability is an enterprise-wide concern","q",null,null,[]),
      new ItemElement("r","13. Principle 2 - Everything is data","s",null,null,[]),
      new ItemElement("t","14. Principle 3 - Not all data is of equal value to an enterprise - risk must be managed","u",null,null,[]),
      new ItemElement("v","15. Principle 4 - Information assurance policy governs actions","w",null,null,[]),
      new ItemElement("x","16. Principle 5 - Identification of users, computer systems, and network infrastructure components is critical","y",null,null,[]),
      new ItemElement("z","17. Principle 6 - Survivable Functional Units (SFUs) are a helpful way to think about an enterprise's networks","10",null,null,[]),
      new ItemElement("11","18. Principle 7 - Security Knowledge in Practice (SKiP) provides a structured approach","12",null,null,[]),
      new ItemElement("13","19. Principle 8 - The roadmap guides implementation choices (all technology is not equal)","14",null,null,[]),
      new ItemElement("15","20. Principle 9 - Challenge assumptions to understand risk","16",null,null,[]),
      new ItemElement("17","21. Principle 10 - Communication skill is critical to reach all constituencies","18",null,null,[]),
      new ItemElement("19","22. Topics","1a",null,null,[]),
      new ItemElement("1b","23. Evaluation Process","1c",null,null,[]),
      new ItemElement("1d","24. Summary","1e",null,null,[]),
      new ItemElement("1f","25. EXAM","1g",null,null,[])
    ])
  ])
  ,
  new ResourcesElement([
    new ResourceElement("2","resources/index.html"),
    new ResourceElement("4","resources/se1.html"),
    new ResourceElement("6","resources/se2.html"),
    new ResourceElement("8","resources/se3.html"),
    new ResourceElement("a","resources/se4.html"),
    new ResourceElement("c","resources/se5.html"),
    new ResourceElement("e","resources/se6.html"),
    new ResourceElement("g","resources/se7.html"),
    new ResourceElement("i","resources/se8.html"),
    new ResourceElement("k","resources/se9.html"),
    new ResourceElement("m","resources/se10.html"),
    new ResourceElement("o","resources/se11.html"),
    new ResourceElement("q","resources/se12.html"),
    new ResourceElement("s","resources/se13.html"),
    new ResourceElement("u","resources/se14.html"),
    new ResourceElement("w","resources/se15.html"),
    new ResourceElement("y","resources/se16.html"),
    new ResourceElement("10","resources/se17.html"),
    new ResourceElement("12","resources/se18.html"),
    new ResourceElement("14","resources/se19.html"),
    new ResourceElement("16","resources/se20.html"),
    new ResourceElement("18","resources/se21.html"),
    new ResourceElement("1a","resources/se22.html"),
    new ResourceElement("1c","resources/se23.html"),
    new ResourceElement("1e","resources/se24.html"),
    new ResourceElement("1g","resources/se25.html"),
    new ResourceElement("1h","resources/style/style.css"),
    new ResourceElement("1i","resources/images/prin3-logo.jpg"),
    new ResourceElement("1j","resources/images/prin7.jpg"),
    new ResourceElement("1k","resources/images/car_1.jpg"),
    new ResourceElement("1l","resources/images/prin6-logo.jpg"),
    new ResourceElement("1m","resources/images/instruct-begin.jpg"),
    new ResourceElement("1n","resources/images/prin9.jpg"),
    new ResourceElement("1o","resources/images/prin10.jpg"),
    new ResourceElement("1p","resources/images/prin1a.jpg"),
    new ResourceElement("1q","resources/images/review_1.jpg"),
    new ResourceElement("1r","resources/images/attack-sophis.jpg"),
    new ResourceElement("1s","resources/images/unbounded_1.jpg"),
    new ResourceElement("1t","resources/images/review.jpg"),
    new ResourceElement("1u","resources/images/anticipate_1.jpg"),
    new ResourceElement("1v","resources/images/prin5.jpg"),
    new ResourceElement("1w","resources/images/prin5-logo.jpg"),
    new ResourceElement("1x","resources/images/tech-timeouts.jpg"),
    new ResourceElement("1y","resources/images/prin1b.jpg"),
    new ResourceElement("1z","resources/images/image2_1.jpg"),
    new ResourceElement("20","resources/images/prin2.jpg"),
    new ResourceElement("21","resources/images/military_1.jpg"),
    new ResourceElement("22","resources/images/prin1-logo.jpg"),
    new ResourceElement("23","resources/images/postal_1.jpg"),
    new ResourceElement("24","resources/images/instruct-begin.png"),
    new ResourceElement("25","resources/images/secvssuv2_1.jpg"),
    new ResourceElement("26","resources/images/prin4.jpg"),
    new ResourceElement("27","resources/images/secvssuv1_1.jpg"),
    new ResourceElement("28","resources/images/prin9-logo.jpg"),
    new ResourceElement("29","resources/images/prin8-logo.jpg"),
    new ResourceElement("2a","resources/images/prin6.jpg"),
    new ResourceElement("2b","resources/images/webserver-ex.jpg"),
    new ResourceElement("2c","resources/images/survive-define_1.jpg"),
    new ResourceElement("2d","resources/images/prin3.jpg"),
    new ResourceElement("2e","resources/images/syllabus-begin.jpg"),
    new ResourceElement("2f","resources/images/prin4-logo.jpg"),
    new ResourceElement("2g","resources/images/instruct-end.png"),
    new ResourceElement("2h","resources/images/car.jpg"),
    new ResourceElement("2i","resources/images/instruct-end.jpg"),
    new ResourceElement("2j","resources/images/prin10-logo.jpg"),
    new ResourceElement("2k","resources/images/prin2-logo.jpg"),
    new ResourceElement("2l","resources/images/syllabus-end.jpg"),
    new ResourceElement("2m","resources/images/prin8.jpg"),
    new ResourceElement("2n","resources/images/hosts.png"),
    new ResourceElement("2o","resources/images/prin7-logo.jpg"),
    new ResourceElement("2p","resources/images/key_1.jpg")
  ])
);

// LMS Configuration
// -----------------

// Users

var userArray = [
['guest', new User('guest',null,'Guest, Guest')]
];
API.userMap = new Map();
API.userMap.importFromArray(userArray);

// Organization Structure
API.organizationStructure = API.STRUCTURE_HIERARCHICAL;

// Column Headers
API.camColumnNames = null;

// Quiz mode
API.isQuiz = false;

// Sequencing
API.isAutomaticSequencing = true;

// Version info
API.version = '1.9 2010-02-10';

// Use of TinyLMS as a SCORM to SCORM Adapter
API.setSCORMAdapter(false);

// Help out poor IE6 to do its job
API.tocWidth =192;
API.tocHeight = 580;

// Debugging options
API.showBugInfoButton = false;
