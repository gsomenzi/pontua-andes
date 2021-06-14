import React from 'react';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';

const breadCrumbItems = [{ title: 'Categorias' }];

export default function Categories() {
    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs items={breadCrumbItems} />
            Categorias
        </PageContainer>
    );
}
