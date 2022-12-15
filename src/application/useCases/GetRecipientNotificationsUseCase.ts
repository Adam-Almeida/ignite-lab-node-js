import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/NotificationsRepository';

interface IGetRecipientNotificationsRequest {
  recipientId: string;
}

interface IGetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: IGetRecipientNotificationsRequest,
  ): Promise<IGetRecipientNotificationsResponse> {
    const { recipientId } = req;

    const notifications =
      await this.notificationRepository.findManyByRecipientBYId(recipientId);

    return { notifications };
  }
}
