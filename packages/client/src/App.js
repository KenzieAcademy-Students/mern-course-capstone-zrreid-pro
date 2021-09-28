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
                        <Route path='/' component={Dashboard} />
                    </Switch>
                    
                ) : (
                    <Switch>
                        <Route path='/' component={LoginPage} />
                    </Switch>
                )
            }
        </>
    );
}