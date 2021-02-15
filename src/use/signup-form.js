import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {useStore} from 'vuex'

export function useSignUpForm() {
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
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Введите пароль')
            .min(6, 'Минимальная длина пароля 6 символов')
    )

    const signUp = handleSubmit(async (values)=> {
        try {
            console.log(values)
            await store.dispatch('signup/signUp', values)
        } catch (e) {}
    })


    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        signUp,
        isSubmitting,
    }
}