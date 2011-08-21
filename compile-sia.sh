#!/bin/sh

BASE_DIR="/home/duane/sia"
export ANT_HOME=/home/duane/ant
export JAVA_HOME=/home/duane/java
export PATH=${ANT_HOME}/bin:${JAVA_HOME}/bin:$PATH

if [ -f "$1.docbook" ]
then

# Temporarily remove the instructor tags, so docbook2scorm can compile the scorm package
sed '/instructor;\[/,/\]\]>/d' $1.docbook > $1-nocomment.docbook


# Docbook2scorm
rm -rf /home/duane/docbook2scorm/sample/resources/images
rm -f /home/duane/docbook2scorm/sample/src/$1-nocomment.docbook
rm -f /home/duane/docbook2scorm/sample/package.zip
# cd ../
cp -rp images/ /home/duane/docbook2scorm/sample/resources/
cp -rp $1-nocomment.docbook /home/duane/docbook2scorm/sample/src/
cd /home/duane/docbook2scorm/
ant -DscormVersion=12 -DdocbookSrc=sample/src/$1-nocomment.docbook -DpackageFile=sample/package.zip -DresourcesDir=sample/resources

	if [ -f "/home/duane/docbook2scorm/sample/package.zip" ]
	then

		cp /home/duane/docbook2scorm/sample/package.zip ${BASE_DIR}/$1.zip

	else

			echo "The package file does not exist."

	fi
else
 
	echo "This is not a regular file"

fi
