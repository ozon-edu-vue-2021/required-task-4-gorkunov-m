<template>
    <validation-observer slim v-slot="{ handleSubmit }" ref="validation">
        <form class="columns is-multiline" @submit.prevent="handleSubmit(submitForm)" novalidate>
            <div class="column is-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-header-title">Личные данные</h3>
                    </div>
                    <div class="card-content">
                        <div class="columns is-multiline">
                            <validation-provider
                                mode="eager"
                                class="column is-4"
                                rules="required|ru"
                                v-slot="{ errors }"
                            >
                                <b-field
                                    label="Фамилия"
                                    label-for="lastname"
                                    :message="errors[0]"
                                    :type="errors.length ? 'is-danger' : ''"
                                >
                                    <b-input id="lastname" v-model="formData.lastname"></b-input>
                                </b-field>
                            </validation-provider>
                            <validation-provider
                                mode="eager"
                                class="column is-4"
                                rules="required|ru"
                                v-slot="{ errors }"
                            >
                                <b-field
                                    label="Имя"
                                    label-for="name"
                                    :message="errors[0]"
                                    :type="errors.length ? 'is-danger' : ''"
                                >
                                    <b-input id="name" v-model="formData.name"></b-input>
                                </b-field>
                            </validation-provider>
                            <validation-provider
                                mode="eager"
                                class="column is-4"
                                rules="required|ru"
                                v-slot="{ errors }"
                            >
                                <b-field
                                    label="Отчество"
                                    label-for="patronymic"
                                    :message="errors[0]"
                                    :type="errors.length ? 'is-danger' : ''"
                                >
                                    <b-input id="patronymic" v-model="formData.patronymic"></b-input>
                                </b-field>
                            </validation-provider>
                            <validation-provider
                                mode="eager"
                                class="column is-8"
                                rules="required|email"
                                v-slot="{ errors }"
                            >
                                <b-field
                                    label="E-mail"
                                    label-for="email"
                                    :message="errors[0]"
                                    :type="errors.length ? 'is-danger' : ''"
                                >
                                    <b-input
                                        id="email"
                                        v-model="formData.email"
                                        type="email"
                                        :use-html5-validation="false"
                                    ></b-input>
                                </b-field>
                            </validation-provider>
                            <validation-provider mode="eager" class="column is-4" rules="required" v-slot="{ errors }">
                                <b-field
                                    label="Дата рождения"
                                    label-for="birthday"
                                    :message="errors[0]"
                                    :type="errors.length ? 'is-danger' : ''"
                                >
                                    <b-datepicker id="birthday" v-model="formData.birthday" v-bind="calendarSettings">
                                    </b-datepicker>
                                </b-field>
                            </validation-provider>
                            <div class="column is-12">
                                <b-field label="Пол">
                                    <b-radio v-model="formData.gender" native-value="man">Мужской</b-radio>
                                    <b-radio v-model="formData.gender" native-value="female"> Женский </b-radio>
                                </b-field>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-header-title">Паспортные данные</h3>
                    </div>
                    <div class="card-content">
                        <div class="columns">
                            <validation-provider
                                mode="eager"
                                class="column is-6"
                                rules="citizenship"
                                v-slot="{ errors }"
                            >
                                <b-field
                                    label="Гражданство"
                                    label-for="citizenship"
                                    :message="errors[0] || ''"
                                    :type="errors.length ? 'is-danger' : ''"
                                >
                                    <b-autocomplete
                                        id="citizenship"
                                        v-model="formData.citizenship"
                                        :data="filtredCitizenships"
                                        :loading="loading"
                                        :field="'nationality'"
                                        open-on-focus
                                        expanded
                                        @typing="filterCitizenships"
                                    >
                                    </b-autocomplete>
                                </b-field>
                            </validation-provider>
                        </div>
                        <div class="columns is-multiline">
                            <template v-if="formData.citizenship">
                                <template v-if="isRuCitizenship">
                                    <validation-provider
                                        mode="eager"
                                        class="column is-3"
                                        rules="required|length:4"
                                        v-slot="{ errors }"
                                    >
                                        <b-field
                                            label="Серия паспорта"
                                            label-for="passport-series"
                                            :message="errors[0]"
                                            :type="errors.length ? 'is-danger' : ''"
                                        >
                                            <b-input
                                                id="passport-series"
                                                v-mask="'####'"
                                                v-model="formData.passport.series"
                                            ></b-input>
                                        </b-field>
                                    </validation-provider>
                                    <validation-provider
                                        mode="eager"
                                        class="column is-3"
                                        rules="required|length:6"
                                        v-slot="{ errors }"
                                    >
                                        <b-field
                                            label="Номер паспорта"
                                            label-for="passport-number"
                                            :message="errors[0]"
                                            :type="errors.length ? 'is-danger' : ''"
                                        >
                                            <b-input
                                                id="passport-number"
                                                v-mask="'######'"
                                                v-model="formData.passport.number"
                                            ></b-input>
                                        </b-field>
                                    </validation-provider>
                                    <validation-provider
                                        mode="eager"
                                        class="column is-6"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <b-field
                                            label="Дата выдачи"
                                            label-for="passport-date"
                                            :message="errors[0]"
                                            :type="errors.length ? 'is-danger' : ''"
                                        >
                                            <b-datepicker
                                                id="passport-date"
                                                v-model="formData.passport.date"
                                                v-bind="calendarSettings"
                                            ></b-datepicker>
                                        </b-field>
                                    </validation-provider>
                                </template>
                                <template v-else>
                                    <div class="column is-12">
                                        <b-field
                                            grouped
                                            message="Иностранцы заполняют латинскими буквами. Например, Ivanov Ivan"
                                        >
                                            <div class="columns is-grow">
                                                <validation-provider
                                                    mode="eager"
                                                    class="column is-6"
                                                    rules="required|en"
                                                    v-slot="{ errors }"
                                                >
                                                    <b-field
                                                        label="Фамилия на латинице"
                                                        label-for="passport-lastname"
                                                        :message="errors[0]"
                                                        :type="errors.length ? 'is-danger' : ''"
                                                        expanded
                                                    >
                                                        <b-input
                                                            id="passport-lastname"
                                                            v-model="formData.passport.lastname"
                                                        ></b-input>
                                                    </b-field>
                                                </validation-provider>
                                                <validation-provider
                                                    mode="eager"
                                                    class="column is-6"
                                                    rules="required|en"
                                                    v-slot="{ errors }"
                                                >
                                                    <b-field
                                                        label="Имя на латинице"
                                                        label-for="passport-name"
                                                        :message="errors[0]"
                                                        :type="errors.length ? 'is-danger' : ''"
                                                        expanded
                                                    >
                                                        <b-input
                                                            id="passport-name"
                                                            v-model="formData.passport.name"
                                                        ></b-input>
                                                    </b-field>
                                                </validation-provider>
                                            </div>
                                        </b-field>
                                    </div>
                                    <validation-provider
                                        mode="eager"
                                        class="column is-3"
                                        rules="required|length:6"
                                        v-slot="{ errors }"
                                    >
                                        <b-field
                                            label="Номер паспорта"
                                            label-for="passport-number"
                                            :message="errors[0]"
                                            :type="errors.length ? 'is-danger' : ''"
                                        >
                                            <b-input
                                                id="passport-number"
                                                v-model="formData.passport.number"
                                                v-mask="'######'"
                                            ></b-input>
                                        </b-field>
                                    </validation-provider>
                                    <validation-provider
                                        mode="eager"
                                        class="column is-3"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <b-field
                                            label="Страна выдачи"
                                            label-for="passport-country"
                                            :message="errors[0]"
                                            :type="errors.length ? 'is-danger' : ''"
                                        >
                                            <b-select
                                                id="passport-country"
                                                v-model="formData.passport.country"
                                                expanded
                                            >
                                                <option v-for="country in countries" :value="country" :key="country.id">
                                                    {{ country.name }}
                                                </option>
                                            </b-select>
                                        </b-field>
                                    </validation-provider>
                                    <validation-provider
                                        mode="eager"
                                        class="column is-6"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <b-field
                                            label="Тип паспорта"
                                            label-for="passport-type"
                                            :message="errors[0]"
                                            :type="errors.length ? 'is-danger' : ''"
                                        >
                                            <b-select id="passport-type" v-model="formData.passport.type" expanded>
                                                <option
                                                    v-for="option in passportTypes"
                                                    :value="option"
                                                    :key="option.id"
                                                >
                                                    {{ option.type }}
                                                </option>
                                            </b-select>
                                        </b-field>
                                    </validation-provider>
                                </template>
                            </template>
                            <div class="column is-12">
                                <b-field label="Меняли ли фамилию или имя?">
                                    <b-radio v-model.number="formData.hasNewName" native-value="0">Нет</b-radio>
                                    <b-radio v-model.number="formData.hasNewName" native-value="1">Да</b-radio>
                                </b-field>
                            </div>
                            <template v-if="formData.hasNewName">
                                <validation-provider
                                    mode="eager"
                                    class="column is-6"
                                    rules="required|ru"
                                    v-slot="{ errors }"
                                >
                                    <b-field
                                        label="Предыдущая фамилия"
                                        label-for="new-lastname"
                                        :message="errors[0]"
                                        :type="errors.length ? 'is-danger' : ''"
                                    >
                                        <b-input id="new-lastname" v-model="formData.newLastname"></b-input>
                                    </b-field>
                                </validation-provider>
                                <validation-provider
                                    mode="eager"
                                    class="column is-6"
                                    rules="required|ru"
                                    v-slot="{ errors }"
                                >
                                    <b-field
                                        label="Предыдущее имя"
                                        label-for="new-name"
                                        :message="errors[0]"
                                        :type="errors.length ? 'is-danger' : ''"
                                    >
                                        <b-input id="new-name" v-model="formData.newName"></b-input>
                                    </b-field>
                                </validation-provider>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-12">
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button class="button is-primary">Отправить</button>
                    </div>
                </div>
            </div>
        </form>
    </validation-observer>
