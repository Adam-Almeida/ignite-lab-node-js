import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { SendNotificationUseCase } from './SendNotificationUseCase';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'This is a notification',
    });

    // console.log(notifications);

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
