#!/bin/bash
echo "Starting deployment to NetSuite..."

suitecloud project:deploy

if [ $? -eq 0 ]; then
  echo "Deployment completed successfully! Script and deployment records created/updated in NetSuite."
else
  echo "Deployment failed. Check logs for errors."
fi
