import { SendNotificationUseCase } from './SendNotificationUseCase';

describe('Send notification', () => {
  it('should be able to sen a notification', async () => {
    const sendNotification = new SendNotificationUseCase();

    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'This is a notification',
    });

    expect(notification).toBeTruthy();
  });
});
