/* eslint-disable */
const { SQSClient, PurgeQueueCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

const purge = async () => {
  try {
    await client.send(new PurgeQueueCommand({
      QueueUrl: "http://localhost:4566/000000000000/queue-lalande-communication-delivered"
    }));
    console.log("Cola DELIVERED limpiada con éxito");
  } catch (err) {
    console.error("Error:", err.message);
  }
};

purge();
