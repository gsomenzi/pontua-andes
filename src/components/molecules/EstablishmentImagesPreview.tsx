import React from 'react';

type Props = {
    establishment: any;
};

function Avatar(props: any) {
    const { establishment } = props;
    const initials: string = establishment.nome_fantasia
        .split(' ')
        .map((word: string) => word.split('')[0])
        .join('')
        .substr(0, 2);
    return <div className="establishment-image-preview-avatar">{initials}</div>;
}
function Background(props: any) {
    return <div>asd</div>;
}

export default function EstablishmentImagesPreview(props: Props) {
    const { establishment } = props;
    return (
        <div>
            <Background establishment={establishment} />
            <Avatar establishment={establishment} />
        </div>
    );
}