</template>

<script>
import debounce from 'lodash/debounce';
import { findSubString } from '@/utils/findSubString';
import { formatDate } from '@/utils/formatDate';
import { extend } from 'vee-validate';

const getInitialFormData = (key = '') => {
    const data = {
        lastname: null,
        name: null,
        patronymic: null,
        birthday: null,
        email: null,
        gender: 'man',
        citizenship: null,
        passport: {
            number: null,
            series: null,
            country: null,
            type: null,
            lastname: null,
            name: null,
            date: null,
        },
        hasNewName: 0,
        newLastname: null,
        newName: null,
    };

    return key ? data[key] : data;
};

export default {
    countries: [],
    citizenships: [],
    passportTypes: [],
    data() {
        return {
            calendarSettings: {
                maxDate: new Date(),
                firstDayOfWeek: 1,
                iconPack: 'xicons',
                iconPrev: 'arrow-left',
                iconNext: 'arrow-right',
            },
            filtredCitizenships: [],
            formData: getInitialFormData(),
            loading: false,
        };
    },
    computed: {
        isRuCitizenship() {
            return this.formData.citizenship === 'Russia';
        },
    },
    watch: {
        ['formData.citizenship']: {
            handler() {
                this.formData.passport = getInitialFormData('passport');
                this.$refs.validation.reset();
            },
        },
        ['formData.hasNewName']: {
            handler() {
                this.formData.newLastname = null;
                this.formData.newName = null;
            },
        },
    },
    async created() {
        await this.fetchData();
        this.addCitizenshipValidationRule();
    },
    methods: {
        async fetchData() {
            try {
                this.loading = true;
                this.citizenships = (await import('@/assets/data/citizenships.json')).default;
                this.countries = await this.getCountries(this.citizenships);
                this.passportTypes = (await import('@/assets/data/passport-types.json')).default;
                this.filtredCitizenships = [...this.citizenships];
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async getCountries(citizenships) {
            const countries = (await import('@/assets/data/countries.json')).default;

            return citizenships
                .filter((citizenship) => countries[citizenship.flag])
                .map((citizenship) => {
                    return {
                        id: citizenship.id,
                        name: countries[citizenship.flag],
                    };
                });
        },
        addCitizenshipValidationRule() {
            extend('citizenship', {
                validate: (value) => {
                    return Boolean(value && this.citizenships.find((citizenship) => citizenship.nationality === value));
                },
                message: 'Выберите гражданство из списка',
                computesRequired: true,
            });
        },
        filterCitizenships: debounce(function (nationality) {
            this.filtredCitizenships = nationality
                ? this.citizenships.filter((country) => findSubString(country.nationality, nationality))
                : [...this.citizenships];
        }, 200),
        submitForm() {
            const birthday = formatDate(this.formData.birthday);
            const passport = this.isRuCitizenship
                ? {
                      number: this.formData.passport.number,
                      series: this.formData.passport.series,
                      date: formatDate(this.formData.passport.date),
                  }
                : {
                      number: this.formData.passport.number,
                      country: this.formData.passport.country.name,
                      type: this.formData.passport.type.type,
                      lastname: this.formData.passport.lastname,
                      name: this.formData.passport.name,
                  };

            const hasNewName = Boolean(this.formData.hasNewName);
            const newName = hasNewName
                ? {
                      newName: this.formData.newName,
                      newLastname: this.formData.newLastname,
                  }
                : {};

            const data = {
                ...this.formData,
                ...newName,
                birthday,
                hasNewName,
                passport,
            };

            console.log(JSON.stringify(data, null, 2));

            this.resetForm();
        },
        resetForm() {
            this.formData = getInitialFormData();
            this.filterCitizenships();
            this.$refs.validation.reset();
        },
    },
};
</script>
