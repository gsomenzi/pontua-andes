import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PageLoader from './components/molecules/PageLoader';
import Sidebar from './components/organisms/Layout/Sidebar';
import { RootState } from './store';
import { getLocalAccessToken } from './store/slices/auth';

import Login from './views/auth/Login';
import Home from './views/Home';
import Categories from './views/Categories';
import Establishments from './views/Establishments';
import Admins from './views/Admins';
// USUARIOS
import Users from './views/Users/List';
import UserDetails from './views/Users/Details';

export default function Router() {
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch();
    const { access_token } = useSelector((state: RootState) => state.auth);

    async function initApp() {
        await dispatch(getLocalAccessToken());
        setTimeout(() => setReady(true), 1000);
    }

    useEffect(() => {
        initApp();
    }, [dispatch]);

    return ready ? (
        <BrowserRouter>
            <div>
                {access_token ? (
                    <>
                        <Sidebar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/categorias" component={Categories} />
                            <Route exact path="/estabelecimentos" component={Establishments} />
                            <Route exact path="/admins" component={Admins} />
                            <Route exact path="/usuarios" component={Users} />
                            <Route path="/usuarios/:id" component={UserDetails} />
                        </Switch>
                    </>
                ) : (
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="*" component={() => <Redirect to="/" />} />
                    </Switch>
                )}
            </div>
        </BrowserRouter>
    ) : (
        <PageLoader />
    );
}
