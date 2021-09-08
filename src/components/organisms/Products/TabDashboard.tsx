import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import HistoryChart from './HistoryChart';
import TopCitiesChart from './TopCitiesChart';
import TopWeekdaysChart from './TopWeekdaysChart';
import LastScoresTable from './LastScoresTable';
import MostScoresUsersTable from './MostScoresUsersTable';

type Props = {
    data: ProductStatisticData;
};

export function TabDashboard(props: Props) {
    const { data } = props;
    return (
        <div>
            {/* CONTEUDO PRINCIPAL */}
            <Card className="mt-2 mb-2">
                <CardHeader>
                    <CardTitle>Histórico</CardTitle>
                </CardHeader>
                <CardBody>
                    <HistoryChart data={data} />
                </CardBody>
            </Card>
            {/* USUARIOS POR SEXO E FAIXA ETARIA */}
            <div className="row">
                <div className="col-12 col-md-6">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>Usuários x sexo</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <TopWeekdaysChart data={data} />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-6">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>Resgates x cidade</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <TopCitiesChart data={data} />
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/*  */}
            <div className="row">
                <div className="col-12 col-lg-6">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>
                                <i className="bi-hand-thumbs-up"></i>
                                <span className="p-2">Usuários pontuaram mais vezes</span>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <MostScoresUsersTable data={data} />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-lg-6">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>
                                <i className="bi-hand-thumbs-up"></i>
                                <span className="p-2">Últimos resgates</span>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <LastScoresTable data={data} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
