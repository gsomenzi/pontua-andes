import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllByEstablishment, create, update, remove } from '../../../store/slices/sale';
import { RootState } from '../../../store';
import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
    Table,
} from 'reactstrap';
import ConfirmDialog from '../../molecules/ConfirmDialog';
import SalesForm from '../Sales/Form';
import Drawer from '../../molecules/Drawer';

/**
 * Resumo da promoção
 * @param props
 * @returns
 */
function SaleId(props: any) {
    const { sale } = props;
    return (
        <div className="d-flex align-items-center">
            {sale.perfil ? (
                <div className="mr-2">
                    <img className="user-avatar" src={sale.perfil.avatar} />
                </div>
            ) : null}
            <div>
                <p className="mt-0 mb-0 font-weight-bold">{sale.nome}</p>
            </div>
        </div>
    );
}

type Props = {
    establishment: any;
};

export default function TabSales(props: Props) {
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selected, setSelected] = useState({ id: 0 });
    const [openActionDropdown, setOpenActionDropdown] = useState();
    const dispatch = useDispatch();
    const { establishment } = props;
    const { creating, getting, updating, removing, error, items } = useSelector((state: RootState) => state.sale);
    /**
     * Busca todas as promoções do estabelecimento
     */
    useEffect(() => {
        if (establishment) {
            dispatch(getAllByEstablishment(establishment.id));
        }
    }, [establishment]);
    /**
     * Seleciona o estabelecimento e mostra dropdown de mais do item
     * @param id ID do estabelecimento
     */
    function handleMoreDropdown(id: any) {
        openActionDropdown === id ? setOpenActionDropdown(undefined) : setOpenActionDropdown(id);
    }
    /**
     * Desmarca item selecionado e abre o drawer
     */
    async function openAdd() {
        await setSelected({ id: 0 });
        setOpenDrawer(true);
    }
    /**
     * Seleciona um estabelecimento e abre o drawer para edição
     * @param item Estabelecimento a ser selecionado
     */
    async function openEdit(item: any) {
        await setSelected(item);
        setOpenDrawer(true);
    }
    /**
     * Seleciona um estabelecimento e abre modal para confirmar a remoção
     * @param e Evento do link a ser cancelado
     * @param item Estabelecimento a ser selecionado
     */
    function handleRemove(e: any, item: any) {
        e.preventDefault();
        setSelected(item);
        setShowRemoveModal(true);
    }

    function submit(values: any) {
        if (selected && selected.id) {
            dispatch(
                update({
                    ...values,
                    estabelecimentos_id: establishment.id,
                    id: selected.id,
                })
            );
        } else {
            dispatch(create({ ...values, estabelecimentos_id: establishment.id }));
        }
    }
    /**
     * Renderiza itens da tabela
     */
    function renderItems() {
        return items.map((item, i) => {
            return (
                <tr className="align-middle" key={item.id}>
                    <td>{i + 1}</td>
                    <td>
                        <SaleId sale={item} />
                    </td>
                    <td className="text-right">
                        <ButtonGroup size="sm">
                            <Button onClick={(ev) => openEdit(item)} size="sm" color="primary">
                                {updating && selected && selected.id === item.id ? <Spinner size="sm" /> : 'Editar'}
                            </Button>
                            <ButtonDropdown
                                isOpen={openActionDropdown === item.id}
                                toggle={() => handleMoreDropdown(item.id)}
                            >
                                <DropdownToggle size="sm" color="light" caret>
                                    {removing && selected && selected.id === item.id ? <Spinner size="sm" /> : 'Mais'}
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
    return (
        <div>
            <div className="d-flex align-items-center pb-2">
                <Button className="mr-1" onClick={openAdd}>
                    Adicionar
                </Button>
                {getting ? <Spinner /> : null}
            </div>
            <Table bordered striped>
                <thead>
                    <tr>
                        <th className="compact">#</th>
                        <th>Nome</th>
                        <th className="text-right">Ações</th>
                    </tr>
                </thead>
                <tbody>{renderItems()}</tbody>
            </Table>
            <Drawer open={openDrawer} setOpen={setOpenDrawer} title="Editar promoção">
                <SalesForm loading={creating || updating} sale={selected ? selected : undefined} onSubmit={submit} />
            </Drawer>
            <ConfirmDialog
                title="Remover o item?"
                text="Você tem certeza que deseja remover este item?"
                show={showRemoveModal}
                setShow={setShowRemoveModal}
                onConfirm={() => dispatch(remove(selected.id))}
            />
        </div>
    );
}