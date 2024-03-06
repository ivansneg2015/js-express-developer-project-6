// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const status = req.query.status || undefined;
      const label = req.query.label || undefined;
      const executor = req.query.executor || undefined;
      const creator = req.query.isCreatorUser === 'on' ? req.user.id : undefined;

      const [statuses, executors, labels, tasks] = await Promise.all([
        app.objection.models.status.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
        app.objection.models.task.query()
          .withGraphJoined('[status, creator, executor, labels]')
          .skipUndefined()
          .where('statusId', status)
          .where('creatorId', creator)
          .where('executorId', executor)
          .where('labelId', label),
      ]);

      reply.render('tasks/index', {
        executors, tasks, statuses, labels, values: req.query,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (_req, reply) => {
      const [task, users, statuses, labels] = await Promise.all([
        app.objection.models.task(),
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/new', {
        task, users, statuses, labels,
      });
      return reply;
    })
    .get('/tasks/:id', { name: 'taskView', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task
        .query()
        .findById(req.params.id)
        .withGraphFetched('[status, creator, executor, labels]');
      reply.render('tasks/view', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
      const [task, users, statuses, labels] = await Promise.all([
        app.objection.models.task
          .query()
          .findById(req.params.id)
          .withGraphFetched('labels'),
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/edit', {
        task, users, statuses, labels,
      });
      return reply;
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const creatorId = req.user.id;
        await app.objection.models.task.query().upsertGraph({
          ...req.body.data,
          creatorId,
        }, { relate: true });

        req.flash('success', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.status.query();
        const labels = await app.objection.models.label.query();
        reply.render('/tasks/new', {
          task: req.body.data,
          errors: data,
          users,
          statuses,
          labels,
        });
      }
      return reply;
    })
    .patch('/tasks/:id', { name: 'patchTask', preValidation: app.authenticate }, async (req, reply) => {
      try {
        const { creatorId } = await app.objection.models.task.query().findById(req.params.id);
        const id = Number(req.params.id);
        const executorId = req.body.data.executorId || undefined;
        const labelsId = [...req.body.data.labels]
          .flat().map((label) => ({ id: Number(label) }));

        await app.objection.models.task.transaction((trx) => (
          app.objection.models.task.query(trx).upsertGraph(
            {
              id,
              ...req.body.data,
              creatorId,
              executorId,
              labels: labelsId,
            },
            { relate: true, unrelate: true, noUpdate: ['labels'] },
          )
        ));

        req.flash('success', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.update.error'));
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.status.query();
        const labels = await app.objection.models.label.query();
        reply.render('/tasks/edit', {
          task: req.body.data,
          errors: data,
          users,
          statuses,
          labels,
        });
      }
      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task
        .query()
        .withGraphFetched('[status, creator, executor]')
        .findById(id);

      if (req.user.id !== task.creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
      } else {
        await app.objection.models.task.query().deleteById(id);
        req.flash('success', i18next.t('flash.tasks.delete.success'));
      }

      reply.redirect(app.reverse('tasks'));
    });
};
