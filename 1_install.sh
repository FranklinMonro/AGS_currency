#!/bin/sh

. ./0_variables.sh

echo -e "$On_Red $(pwd) $NC"

if [[ "$PWD" != *":$(pwd)/web:"* ]]; then
  echo -e "$On_Green GO TO DIRECTORY $(pwd)/web $NC"
  cd web
fi

echo -e "$On_Red $(pwd) $NC"
echo -e "$On_Yellow INSTALL WEB $NC"

npm install

cd ..

echo -e "$On_Red $(pwd) $NC"

if [[ "$PWD" != *":$(pwd)/api:"* ]]; then
  echo -e "$On_Green GO TO DIRECTORY $(pwd)/api $NC"
  cd api
fi

echo -e "$On_Red $(pwd) $NC"
echo -e "$On_Yellow INSTALL API $NC"

npm install

cd ..

echo -e "$On_Red $(pwd) $NC"

exit


