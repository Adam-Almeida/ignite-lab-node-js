import { NotificationsRepository } from '@application/repositories/NotificationsRepository';
import { Notification } from '@application/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
