#!/usr/bin/zsh
#Input : commit message
echo "\tMinifying files:\n"
yui-compressor -v -o script-min.js script.js
yui-compressor -v -o stylesheet-min.css stylesheet.css
echo "\n\tCommiting to git:\n"
git add --all
git commit -m $1
echo  #this is just for formatting
git push -u origin master