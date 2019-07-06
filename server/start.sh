#!/bin/bash
#docker run -it --name tester tester /bin/sh
echo STARTING
docker rm -f $(docker ps -aq) 
docker run -p 5000:5000 --name tester tester