#!/bin/sh

. ./0_variables.sh

echo -e "$On_Red $(pwd) $NC"

if [[ "$PWD" != *":$(pwd)/api:"* ]]; then
  echo -e "$On_Green GO TO DIRECTORY $(pwd)/api $NC"
  cd api
fi

echo -e "$On_Red $(pwd) $NC"
echo -e "$On_Blue RUN API $NC"

npm run dev