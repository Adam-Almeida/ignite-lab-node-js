import { NotificationsRepository } from '@application/repositories/NotificationsRepository';
import { Notification } from '@application/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    throw new Error('Method not implemented.');
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
