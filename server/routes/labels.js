// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (_req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel', preValidation: app.authenticate }, (_req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
      return reply;
    })
    .get('/labels/:id/edit', { name: 'editLabel', preValidation: app.authenticate }, async (req, reply) => {
      const label = await app.objection.models.label.query().findById(req.params.id);
      reply.render('labels/edit', { label });
      return reply;
    })
    .post('/labels', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { status: req.body.data, errors: data });
      }
      return reply;
    })
    .patch('/labels/:id', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const label = await app.objection.models.label.fromJson(req.body.data);
        const currentLabel = await app.objection.models.label.query().findById(req.params.id);
        await currentLabel.$query().update(label);
        req.flash('info', i18next.t('flash.labels.update.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.update.error'));
        reply.render('labels/edit', { status: req.body.data, errors: data });
      }
      return reply;
    })
    .delete('/labels/:id', { name: 'deleteLabel', preValidation: app.authenticate }, async (req, reply) => {
      const tasks = await app.objection.models.label.relatedQuery('tasks').for(req.params.id);

      if (tasks.length === 0) {
        await app.objection.models.label.query().deleteById(req.params.id);
        req.flash('info', i18next.t('flash.labels.delete.success'));
      } else {
        req.flash('error', i18next.t('flash.labels.delete.error'));
      }

      return reply.redirect(app.reverse('labels'));
    });
};
