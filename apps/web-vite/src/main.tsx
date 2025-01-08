import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 窗口聚焦重新获取
      retry: false, // 查询重试
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: 'always', // true
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#00b96b',
            colorInfo: '#00b96b',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
