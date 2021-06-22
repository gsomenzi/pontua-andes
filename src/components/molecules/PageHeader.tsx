import React, { ReactElement } from 'react';
import { Input, InputGroup, Spinner } from 'reactstrap';

type Props = {
    loading?: boolean;
    title: string;
    searchPlaceholder?: string;
    handleSearch?: Function;
    actions?: ReactElement | ReactElement[];
};

export default function PageHeader(props: Props) {
    const { actions, loading, searchPlaceholder, handleSearch, title } = props;

    function renderActions() {
        if (!actions) return null;
        if (!Array.isArray(actions)) {
            return <>{actions}</>;
        } else {
            return actions.map((action, i) => {
                return (
                    <span className="ml-1" key={i}>
                        {action}
                    </span>
                );
            });
        }
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                {/* TITULO */}
                <h1>{title}</h1>
                <div className="d-flex align-items-center">
                    {/* LOADER */}
                    {loading ? <Spinner color="secondary" /> : null}
                    {/* ACOES */}
                    <div className="d-flex align-items-center">{renderActions()}</div>
                </div>
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
