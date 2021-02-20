import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('./../nats-wrapper');

let mongo: any;

process.env.STRIPE_KEY =
  'sk_test_51IMaBtLmTETYgXIuW9ScuLEWZD7OzTBqq6PkcgeGjiSRR4cC2PsOnyWFneWIz2RQn0UMY3KUYwhh9Qe2g5y4Vuyn00zliamPJc';

beforeAll(async () => {
  process.env.JWT_KEY = 'asddfg';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const token = jwt.sign(
    {
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com',
    },
    process.env.JWT_KEY!
  );

  const base64 = Buffer.from(JSON.stringify({ jwt: token })).toString('base64');

  return [`express:sess=${base64}`];
};
