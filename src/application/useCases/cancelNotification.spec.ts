import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CancelNotificationUseCase } from './cancelNotificationUseCase';

describe('Cancelnotification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = new Notification({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: new Content('This is a new notification.'),
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
});