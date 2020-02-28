#!/bin/bash

/usr/local/bin/lpass status > /dev/null

if [ $? -eq 0 ]
then
  echo -n "OK"
else
  echo -n "NOT-LOGGED"
fi
