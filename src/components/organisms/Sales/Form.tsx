import React, { useEffect, useCallback } from 'react';
import { Form as BootstrapForm, FormGroup, Label, Input, FormFeedback, Button, Spinner, CustomInput } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
// import classNames from 'classnames';
import 'moment/locale/pt-br';
import 'flatpickr/dist/themes/light.css';
// import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
// import Flatpickr from 'react-flatpickr';

type Props = {
    /**
     * Indica se o formulário deve indicar o status de carregando
     */
    loading?: boolean;
    /**
     * Método a ser executado quando o form for submetido
     */
    onSubmit?: Function;
    /**
     * Promoção em caso de edição
     */
    sale?: any;
};

/**
 * Campos que podem sofrer alteração em caso de edição
 */
const EDITABLE_FIELDS = ['nome', 'descricao', 'valor', 'inicio_validade', 'final_validade', 'ativo'];
/**
 * Schema para validação no form
 */
const schema = Yup.object().shape({
    nome: Yup.string().required('Por favor insira um nome'),
    descricao: Yup.string().required('Por favor insira uma descrição'),
    inicio_validade: Yup.string().required(),
    final_validade: Yup.string().notRequired(),
    ativo: Yup.bool().required(),
});

/**
 * Formulário de adição e edição da promoção
 */
export default function Form(props: Props) {
    const { loading, sale, onSubmit } = props;

    // FORMIK
    const formik = useFormik({
        initialValues: {
            nome: '',
            descricao: '',
            valor: 1,
            inicio_validade: moment().toISOString(),
            final_validade: moment().add(3, 'months').toISOString(),
            ativo: true,
        },
        validationSchema: schema,
        onSubmit: submit,
        enableReinitialize: true,
    });
    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors: formErrors, touched } = formik;
    // ATUALIZA CAMPOS AO EDITAR
    useEffect(() => {
        if (sale) {
            Object.keys(sale).map((key) => {
                if (EDITABLE_FIELDS.indexOf(key) > -1) {
                    setFieldValue(key, sale[key]);
                }
            });
        }
    }, [sale]);
    // INICIO VALIDADE
    // const handleStartDate = useCallback((v: any) => {
    // setFieldValue('inicio_validade', v && v.length ? v[0].toISOString() : null);
    // }, []);
    // FINAL VALIDADE
    // const handleEndDate = useCallback((v: any) => {
    // setFieldValue('final_validade', v && v.length ? v[0].toISOString() : null);
    // }, []);
    // SUBMIT
    function submit(values: any) {
        console.log(values);
        // if (onSubmit) {
        //     onSubmit(values);
        // }
    }
    // COMPONENTE
    return (
        <BootstrapForm onSubmit={handleSubmit}>
            {/* NOME */}
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
            {/* DESCRICAO */}
            <FormGroup>
                <Label>Descrição</Label>
                <Input
                    type="textarea"
                    rows={4}
                    value={values.descricao}
                    onBlur={handleBlur('descricao')}
                    onChange={handleChange('descricao')}
                    invalid={!!(formErrors.descricao && touched.descricao)}
                />
                <FormFeedback>{formErrors.descricao}</FormFeedback>
            </FormGroup>
            {/* INICIO VALIDADE */}
            {/* <FormGroup>
                <Label>Válida desde</Label>
                <Flatpickr
                    className={classNames('form-control', {
                        'is-invalid': !!formErrors.inicio_validade,
                    })}
                    defaultValue={values.inicio_validade}
                    onChange={handleStartDate}
                    options={{
                        dateFormat: 'd/m/Y',
                        locale: Portuguese,
                    }}
                />
                <FormFeedback>{formErrors.inicio_validade}</FormFeedback>
            </FormGroup> */}
            {/* FINAL VALIDADE */}
            {/* <FormGroup>
                <Label>Válida até</Label>
                <Flatpickr
                    className={classNames('form-control', {
                        'is-invalid': !!formErrors.final_validade,
                    })}
                    defaultValue={values.final_validade}
                    onChange={handleEndDate}
                    options={{
                        dateFormat: 'd/m/Y',
                        locale: Portuguese,
                    }}
                />
                <FormFeedback>{formErrors.final_validade}</FormFeedback>
            </FormGroup> */}
            {/* ATIVO */}
            <FormGroup>
                <CustomInput
                    type="switch"
                    id="switchAtivo"
                    name="ativo"
                    label="Promoção ativa no sistema"
                    checked={values.ativo}
                    onChange={(ev) => setFieldValue('ativo', ev.target.checked)}
                />
            </FormGroup>
            {/* SUBMIT */}
            <Button type="submit" disabled={loading} block>
                {loading ? <Spinner size="sm" /> : 'Salvar'}
            </Button>
        </BootstrapForm>
    );
}
