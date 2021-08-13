// == Import : npm
import React, { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

// == Import : components
import Dashboard from "../../containers/dashboard";
import Header from "../Header/header";
import Home from "../../containers/home";
import ProducerShowCase from "../../containers/producerShowCase";
import RegisterAccount from "../RegisterAccount/registerAccount";
import RegisterForm from "../RegisterAccount/RegisterForm/registerForm";
import Footer from "../Footer/footer";

// == Import : local
import './style.scss';

const App = ({
    checkedIfLogged,
    getDistanceOrDuration,
    userLocation,
    userConnected,
    distanceUnit,
    distanceMetric,
    props
}) => {
    const location = useLocation().pathname;

    useEffect(() => {
        if (location === "/" && userLocation.lat && distanceUnit !== '') {
            getDistanceOrDuration();
        }
    }, [userLocation, distanceUnit, distanceMetric, location, getDistanceOrDuration]);

    useEffect(() => {
        checkedIfLogged();
    });

    useEffect(() => {
        switch (location) {
            case '/':
                document.title = 'Aroundme';
                break;
            case '/register':
                document.title = 'Aroundme - Créer un compte';
                break;
            case '/register-consumer':
                document.title = 'Aroundme - Créer un compte consommateur';
                break;
            case '/register-producer':
                document.title = 'Aroundme - Créer un compte producteur';
                break;
            case '/dashboard':
                document.title = 'Aroundme - Tableau de bord';
                break;
            default:
                document.title = 'Aroundme';
                break;
        }
    }, [location]);

    const PrivateRoute = ({ component: Component, ...rest }) => {
        return (
            <Route {...rest} render={props => (
                userConnected
                    ? <Component {...props} />
                    : <Redirect to="/" />
            )} />
        );
    };

    const RestrictedRoute = ({ component: Component, ...rest }) => {
        return (
            <Route {...rest} render={props => (
                !userConnected
                    ? <Component {...props} />
                    : <Redirect to="/" />
            )} />
        );
    };

    return (
        <div className='app'>
            <Header />
            <div className="container">
                <Switch>
                    <Route path={'/'} exact>
                        <Home />
                    </Route>
                    <RestrictedRoute component={RegisterAccount} path={'/register'} exact />
                    <RestrictedRoute component={RegisterForm} path={'/register-user'} exact />
                    <RestrictedRoute component={RegisterForm} path={'/register-producer'} exact />
                    <Route path={'/producteur/:name'} component={ProducerShowCase} exact />
                    <PrivateRoute component={Dashboard} path={'/dashboard'} exact />
                </Switch>
            </div>
            <Footer />
        </div>
    );
};
export default App;
