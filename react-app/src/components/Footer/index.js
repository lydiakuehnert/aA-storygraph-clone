import React from 'react';
import './Footer.css';

function Footer({ isLoaded }) {


    return (
        <>
        {isLoaded && (
            <div id='footer-box'>
                <div id='footer-skill-icons'>
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/react-icon.png' alt='react icon'/>
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/postgreSQL-icon.png' alt='postgresql icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/html5-icon.png' alt='html icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/javascript-icon.png' alt='javascript icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/css-icon.png' alt='css icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/express-icon.png' alt='express icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/flask-icon.png' alt='flask icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/redux-icon.png' alt='redux icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/nodejs-icon.png' alt='nodejs icon' />
                    <img className="skill-icon" src='https://porchstorybucket.s3.amazonaws.com/icons/python-icon.png' alt='python icon' />
                </div>
                <div id='footer-copyright-box'>
                    <h3>Created by Lydia Kuehnert,</h3>
                    <h4>2023</h4>
                </div>
                <div id='personal-details'>
                        <a href="https://lydiakuehnert.github.io/" target='_blank'>
                        <img alt='Lydia' id="lydia-pic" src="../../lydia-pic.jpg"></img>
                    </a>
                    <div id='footer-link-icons'>
                        <a className="link-icon" href="https://github.com/lydiakuehnert" target='_blank'><i class="fa-brands fa-github"></i></a>
                        <a className="link-icon" href="https://www.linkedin.com/in/lydia-kuehnert-619286203/" target='_blank'><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        )}
        </>
    )
};

export default Footer;