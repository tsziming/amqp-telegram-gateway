import { connect } from 'amqplib';
import { config } from 'dotenv';
import { setupBot } from './bot';
import { QUEUES } from './config';
import { setupRequests } from './requests';

config();

if (!process.env.MQURI?.length) {
  throw new Error('MQ URI not specified!');
}
if (!process.env.BOT_TOKEN?.length) {
  throw new Error('BOT TOKEN not specified!');
}

connect(process.env.MQURI || '').then((connection) => {
  connection.createChannel().then((channel) => {
    Object.values(QUEUES).forEach(
      async (queue) =>
        await channel.assertQueue(queue, {
          durable: false
        })
    );
    setupRequests(channel, setupBot(channel));
  });
});
