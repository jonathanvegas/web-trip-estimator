import { useState } from 'react';
import { Layout, Menu } from 'antd';
import './App.css';
import FieldsSection from './components/FieldsSection';
import TableSection from './components/TableSection';
import logoUser from "./images/icons8-user-24.png"

const { Header, Content, Footer } = Layout;

function App() {
  const [refreshData, setRefreshData] = useState(true);
  return (
    <Layout className='layout' >
      <Header>
      {/* <div className="logo" /> */}
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
      <div className="userInfo"> 
        <img height={24} width={24} src={logoUser} />
        <h3>Welcome, Username</h3>
      </div>
      <div className="site-layout-content">
      <h3>New Trip</h3>
        <FieldsSection setRefreshData={setRefreshData}/>
        <TableSection refreshData={refreshData} />
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