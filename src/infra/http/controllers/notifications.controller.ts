import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/useCases/SendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/CreateNotificationBody';
import { NotificationViewModel } from '../viewModels/NotificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotificationUseCase) {}

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
