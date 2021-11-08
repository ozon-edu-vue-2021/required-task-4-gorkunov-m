import { extend } from 'vee-validate';
import { required, email, length } from 'vee-validate/dist/rules';
import { getEnding } from '@/utils/getEnding';

extend('required', {
    ...required,
    message: 'Обязательное поле',
});

extend('email', {
    ...email,
    message: 'Некорректный e-mail',
});

extend('ru', {
    validate: (value) => {
        return /^[А-Яа-яЁё]+$/.test(value);
    },
    message: 'Только русские буквы',
});

extend('en', {
    validate: (value) => {
        return /^[A-Za-z]+$/.test(value);
    },
    message: 'Только латинские буквы',
});

extend('length', {
    ...length,
    message: (val, { length }) => `Длина ${length} цифр${getEnding(length, ['а', 'ы', ''])}`,
});
