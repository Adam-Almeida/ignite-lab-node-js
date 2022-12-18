import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/NotificationsRepository';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface IUnreadNotificationRequest {
  notificationId: string;
}

type IUnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: IUnreadNotificationRequest,
  ): Promise<IUnreadNotificationResponse> {
    const { notificationId } = req;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
