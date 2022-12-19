import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka/kafkaConsumer.service';

@Module({
  imports: [],
  providers: [KafkaConsumerService],
  controllers: [],
})
export class MessagingModule {}
