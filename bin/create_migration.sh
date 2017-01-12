#!/bin/sh
source bin/env.sh

if [ $# -eq 0 ]
  then
    echo "Please add a migration name"
  else
    knex migrate:make "$1"
fi