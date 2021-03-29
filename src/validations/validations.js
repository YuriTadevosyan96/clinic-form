import { required, maxLength, helpers } from "@vuelidate/validators";

//overwrite messages to russian
const CUSTOM_REQUIRED_MESSAGE = "Поле обязательно для заполнения";
export const customRequired = () => ({
    required: helpers.withMessage(CUSTOM_REQUIRED_MESSAGE, required),
});

const SYMBOL_MAX_LENGTH = 250;
const CUSTOM_MAX_LENGTH_MESSAGE = `Mаксимальное количество символов ${SYMBOL_MAX_LENGTH}`;
export const customMaxLength = () => ({
    maxLength: helpers.withMessage(CUSTOM_MAX_LENGTH_MESSAGE, maxLength(SYMBOL_MAX_LENGTH)),
});

//overwrite to work for any language
const customAlphaFunction = (value) => !helpers.req(value) || !/([^\p{L}\s-])/gu.test(value); //regex for only (letters, space, -)
const CUSTOM_ALPHA_MESSAGE = `Допускаются только буквы, пробел, тире`;
export const customAlpha = () => ({
    customAlpha: helpers.withMessage(CUSTOM_ALPHA_MESSAGE, customAlphaFunction),
});

const customPhoneNumberFormatFunction = (value) => !helpers.req(value) || /\+7\d{10}/.test(value);
const CUSTOM_PHONE_NUMBER_FORMAT_MESSAGE = `Tелефонный номер не полный`;
export const customPhoneNumberFormat = () => ({
    customPhoneNumberFormat: helpers.withMessage(CUSTOM_PHONE_NUMBER_FORMAT_MESSAGE, customPhoneNumberFormatFunction),
});

//address index for Russia is 6 digit number
const customAddressIndexFormatFunction = (value) => !helpers.req(value) || /d{6}/.test(value);
const CUSTOM_ADDRESS_INDEX_FORMAT_MESSAGE = "Пожалуйста, введите все 6 цифр индекса.";
export const customAddressIndexFormat = () => ({
    customAddressIndexFormat: helpers.withMessage(CUSTOM_ADDRESS_INDEX_FORMAT_MESSAGE, customAddressIndexFormatFunction),
});
