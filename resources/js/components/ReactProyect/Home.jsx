import React, { Component } from "react";
import ReactDOM from "react-dom";
import NavBar from './Navbar';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <NavBar/>
                </div>
                <div className="container" >
                    <div className="row" >
                        <div className="col-xs-0 col-lg-3" ><br/>
                            <div className="card">
                                Componente 1
                            </div>                            
                        </div>
                        <div className="col-md-6"><br/>
                                Componente 2
                        </div>
                        <div className="col-xs-0 col-lg-3" ><br/>
                            <div className="card">
                                Componente 3
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


  
