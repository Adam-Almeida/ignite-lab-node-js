import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/NotificationsRepository';

interface ICountRecipientNotificationRequest {
  recipientId: string;
}

interface ICountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: ICountRecipientNotificationRequest,
  ): Promise<ICountRecipientNotificationResponse> {
    const { recipientId } = req;

    const count = await this.notificationRepository.countManyByRecipientBYId(
      recipientId,
    );

    return { count };
  }
}
