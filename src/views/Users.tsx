import React from 'react';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';

const breadCrumbItems = [{ title: 'Usuários' }];

export default function Users() {
    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs items={breadCrumbItems} />
            Usuários
        </PageContainer>
    );
}
