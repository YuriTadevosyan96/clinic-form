<template>
    <form class="main-form" @submit.prevent="handleSubmit">
        <div v-show="clientSuccessfullyCreatedDisplay" class="inform-success">Новый клиент успешно создан</div>
        <div class="inform-required-fields">Поля со<RequiredAsterisk />обязательны для заполнения</div>
        <div class="user-main-info">
            <FormInputError :validationErrors="v$.formData.surname.value.$errors" />
            <div class="form-group">
                <label for="surname">Фамилия<RequiredAsterisk /></label>
                <input
                    :class="{ 'invalid-input': surnameIsInvalid }"
                    v-model.trim="formData.surname.value"
                    class="form-control"
                    type="text"
                    id="surname"
                    name="surname"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.name.value.$errors" />
            <div class="form-group">
                <label for="name">Имя<RequiredAsterisk /></label>
                <input :class="{ 'invalid-input': nameIsInvalid }" v-model.trim="formData.name.value" class="form-control" type="text" id="name" name="name" />
            </div>

            <FormInputError :validationErrors="v$.formData.middleName.$errors" />
            <div class="form-group">
                <label for="middle-name">Отчество</label>
                <input
                    :class="{ 'invalid-input': middleNameIsInvalid }"
                    v-model="formData.middleName"
                    class="form-control"
                    type="text"
                    id="middle-name"
                    name="middle-name"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.birthDate.value.$errors" />
            <div class="form-group">
                <label for="birth-date">Дата рождения<RequiredAsterisk /></label>
                <input
                    :class="{ 'invalid-input': birthDateIsInvalid }"
                    v-model="formData.birthDate.value"
                    class="form-control"
                    type="date"
                    id="birth-date"
                    name="birth-date"
                    :max="todayYYYYMMDD"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.phoneNumber.value.$errors" />
            <div class="form-group">
                <label for="phone-number">Номер телефона<RequiredAsterisk /></label>
                <input
                    :class="{ 'invalid-input': phoneNumberIsInvalid }"
                    v-model="formData.phoneNumber.value"
                    @input="handlePhoneInput"
                    class="form-control"
                    type="tel"
                    id="phone-number"
                    name="phone-number"
                />
            </div>

            <div class="form-group">
                <fieldset>
                    <legend>Пол</legend>
                    <template v-for="(gender, index) in formData.gender.options" :key="index">
                        <label :for="'gender_' + index">{{ gender }}</label>
                        <input class="mr-05" type="radio" :value="gender" v-model="formData.gender.selected" :id="'gender_' + index" name="gender" />
                    </template>
                </fieldset>
            </div>

            <FormInputError :validationErrors="v$.formData.clientGroup.selected.$errors" />
            <div class="form-group">
                <label for="client-group">Группа клиентов<RequiredAsterisk /></label>
                <select
                    :class="{ 'invalid-input': clientGroupIsInvalid }"
                    v-model="formData.clientGroup.selected"
                    class="custom-select multiselect"
                    name="client-group"
                    id="client-group"
                    multiple
                >
                    <option value="" disabled>Нажмите Ctrl для множественного выбора</option>
                    <option v-for="(client, index) in formData.clientGroup.options" :key="index">{{ client }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="therapist">Лечащий врач</label>
                <select class="custom-select" name="therapist" id="therapist" v-model="formData.therapist.selected">
                    <option value="" disabled>Выберите врача</option>
                    <option v-for="(therapist, index) in formData.therapist.options" :key="index">{{ therapist }}</option>
                </select>
            </div>

            <div class="form-group d-flex align-items-center">
                <label class="mr-05 mb-0" for="dont-send-sms">Не отправлять СМС</label>
                <input type="checkbox" name="dont-send-sms" id="dont-send-sms" v-model="formData.dontSendSMS" />
            </div>
        </div>
        <fieldset>
            <legend>Адрес</legend>

            <FormInputError :validationErrors="v$.formData.address.index.$errors" />
            <div class="form-group">
                <label for="address-index">Индекс</label>
                <input
                    :class="{ 'invalid-input': addressIndexIsInvalid }"
                    v-model="formData.address.index"
                    @input="handleAddressIndexInput"
                    class="form-control"
                    type="text"
                    id="address-index"
                    name="address-index"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.address.country.$errors" />
            <div class="form-group">
                <label for="address-country">Страна</label>
                <input
                    :class="{ 'invalid-input': addressCountryIsInvalid }"
                    v-model="formData.address.country"
                    class="form-control"
                    type="text"
                    id="address-country"
                    name="address-country"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.address.region.$errors" />
            <div class="form-group">
                <label for="address-region">Область</label>
                <input
                    :class="{ 'invalid-input': addressRegionIsInvalid }"
                    v-model="formData.address.region"
                    class="form-control"
                    type="text"
                    id="address-region"
                    name="address-region"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.address.city.value.$errors" />
            <div class="form-group">
                <label for="address-city">Город<RequiredAsterisk /></label>
                <input
                    :class="{ 'invalid-input': addressCityIsInvalid }"
                    v-model="formData.address.city.value"
                    class="form-control"
                    type="text"
                    id="address-city"
                    name="address-city"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.address.street.$errors" />
            <div class="form-group">
                <label for="address-street">Улица</label>
                <input
                    :class="{ 'invalid-input': addressStreetIsInvalid }"
                    v-model="formData.address.street"
                    class="form-control"
                    type="text"
                    id="address-street"
                    name="address-street"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.address.house.$errors" />
            <div class="form-group">
                <label for="address-house">Дом</label>
                <input
                    :class="{ 'invalid-input': addressHouseIsInvalid }"
                    v-model="formData.address.house"
                    class="form-control"
                    type="text"
                    id="address-house"
                    name="address-house"
                />
            </div>
        </fieldset>

        <fieldset>
            <legend>Паспорт</legend>

            <FormInputError :validationErrors="v$.formData.passport.documentType.selected.$errors" />
            <div class="form-group">
                <label for="passport-document-type">Тип документа<RequiredAsterisk /></label>
                <select
                    :class="{ 'invalid-input': passportDocumentTypeIsInvalid }"
                    v-model="formData.passport.documentType.selected"
                    class="custom-select"
                    name="passport-document-type"
                    id="passport-document-type"
                >
                    <option disabled value="">Выберите документ</option>
                    <option v-for="(document, index) in formData.passport.documentType.options" :key="index">{{ document }}</option>
                </select>
            </div>

            <FormInputError :validationErrors="v$.formData.passport.documentSeries.$errors" />
            <div class="form-group">
                <label for="passport-document-series">Серия</label>
                <input
                    :class="{ 'invalid-input': passportDocumentSeriesIsInvalid }"
                    v-model="formData.passport.documentSeries"
                    class="form-control"
                    type="text"
                    id="passport-document-series"
                    name="passport-document-series"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.passport.documentNumber.$errors" />
            <div class="form-group">
                <label for="passport-document-number">Номер</label>
                <input
                    :class="{ 'invalid-input': passportDocumentNumberIsInvalid }"
                    v-model="formData.passport.documentNumber"
                    class="form-control"
                    type="text"
                    id="passport-document-number"
                    name="passport-document-number"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.passport.issuedBy.$errors" />
            <div class="form-group">
                <label for="passport-issued-by">Кем выдан</label>
                <input
                    :class="{ 'invalid-input': passportIssuedByIsInvalid }"
                    v-model="formData.passport.issuedBy"
                    class="form-control"
                    type="text"
                    id="passport-issued-by"
                    name="passport-issued-by"
                />
            </div>

            <FormInputError :validationErrors="v$.formData.passport.dateOfIssue.value.$errors" />
            <div class="form-group">
                <label for="passport-date-of-issue">Дата выдачи<RequiredAsterisk /></label>
                <input
                    :class="{ 'invalid-input': passportDateOfIssueIsInvalid }"
                    v-model="formData.passport.dateOfIssue.value"
                    class="form-control"
                    type="date"
                    id="passport-date-of-issue"
                    name="passport-date-of-issue"
                    :max="todayYYYYMMDD"
                />
            </div>
        </fieldset>
        <div class="form-group d-flex justify-content-end">
            <Button type="submit" :class="['btn-main', 'mt-1']">Отправить</Button>
        </div>
    </form>
</template>

<script>
import Button from "./Button.vue";
import RequiredAsterisk from "./RequiredAsterisk.vue";
import FormInputError from "./FormInputError.vue";
import useVuelidate from "@vuelidate/core";
import { customRequired, customMaxLength, customAlpha, customPhoneNumberFormat, customAddressIndexFormat } from "../validations/validations";

export default {
    name: "Form",
    components: {
        Button,
        RequiredAsterisk,
        FormInputError,
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },

    data() {
        return {
            clientSuccessfullyCreatedDisplay: false,
            formData: {
                name: { required: true, value: "" },
                surname: { required: true, value: "" },
                middleName: "",
                birthDate: { required: true, value: "" },
                phoneNumber: { required: true, value: "+7" },
                gender: {
                    selected: "",
                    options: ["Мужской", "Женский", "Другое"],
                },
                clientGroup: {
                    selected: [],
                    required: true,
                    multiSelect: true,
                    options: ["VIP", "Проблемные", "OMC"],
                },
                therapist: { selected: "", options: ["Иванов", "Захаров", "Чернышева"] }, // Лечащий врач
                dontSendSMS: false,
                address: {
                    index: "", //6 digit number for Russia
                    country: "",
                    region: "",
                    city: { required: true, value: "" },
                    street: "",
                    house: "",
                },
                passport: {
                    documentType: {
                        required: true,
                        selected: "",
                        options: ["Паспорт", "Свидетельство о рождении", "Вод. удостоверение"],
                    },
                    documentSeries: "", //Серия Документа
                    documentNumber: "",
                    issuedBy: "", //Кем выдан
                    dateOfIssue: { required: true, value: "" }, //Дата выдачи
                },
            },
        };
    },

    methods: {
        handleSubmit() {
            this.v$.$touch();
            if (this.v$.$error) {
                this.clientSuccessfullyCreatedDisplay = false;
                //focus on first invalid input
                //timeout is need for classes be applied and available in DOM
                setTimeout(() => {
                    document.querySelector(".main-form .invalid-input").focus();
                }, 0);
                return;
            }

            this.clientSuccessfullyCreatedDisplay = true;
            setTimeout(() => {
                document.querySelector(".main-form .inform-success").scrollIntoView({ block: "start" });
                setTimeout(() => {
                    this.clientSuccessfullyCreatedDisplay = false;
                }, 3000);
            }, 0);
        },

        //will fix phone format
        handlePhoneInput(event) {
            if (event.target.value.length == 0 || event.target.value.length == 1) {
                event.target.value = "+7";
            }

            let result = event.target.value.replace(/[^+\d]/g, "").match(/(\+7)(\d{0,10})/);

            event.target.value = result[1] + result[2];
        },

        //address index must be 6 digit number for Russia
        handleAddressIndexInput(event) {
            let result = event.target.value.replace(/\D/g, "").match(/(\d{0,6})/);
            event.target.value = result[1];
        },
    },

    computed: {
        //form input states
        nameIsInvalid() {
            return this.v$.formData.name.value.$error;
        },
        surnameIsInvalid() {
            return this.v$.formData.surname.value.$error;
        },
        middleNameIsInvalid() {
            return this.v$.formData.middleName.$error;
        },
        birthDateIsInvalid() {
            return this.v$.formData.birthDate.value.$error;
        },
        phoneNumberIsInvalid() {
            return this.v$.formData.phoneNumber.value.$error;
        },
        clientGroupIsInvalid() {
            return this.v$.formData.clientGroup.selected.$error;
        },
        addressIndexIsInvalid() {
            return this.v$.formData.address.index.$error;
        },
        addressCountryIsInvalid() {
            return this.v$.formData.address.country.$error;
        },
        addressRegionIsInvalid() {
            return this.v$.formData.address.region.$error;
        },
        addressCityIsInvalid() {
            return this.v$.formData.address.city.value.$error;
        },
        addressStreetIsInvalid() {
            return this.v$.formData.address.street.$error;
        },
        addressHouseIsInvalid() {
            return this.v$.formData.address.house.$error;
        },
        passportDocumentTypeIsInvalid() {
            return this.v$.formData.passport.documentType.selected.$error;
        },
        passportDocumentSeriesIsInvalid() {
            return this.v$.formData.passport.documentSeries.$error;
        },
        passportDocumentNumberIsInvalid() {
            return this.v$.formData.passport.documentNumber.$error;
        },
        passportIssuedByIsInvalid() {
            return this.v$.formData.passport.issuedBy.$error;
        },
        passportDateOfIssueIsInvalid() {
            return this.v$.formData.passport.dateOfIssue.value.$error;
        },

        //don't allow future date select
        todayYYYYMMDD() {
            const now = new Date();
            const month = now.getMonth() + 1;
            const monthToStr = month < 10 ? `0${month}` : month;
            const day = now.getDate();
            const dayToStr = day < 10 ? `0${day}` : day;
            return `${now.getFullYear()}-${monthToStr}-${dayToStr}`;
        },
    },

    validations() {
        return {
            formData: {
                name: {
                    value: { ...customRequired(), ...customMaxLength(), ...customAlpha(), $autoDirty: true },
                },
                surname: {
                    value: { ...customRequired(), ...customMaxLength(), ...customAlpha(), $autoDirty: true },
                },
                middleName: { ...customMaxLength(), ...customAlpha(), $autoDirty: true },
                birthDate: {
                    value: { ...customRequired(), $autoDirty: true },
                },
                phoneNumber: {
                    value: { ...customRequired(), ...customPhoneNumberFormat(), $autoDirty: true },
                },
                clientGroup: {
                    selected: { ...customRequired(), $autoDirty: true },
                },
                address: {
                    index: { ...customAddressIndexFormat(), $autoDirty: true }, //6 digit number for Russia
                    country: { ...customMaxLength(), ...customAlpha(), $autoDirty: true },
                    region: { ...customMaxLength(), ...customAlpha(), $autoDirty: true },
                    city: {
                        value: { ...customRequired(), ...customAlpha(), ...customMaxLength(), $autoDirty: true },
                    },
                    street: { ...customMaxLength(), $autoDirty: true },
                    house: { ...customMaxLength(), $autoDirty: true },
                },
                passport: {
                    documentType: {
                        selected: { ...customRequired(), $autoDirty: true },
                    },
                    documentSeries: { ...customMaxLength(), $autoDirty: true }, //Серия Документа
                    documentNumber: { ...customMaxLength(), $autoDirty: true },
                    issuedBy: { ...customMaxLength(), $autoDirty: true }, //Кем выдан
                    dateOfIssue: {
                        value: { ...customRequired(), $autoDirty: true },
                    },
                },
            },
        };
    },
};
</script>

<style lang="sass">
@use '../assets/sass/variables' as variables
@use '../assets/sass/global'
.main-form
    width: 50%
    border: 1px solid variables.$color-secondary
    padding: 1rem 1rem .5rem 1rem
    border-radius: 5px
    max-width: 1200px

.inform-required-fields
    margin-bottom: .5rem
    font-size: 1.1rem
    color: variables.$color-info

.inform-success
    text-align: center
    color: #28a745
    font-size: 1.2rem

.form-group
    margin-bottom: 1rem

.invalid-input
    border: 1px solid variables.$color-danger !important

@media (max-width: 1200px)
    .main-form
        width: 70%

@media (max-width: 768px)
    .main-form
        width: 100%
</style>
