import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import type { Channel } from 'amqp-connection-manager';
import type { Message } from 'amqplib';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.getOrThrow<string>('RABBIT_MQ_URI')],
        queue: this.configService.getOrThrow<string>(
          `RABBIT_MQ_${queue}_QUEUE`,
        ),
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef() as unknown as Channel;
    const message = context.getMessage() as unknown as Message;
    channel.ack(message);
  }
}
