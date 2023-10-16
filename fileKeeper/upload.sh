#!/bin/bash

# Define the password
password="123"

# Change the working directory to the 'greenfield-cmd/build' directory
cd ../greenfield-cmd/build

# Determine the file name dynamically from the current working directory
file_name=./test_index.html

# Create an expect script to send the password
expect << EOF
spawn ./gnfd-cmd object put --contentType "text/html" test_index.html gnfd://test-bucket-1/test_index.html
expect "password: "
send "$password\r"
expect eof


# Add a 20-second delay after running the command
sleep 20

EOF