// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import { getTestData, prepareData, getCookie } from './helpers/index.js';

describe('test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  let status;
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
    status = await models.status.query().findOne({ name: testData.statuses.existing.name });
    cookies = await getCookie(app, testData.users.existing);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/statuses/new',
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.statuses.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const newStatus = await models.status.query().findOne({ name: params.name });
    expect(newStatus).toMatchObject(params);
  });

  it('update', async () => {
    const params = testData.statuses.new;
    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('patchStatus', { id: status.id }),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const editedStatus = await models.status.query().findById(status.id);
    expect(editedStatus).toMatchObject(params);
  });

  it('delete', async () => {
    const response = await app.inject({
      method: 'DELETE',
      cookies,
      url: app.reverse('deleteStatus', { id: status.id }),
    });

    expect(response.statusCode).toBe(302);
    const deletedStatus = await models.status.query().findById(status.id);
    expect(deletedStatus).toBeUndefined();
  });

  it('delete status linked with task', async () => {
    await models.task.query().insert({
      ...testData.tasks.existing,
      statusId: status.id,
    });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteStatus', { id: status.id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);

    const undeletedStatus = await models.status.query().findById(status.id);
    expect(undeletedStatus).not.toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
