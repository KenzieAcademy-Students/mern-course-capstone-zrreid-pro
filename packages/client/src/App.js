import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, Dashboard } from 'pages';
import { useProvideAuth } from 'hooks/useAuth';

export default function App() {
    const { state: { user } } = useProvideAuth();
    
    // return (
    //     <>
    //         <Switch>
    //             <Route exact path='/' component={LoginPage} />
    //         </Switch>
    //     </>
    // );

    return (
        <>
            {
                user ? (
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                    </Switch>
                    
                ) : (
                    <Switch>
                        <Route exact path='/' component={LoginPage} />
                        <Route exact path='/dashboard' component={Dashboard} />
                    </Switch>
                )
            }
        </>
    );
}