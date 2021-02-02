#!/bin/sh

echo "Switching to branch master"
git checkout master

echo "Building app"
npm run build

echo "Deploying files to server"
rsync -avP build/ kamble@mamafua-admin.com:/var/www/mamafua-admin.com/
echo "Deployment complete"
