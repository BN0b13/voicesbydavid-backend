#!/bin/bash

git reset --hard

git pull origin main

rm -r public

mkdir public

cd public

mkdir img video

cd img

mkdir categories icons products themes welcome

cd ..

cd ..

npm run destroy

npm run up

sleep 3

npm run migrate

npm run seed