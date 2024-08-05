import React from 'react';
import {GlobalProvider} from './src/context'

import Layout from './src/Components/Layout'
import Header from './src/Components/Header'
import FiltersWrapper from './src/Components/FiltersWrapper'
import NeighborhoodsList from './src/Components/NeighborhoodsList'

function App(): JSX.Element {

  return  (
      <GlobalProvider>
             <Layout>
                <Header />
                <FiltersWrapper />
                <NeighborhoodsList />
             </Layout>
        </GlobalProvider>
      )
}

[]
export default App;
