import * as React from 'react';
import AppFooter from '../modules/views/AppFooter';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';
import ProfileLayout from '../modules/views/ProfileLayout';
import Appointment from '../modules/views/appointmentlayout';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/Queries.js";





function Profile() {

  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) {
    return <p> Loading...</p>;
  }

  if (error) {
    return <p> Error: {error.message}</p>;
  }

  const appointmentData = data.me.appointments
  const filteredAppointments = appointmentData.filter((appointment, idx) => idx < 1)

  console.log(filteredAppointments)
  return (
    <React.Fragment>
      <AppAppBar />
      <ProfileLayout/>
      {/* create user info component to pass props into */}
      {filteredAppointments.map((appointment) => {
        console.log(appointment)
        return (
          <Appointment props={appointment} />
        )
      })}
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Profile);