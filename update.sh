#!/usr/bin/zsh
#Input : commit message

git add --all
git commit -m $1
echo
git push -u origin master