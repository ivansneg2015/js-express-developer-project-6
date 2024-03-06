// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (_req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (_req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const userId = req.user.id;

      if (Number(id) !== Number(userId)) {
        req.flash('error', i18next.t('flash.users.update.notAllowed'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      try {
        const user = await app.objection.models.user.query().findById(id);
        reply.render('users/edit', { user });
      } catch (err) {
        req.flash('error', i18next.t('flash.users.update.notFound'));
        reply.redirect(app.reverse('users'));
      }
      return reply;
    })
    .post('/users', async (req, reply) => {
      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user: req.body.data, errors: data });
      }
      return reply;
    })
    .patch('/users/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const userId = req.user.id;

      if (Number(id) !== Number(userId)) {
        req.flash('error', i18next.t('flash.users.update.notAllowed'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      try {
        const user = await app.objection.models.user.fromJson(req.body.data);
        const currentUser = await app.objection.models.user.query().findById(id);
        await currentUser.$query().update(user);
        req.flash('info', i18next.t('flash.users.update.success'));
        reply.redirect(app.reverse('users'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.update.error'));
        reply.render('users/edit', { user: req.body.data, errors: data });
      }
      return reply;
    })
    .delete('/users/:id', { name: 'deleteUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const userId = req.user.id;

      if (Number(id) !== Number(userId)) {
        req.flash('error', i18next.t('flash.users.delete.notAllowed'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      const tasks = await app.objection.models.task
        .query()
        .where('executorId', req.params.id)
        .orWhere('creatorId', req.params.id);

      if (!tasks.length) {
        await app.objection.models.user.query().deleteById(id);
        req.logOut();
        req.flash('info', i18next.t('flash.users.delete.success'));
      } else {
        req.flash('error', i18next.t('flash.users.delete.error'));
      }
      reply.redirect(app.reverse('users'));
      return reply;
    });
};
