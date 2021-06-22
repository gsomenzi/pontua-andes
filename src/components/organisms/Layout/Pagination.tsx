import React from 'react';
import { Pagination as BootstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';

type Props = {
    onNavigate?: Function;
    data: {
        page: number;
        last: number;
    };
};

export default function Pagination(props: Props) {
    const { data, onNavigate } = props;

    function handleNavigate(e: any, page: number) {
        e.preventDefault();
        if (onNavigate) {
            onNavigate(page);
        }
    }

    function renderBefore() {
        if (data.page > 1) {
            return Array(data.page - 1)
                .fill(0)
                .map((e, i) => {
                    return (
                        <PaginationItem key={i}>
                            <PaginationLink href="/" onClick={(e) => handleNavigate(e, data.page - i - 1)}>
                                {data.page - i - 1}
                            </PaginationLink>
                        </PaginationItem>
                    );
                });
        }
    }

    function renderAfter() {
        if (data.last > data.page) {
            return Array(data.last - data.page)
                .fill(0)
                .map((e, i) => {
                    return (
                        <PaginationItem key={i}>
                            <PaginationLink href="/" onClick={(e) => handleNavigate(e, i + data.page + 1)}>
                                {i + data.page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    );
                });
        }
    }

    return (
        <BootstrapPagination>
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
            {renderBefore()}
            <PaginationItem>
                <PaginationLink href="#">{data.page}</PaginationLink>
            </PaginationItem>
            {renderAfter()}
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
        </BootstrapPagination>
    );
}
