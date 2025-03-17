import { useNavigate } from 'react-router-dom';
// import { Auth } from 'aws-amplify';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import logo from '../assets/nutri-ai-logo.png';
const { Header, Content, Footer } = Layout;
const items = Array.from({
  length: 2,
}).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));


const DashboardLayout = ({ children }) => { 
  const { logout } = useAuth();
    const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Mock sign out for testing
      console.log('Signing out...');
      navigate('/signin');
      logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
    const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
          <img
            src={logo}
            className="mr-6"
            alt="Nutri AI logo"
            style={{ width: "60px" }}
          />
          <button
            onClick={handleSignOut}
            className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 ml-auto"
          >
            Sign out
          </button>
      </Header>
      <Content>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );};
export default DashboardLayout;