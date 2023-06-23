import React from 'react';
import { FaPaintBrush, FaLaptopCode, FaMagic, FaMobileAlt, FaLightbulb, FaChartLine } from "react-icons/fa";
import './Services.css';

const Services = () => {

    const services = [
        { title: "Graphic Design", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.", icon: <FaPaintBrush /> },
        { title: "Web Design", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.", icon: <FaLaptopCode /> },
        { title: "UI/UX Design", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.", icon: <FaMagic /> },
        { title: "App Design & Develop", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.", icon: <FaMobileAlt /> },
        { title: "Business Analysis", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.", icon: <FaLightbulb /> },
        { title: "SEO Marketing", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.", icon: <FaChartLine /> },
    ]

    return (
        <div className="services">
            <div className="header">
                <span className="background-title">SERVICES</span>
                <span className="overlay-title">What I Do?</span>
            </div>

            <div className="service-list">
                {services.map((service, index) => (
                    <div className="service-item">
                        <div className="icon">{service.icon}</div>
                        <div key={index} >
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
