import { Channel } from 'amqplib';
import { Bot } from 'grammy';
import { QUEUES } from './config';

export function setupBot(channel: Channel): Bot {
  const bot = new Bot(process.env.BOT_TOKEN || '');

  bot.use((context) =>
    channel.sendToQueue(
      QUEUES.UPDATES,
      Buffer.from(JSON.stringify(context.update)),
      {
        expiration: '45000'
      }
    )
  );

  bot.start();
  return bot;
}
