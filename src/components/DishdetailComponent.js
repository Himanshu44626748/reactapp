import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component{
    
    renderDish(dish){
        if(dish!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    renderComments(comments){
        const c = comments.map(cmnt => {

            return (
                <div className="container">
                    <li key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>--{cmnt.author},  
                    {cmnt.date}</p>
                </li>
                </div>
            );
            });

        if(comments==null){
            return (
                <div></div>
            );
        }
        else{
            return(
                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">{c}</ul>
                </div>
            );
        }
    }

    render(){
        const dish = this.props.item;
        if (dish == null) {
            return (<div></div>)
        }
        else{
            return(
                <div className="container">
                    <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComments(dish.comments)}
                    </div>
                </div>
            );
        }
    }
}

export default DishDetail;