import React from 'react';
import './Resume.css';

const Resume = () => {

    const education = [
        { year: "2000 - 2004", degree: "Computer Science", university: "International University", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure." },
        { year: "2005 - 2008", degree: "Bachelor Degree", university: "University of California", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure." },
        { year: "2009 - 2012", degree: "Master Degree", university: "Harvard University", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure." },
    ]

    const experience = [
        { year: "2012 - 2013", jobTitle: "Jr. UI UX Designer", company: "Themeforest", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure." },
        { year: "2014 - 2016", jobTitle: "Jr. Product Designer", company: "Dribbble", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure." },
        { year: "2017 - 2019", jobTitle: "Product Designer", company: "Adobe", description: "Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure." },
    ]

    const skills1 = [
        { skill: "Web Design", percentage: "65%" },
        { skill: "HTML/CSS", percentage: "95%" },
        { skill: "JavaScript", percentage: "80%" },
    ]
    const skills2 = [
        { skill: "React JS", percentage: "70%" },
        { skill: "Angular Js", percentage: "60%" },
        { skill: "Bootstrap", percentage: "75%" },
    ]

    return (
        <div className="resume">
            <div className="header">
                <span className="background-title">RESUME</span>
                <span className="overlay-title">Resume</span>
            </div>

            <div className="education-experience">
                <div className="education">
                    <h3 className='heading'>My Education</h3>
                    {education.map((edu, index) => (
                        <div key={index} className="edu-item">
                            <h4 className='item-year'>{edu.year}</h4>
                            <h5 className='item-title'>{edu.degree}</h5>
                            <h6 className='item-location'>{edu.university}</h6>
                            <p className='item-description'>{edu.description}</p>
                        </div>
                    ))}
                </div>
                
                <div className="experience">
                    <h3 className='heading'>My Experience</h3>
                    {experience.map((exp, index) => (
                        <div key={index} className="exp-item">
                            <h4 className='item-year'>{exp.year}</h4>
                            <h5 className='item-title'>{exp.jobTitle}</h5>
                            <h6 className='item-location'>{exp.company}</h6>
                            <p className='item-description'>{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="skills">
                <h3 className='heading'>My Skills</h3>
                <div className='skill-set'>
                    <div className='skill-items'>
                        {skills1.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <div className='skill-heading'>
                                    <h5>{skill.skill}</h5>
                                    <p>{skill.percentage}</p>
                                </div>
                                <div className="bar">
                                    <div style={{ width: skill.percentage }} className="bar-fill"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='skill-items'>
                        {skills2.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <div className='skill-heading'>
                                    <h5>{skill.skill}</h5>
                                    <p>{skill.percentage}</p>
                                </div>
                                <div className="bar">
                                    <div style={{ width: skill.percentage }} className="bar-fill"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button className="button01" role="button"><span class="text">Download CV</span><span>Download CV</span></button>
        </div>
    );
}

export default Resume;
