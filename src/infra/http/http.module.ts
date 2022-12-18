import { CancelNotificationUseCase } from '@application/useCases/CancelNotificationUseCase';
import { CountRecipientNotificationUseCase } from '@application/useCases/CountRecipientNotificationUseCase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/GetRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@application/useCases/ReadNotificationUseCase';
import { UnreadNotificationUseCase } from '@application/useCases/UnreadNotificationUseCase';
import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/useCases/SendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
