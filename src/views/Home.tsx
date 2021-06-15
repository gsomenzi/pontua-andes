import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';
import HistoryChart from '../components/organisms/Statistic/HistoryChart';
import UserPerSexChart from '../components/organisms/Statistic/UserPerSexChart';
import UserPerAgeChart from '../components/organisms/Statistic/UserPerAgeChart';
import { RootState } from '../store';
import { getAll } from '../store/slices/statistic';

export default function Home() {
    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.statistic);

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs />
            <h1>Dashboard</h1>
            <hr className="mt-0" />
            <Card className="mb-3">
                <CardBody>
                    <HistoryChart data={data} />
                </CardBody>
            </Card>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Card>
                        <CardBody>
                            <UserPerSexChart data={data} />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-6">
                    <Card>
                        <CardBody>
                            <UserPerAgeChart data={data} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}
