import express from "express";
import Redis from "ioredis";

const app = express();
const redis = new Redis();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hi Subsciber here!");
});

app.get("/subscribe/:channel", async (req, res) => {
  const { channel } = req.params;

  await redis.subscribe(channel, (err, result) => {
    if (err) {
      console.error(`Failed to subscribe!, \n${err.message}`);
      res.status(500).send(`Failed to subscribe!, \n${err.message}`);
    } else {
      console.log(`Subscribed to ${channel}! (${result})`);
      res.status(200).send(`Subscribed to ${channel}! (${result})`);
    }
  });
});

app.get("/psubscribe/:pattern", async (req, res) => {
  const { pattern } = req.params;
  console.log(pattern);
  await redis.psubscribe(pattern, (err, result) => {
    if (err) {
      console.error(`Failed to subscribe!, \n${err.message}`);
      res.status(500).send(`Failed to subscribe!, \n${err.message}`);
    } else {
      console.log(`Subscribed to ${pattern}! (${result})`);
      res.status(200).send(`Subscribed to ${pattern}! (${result})`);
    }
  });
});

app.get("/unsubscribe/:channel", async (req, res) => {
  const { channel } = req.params;
  await redis.unsubscribe(channel, (err, result) => {
    console.log(result.toString());
    if (err) {
      console.error(`Failed to unsubscribe!, \n${err.message}`);
      res.status(500).send(`Failed to unsubscribe!, \n${err.message}`);
    } else {
      console.log(`Unsubscribed from ${channel}! (${result})`);
      res.status(200).send(`Unsubscribed from ${channel}! (${result})`);
    }
  });
});

app.get("/punsubscribe/:pattern", async (req, res) => {
  const { pattern } = req.params;
  await redis.unsubscribe(pattern, (err, result) => {
    if (err) {
      console.error(`Failed to unsubscribe!, \n${err.message}`);
      res.status(500).send(`Failed to unsubscribe!, \n${err.message}`);
    } else {
      console.log(`Unsubscribed from ${pattern}! (${result})`);
      res.status(200).send(`Unsubscribed from ${pattern}! (${result})`);
    }
  });
});

app.get("/ping", async (_req, res) => {
  const out = await redis.send_command("PING");
  console.log(`\n## PING: ${out}`);
  res.status(200).send({ output: `${out}` });
});

redis.on("message", (channel, message) => {
  console.log(`Received ${message} from ${channel}`);
});

app.listen(9002, (): void => {
  console.log("Running on http://localhost:9002");
});
