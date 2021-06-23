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
import { RootState } from '../store';
import { getAll, search, setPage, remove } from '../store/slices/user';
import ConfirmDialog from '../components/molecules/ConfirmDialog';
import Pagination from '../components/organisms/Layout/Pagination';

/**
 * Breadcrumbs no topo da página
 */
const breadCrumbItems = [{ title: 'Usuários' }];

/**
 * Página de usuários do Pontua
 */
export default function Users() {
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selected, setSelected] = useState({ id: 0 });
    const [openActionDropdown, setOpenActionDropdown] = useState();
    const dispatch = useDispatch();
    const { getting, removing, items, error, pagination } = useSelector((state: RootState) => state.user);

    /**
     * Busca todos os usuários ao montar a página
     */
    useEffect(() => {
        dispatch(getAll());
    }, [dispatch, pagination.page]);

    /**
     * Seleciona o usuário e mostra dropdown de mais do item
     * @param id ID do usuário
     */
    function handleMoreDropdown(id: any) {
        openActionDropdown === id ? setOpenActionDropdown(undefined) : setOpenActionDropdown(id);
    }

    /**
     * Dispara pesquisa ao alterar o input de pesquisa
     * @param ev Evento de alteração do input de pesquisa
     */
    function handleSearch(ev: any) {
        dispatch(search(ev.target.value));
    }

    /**
     * Desmarca item selecionado e abre o drawer
     */
    async function openAdd() {
        await setSelected({ id: 0 });
        setOpenDrawer(true);
    }

    /**
     * Seleciona um usuário e abre o drawer para edição
     * @param item Usuário a ser selecionado
     */
    async function openEdit(item: any) {
        await setSelected(item);
        setOpenDrawer(true);
    }

    /**
     * Seleciona um usuário e abre modal para confirmar a remoção
     * @param e Evento do link a ser cancelado
     * @param item Usuário a ser selecionado
     */
    function handleRemove(e: any, item: any) {
        e.preventDefault();
        setSelected(item);
        setShowRemoveModal(true);
    }

    // function submit(values: any) {
    //     if (selected && selected.id) {
    //         dispatch(update({ ...values, id: selected.id }));
    //     } else {
    //         dispatch(create(values));
    //     }
    // }

    /**
     * Renderiza os itens na tabela de usuários
     */
    function renderItems() {
        if (items) {
            return items.map((item, i) => {
                return (
                    <tr key={i} className="align-middle">
                        {/* Index */}
                        <td className="compact">{i + 1}</td>
                        {/* NOME e EMAIL */}
                        <td>
                            <div className="d-flex align-items-center">
                                {item.perfil ? (
                                    <div className="mr-2">
                                        <img className="user-avatar" src={item.perfil.avatar} />
                                    </div>
                                ) : null}
                                <div>
                                    <p className="mt-0 mb-0 font-weight-bold">{item.nome}</p>
                                    <p className="mt-0 mb-0">{item.email}</p>
                                </div>
                            </div>
                        </td>
                        <td className="compact">
                            <ButtonGroup size="sm">
                                {/* <Button onClick={(ev) => openEdit(item)} size="sm" color="primary">
                                    {updating && selected && selected.id === item.id ? <Spinner size="sm" /> : 'Editar'}
                                </Button> */}
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
                title="Usuários"
                loading={getting}
                searchPlaceholder="Pesquisar em usuários..."
                handleSearch={handleSearch}
                actions={[
                    <Button key="add" onClick={openAdd}>
                        Adicionar
                    </Button>,
                ]}
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
            <Pagination data={pagination} onNavigate={(page: number) => dispatch(setPage(page))} />
            <Drawer open={openDrawer} setOpen={setOpenDrawer} title="Editar usuário"></Drawer>
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
