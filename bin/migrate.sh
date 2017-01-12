#!/bin/sh
source bin/env.sh

if [ $# -eq 0 ]
  then 
    echo "Please provide an type of migration"
  elif [ "$1" == "rollback" ]
    then 
      knex migrate:rollback
  elif [ "$1" == "latest" ]
    then
      knex migrate:latest
  else
    echo "Migration type not recognized"
fi