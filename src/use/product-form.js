import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export function useProductForm(fn) {
    const {isSubmitting, handleSubmit} = useForm()
    const {value: title, errorMessage: titleError, handleBlur: titleBlur} = useField(
        'title',
        yup.string()
            .trim()
            .required('Введите название категории')
    )

    const {value: count, errorMessage: countError, handleBlur: countBlur} = useField(
        'count',
        yup.number()
            .required('Укажите количество товара')
    )
    const {value: price, errorMessage: priceError, handleBlur: priceBlur} = useField(
        'price',
        yup.number()
            .required('Укажите количество товара')
            .min(1, 'Цена не может быть равна нулю')
    )
    const {value: img, errorMessage: imgError, handleBlur: imgBlur} = useField(
        'img',
        yup.string()
            .required('Укажите ссылку на изображение')
            .trim()
    )

    const {value: category, errorMessage: categoryError, handleBlur: categoryBlur} = useField('category')

    const onSubmit = handleSubmit(fn)

    return {
        onSubmit,
        isSubmitting,
        title, titleError, titleBlur,
        category, categoryError, categoryBlur,
        count, countError, countBlur,
        price, priceError, priceBlur,
        img, imgError, imgBlur
    }
}