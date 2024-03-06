// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import { getTestData, prepareData, getCookie } from './helpers/index.js';

describe('test labels CRUD', () => {
  let app;
  let knex;
  let models;
  let label;
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
    label = await models.status.query().findOne({ name: testData.labels.existing.name });
    cookies = await getCookie(app, testData.users.existing);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newLabel'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.labels.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const newLabel = await models.label.query().findOne({ name: params.name });
    expect(newLabel).toMatchObject(params);
  });

  it('update', async () => {
    const params = testData.labels.new;
    const response = await app.inject({
      method: 'PATCH',
      url: `/labels/${label.id}`,
      cookies,
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const editedLabel = await models.label.query().findById(label.id);
    expect(editedLabel).toMatchObject(params);
  });

  it('delete', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteLabel', { id: label.id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const deletedLabel = await models.label.query().findById(label.id);
    expect(deletedLabel).toBeUndefined();
  });

  it('delete label linked with task', async () => {
    const task = await models.task.query().insert(testData.tasks.existing);
    await task.$relatedQuery('labels').relate(label);

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteLabel', { id: label.id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);

    const undeletedLabel = await models.label.query().findById(label.id);
    expect(undeletedLabel).not.toBeUndefined();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
