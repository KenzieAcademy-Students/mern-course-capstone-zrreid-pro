import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, Dashboard } from 'pages';
import { useProvideAuth } from 'hooks/useAuth';

export default function App() {
    const { state: { user } } = useProvideAuth();

    return (
        <>
            {
                user ? (
                    <Switch>
                        <Route exact path='/dashboard' render={() => <Dashboard />} />
                        <Route exact path='/' component={LoginPage}>
                            <Redirect to='/dashboard' />
                        </Route>
                        <Route path='/' render={() => <div>NOTHIN</div>} />
                    </Switch>
                    
                ) : (
                    <Switch>
                        <Route path='/' component={LoginPage} />
                        <Route exact path='/dashboard' render={() => <Dashboard />}>
                            <Redirect to='/' />
                        </Route>
                    </Switch>
                )
            }
        </>
    );
}