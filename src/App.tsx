import React from 'react';
import './App.css';
import FieldsSection from './components/FieldsSection';
import Footer from './components/Footer';
import Menubar from './components/Menubar';
import TableSection from './components/TableSection';

function App() {
  return (
    <>
      <Menubar />
      <FieldsSection />
      <TableSection />
      <Footer />
    </>
  );
}

export default App;
