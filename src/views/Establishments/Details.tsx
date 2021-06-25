import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import BreadCrumbs from '../../components/atoms/BreadCrumbs';
import PageContainer from '../../components/atoms/PageContainer';
import PageHeader from '../../components/molecules/PageHeader';
import { RootState } from '../../store';
import { getOne } from '../../store/slices/establishment';
import moment from 'moment';
import 'moment/locale/pt-br';

type Props = {
    match: any;
};

/**
 * Breadcrumbs no topo da página
 */
const breadCrumbItems = [{ title: 'Estabelecimentos' }];

export default function UserDetails(props: Props) {
    const { match } = props;
    const { params } = match;
    const dispatch = useDispatch();
    const { getting, item, error } = useSelector((state: RootState) => state.establishment);

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
                title="Detalhes do estabelecimento"
                loading={getting}
                actions={[
                    <Button tag={Link} to="/estabelecimentos" key="back">
                        Voltar
                    </Button>,
                ]}
            />
            {/* BODY */}
            {item ? <div className="row"></div> : null}
        </PageContainer>
    );
}
