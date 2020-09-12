import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useAuth } from '../../hooks/auth';
import { Header, Container } from '../../components'
import Subs from './Subs';
import Trend from './Trend';
import './style.css'

export interface VideoData {
  _id: string;
  title: string;
  url: string;
  channel_id: string;
  channel: string;
  channel_url: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Main() {
  const { user } = useAuth();

  return (
    <>
      <Header />

      <Container loading={false} className='container-full-width'>
        <Tabs className='wrap-tabs-inline'>
          <TabList>
            <Tab>Explorar</Tab>
            {(user && user._id) &&
              <Tab>Inscrições</Tab>
            }

          </TabList>

          <TabPanel>
            <>
              <Trend />
            </>
          </TabPanel>
          {(user && user._id) &&
            <TabPanel>
              <Subs />
            </TabPanel>
          }
        </Tabs>
      </Container>
    </>
  )
}