/* eslint-disable arrow-body-style */

const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
// const Movie = require('../models/movie');

const { TEST_DATABASE_NAME } = require('../config/database');

const app = require('../app');

const request = supertest(app);

const email = 'test@test.tt';
const password = 'aaaaaaaa';
const name = 'NN';

beforeAll(async () => {
  await mongoose.connect(TEST_DATABASE_NAME, {
    useNewUrlParser: true,
  });

  const user = await User.findOne({ email });
  if (user.email) {
    await User.deleteOne(user);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Создание пользователя и авторизация', () => {
  it('Проверка автоизации в несуществующем акаунте', () => {
    return request.post('/api/signin').send({ email, password }).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it('Проверка автоизации с отсутствующзем паролем', () => {
    return request.post('/api/signin').send({ email }).then((response) => {
      expect(response.status).toBe(400);
    });
  });

  it('Проверка автоизации с отсутствующзем email', () => {
    return request.post('/api/signin').send({ password }).then((response) => {
      expect(response.status).toBe(400);
    });
  });

  it('Проверка автоизации с некорректным паролем', () => {
    return request.post('/api/signin').send({ email, password: 'aa' }).then((response) => {
      expect(response.status).toBe(400);
    });
  });

  it('Проверка автоизации с некорректным email', () => {
    return request.post('/api/signin').send({ email: 'e_mail', password }).then((response) => {
      expect(response.status).toBe(400);
    });
  });

  it('Проверка создания пользователя без имени', () => {
    return request.post('/api/signup').send({ email, password }).then((response) => {
      expect(response.status).toBe(400);
    });
  });
  it('Проверка создания пользователя без пароля', () => {
    return request.post('/api/signup').send({ email, name }).then((response) => {
      expect(response.status).toBe(400);
    });
  });
  it('Проверка создания пользователя без почты', () => {
    return request.post('/api/signup').send({ name, password }).then((response) => {
      expect(response.status).toBe(400);
    });
  });
  it('Проверка создания пользователя с некорректным name', () => {
    return request.post('/api/signup').send({ email, password, name: 'a' }).then((response) => {
      expect(response.status).toBe(400);
    });
  });
  it('Проверка создания пользователя с некорректным password', () => {
    return request.post('/api/signup').send({ email, password: 'aa', name }).then((response) => {
      expect(response.status).toBe(400);
    });
  });
  it('Проверка создания пользователя с некорректным email', () => {
    return request.post('/api/signup').send({ email: 'e_mail', password, name }).then((response) => {
      expect(response.status).toBe(400);
    });
  });
  it('Проверка создания пользователя', () => {
    return request.post('/api/signup').send({ email, password, name }).then((response) => {
      expect(response.status).toBe(201);
    });
  });
  it('Проверка повторного создания пользователя', () => {
    return request.post('/api/signup').send({ email, password, name }).then((response) => {
      expect(response.status).toBe(409);
    });
  });
  it('Проверка успешной авторизации', () => {
    return request.post('/api/signin').send({ email, password }).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.email).toBe(email);
    });
  });
});
