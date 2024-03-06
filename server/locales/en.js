// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          error: 'Unable to change user',
          success: 'User changed successfully',
          notAllowed: 'Cannot change another user',
          notFound: 'User not found',
        },
        delete: {
          error: 'Unable to delete user',
          success: 'User deleted successfully',
          notAllowed: 'Cannot delete another user',
        },
      },
      statuses: {
        create: {
          error: 'Failed to set status',
          success: 'Status created successfully',
        },
        update: {
          error: 'Failed to change status',
          success: 'Status changed successfully',
          notAllowed: "Cannot change another user's status",
          notFound: 'Status not found',
        },
        delete: {
          error: 'Unable to delete status',
          success: 'Status removed successfully',
          notAllowed: "Cannot remove another user's status",
        },
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        update: {
          error: 'Failed to edit task',
          success: 'Task changed successfully',
        },
        delete: {
          error: 'Failed to delete task',
          success: 'The task was deleted successfully',
          notAllowed: 'Only the author can delete a task',
        },
      },
      labels: {
        create: {
          error: 'Failed to create label',
          success: 'Label created successfully',
        },
        update: {
          error: 'Unable to change label',
          success: 'Label changed successfully',
        },
        delete: {
          error: 'Failed to remove label',
          success: 'Label removed successfully',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
        labels: 'Labels',
        tasks: 'Tasks',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
          email: 'Email',
          password: 'Password',
        },
      },
      users: {
        users: 'Users',
        id: 'ID',
        fullName: 'Full name',
        email: 'Email',
        createdAt: 'Created at',
        actions: 'Actions',
        delete: 'Delete',
        new: {
          submit: 'Register',
          signUp: 'Register',
          firstname: 'First name',
          lastname: 'Last name',
          email: 'Email',
          password: 'Password',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      edit: {
        edit: 'Change user',
        firstname: 'First name',
        lastname: 'Last name',
        email: 'Email',
        password: 'Password',
        submit: 'Edit',
      },
      statuses: {
        statuses: 'Statuses',
        createStatus: 'Create status',
        id: 'ID',
        name: 'Name',
        createdAt: '  Created at',
        delete: 'Delete',
        new: {
          create: 'Create status',
          name: 'Name',
          submit: 'Create',
        },
        edit: {
          edit: 'Change status',
          name: 'Name',
          submit: 'Change',
        },
      },
      tasks: {
        tasks: 'Tasks',
        create: 'Create task',
        own: 'Only my tasks',
        show: 'Show',
        id: 'ID',
        name: 'Name',
        status: 'Status',
        author: 'Author',
        label: 'Label',
        labels: 'Labels:',
        executor: 'Executor',
        createdAt: 'Created at',
        delete: 'Delete',
        submit: 'Change',
        new: {
          create: 'Create task',
          name: 'Name',
          description: 'Description',
          status: 'Status',
          executor: 'Executor',
          labels: 'Labels',
          submit: 'Create',
        },
        edit: {
          edit: 'Change task',
          name: 'Name',
          description: 'Description',
          status: 'Status',
          executor: 'Executor',
          labels: 'Labels',
          submit: 'Change',
        },
      },
      labels: {
        labels: 'Labels',
        createLabel: 'Create label',
        id: 'ID',
        name: 'Name',
        createdAt: 'Createad at',
        delete: 'Delete',
        submit: 'Change',
        new: {
          create: 'Create label',
          name: 'Name',
          submit: 'Create',
        },
        edit: {
          edit: 'Change label',
          name: 'Name',
          submit: 'Change',
        },
      },
    },
  },
};
