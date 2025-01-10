import {
  GradientText,
  Newsletter,
  Section,
} from 'astro-boilerplate-components';

const CTA = () => (
  <Section>
    <Newsletter
      title={
        <>
          Let's <GradientText>Connect</GradientText>
        </>
      }
      description="Seeking opportunities in web, mobile, GIS, and full-stack development.
As an Information Systems student and Assistant Coordinator at the GIS Lab, I build web and mobile apps with GIS integration, specializing in full-stack development. Open to collaboration and new projects."
    />
  </Section>
);

export { CTA };