'use client';

import React from 'react';
import Link from "next/link";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// Use PascalCase for component names
const ScreenerNavbar = () => {
    const isNotPartnersPage = true; // Replace with actual logic
    const isLoggin = false; // Replace with actual login state

    const handleLoginClick = () => {
        console.log("Login Clicked"); // Replace with your function
    };

    const handlePartnersClick = () => {
        console.log("Partners Clicked"); // Replace with your function
    };
    
    return (
        <Navbar expand="lg" className="py-0" style={{ backgroundColor: "#294672" }}>
            <Container>
                <Navbar.Brand>
                    <Link href="/" className="d-inline-block">
                        <Image
                            src="/img/whitelogo.png" // Fix: Path should start with / for public directory
                            loading="eager"
                            alt="SQXlogo"
                            className="img-fluid cursor-pointer"
                            width={150}
                            height={50}
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="outline-none" />
                {/* <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mb-1">
                    <Nav className="gap-1 gap-lg-4">
                        {isNotPartnersPage && (
                            <Link
                                href="/partners"
                                onClick={handlePartnersClick}
                                className="Navmenu-landing-page fw-bold banner-button-partners"
                            >
                                Represent a financial institution? Click here
                            </Link>
                        )}
                        
                            <Link
                                href="/login"
                                onClick={handleLoginClick}
                                className="Navmenu-landing-page login-button-landing"
                            >
                                <FontAwesomeIcon icon={faRightToBracket} size="lg" /> Login
                            </Link>
                       
                    </Nav>
                </Navbar.Collapse> */}
            </Container>
        </Navbar>
    );
};

export default ScreenerNavbar;