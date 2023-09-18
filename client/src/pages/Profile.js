import * as React from 'react';
import AppFooter from '../modules/views/AppFooter';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';
import ProfileLayout from '../modules/views/ProfileLayout';

function Profile() {

    return (
      <React.Fragment>
        <AppAppBar />
        <ProfileLayout>
          
        </ProfileLayout>
        <AppFooter />
      </React.Fragment>
    );
  }

  export default withRoot(Profile);