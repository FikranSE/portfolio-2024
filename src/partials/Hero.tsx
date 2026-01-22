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
          A versatile Software Engineer specializing in building{' '}
          <b>High-Performance Web & Mobile Architectures</b>. From architecting{' '}
          <b>Enterprise-scale systems</b> and <b>AI-powered platforms</b> to
          creating interactive
          <b>Mobile Games</b> and <b>GIS solutions</b>. I combine deep technical
          expertise in
          <b>Go, Next.js, and React Native</b> with a passion for delivering
          robust, scalable digital products.{' '}
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
