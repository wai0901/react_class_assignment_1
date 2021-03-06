import React, { Component, useState } from "react";
import { Card, Row, Col, ModalBody, ModalHeader, Label, CardImg, CardImgOverlay, 
        CardText, CardBody, Modal, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


   //method for render component for selected campsite pass from parent component.
   const RenderCampsite = ({campsite}) => {
    return (
        <div  key={campsite.id} className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
   }

   //method for render comments from comments array from "this.props.campsite.comments".
   const RenderComments = ({comments, addComment, campsiteId}) => {
       return (
        <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {
                comments.map(comment => 
                    <p key={comments.id}>
                        {comment.text}<br /> 
                        --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                )
            }
            <CommentForm campsiteId={campsiteId} addComment={addComment}/>
        </div>
       )
   }

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal()
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i class="fa fa-pencil"></i> Submit Comment
                </Button>     
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div as={Col} className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="reting" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="authore" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, 
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control"
                                    rows="6"
                                />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const CampsiteInfo = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }
    if (props.campsite) {
    return ( 
        props.campsite?
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                    comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id}
                    />
            </div> 
        </div>:
        <div></div>        
    )}
}


export default CampsiteInfo;