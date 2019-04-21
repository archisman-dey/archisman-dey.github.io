#!/usr/bin/zsh
#Input : commit message
echo "\nCommiting to git:\n"
git add --all
git commit -m $1
echo  #this is just for formatting
git push -u origin master