import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";



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
   const RenderComments = ({comments}) => {
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

    const CampsiteInfo = (props) => {

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
                    <RenderComments comments={props.comments}/>
                </div> 
            </div>:
            <div></div>        
        )
    }


export default CampsiteInfo;