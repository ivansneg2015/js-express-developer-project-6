// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Не удалось изменить пользователя',
          success: 'Пользователь успешно изменен',
          notAllowed: 'Нельзя изменить другого пользователя',
          notFound: 'Пользователь не найден',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удален',
          notAllowed: 'Нельзя удалить другого пользователя',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось установить статус',
          success: 'Статус успешно создан',
        },
        update: {
          error: 'Не удалось изменить статус',
          success: 'Статус успешно изменен',
          notAllowed: 'Нельзя изменить статус другого пользователя',
          notFound: 'Статус не найден',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус успешно удален',
          notAllowed: 'Нельзя удалить статус другого пользователя',
        },
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        update: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить задачу',
          success: 'Задача успешно удалена',
          notAllowed: 'Задачу может удалить только её автор',
        },
      },
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        update: {
          error: 'Не удалось изменить метку',
          success: 'Метка успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Метка успешно удалена',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        statuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
          email: 'Email',
          password: 'Пароль',
        },
      },
      users: {
        users: 'Пользователи',
        id: 'ID',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        actions: 'Действия',
        delete: 'Удалить',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
          firstname: 'Имя',
          lastname: 'Фамилия',
          email: 'Email',
          password: 'Пароль',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      edit: {
        edit: 'Изменение пользователя',
        firstname: 'Имя',
        lastname: 'Фамилия',
        email: 'Email',
        password: 'Пароль',
        submit: 'Изменить',
      },
      statuses: {
        statuses: 'Статусы',
        createStatus: 'Создать статус',
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        delete: 'Удалить',
        new: {
          create: 'Создание статуса',
          name: 'Наименование',
          submit: 'Создать',
        },
        edit: {
          edit: 'Изменение статуса',
          name: 'Наименование',
          submit: 'Изменить',
        },
      },
      tasks: {
        tasks: 'Задачи',
        create: 'Создать задачу',
        own: 'Только мои задачи',
        show: 'Показать',
        id: 'ID',
        name: 'Наименование',
        status: 'Статус',
        author: 'Автор',
        label: 'Метка',
        labels: 'Метки:',
        executor: 'Исполнитель',
        createdAt: 'Дата создания',
        delete: 'Удалить',
        submit: 'Изменить',
        new: {
          create: 'Создание задачи',
          name: 'Наименование',
          description: 'Описание',
          status: 'Статус',
          executor: 'Исполнитель',
          labels: 'Метки',
          submit: 'Создать',
        },
        edit: {
          edit: 'Изменение задачи',
          name: 'Наименование',
          description: 'Описание',
          status: 'Статус',
          executor: 'Исполнитель',
          labels: 'Метки',
          submit: 'Изменить',
        },
      },
      labels: {
        labels: 'Метки',
        createLabel: 'Создать метку',
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        delete: 'Удалить',
        submit: 'Изменить',
        new: {
          create: 'Создание метки',
          name: 'Наименование',
          submit: 'Создать',
        },
        edit: {
          edit: 'Изменение метки',
          name: 'Наименование',
          submit: 'Изменить',
        },
      },
    },
  },
};
