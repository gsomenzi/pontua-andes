import React from 'react';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';

export default function Home() {
    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs />
            <h1>Dashboard</h1>
            <hr className="mt-0" />
        </PageContainer>
    );
}
