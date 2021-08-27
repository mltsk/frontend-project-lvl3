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
            rssIsNotValid: 'Ресурс не содержит валидный RSS',
            rssIsValid: 'RSS успешно загружен',
            // }
        },
        },
    },
    }).catch(e => console.log)
}

export default i18nInit;
