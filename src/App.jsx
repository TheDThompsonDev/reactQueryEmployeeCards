import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import Employee from './components/Employee';
import styles from './App.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GetEmployees />
    </QueryClientProvider>
  );
}

function GetEmployees() {
  const { isLoading, data, isFetching, isError } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get('https://randomuser.me/api/?results=5').then((res) => res.data),
  });

  if (isLoading) return 'Loading...';
  if (isError) return 'Error! Something messed up!';

  return (
    <>
      {data != undefined && (
        <div>
          <div className={styles.mainContainer}>
            {data.results.map((employee, index) => (
              <div key={index}>
                <Employee
                  picture={employee.picture.large}
                  firstName={employee.name.first}
                  lastName={employee.name.last}
                  email={employee.email}
                  phoneNumber={employee.phone}
                />
              </div>
            ))}
          </div>

          <div>{isFetching ? 'Updating...' : ''}</div>
          <ReactQueryDevtools initialIsOpen />
        </div>
      )}
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<App />);
