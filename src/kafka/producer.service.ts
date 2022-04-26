import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['127.0.0.1:9092'],
  });
  private readonly producer = this.kafka.producer();

  // init the producer
  async onModuleInit() {
    await this.producer.connect();
  }

  // produce a record
  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  // close the connection
  async onApplicationShutdown(signal?: string) {
    await this.producer.disconnect();
  }
}
