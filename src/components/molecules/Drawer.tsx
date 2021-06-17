import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
    open: boolean;
    setOpen: Function;
};

export default function Drawer(props: Props) {
    const { open, setOpen } = props;
    return createPortal(() => {
        return open ? (
            <div className="drawer-wrapper">
                <div className="drawer-overlay" onClick={() => setOpen(false)}></div>
                <div className="drawer-panel">Drawer</div>
            </div>
        ) : null;
    }, document.getElementsByTagName('body')[0]);
}
