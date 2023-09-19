import React from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBListGroup,
} from 'mdb-react-ui-kit';

export default function Appointment({ props }) {
    console.log(props)
    return (
        <section className="profileSection" style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1"></span> <h2>Upcoming Appointments</h2></MDBCardText>
                            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
                                <h2>Details</h2>
                                <p>Date: {props.startDate}</p>
                                <p>Work Request: {props.workRequest}</p>
                                <p>Model: {props.car.model}</p>
                                <p>Year: {props.car.year}</p>
                            </MDBCardText>
                            <MDBProgress className="rounded">
                                <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                            </MDBProgress>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBContainer >
        </section >


    )
}