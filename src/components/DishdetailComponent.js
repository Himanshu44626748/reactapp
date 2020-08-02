import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (val) => !(val) || (val.length <= 15);
const minLength = (val) =>  !(val) || (val.length >= 3);

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModelOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({isModelOpen: !this.state.isModelOpen})
        }

        handleSubmit(values){
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return (
                <div className="container">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg">Submit Comment</span></Button>
                    <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" name="author" className="form-control" validators = {{ maxLength, minLength}} />
                                        <Errors className="text-danger" model=".author" show="touched" messages={{minLength: "Must be greater than 2 characters", maxLength: "Must be 15 chracters or less"}} />
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" name="comment" row="6" className="form-control"/>
                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Row>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
    
    function RenderDish({dish}){
 
        if(dish!=null){
            return(
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments, postComment, dishId}){
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
                <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">{c}</ul>
                <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            );
        }
    }

    const DishDetail = (props) => {

                if(props.isLoading){
                    return(
                        <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                    </div>
                    );
                }
                else if (props.errMess) {
                    return(
                        <div className="container">
                            <div className="row">            
                                <h4>{props.errMess}</h4>
                            </div>
                        </div>
                    );
                }
                else if(props.dish != null)
                {
                    return (
                        <div className="container">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                                </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <RenderDish dish={props.dish} />
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                            </div>
                            </div>
                        </div>
                    );
                }
    }


export default DishDetail;