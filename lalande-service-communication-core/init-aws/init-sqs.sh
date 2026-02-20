#init-sqs.sh

# Primera cola
awslocal sqs create-queue --queue-name queue-lalande-communication-pending

# Segunda cola
awslocal sqs create-queue --queue-name queue-lalande-communication-delivered