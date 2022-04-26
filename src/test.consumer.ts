import { Injectable, OnModuleInit } from '@nestjs/common';
import { EachMessagePayload } from 'kafkajs';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  // init the producer
  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'test' },
      {
        eachMessage: async (payload: EachMessagePayload) => {
          console.log(payload.message.value.toString());
          console.log(payload.topic.toString());
          console.log(payload.partition.toString());
        },
      },
    );
  }
}
