import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import CategoriasGastos from './Componentes/CategoriasGastos';
import SubCategoriasGastos from './Componentes/SubCategoriasGastos';
import ApuntesGastos from './Componentes/ApuntesGastos';

const Router = () => {
    return (
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/CategoriasGastos"    component={CategoriasGastos} />
            <Route path="/SubCategoriasGastos" component={SubCategoriasGastos} />
            <Route path="/ApuntesGastos"       component={ApuntesGastos} />

        </Switch>
    );
}

export default Router;
