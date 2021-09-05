import i18next from 'i18next';

const i18nInit = () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          // formState: {
          urlIsNotValid: 'Ссылка должна быть валидным URL',
          rssAlreadyExists: 'RSS уже существует',
          'RSS is valid': 'RSS успешно загружен',
          'Error parsing XML': 'Ресурс не содержит валидный RSS',
          'Network Error': 'Ошибка сети',
          null: '',
          // }
        },
      },
    },
  });
};

export default i18nInit;
