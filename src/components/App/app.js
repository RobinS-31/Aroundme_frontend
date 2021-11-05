// == Import : npm
import React, { useEffect, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

// == Import : local
import './style.scss';

// == Import : components
import Header from "../Header/header";
import Home from "../../containers/home";
import Footer from "../Footer/footer";
const Cart = React.lazy(() => import("../../containers/cart"));
const Dashboard = React.lazy(() => import("../../containers/dashboard"));
const ProducerShowCase = React.lazy(() => import("../../containers/producerShowCase"));
const RegisterAccount = React.lazy(() => import("../RegisterAccount/registerAccount"));
const RegisterForm = React.lazy(() => import("../RegisterAccount/RegisterForm/registerForm"));


const App = ({
    checkedIfLogged,
    getDistanceOrDuration,
    userLocation,
    userConnected,
    distanceUnit,
    distanceMetric,
    getProducersList,
    getCategories,
    cartProduct,
    saveCart,
    getCart,
    props
}) => {
    const location = useLocation().pathname;

    useEffect(() => {
        getProducersList();
        getCategories();
    }, [getProducersList, getCategories]);

    useEffect(() => {
        if (location === "/" && userLocation.lat && distanceUnit !== '') {
            getDistanceOrDuration();
        }
    }, [userLocation, distanceUnit, distanceMetric, location, getDistanceOrDuration]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        saveCart();
    }, [cartProduct]);

    useEffect(() => {
        getCart();
    }, []);

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

    const Loading = () => (
        <div className={'loading suspenseContainer'}>
            <div className='spinnerLoader suspense' />
        </div>
    );

    return (
        <div className='app'>
            <Header />
            <main className="container">
                <Switch>
                    <Route path={'/'} component={Home} exact />
                    <Suspense fallback={<Loading />}>
                        <RestrictedRoute component={RegisterAccount} path={'/register'} exact />
                        <RestrictedRoute component={RegisterForm} path={'/register-user'} exact />
                        <RestrictedRoute component={RegisterForm} path={'/register-producer'} exact />
                        <Route path={'/producteur/:name'} component={ProducerShowCase} exact />
                        <PrivateRoute component={Dashboard} path={'/dashboard'} exact />
                        <Route path={'/cart'} component={Cart} exact />
                    </Suspense>
                </Switch>
            </main>
            <Footer />
        </div>
    );
};
export default App;
