import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import ConfirmDialog from '../../molecules/ConfirmDialog';
import { signOut } from '../../../store/slices/auth';

export default function Sidebar() {
    const dispatch = useDispatch();
    const [showExitModal, setShowExitModal] = useState(false);

    function handleSignOut(e: any) {
        e.preventDefault();
        setShowExitModal(true);
    }

    return (
        <div id="main-sidebar">
            <div className="main-sidebar-menu">
                <Link activeClassName="active" exact to="/" className="main-sidebar-menu-item">
                    <i className="bi-bar-chart sidebar-menu-item-icon"></i>
                    <span className="sidebar-menu-item-text">Dashboard</span>
                </Link>
                <Link activeClassName="active" to="/categorias" className="main-sidebar-menu-item">
                    <i className="bi-bookmark sidebar-menu-item-icon"></i>
                    <span className="sidebar-menu-item-text">Categorias</span>
                </Link>
                <Link activeClassName="active" to="/estabelecimentos" className="main-sidebar-menu-item">
                    <i className="bi-shop sidebar-menu-item-icon"></i>
                    <span className="sidebar-menu-item-text">Estabelecimentos</span>
                </Link>
                <Link activeClassName="active" to="/admins" className="main-sidebar-menu-item">
                    <i className="bi-shield sidebar-menu-item-icon"></i>
                    <span className="sidebar-menu-item-text">Administradores</span>
                </Link>
                <Link activeClassName="active" to="/usuarios" className="main-sidebar-menu-item">
                    <i className="bi-person sidebar-menu-item-icon"></i>
                    <span className="sidebar-menu-item-text">Usuários</span>
                </Link>
                <a href="/" onClick={handleSignOut} className="main-sidebar-menu-item">
                    <i className="bi-box-arrow-left sidebar-menu-item-icon"></i>
                    <span className="sidebar-menu-item-text">Sair</span>
                </a>
            </div>
            <ConfirmDialog show={showExitModal} setShow={setShowExitModal} onConfirm={() => dispatch(signOut())} />
        </div>
    );
}
