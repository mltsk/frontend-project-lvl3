import i18n from 'i18next';
import ru from './ru.js';

const i18next = i18n.createInstance();
i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: ru(),
    },
  },
});

export default i18next;
