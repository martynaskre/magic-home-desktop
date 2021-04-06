#!/bin/bash

version=${1?Error: Pass new version}
currentVersion=$(node -p "require('./package.json').version")
branch=$(git branch --show-current)

if [[ "$version" == "$currentVersion" ]]
then
  if [[ "$branch" == "master" ]]
  then
    git merge origin "$version"
    git commit -am v"$version"
    git tag v"$version"
    git push -u origin master && git push -u origin master --tags
  fi
else
  echo "Mismatch between provided versions. Current version: "$currentVersion", release version: "$version
fi

