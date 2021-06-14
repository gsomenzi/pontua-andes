import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from './store';
import { getLocalAccessToken } from './store/slices/auth';

import Login from './views/auth/Login';
import Home from './views/Home';

export default function Router() {
    const dispatch = useDispatch();
    const { access_token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(getLocalAccessToken());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div>
                {access_token ? (
                    <Switch>
                        <Route path='/' component={Home} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route exact path='/' component={() => <Redirect to='/login' />} />
                    </Switch>
                )
                }
            </div>
        </BrowserRouter>
    )
}
