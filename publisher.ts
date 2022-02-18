import express from "express";
import Redis from "ioredis";

const app = express();
const redis = new Redis(6379, "127.0.0.1");

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hey, its Publisher!");
});

app.get("/channels", async (_req, res) => {
  const out = await redis.send_command("PUBSUB", ["CHANNELS"]);
  console.log(`\n## channels: ${out}`);
  res.status(200).send({ cnannels: `${out}` });
});

// publish message in specified interval
setInterval(async () => {
  // Run commands using redis-cli on instance
  const out = await redis.send_command("PUBSUB", ["channels"]);
  console.log(`Output (Channels): ${out}`);

  const message = { number: Math.random() };
  const channel = `my-channel-${1 + Math.round(Math.random())}`;

  // console.log(`Publishing message to ${channel}...`);
  const res = await redis.publish(channel, JSON.stringify(message));

  console.log(`Publish result: ${res}`);

  console.log(`\n${JSON.stringify(message)} published to ${channel}!`);
}, 2000);

redis.removeAllListeners();

app.listen({ port: 9000 }, (): void => {
  console.log("Running on http://localhost:9000");
});
