# ioredis-demo-app
A node.js app to Practice Redis Pub/Sub 
- NOTE: Run the Redis service first 

## Guide
- `publisher.ts` : Publish the message to few channels after 2 sec interval
- `subscriber1.ts`: Auto subscribe to channel-1 
- `subscriber2.ts`: Make request to subscribe to channel to start recieve messages (channel example: my-channel-1, my-channel-2)

#### Build
```bash
npm run build
```
#### Run publisher
```bash
npm run pub
```

#### Run subscribers
```bash
npm run sub1
npm run sub2
```
