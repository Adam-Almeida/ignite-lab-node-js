import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/useCases/SendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/CreateNotificationBody';
import { NotificationViewModel } from '../viewModels/NotificationViewModel';
import { CancelNotificationUseCase } from '@application/useCases/CancelNotificationUseCase';
import { ReadNotificationUseCase } from '@application/useCases/ReadNotificationUseCase';
import { UnreadNotificationUseCase } from '@application/useCases/UnreadNotificationUseCase';
import { CountRecipientNotificationUseCase } from '@application/useCases/CountRecipientNotificationUseCase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/GetRecipientNotificationsUseCase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private countRecipientNotification: CountRecipientNotificationUseCase,
    private getRecipientNotification: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notification: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }
}
