import React, {Component, useState} from 'react';
import { history } from '../history';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../CSS/ContactCSS.css'
import Footer from '../Components/Footer';
import MenuComponent from '../Components/MenuComponent'
import ContactComponent from '../Components/ContactComponent'


class ContactView extends Component 
{
    render()
    {
        return (
            <div className="Container" >
                <MenuComponent />
                <ContactComponent />
                <Footer />
            </div>
        );
    }
}
export default ContactView;