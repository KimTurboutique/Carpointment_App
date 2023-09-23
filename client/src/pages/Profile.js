import * as React from 'react';
import AppFooter from '../modules/views/AppFooter';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';
import ProfileLayout from '../modules/views/ProfileLayout';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/Queries.js";
import { Box } from "@mui/material";
import Auth from "../utils/Auth.js";





function Profile() {

  const { loading, error, data } = useQuery(QUERY_ME);

  const me = data?.me || {} ;

  const loggedIn = Auth.loggedIn();

  if (loading) {
    return <h2> Loading...</h2>;
  }

  if (error) {
    return <p> Error: {error.message}</p>;
  }

  const appointmentData = data.me.appointments
  const filteredAppointments = appointmentData.filter((appointments, idx) => idx < 1)

  console.log(filteredAppointments)
  return (
    <React.Fragment>
      <AppAppBar />
      <ProfileLayout/>
      <Box className= "appointmentSection" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

        {loggedIn && me

          ? ( 
            <div>
              <h2>Your Appointments</h2>
            {me.appointments.slice(0, 3).map((appt) => (

              <div key={appt._id}>

                <p>Date: {appt.startDate}</p>

                <p>Work Requested: {appt.workRequest}</p>

                <p>

                  Car: {"BMW"} {appt.car.model} {appt.car.year}

                </p>

                <p>Mechanic's notes: {appt.notes}</p>

                <hr />

              </div>

            ))}
            </div>
          )

          : window.location.assign("/signin")}

      </Box>
      {/* create user info component to pass props into */}
      {/* {filteredAppointments.map((appointment) => {
        console.log(appointment)
        return (
          <Appointment props={appointment} />
        )
      })} */}
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Profile);