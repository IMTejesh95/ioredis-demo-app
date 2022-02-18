import express from "express";
import Redis from "ioredis";

const app = express();
const redis = new Redis();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hi Subsciber here!");
});

redis.subscribe("my-channel-1", (err, res) => {
  if (err) {
    console.error(`Failed to subscribe!, \n${err.message}`);
  } else {
    console.log(`Subscribed to my-channel-1! (${res})`);
  }
});

redis.on("message", (channel, message) => {
  console.log(`Received ${message} from ${channel}`);
});

app.listen({ port: 9001 }, (): void => {
  console.log("Running on http://localhost:9001");
});
