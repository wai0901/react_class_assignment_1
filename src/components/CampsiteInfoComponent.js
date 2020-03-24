import React, { Component} from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class CampsiteInfo extends Component {

   //method for render component for selected campsite pass from parent component.
   renderCampsite(campsite) {
    return (
        <div  key={campsite.id} className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
   }

   //method for render comments from comments array from "this.props.campsite.comments".
   renderComments(comments) {
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
        </div>
       )
   }

    render() {

        return ( 
            this.props.campsite?
            <div className="container">
                <div className="row">
                    {this.renderCampsite(this.props.campsite)}
                    {this.renderComments(this.props.campsite.comments)}
                </div> 
            </div>:
            <div></div>        
        )
    }
}

export default CampsiteInfo;