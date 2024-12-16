import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
