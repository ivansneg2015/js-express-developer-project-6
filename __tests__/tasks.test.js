// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import { getTestData, prepareData, getCookie } from './helpers/index.js';

describe('test tasks CRUD', () => {
  let app;
  let knex;
  let models;
  let task;
  const testData = getTestData();
  let cookies;

  beforeAll(async () => {
    app = fastify();
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
    task = await models.status.query().findOne({ name: testData.tasks.existing.name });
    cookies = await getCookie(app, testData.users.existing);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('task view', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask', { id: task.id }),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.tasks.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const newTask = await models.task.query().findOne({ name: params.name });
    expect(newTask).toMatchObject(params);
  });

  it('update', async () => {
    const params = testData.tasks.new;
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('patchTask', { id: task.id }),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const editedTask = await models.task.query().findById(task.id);
    expect(editedTask).toMatchObject(params);
  });

  it('delete', async () => {
    const response = await app.inject({
      method: 'DELETE',
      cookies,
      url: app.reverse('deleteTask', { id: task.id }),
    });

    expect(response.statusCode).toBe(302);
    const deletedTask = await models.task.query().findById(task.id);
    expect(deletedTask).toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
