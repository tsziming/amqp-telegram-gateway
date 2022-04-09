import { Channel, ConsumeMessage } from 'amqplib';
import { Bot } from 'grammy';
import { processRequest } from './api';
import { EXPIRATION, QUEUES } from './config';
import { Response } from './types';

export async function setupRequests(channel: Channel, bot: Bot) {
  channel.consume(QUEUES.REQUESTS, async (message) => {
    if (!message) {
      return;
    }
    await channel.sendToQueue(
      QUEUES.RESPONSES,
      Buffer.from(JSON.stringify(await getResponse(bot, message))),
      {
        expiration: EXPIRATION
      }
    );
    channel.ack(message);
  });
}

export async function getResponse(
  bot: Bot,
  message: ConsumeMessage
): Promise<Response> {
  try {
    const content = JSON.parse(message.content.toString());
    return await processRequest(bot, content);
  } catch (err) {
    return {
      status: 'error',
      err
    };
  }
}
