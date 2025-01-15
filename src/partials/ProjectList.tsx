import React from 'react';
import {
  ColorTags,
  GradientText,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectCard = ({ title, description, technologies, imageUrl, imageAlt, reverse = false }) => (
  <div className={`group w-full flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 mb-16 last:mb-0`}>
    <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
      <img 
        src={imageUrl} 
        alt={imageAlt}
        className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="w-full md:w-1/2 flex flex-col justify-center">
      <h3 className="text-2xl font-light mb-4 tracking-wide">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <Tags key={index} color={tech.color}>{tech.name}</Tags>
        ))}
      </div>
    </div>
  </div>
);

const ProjectList = () => {
  const projects = [
    {
      title: "E-Procurement System Enhancement",
      description: "At PT Geo Dipa Energi, led debugging and enhancement of the e-procurement system, implementing fixes and optimizations to improve user experience. Utilized React.js, Express.js, and Metronic for frontend development, with Docker and MySQL for backend operations.",
      technologies: [
        { name: "React.js", color: ColorTags.FUCHSIA },
        { name: "Express.js", color: ColorTags.LIME },
        { name: "Metronic", color: ColorTags.SKY },
        { name: "Docker", color: ColorTags.ROSE }
      ],
      imageUrl: "/assets/images/eproc.jpeg",
      imageAlt: "E-Procurement System"
    },
    {
      title: "ABM Investama Dashboard",
      description: "Developed thematic dashboards with clustering for data visualization, implemented KPI data filtering based on multiple parameters, and engineered sharing functionality across clusters. Built using CodeIgniter 3 with Ajax and MySQL for robust data management.",
      technologies: [
        { name: "CodeIgniter", color: ColorTags.VIOLET },
        { name: "Ajax", color: ColorTags.EMERALD },
        { name: "MySQL", color: ColorTags.YELLOW },
        { name: "SCSS", color: ColorTags.SKY }
      ],
      imageUrl: "/assets/images/abm.jpeg",
      imageAlt: "ABM Dashboard"
    },
    {
      title: "Adhi Karya Moral Assessment System",
      description: "Restructured and enhanced the 360-degree employee moral assessment system at PT Adhi Karya. Improved the frontend for better user interaction and revamped backend logic for more efficient and accurate evaluations. Utilized Yii, PHP, jQuery, JavaScript, and MySQL for development and implementation.",
      technologies: [
        { name: "Yii", color: ColorTags.FUCHSIA },
        { name: "PHP", color: ColorTags.ROSE },
        { name: "jQuery", color: ColorTags.INDIGO },
        { name: "MySQL", color: ColorTags.YELLOW }
      ],
      imageUrl: "/assets/images/adhi.jpeg",
      imageAlt: "Adhi Karya Project"
    },
    {
      title: "Universitas Andalas Digital Map",
      description: "Collaborated with the engineering faculty to create a web-based digital map application for Universitas Andalas. Implemented using CodeIgniter 4, JavaScript, and QGIS for comprehensive geographic information system features.",
      technologies: [
        { name: "CodeIgniter 4", color: ColorTags.FUCHSIA },
        { name: "JavaScript", color: ColorTags.INDIGO },
        { name: "QGIS", color: ColorTags.ROSE }
      ],
      imageUrl: "/assets/images/digitasi.jpg",
      imageAlt: "Digital Map"
    },
    {
      title: "PDAM Mobile Payment App",
      description: "Developed a comprehensive mobile application for PDAM water utility payments, supporting both prepaid and postpaid systems. Built with React Native and TypeScript, featuring a modern UI with Tailwind CSS and efficient REST API integration for real-time payment processing.",
      technologies: [
        { name: "React Native", color: ColorTags.FUCHSIA },
        { name: "TypeScript", color: ColorTags.EMERALD },
        { name: "Tailwind", color: ColorTags.YELLOW },
        { name: "Vite", color: ColorTags.SKY }
      ],
      imageUrl: "/assets/images/meteran2.jpeg",
      imageAlt: "PDAM Mobile App"
    },
    {
      title: "Corporate Booking System",
      description: "Created an internal company booking system for meeting rooms and transportation services. Implemented using React Native with TypeScript and Tailwind CSS, featuring real-time availability updates, booking management, and seamless MySQL database integration through REST API.",
      technologies: [
        { name: "React Native", color: ColorTags.FUCHSIA },
        { name: "TypeScript", color: ColorTags.EMERALD },
        { name: "MySQL", color: ColorTags.YELLOW },
        { name: "REST API", color: ColorTags.INDIGO }
      ],
      imageUrl: "/assets/images/booking.jpeg",
      imageAlt: "Booking App"
    }
  ];

  return (
    <Section
      title={
        <>
          Recent <GradientText>Projects</GradientText>
        </>
      }
    >
      <div className="max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </Section>
  );
};

export { ProjectList };