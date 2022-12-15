import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotificationUseCase } from './CountRecipientNotificationUseCase';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotificationUseCase(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        category: 'social',
        content: new Content('This is a new notification.'),
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        category: 'social',
        content: new Content('This is a new notification.'),
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-2',
        category: 'social',
        content: new Content('This is a new notification.'),
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
