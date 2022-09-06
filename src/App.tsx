import { Layout, Menu } from 'antd';
import React from 'react';
import './App.css';
import FieldsSection from './components/FieldsSection';
//import Footer from './components/Footer';
import Menubar from './components/Menubar';
import TableSection from './components/TableSection';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className='layout' >
      <Header>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ margin : 'right' }} 
        >
          <Menu.Item key="1" >Home</Menu.Item>
          <Menu.Item key="2" >About</Menu.Item>
          <Menu.Item key="3">Login</Menu.Item>
          <Menu.Item key="4">Sign Up</Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      > 
      <div className="site-layout-content">
      <h3>New Trip</h3>
        <FieldsSection />
        <TableSection />
      </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Trucker Earning Estimator ©2022 Created by Jonathan Vegas
      </Footer>
    </Layout>
  );
}

export default App;