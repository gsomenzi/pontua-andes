import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllByEstablishment, remove } from '../../../store/slices/establishmentImage';
import { RootState } from '../../../store';
import { Card, CardImg, CardBody, CardLink, Spinner } from 'reactstrap';
import ConfirmDialog from '../../molecules/ConfirmDialog';
import Dropzone from '../../molecules/Dropzone';
import { upload } from '../../../store/slices/establishmentImage';

type Props = {
    establishment: any;
};

export default function TabImages(props: Props) {
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selected, setSelected] = useState({ id: 0 });
    const [openActionDropdown, setOpenActionDropdown] = useState();
    const dispatch = useDispatch();
    const { establishment } = props;
    const { uploading, getting, updating, removing, error, items } = useSelector(
        (state: RootState) => state.establishmentImage
    );
    /**
     * Busca todas as imagens do estabelecimento
     */
    useEffect(() => {
        if (establishment) {
            dispatch(getAllByEstablishment(establishment.id));
        }
    }, [establishment]);
    /**
     * Seleciona a imagem e mostra dropdown de mais do item
     * @param id ID da imagem
     */
    function handleMoreDropdown(id: any) {
        openActionDropdown === id ? setOpenActionDropdown(undefined) : setOpenActionDropdown(id);
    }
    /**
     * Seleciona uma imagem e abre modal para confirmar a remoção
     * @param e Evento do link a ser cancelado
     * @param item Imagem a ser selecionada
     */
    function handleRemove(e: any, item: any) {
        e.preventDefault();
        setSelected(item);
        setShowRemoveModal(true);
    }

    function submit(values: any) {
        console.log({ ...values, estabelecimentos_id: establishment.id });
        // if (selected && selected.id) {
        //     dispatch(
        //         update({
        //             ...values,
        //             estabelecimentos_id: establishment.id,
        //             funcoes_estabelecimentos_id: 1,
        //             id: selected.id,
        //         })
        //     );
        // } else {
        //     dispatch(create({ ...values, estabelecimentos_id: establishment.id, funcoes_estabelecimentos_id: 1 }));
        // }
    }
    /**
     * Renderiza itens da tabela
     */
    function renderItems() {
        return items.map((item, i) => {
            return (
                <div className="col-6 col-md-4" key={i}>
                    <Card>
                        <CardImg src={item.quadrado} />
                        <CardBody>
                            <CardLink className="text-primary" href="#">
                                Usar capa
                            </CardLink>
                            <CardLink className="text-secondary" href="#">
                                Usar perfil
                            </CardLink>
                        </CardBody>
                    </Card>
                </div>
            );
        });
    }
    return (
        <div>
            {getting ? <Spinner /> : null}
            <Dropzone
                onDrop={(acceptedFiles: any) => {
                    dispatch(
                        upload({
                            id: establishment.id,
                            file: acceptedFiles[0],
                        })
                    );
                }}
            />
            <div className="row">{renderItems()}</div>
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
