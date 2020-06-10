import React from 'react';
import './App.css';
import FCPrices from './Functions/FCPrices';
import UserContextProvider from './Contexts/UserContext';
import SearchContextProvider from './Contexts/SearchContext';
import ReceiptContextProvider from './Contexts/ReceiptContext';
import ListsContextProvider from './Contexts/ListsContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserContextProvider>
          <SearchContextProvider>
            <ReceiptContextProvider>
              <ListsContextProvider>
                <FCPrices />
              </ListsContextProvider>
            </ReceiptContextProvider>
          </SearchContextProvider>
        </UserContextProvider>
      </header>
      <footer>Created by Omer Tzafrir</footer>
    </div>
  );
}

export default App;
