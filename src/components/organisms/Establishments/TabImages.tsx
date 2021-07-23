import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllByEstablishment, update, upload, remove } from '../../../store/slices/establishmentImage';
import { RootState } from '../../../store';
import { Card, CardImg, CardBody, CardLink, Spinner, Button } from 'reactstrap';
import ConfirmDialog from '../../molecules/ConfirmDialog';
import Dropzone from '../../molecules/Dropzone';
import EstablishmentImagesPreview from '../../molecules/EstablishmentImagesPreview';

type TabImageProps = {
    establishment: any;
};

export default function TabImages(props: TabImageProps) {
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selected, setSelected] = useState({ id: 0 });
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
     * Seleciona uma imagem e abre modal para confirmar a remoção
     * @param e Evento do link a ser cancelado
     * @param item Imagem a ser selecionada
     */
    function handleRemove(e: any, item: any) {
        e.preventDefault();
        setSelected(item);
        setShowRemoveModal(true);
    }

    function handleCover(e: any, item: any) {
        e.preventDefault();
        setSelected(item);
        dispatch(update({ id: item.id, capa: true }));
    }

    function handleProfile(e: any, item: any) {
        e.preventDefault();
        setSelected(item);
        dispatch(update({ id: item.id, perfil: true }));
    }

    /**
     * Renderiza itens da tabela
     */
    function renderItems() {
        return items.map((item, i) => {
            const isUpdating = selected && selected.id === item.id && updating;
            const isRemoving = selected && selected.id === item.id && removing;
            return (
                <div className="col-6 col-md-4 col-lg-3" key={i}>
                    <Card>
                        <CardImg src={item.quadrado} />
                        <CardBody>
                            <div className="d-flex align-items-center">
                                {!item.capa ? (
                                    <CardLink
                                        className="text-primary text-nowrap"
                                        href="#"
                                        onClick={(e: any) => handleCover(e, item)}
                                    >
                                        {isUpdating ? <Spinner size="sm" /> : <span>Usar capa</span>}
                                    </CardLink>
                                ) : null}
                                {!item.perfil ? (
                                    <CardLink
                                        className="text-secondary text-nowrap"
                                        href="#"
                                        onClick={(e: any) => handleProfile(e, item)}
                                    >
                                        {isUpdating ? <Spinner size="sm" /> : <span>Usar perfil</span>}
                                    </CardLink>
                                ) : null}
                            </div>
                            <Button
                                disabled={isRemoving}
                                color="danger"
                                outline
                                block
                                onClick={(e: any) => handleRemove(e, item)}
                            >
                                {isRemoving ? <Spinner size="sm" /> : <span>Remover</span>}
                            </Button>
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
            <div className="row align-items-center">
                <div className="col-12">
                    <EstablishmentImagesPreview establishment={establishment} />
                </div>
            </div>
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
