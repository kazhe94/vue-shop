import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {useStore} from 'vuex'

export function useSignUpForm(fn) {
    const store = useStore()
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Поле email не может быть пустым')
            .email('Введён некорректный email')
    )
    const {value: name, errorMessage: nError, handleBlur: nBlur} = useField(
        'name',
        yup
            .string()
            .trim()
            .required('Заполните поле "Имя')
    )
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Введите пароль')
            .min(6, 'Минимальная длина пароля 6 символов')
    )

    const signUp = handleSubmit(fn)


    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        name,
        nError,
        nBlur,
        signUp,
        isSubmitting,
    }
}