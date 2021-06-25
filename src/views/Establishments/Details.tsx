import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import BreadCrumbs from '../../components/atoms/BreadCrumbs';
import PageContainer from '../../components/atoms/PageContainer';
import PageHeader from '../../components/molecules/PageHeader';
import { RootState } from '../../store';
import { getOne } from '../../store/slices/establishment';
import { getByEstablishment } from '../../store/slices/statistic';
import moment from 'moment';
import 'moment/locale/pt-br';
import { TabDashboard } from '../../components/organisms/Establishments/TabDashboard';
import { TabInfos } from '../../components/organisms/Establishments/TabInfos';

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
    const {
        loading: loadingStatistics,
        establishmentData,
        error: errorStatistic,
    } = useSelector((state: RootState) => state.statistic);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        console.log(item);
        console.log(establishmentData);
    }, [item, establishmentData]);

    useEffect(() => {
        dispatch(getOne(params.id));
        dispatch(getByEstablishment(params.id));
    }, [dispatch, params]);

    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs items={breadCrumbItems} />
            <PageHeader
                searchable={false}
                title="Detalhes do estabelecimento"
                loading={getting || loadingStatistics}
                actions={[
                    <Button tag={Link} to="/estabelecimentos" key="back">
                        Voltar
                    </Button>,
                ]}
            />
            {/* BODY */}
            {item ? (
                <div className="row">
                    <div className="col-12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={`${activeTab === 0 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(0)}
                                >
                                    Dashboard
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={`${activeTab === 1 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(1)}
                                >
                                    Dados
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={`${activeTab === 2 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(2)}
                                >
                                    Imagens
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={`${activeTab === 3 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(3)}
                                >
                                    Admins
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={`${activeTab === 4 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(4)}
                                >
                                    Prêmios
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={`${activeTab === 5 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(5)}
                                >
                                    Promoções
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={`${activeTab === 6 ? 'active' : ''}`}
                                    onClick={() => setActiveTab(6)}
                                >
                                    Cupons
                                </NavLink>
                            </NavItem>
                        </Nav>
                        {/* TABS */}
                        <div className="mt-2">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId={0}>
                                    <TabDashboard data={establishmentData} />
                                </TabPane>
                                <TabPane tabId={1}>
                                    <TabInfos establishment={item} />
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </div>
            ) : null}
        </PageContainer>
    );
}
