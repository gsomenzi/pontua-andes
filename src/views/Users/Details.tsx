import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Table } from 'reactstrap';
import BreadCrumbs from '../../components/atoms/BreadCrumbs';
import PageContainer from '../../components/atoms/PageContainer';
import PageHeader from '../../components/molecules/PageHeader';
import { RootState } from '../../store';
import { getOne } from '../../store/slices/user';
import moment from 'moment';
import 'moment/locale/pt-br';

type Props = {
    match: any;
};

/**
 * Breadcrumbs no topo da página
 */
const breadCrumbItems = [{ title: 'Usuários' }];

export default function UserDetails(props: Props) {
    const { match } = props;
    const { params } = match;
    const dispatch = useDispatch();
    const { getting, removing, item, error, pagination } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        console.log(item);
    }, [item]);

    useEffect(() => {
        dispatch(getOne(params.id));
    }, [dispatch, params]);

    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs items={breadCrumbItems} />
            <PageHeader
                searchable={false}
                title="Detalhes do usuário"
                loading={getting}
                actions={[
                    <Button tag={Link} to="/usuarios" key="back">
                        Voltar
                    </Button>,
                ]}
            />
            {/* BODY */}
            {item ? (
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Card>
                            <CardBody className="text-center">
                                <img src={item.perfil ? item.perfil.avatar : ''} className="user-avatar-large mb-3" />
                                <h4 className="mb-0">{item.nome}</h4>
                                <p>{item.email}</p>
                                <Table className="text-left">
                                    <tbody>
                                        <tr>
                                            <td>Local</td>
                                            <td className="text-right font-weight-bold">
                                                {item.cidade}/{item.estado}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Idade</td>
                                            <td className="text-right font-weight-bold">
                                                {item.data_nascimento
                                                    ? moment(item.data_nascimento).fromNow(true)
                                                    : 'Não informado'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sexo</td>
                                            <td className="text-right font-weight-bold">
                                                {item.nome_sexo ? item.nome_sexo : 'Não informado'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Escolaridade</td>
                                            <td className="text-right font-weight-bold">
                                                {item.nome_escolaridade ? item.nome_escolaridade : 'Não informado'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            ) : null}
        </PageContainer>
    );
}
