import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/NotificationsRepository';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface IReadNotificationRequest {
  notificationId: string;
}

type IReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: IReadNotificationRequest,
  ): Promise<IReadNotificationResponse> {
    const { notificationId } = req;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
