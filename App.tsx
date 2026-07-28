import {
  CSSProperties,
  ElementType,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  motion,
  MotionStyle,
  MotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const colors = {
  dark: '#0C0C0C',
  light: '#D7E2EA',
};

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as), [as]);

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const closestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
      const closestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
      const distance = Math.hypot(event.clientX - closestX, event.clientY - closestY);

      if (distance <= padding) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setActive(true);
        setTransform(
          `translate3d(${(event.clientX - centerX) / strength}px, ${(event.clientY - centerY) / strength}px, 0)`,
        );
      } else if (active) {
        setActive(false);
        setTransform('translate3d(0, 0, 0)');
      }
    };

    const handleMouseLeave = () => {
      setActive(false);
      setTransform('translate3d(0, 0, 0)');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active, padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

function ContactButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition-transform duration-300 hover:scale-[1.04] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      Contact Me
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function LiveProjectButton() {
  return (
    <button
      type="button"
      className="group inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[650px] flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn delay={0} y={-20} as="nav" className="relative z-30 flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
        {['About', 'Price', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={item === 'Price' ? '#services' : `#${item.toLowerCase()}`}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {item}
          </a>
        ))}
      </FadeIn>

      <div className="relative z-0 mt-6 w-full overflow-hidden sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack, 3D creator"
            className="h-auto w-full select-none object-contain"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={() => document.querySelector('#contact')?.scrollIntoView()} />
        </FadeIn>
      </div>
    </section>
  );
}

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

function MarqueeRow({ images, direction }: { images: string[]; direction: 'left' | 'right' }) {
  const tripled = [...images, ...images, ...images];

  return (
    <div className="flex w-max gap-3" data-direction={direction} style={{ willChange: 'transform' }}>
      {tripled.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt="3D motion project preview"
          loading="lazy"
          className="h-[270px] w-[420px] flex-none rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      const translated = offset - 200;
      if (rowOneRef.current) rowOneRef.current.style.transform = `translate3d(${translated}px,0,0)`;
      if (rowTwoRef.current) rowTwoRef.current.style.transform = `translate3d(${-translated}px,0,0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <div ref={rowOneRef} className="relative -left-[890px] w-max" style={{ willChange: 'transform' }}>
          <MarqueeRow images={marqueeImages.slice(0, 11)} direction="right" />
        </div>
        <div ref={rowTwoRef} className="relative -left-[800px] w-max" style={{ willChange: 'transform' }}>
          <MarqueeRow images={marqueeImages.slice(11)} direction="left" />
        </div>
      </div>
    </section>
  );
}

function AnimatedCharacter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.12);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <p
      ref={ref}
      className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {text.split('').map((char, index) => (
        <AnimatedCharacter
          key={`${char}-${index}`}
          char={char}
          index={index}
          total={text.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

const aboutDecorations = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: '3D moon icon',
    className: 'top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: '3D abstract object',
    className: 'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: '3D lego icon',
    className: 'top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: '3D sculptural group',
    className: 'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

function AboutSection() {
  const aboutText =
    "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      {aboutDecorations.map((item) => (
        <FadeIn
          key={item.src}
          delay={item.delay}
          duration={0.9}
          x={item.x}
          y={0}
          className={`pointer-events-none absolute z-0 ${item.className}`}
        >
          <img src={item.src} alt={item.alt} className="h-auto w-full object-contain" loading="lazy" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text={aboutText} />
          <FadeIn delay={0.2} y={20}>
            <ContactButton onClick={() => document.querySelector('#contact')?.scrollIntoView()} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

function ServicesSection() {
  return (
    <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl border-t border-[rgba(12,12,12,0.15)]">
        {services.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            className="flex items-start gap-6 border-b border-[rgba(12,12,12,0.15)] py-8 sm:gap-10 sm:py-10 md:gap-16 md:py-12"
          >
            <div
              className="min-w-[90px] font-black leading-none text-[#0C0C0C] sm:min-w-[150px] md:min-w-[220px]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.number}
            </div>
            <div className="pt-1 sm:pt-3 md:pt-5">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="mt-3 max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60 sm:mt-4"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
];

type Project = (typeof projects)[number];
type ProjectCardMotionStyle = MotionStyle & { '--card-offset': string };

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] min-h-[690px]">
      <motion.article
        className="project-card-sticky sticky overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
        style={{
          scale,
          '--card-offset': `${index * 28}px`,
          transformOrigin: 'top center',
        } as ProjectCardMotionStyle}
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4 text-[#D7E2EA] sm:mb-7 md:mb-8">
          <div className="flex items-end gap-4 sm:gap-7 md:gap-10">
            <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}>
              {project.number}
            </span>
            <div className="pb-1 sm:pb-2">
              <p className="text-xs font-medium uppercase tracking-[0.25em] opacity-60 sm:text-sm">
                {project.category}
              </p>
              <h3 className="mt-1 text-xl font-medium uppercase sm:text-3xl md:text-5xl">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="grid grid-cols-[40%_60%] gap-3">
          <div className="flex flex-col gap-3">
            <img
              src={project.images[0]}
              alt={`${project.name} visual one`}
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              loading="lazy"
            />
            <img
              src={project.images[1]}
              alt={`${project.name} visual two`}
              className="w-full flex-1 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              loading="lazy"
            />
          </div>
          <img
            src={project.images[2]}
            alt={`${project.name} hero visual`}
            className="h-full min-h-[303px] w-full rounded-[40px] object-cover sm:min-h-[390px] sm:rounded-[50px] md:min-h-[520px] md:rounded-[60px]"
            loading="lazy"
          />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-[1500px]">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} total={projects.length} />
        ))}
      </div>

      <div id="contact" className="flex min-h-[45vh] flex-col items-center justify-center gap-8 text-center text-[#D7E2EA]">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-[0.35em] opacity-60">Have a project in mind?</p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-none sm:text-7xl md:text-9xl">Let&apos;s create.</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
