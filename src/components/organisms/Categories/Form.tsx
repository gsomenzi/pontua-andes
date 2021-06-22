import React, { useEffect } from 'react';
import { Form as BootstrapForm, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
    category?: any;
};

const EDITABLE_FIELDS = ['nome'];
const schema = Yup.object().shape({
    nome: Yup.string().required('Por favor insira um nome'),
});

export default function Form(props: Props) {
    const { category } = props;

    const formik = useFormik({
        initialValues: {
            nome: category ? category.nome : '',
        },
        validationSchema: schema,
        onSubmit: submit,
        enableReinitialize: true,
    });

    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors: formErrors, touched } = formik;

    useEffect(() => {
        if (category) {
            Object.keys(category).map((key) => {
                if (EDITABLE_FIELDS.indexOf(key) > -1) {
                    setFieldValue(key, category[key]);
                }
            });
        }
    }, [category]);

    function submit(values: any) {
        console.log(values);
    }

    return (
        <div>
            <BootstrapForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input
                        value={values.nome}
                        onBlur={handleBlur('nome')}
                        onChange={handleChange('nome')}
                        invalid={!!(formErrors.nome && touched.nome)}
                    />
                    <FormFeedback>{formErrors.nome}</FormFeedback>
                </FormGroup>
                <Button type="submit" block>
                    Salvar
                </Button>
            </BootstrapForm>
        </div>
    );
}
