#!/bin/bash

git reset --hard

git pull origin main

rm -r public

mkdir public

cd public

mkdir audio img video

cd audio

mkdir reels

cd ..

cd img

mkdir categories sections testimonials themes

cd ..

cd video

mkdir reels

cd ..

cd ..

npm run destroy

npm run up

sleep 3

npm run migrate

npm run seed