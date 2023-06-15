const { Kafka } = require('kafkajs');

export default new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9092'],
});
