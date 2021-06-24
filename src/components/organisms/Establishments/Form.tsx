import React, { useEffect, useState } from 'react';
import { Form as BootstrapForm, FormGroup, Label, Input, FormFeedback, Button, ButtonGroup, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import VerticalSteps from '../../molecules/VerticalSteps';

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
     * Estabelecimento em caso de edição
     */
    establishment?: any;
};

/**
 * Campos que podem sofrer alteração em caso de edição
 */
const EDITABLE_FIELDS = ['razao_social', 'nome_fantasia', 'tipo', 'cnpj', 'cpf', 'email'];
/**
 * Schema para validação no form
 */
const schema = Yup.object().shape({
    razao_social: Yup.string().required('Por favor insira uma razão social'),
    email: Yup.string().required('Por favor insira um e-mail').email('Por favor insira um e-mail válido'),
    tipo: Yup.string().required('Por favor selecione um tipo').oneOf(['pessoa_fisica', 'pessoa_juridica']),
});

/**
 * Formulário de adição e edição do estabelecimento
 */
export default function Form(props: Props) {
    const { loading, establishment, onSubmit } = props;
    const [activeStep, setActiveStep] = useState(0);

    // FORMIK
    const formik = useFormik({
        initialValues: {
            razao_social: '',
            email: '',
            nome_fantasia: '',
            tipo: 'pessoa_juridica',
            cnpj: '',
            cpf: '',
        },
        validationSchema: schema,
        onSubmit: submit,
        enableReinitialize: true,
    });
    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors: formErrors, touched } = formik;
    // ATUALIZA CAMPOS AO EDITAR
    useEffect(() => {
        if (establishment) {
            Object.keys(establishment).map((key) => {
                if (EDITABLE_FIELDS.indexOf(key) > -1) {
                    setFieldValue(key, establishment[key]);
                }
            });
        }
    }, [establishment]);
    // SUBMIT
    function submit(values: any) {
        if (onSubmit) {
            onSubmit(values);
        }
    }
    // COMPONENTE
    return (
        <BootstrapForm onSubmit={handleSubmit}>
            <VerticalSteps activeStep={activeStep} setActiveStep={setActiveStep}>
                {/* STEP 1 */}
                <VerticalSteps.Step title="Geral">
                    {/* RAZAO SOCIAL */}
                    <FormGroup>
                        <Label>Razão social</Label>
                        <Input
                            value={values.razao_social}
                            onBlur={handleBlur('razao_social')}
                            onChange={handleChange('razao_social')}
                            invalid={!!(formErrors.razao_social && touched.razao_social)}
                        />
                        <FormFeedback>{formErrors.razao_social}</FormFeedback>
                    </FormGroup>
                    {/* NOME FANTASIA */}
                    <FormGroup>
                        <Label>Nome fantasia</Label>
                        <Input
                            value={values.nome_fantasia}
                            onBlur={handleBlur('nome_fantasia')}
                            onChange={handleChange('nome_fantasia')}
                            invalid={!!(formErrors.nome_fantasia && touched.nome_fantasia)}
                        />
                        <FormFeedback>{formErrors.nome_fantasia}</FormFeedback>
                    </FormGroup>
                    {/* TIPO */}
                    <FormGroup>
                        <Label>Tipo</Label>
                        <Input
                            type="select"
                            value={values.tipo}
                            onBlur={handleBlur('tipo')}
                            onChange={handleChange('tipo')}
                            invalid={!!(formErrors.tipo && touched.tipo)}
                        >
                            <option value="pessoa_juridica">Pessoa jurídica</option>
                            <option value="pessoa_fisica">Pessoa física</option>
                        </Input>
                        <FormFeedback>{formErrors.tipo}</FormFeedback>
                    </FormGroup>
                    {/* CNPJ */}
                    {values.tipo === 'pessoa_juridica' ? (
                        <FormGroup>
                            <Label>CNPJ</Label>
                            <Input
                                value={values.cnpj}
                                onBlur={handleBlur('cnpj')}
                                onChange={handleChange('cnpj')}
                                invalid={!!(formErrors.cnpj && touched.cnpj)}
                            />
                            <FormFeedback>{formErrors.cnpj}</FormFeedback>
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <Label>CPF</Label>
                            <Input
                                value={values.cpf}
                                onBlur={handleBlur('cpf')}
                                onChange={handleChange('cpf')}
                                invalid={!!(formErrors.cpf && touched.cpf)}
                            />
                            <FormFeedback>{formErrors.cpf}</FormFeedback>
                        </FormGroup>
                    )}
                    {/* AVANCAR */}
                    <Button onClick={() => setActiveStep(1)}>Avançar</Button>
                </VerticalSteps.Step>
                {/* STEP 2 */}
                <VerticalSteps.Step title="Contato">
                    <FormGroup>
                        <Label>E-mail</Label>
                        <Input
                            value={values.email}
                            onBlur={handleBlur('email')}
                            onChange={handleChange('email')}
                            invalid={!!(formErrors.email && touched.email)}
                        />
                        <FormFeedback>{formErrors.email}</FormFeedback>
                    </FormGroup>
                    <ButtonGroup>
                        <Button onClick={() => setActiveStep(0)}>Voltar</Button>
                        <Button onClick={() => setActiveStep(2)}>Avançar</Button>
                    </ButtonGroup>
                </VerticalSteps.Step>
            </VerticalSteps>

            <Button type="submit" disabled={loading} block>
                {loading ? <Spinner size="sm" /> : 'Salvar'}
            </Button>
        </BootstrapForm>
    );
}
