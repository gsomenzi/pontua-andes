import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
// import HistoryChart from './HistoryChart';
// import UserPerSexChart from './UserPerSexChart';
// import UserPerAgeChart from './UserPerAgeChart';
// import MostScoresUsersTable from './MostScoresUsersTable';
// import LessScoresUsersTable from './LessScoresUsersTable';
// import TopScoresUsersTable from './TopScoresUsersTable';

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
                <CardBody>{/* <HistoryChart data={data} /> */}</CardBody>
            </Card>
            {/* USUARIOS POR SEXO E FAIXA ETARIA */}
            <div className="row">
                <div className="col-12 col-md-6">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>Usuários x sexo</CardTitle>
                        </CardHeader>
                        <CardBody>{/* <UserPerSexChart data={data} /> */}</CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-6">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>Usuários x faixa etária</CardTitle>
                        </CardHeader>
                        <CardBody>{/* <UserPerAgeChart data={data} /> */}</CardBody>
                    </Card>
                </div>
            </div>
            {/*  */}
            <div className="row">
                <div className="col-12 col-lg-4">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>
                                <i className="bi-graph-up"></i>
                                <span className="p-2">Usuários que mais pontuaram</span>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>{/* <TopScoresUsersTable data={data} /> */}</CardBody>
                    </Card>
                </div>
                <div className="col-12 col-lg-4">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>
                                <i className="bi-hand-thumbs-up"></i>
                                <span className="p-2">Usuários pontuaram mais vezes</span>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>{/* <MostScoresUsersTable data={data} /> */}</CardBody>
                    </Card>
                </div>
                <div className="col-12 col-lg-4">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>
                                <i className="bi-hand-thumbs-down"></i>
                                <span className="p-2">Usuários pontuaram menos vezes</span>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>{/* <LessScoresUsersTable data={data} /> */}</CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
