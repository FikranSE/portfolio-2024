import {
  GradientText,
  HeroAvatar,
  Section,
} from 'astro-boilerplate-components';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>Fikran Shadiq Elyafit</GradientText> 👋
        </>
      }
      description={
        <>
          A passionate <b>Full-Stack & Mobile Developer</b> specializing in
          creating scalable and user-focused applications for{' '}
          <b>Web, Mobile, and Desktop</b> platforms. Experienced in{' '}
          <b>Agile environments</b>, I combine technical expertise with creative
          problem-solving to deliver impactful digital solutions.{' '}
          <a
            className="text-cyan-400 hover:underline"
            href="mailto:fikran0000@gmail.com"
          >
            Get in touch
          </a>
        </>
      }
      avatar={
        <img
          className="h-80 w-64 rounded-full"
          src="/assets/images/minion.jpg"
          alt="Fikran Shadiq Elyafit"
          loading="lazy"
        />
      }
      socialButtons={
        <div className="flex gap-4">
          <a
            href="mailto:fikran0000@gmail.com"
            className="text-gray-500 hover:text-gray-700"
          >
            <Mail size={24} />
          </a>
          <a
            href="tel:+6281266920962"
            className="text-gray-500 hover:text-gray-700"
          >
            <Phone size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/fikran-elyafit-9ba3622ab/"
            className="text-gray-500 hover:text-gray-700"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/FikranSE"
            className="text-gray-500 hover:text-gray-700"
          >
            <Github size={24} />
          </a>
        </div>
      }
    />
  </Section>
);

export { Hero };
