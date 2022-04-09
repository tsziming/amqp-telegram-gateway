import { Bot } from 'grammy';
import { Request, Response } from './types';

export async function processRequest(
  bot: Bot,
  request: Request
): Promise<Response> {
  try {
    const data = await (
      bot.api.raw as Record<string, (args: unknown) => unknown>
    )[request.name]?.(request.arguments);
    return {
      status: 'success',
      data
    };
  } catch (err: unknown) {
    return {
      status: 'error',
      err: JSON.stringify(err)
    };
  }
}
