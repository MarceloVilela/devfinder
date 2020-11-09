import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { useAuth } from '../../hooks/auth'
import { Header, Container, Footer } from '../../components'
import All from './All';
import Liked from './Liked';
import Disliked from './Disliked';

export default function Main() {
  const { user } = useAuth();

  return (
    <>
      <Header />

      <Container loading={false}>
        <Tabs className='wrap-tabs-inline'>
          <TabList>
            <Tab>Início</Tab>
            {(user && user._id) &&
              <>
                <Tab>Favoritados</Tab>
                <Tab>Não seguidos</Tab>
              </>
            }
          </TabList>

          <TabPanel>
            <All />
          </TabPanel>

          <TabPanel>
            <Liked />
          </TabPanel>

          <TabPanel>
            <Disliked />
          </TabPanel>
        </Tabs>
      </Container>

      <Footer />
    </>
  )
}