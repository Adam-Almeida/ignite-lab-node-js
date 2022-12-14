import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/NotificationsRepository';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';

interface ICancelNotificationRequest {
  notificationId: string;
}

type ICancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: ICancelNotificationRequest,
  ): Promise<ICancelNotificationResponse> {
    const { notificationId } = req;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
