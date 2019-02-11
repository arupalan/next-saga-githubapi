import React from 'react'
import {connect} from 'react-redux'

import Page from '../components/page'
import Layout from '../components/common/Layout' 


function Index ()  {
    return (
    <Layout>
      <Page title='Github Issue Search Page' />
    </Layout>
   );
}

export default connect()(Index)
