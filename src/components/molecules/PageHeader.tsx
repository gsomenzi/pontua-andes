import React from 'react';
import { Input, InputGroup, Spinner } from 'reactstrap';

type Props = {
    loading?: boolean;
    title: string;
    searchPlaceholder?: string;
    handleSearch?: Function;
};

export default function PageHeader(props: Props) {
    const { loading, searchPlaceholder, handleSearch, title } = props;
    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h1>{title}</h1>
                {loading ? <Spinner color="secondary" /> : null}
            </div>
            <hr className="mt-0" />
            <div className="row">
                <div className="col-12 col-md-4">
                    <InputGroup className="mb-3">
                        <Input
                            placeholder={searchPlaceholder || ''}
                            onChange={(ev) => (handleSearch ? handleSearch(ev) : null)}
                        />
                    </InputGroup>
                </div>
            </div>
        </div>
    );
}
