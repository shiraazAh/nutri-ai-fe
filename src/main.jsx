import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { App as AntdApp } from "antd";
import { ConfigProvider } from 'antd'
import { theme } from './configs/theme.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      {/* Intialize Ant Design */}
      <AntdApp style={{ height: "100vh" }}>
        <App />
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
);