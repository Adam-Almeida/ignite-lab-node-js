import { Content } from './content';

test('it should be able to create a notification content', () => {
  const content = new Content('Você recebeu uma nova solicitação de amizade');

  expect(content).toBeTruthy();
});

test('it should not be able to create a notification content with less than 5 chaaracters', () => {
  expect(() => new Content('abc')).toThrow();
});

test('it should not be able to create a notification content with more than 240 chaaracters', () => {
  expect(() => new Content('a'.repeat(241))).toThrow();
});
