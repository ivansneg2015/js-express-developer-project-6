// @ts-check
const path = require('node:path');

const objectionUnique = require('objection-unique');
const BaseModel = require('./BaseModel.cjs');
const Status = require('./Status.cjs');
const Label = require('./Label.cjs');

const unique = objectionUnique({ fields: ['email'] });

module.exports = class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        statusId: { type: 'string', minLength: 1 },
        creatorId: { type: 'string', minLength: 1 },
        executorId: { type: ['integer', null] },
        createdAt: { type: 'string' },
      },
    };
  }

  static relationMappings() {
    return {
      status: {
        relation: BaseModel.HasOneRelation,
        modelClass: Status,
        join: {
          from: 'tasks.status_id',
          to: 'statuses.id',
        },
      },
      creator: {
        relation: BaseModel.HasOneRelation,
        modelClass: path.join(__dirname, 'User.cjs'),
        join: {
          from: 'tasks.creatorId',
          to: 'users.id',
        },
      },
      executor: {
        relation: BaseModel.HasOneRelation,
        modelClass: path.join(__dirname, 'User.cjs'),
        join: {
          from: 'tasks.executorId',
          to: 'users.id',
        },
      },
      labels: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Label,
        join: {
          from: 'tasks.id',
          through: {
            from: 'tasks_labels.taskId',
            to: 'tasks_labels.labelId',
          },
          to: 'labels.id',
        },
      },
    };
  }
};
