// == Import : npm
import React, { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

// == Import : components
import Dashboard from "../../containers/dashboard";
import Header from "../Header/header";
import Home from "../../containers/home";
import ProducerShowCase from "../../containers/producerShowCase";
import RegisterAccount from "../RegisterAccount/registerAccount";
import RegisterForm from "../../containers/registerForm";
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
    }, [userLocation, distanceUnit, distanceMetric])

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

    return (
        <div className='app'>
            <Header />
            <div className="container">
                <Switch>
                    <Route path={'/'} exact>
                        <Home />
                    </Route>
                    <Route path={'/register'} component={RegisterAccount} />
                    <Route path={'/register-user'} component={RegisterForm} />
                    <Route path={'/register-producer'} component={RegisterForm} />
                    <Route path={'/producteur/:name'} component={ProducerShowCase} />
                    <PrivateRoute component={Dashboard} path={'/dashboard'}/>
                </Switch>
            </div>
            <Footer />
        </div>
    );
};
export default App;
