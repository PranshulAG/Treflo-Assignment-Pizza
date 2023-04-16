import React from 'react';
import Header from '../header/header';
import Filters from '../filters/filters';
import Menu_List from '../menu-list/menu-list'
import Main_Display from '../main-display/main-display'
import Footer from '../footer/footer'

function HomePage() {
    return (
        <div className="parent-container">
        <Header/>
        <Filters/>
        <div className="middle-container">
          <Menu_List />
          <Main_Display />
        </div>
        <Footer />
      </div>
    );
}

export default HomePage;