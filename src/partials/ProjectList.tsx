import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
        Recent <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-2/3">
          <img 
            src="/src/images/abm.jpeg" 
            alt="E-Procurement System"
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-2xl font-bold mb-4">E-Procurement System Enhancement</h3>
          <p className="text-gray-600 mb-4">
            At PT Geo Dipa Energi, led debugging and enhancement of the e-procurement system,
            implementing fixes and optimizations to improve user experience. Utilized React.js,
            Express.js, and Metronic for frontend development, with Docker and MySQL for backend operations.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tags color={ColorTags.FUCHSIA}>React.js</Tags>
            <Tags color={ColorTags.LIME}>Express.js</Tags>
            <Tags color={ColorTags.SKY}>Metronic</Tags>
            <Tags color={ColorTags.ROSE}>Docker</Tags>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
        <div className="w-full md:w-2/3">
          <img 
            src="/src/images/adhi.jpeg" 
            alt="ABM Dashboard"
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-2xl font-bold mb-4">ABM Investama Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Developed thematic dashboards with clustering for data visualization,
            implemented KPI data filtering based on multiple parameters, and engineered
            sharing functionality across clusters. Built using CodeIgniter 3 with Ajax
            and MySQL for robust data management.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tags color={ColorTags.VIOLET}>CodeIgniter</Tags>
            <Tags color={ColorTags.EMERALD}>Ajax</Tags>
            <Tags color={ColorTags.YELLOW}>MySQL</Tags>
            <Tags color={ColorTags.SKY}>SCSS</Tags>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-2/3">
          <img 
            src="/src/images/digitasi.jpg" 
            alt="Digital Map"
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-2xl font-bold mb-4">Universitas Andalas Digital Map</h3>
          <p className="text-gray-600 mb-4">
            Collaborated with the engineering faculty to create a web-based digital
            map application for Universitas Andalas. Implemented using CodeIgniter 4,
            JavaScript, and QGIS for comprehensive geographic information system features.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tags color={ColorTags.FUCHSIA}>CodeIgniter 4</Tags>
            <Tags color={ColorTags.INDIGO}>JavaScript</Tags>
            <Tags color={ColorTags.ROSE}>QGIS</Tags>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
        <div className="w-full md:w-2/3">
          <img 
            src="/src/images/meteran2.jpeg" 
            alt="PDAM Mobile App"
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-2xl font-bold mb-4">PDAM Mobile Payment App</h3>
          <p className="text-gray-600 mb-4">
            Developed a comprehensive mobile application for PDAM water utility payments,
            supporting both prepaid and postpaid systems. Built with React Native and
            TypeScript, featuring a modern UI with Tailwind CSS and efficient REST API
            integration for real-time payment processing.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tags color={ColorTags.FUCHSIA}>React Native</Tags>
            <Tags color={ColorTags.EMERALD}>TypeScript</Tags>
            <Tags color={ColorTags.YELLOW}>Tailwind</Tags>
            <Tags color={ColorTags.SKY}>Vite</Tags>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-2/3">
          <img 
            src="/src/images/booking.jpeg" 
            alt="Booking App"
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-2xl font-bold mb-4">Corporate Booking System</h3>
          <p className="text-gray-600 mb-4">
            Created an internal company booking system for meeting rooms and transportation
            services. Implemented using React Native with TypeScript and Tailwind CSS,
            featuring real-time availability updates, booking management, and seamless
            MySQL database integration through REST API.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tags color={ColorTags.FUCHSIA}>React Native</Tags>
            <Tags color={ColorTags.EMERALD}>TypeScript</Tags>
            <Tags color={ColorTags.YELLOW}>MySQL</Tags>
            <Tags color={ColorTags.INDIGO}>REST API</Tags>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export { ProjectList };