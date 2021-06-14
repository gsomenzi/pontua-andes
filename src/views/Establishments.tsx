import React from 'react';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';

const breadCrumbItems = [{ title: 'Estabelecimentos' }];

export default function Establishments() {
    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs items={breadCrumbItems} />
            Estabelecimentos
        </PageContainer>
    );
}
