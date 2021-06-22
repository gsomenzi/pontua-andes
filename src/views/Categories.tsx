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
    Spinner,
} from 'reactstrap';
import BreadCrumbs from '../components/atoms/BreadCrumbs';
import PageContainer from '../components/atoms/PageContainer';
import Drawer from '../components/molecules/Drawer';
import PageHeader from '../components/molecules/PageHeader';
import CategoriesForm from '../components/organisms/Categories/Form';
import { RootState } from '../store';
import { getAll, search, remove } from '../store/slices/category';
import ConfirmDialog from '../components/molecules/ConfirmDialog';

const breadCrumbItems = [{ title: 'Categorias' }];

export default function Categories() {
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selected, setSelected] = useState({ id: 0 });
    const [openActionDropdown, setOpenActionDropdown] = useState();
    const dispatch = useDispatch();
    const { getting, removing, items, error } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    function handleMoreDropdown(id: any) {
        openActionDropdown === id ? setOpenActionDropdown(undefined) : setOpenActionDropdown(id);
    }

    function handleSearch(ev: any) {
        dispatch(search(ev.target.value));
    }

    async function openEdit(item: any) {
        await setSelected(item);
        setOpenDrawer(true);
    }

    function handleRemove(e: any, item: any) {
        e.preventDefault();
        setSelected(item);
        setShowRemoveModal(true);
    }

    function renderItems() {
        if (items) {
            return items.map((item, i) => {
                return (
                    <tr key={i} className="align-middle">
                        <td className="compact">{i + 1}</td>
                        <td>{item.nome}</td>
                        <td className="compact">
                            <ButtonGroup size="sm">
                                <Button onClick={(ev) => openEdit(item)} size="sm" color="primary">
                                    Editar
                                </Button>
                                <ButtonDropdown
                                    isOpen={openActionDropdown === item.id}
                                    toggle={() => handleMoreDropdown(item.id)}
                                >
                                    <DropdownToggle size="sm" color="light" caret>
                                        {removing && selected && selected.id === item.id ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            'Mais'
                                        )}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={(ev) => handleRemove(ev, item)}>Remover</DropdownItem>
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
            <PageHeader
                title="Categorias"
                loading={getting}
                searchPlaceholder="Pesquisar em categorias..."
                handleSearch={handleSearch}
            />
            <Table bordered striped hover responsive>
                <thead>
                    <tr>
                        <th className="compact">#</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>{renderItems()}</tbody>
            </Table>
            <Drawer open={openDrawer} setOpen={setOpenDrawer}>
                <CategoriesForm category={selected ? selected : undefined} />
            </Drawer>
            <ConfirmDialog
                title="Remover o item?"
                text="Você tem certeza que deseja remover este item?"
                show={showRemoveModal}
                setShow={setShowRemoveModal}
                onConfirm={() => dispatch(remove(selected.id))}
            />
        </PageContainer>
    );
}
