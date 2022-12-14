import { Notification } from '../entities/notification';
import { SendNotificationUseCase } from './SendNotificationUseCase';

const notifications: Notification[] = [];

const notificationsRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotificationUseCase(
      notificationsRepository,
    );

    await sendNotification.execute({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'This is a notification',
    });

    console.log(notifications);

    expect(notifications).toHaveLength(1);
  });
});
