import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import Menu from './menuComponents';
import {Navbar, NavbarBrand} from 'reactstrap';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId){
        this.setState({selectedDish: dishId});
    }

    render(){
        return(
            <div>
                <Navbar dark color="primary">
                    <NavbarBrand container href="#/">Ristorante Con Fusion</NavbarBrand>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <DishDetail item={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </div>
        );
    }
}

export default Main;