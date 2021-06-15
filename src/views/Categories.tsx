import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Table,
    InputGroup,
    Input,
    Spinner,
} from 'reactstrap';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';
import { RootState } from '../store';
import { getAll, search } from '../store/slices/category';

const breadCrumbItems = [{ title: 'Categorias' }];

export default function Categories() {
    const [openActionDropdown, setOpenActionDropdown] = useState();
    const dispatch = useDispatch();
    const { getting, items } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    function handleMoreDropdown(id: any) {
        openActionDropdown === id ? setOpenActionDropdown(undefined) : setOpenActionDropdown(id);
    }

    function handleSearch(ev: any) {
        dispatch(search(ev.target.value));
    }

    function renderItems() {
        if (items) {
            return items.map((item, i) => {
                return (
                    <tr key={i}>
                        <td className="compact">{i + 1}</td>
                        <td>{item.nome}</td>
                        <td className="compact">
                            <ButtonGroup size="sm">
                                <Button color="primary">Editar</Button>
                                <ButtonDropdown
                                    isOpen={openActionDropdown === item.id}
                                    toggle={() => handleMoreDropdown(item.id)}
                                >
                                    <DropdownToggle color="light" caret>
                                        Mais
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Remover</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup>
                        </td>
                    </tr>
                );
            });
        }
    }

    return (
        <PageContainer padded hasSidebar>
            <BreadCrumbs items={breadCrumbItems} />
            <div className="d-flex align-items-center justify-content-between">
                <h1>Categorias</h1>
                {getting ? <Spinner color="secondary" /> : null}
            </div>
            <hr className="mt-0" />
            <InputGroup className="mb-3">
                <Input placeholder="Pesquisar em categorias..." onChange={handleSearch} />
            </InputGroup>
            <Table bordered striped hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>{renderItems()}</tbody>
            </Table>
        </PageContainer>
    );
}
