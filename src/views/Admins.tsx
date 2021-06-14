import React from 'react';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';

const breadCrumbItems = [{ title: 'Administradores' }];

export default function Admins() {
    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs items={breadCrumbItems} />
            Administradores
        </PageContainer>
    );
}
