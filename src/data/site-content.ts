import type { Locale } from "@/lib/i18n";

type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationItem[];
};

type LanguageOption = {
  locale: Locale;
};

export type NavigationContent = {
  items: NavigationItem[];
  languages: LanguageOption[];
  submenuLabel: string;
};

export type FooterContent = {
  tagline: string;
  title: string;
  description: string;
  navigationHeading: string;
  contactHeading: string;
  links: NavigationItem[];
  address: string;
  phoneLabel: string;
  phoneRaw: string;
  email: string;
};

type HeroContent = {
  kicker: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  backgroundVideoSrc: string;
  backgroundPosterSrc: string;
  videoAriaLabel: string;
};

export type RxBrainContent = {
  kicker: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  wordmarkAlt: string;
  imageSequenceAriaLabel: string;
};

type TechnologyContent = {
  pageHero: {
    kicker: string;
    title: string;
    description: string;
  };
};

type IndexedPoint = {
  index: string;
  title: string;
  description: string;
};

type LatestEventsContent = {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  previousLabel: string;
  nextLabel: string;
  currentOfTotalLabel: string;
};

type HomeContent = {
  hero: HeroContent;
  companyIntroduction: {
    kicker: string;
    title: string;
    description: string;
  };
  rxBrain: RxBrainContent;
  deploymentCycle: {
    description: string;
    items: {
      key: string;
      label: string;
    }[];
  };
  latestEvents: LatestEventsContent;
  solutions: {
    kicker: string;
    title: string;
    description: string;
  };
  featuredSolutions: SolutionCard[];
  callout: {
    kicker: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
};

type SolutionCard = {
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc?: string;
  backgroundVideoSrc?: string;
  backgroundPosterSrc?: string;
};

type SolutionsContent = {
  pageHero: {
    kicker: string;
    title: string;
    description: string;
  };
  cards: SolutionCard[];
  callout: {
    kicker: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
  };
};

type AboutContent = {
  pageHero: {
    kicker: string;
    title: string;
    description: string;
  };
  mission: {
    kicker: string;
    title: string;
    description: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  advantage: {
    kicker: string;
    title: string;
    description: string;
    points: IndexedPoint[];
  };
  traction: {
    kicker: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
    partners: { name: string; description: string }[];
  };
  vision: {
    kicker: string;
    statement: string;
  };
  history: {
    pageHero: {
      kicker: string;
      title: string;
      description: string;
      statusBadge: string;
    };
  };
  team: {
    pageHero: {
      kicker: string;
      title: string;
      description: string;
    };
    members: {
      name: string;
      role: string;
      bio: string;
    }[];
  };
};

type NewsContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
  meta: {
    categoryLabel: string;
    dateLabel: string;
    readArticle: string;
    backToNews: string;
    notTranslatedYet: string;
    previousArticle: string;
    nextArticle: string;
    currentOfTotalLabel: string;
    paginationLabel: string;
  };
};

type DemoCenterContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
};

type ContactContent = {
  pageHero: {
    kicker: string;
    title: string;
    description: string;
  };
  info: {
    kicker: string;
    title: string;
    description: string;
    address: string;
    phoneLabel: string;
    phoneRaw: string;
    email: string;
  };
  form: {
    kicker: string;
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successBody: string;
    errorMessage: string;
  };
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  navigation: NavigationContent;
  footer: FooterContent;
  home: HomeContent;
  solutions: SolutionsContent;
  about: AboutContent;
  contact: ContactContent;
  technology: TechnologyContent;
  news: NewsContent;
  demoCenter: DemoCenterContent;
};

const sharedAddress = "";
const sharedPhoneLabel = "1-626-863-8444";
const sharedPhoneRaw = "16268638444";
const sharedEmail = "sam@edenverse.ai";
const homeHeroVideoSrc = "https://cdn.shopify.com/videos/c/o/v/a05b93842a0a418a90b254a6999831db.mp4";
const homepageHeroVideoSrc = "https://cdn.shopify.com/videos/c/o/v/8431e06f2df64b1686f8a5edb44a3c53.mp4";
const homepageHeroPosterSrc = "https://cdn.shopify.com/s/files/1/0764/3063/9301/files/unitree-dog-w-rx-brain.jpg?v=1780428427";

const siteContentByLocale: Record<Locale, SiteContent> = {
  en: {
    meta: {
      title: "Edenverse AI",
      description:
        "Advanced robotics solutions for industrial automation, education, and mission-critical safety.",
    },
    navigation: {
      items: [
        { label: "Solutions", href: "/solutions" },
        {
          label: "Media Center",
          children: [
            { label: "News", href: "/media-center/news" },
            { label: "Demo Center", href: "/media-center/demo-center" },
          ],
        },
        {
          label: "About",
          href: "/about",
          children: [
            { label: "About Us", href: "/about" },
            // { label: "Our Team", href: "/about/team" },
          ],
        },
        { label: "Contact", href: "/contact" },
      ],
      languages: [{ locale: "en" }, { locale: "zh" }],
      submenuLabel: "Open submenu",
    },
    footer: {
      tagline: "Future-ready robotics",
      title: "Build the next field deployment with Edenverse AI.",
      description:
        "We design technical robotics experiences that connect advanced hardware, operator insight, and practical deployment.",
      navigationHeading: "Navigate",
      contactHeading: "Contact",
      links: [
        { label: "Solutions", href: "/solutions" },
        { label: "News", href: "/media-center/news" },
        { label: "Demo Center", href: "/media-center/demo-center" },
        { label: "About", href: "/about" },
        // { label: "Our Team", href: "/about/team" },
        { label: "Contact", href: "/contact" },
      ],
      address: sharedAddress,
      phoneLabel: sharedPhoneLabel,
      phoneRaw: sharedPhoneRaw,
      email: sharedEmail,
    },
    home: {
      hero: {
        kicker: "",
        title: "From Deployment to Intelligence",
        description:
          "We build advanced robotic platforms and applied solutions.",
        primaryAction: "Explore Solutions",
        secondaryAction: "Talk to Us",
        backgroundVideoSrc: homepageHeroVideoSrc,
        backgroundPosterSrc: homepageHeroPosterSrc,
        videoAriaLabel:
          "Quadruped inspection robot walking through an industrial yard",
      },
      companyIntroduction: {
        kicker: "What we do",
        title: "A data-driven ecosystem for evolving AI robotics.",
        description:
          "We use a global supply network and offer flexible options—including sales, rental, and education—to make robotics accessible and practical for our customers.\n\nBy combining real-world industry experience with advanced technology, we build and customize robots for environments like factories and construction sites. Our solutions are designed to improve over time and adapt to your changing needs.",
      },
      rxBrain: {
        kicker: "Coming soon",
        subtitle:
          "RX BRAIN™ is the general-purpose intelligence at the core of every Edenverse AI platform.",
        description:
          "RX BRAIN unifies perception, planning, and control across tasks and environments. Every deployment teaches it. Every robot runs it. Every fleet gets sharper.",
        ctaLabel: "Technology",
        wordmarkAlt: "RX BRAIN",
        imageSequenceAriaLabel:
          "Abstract visualization of the RX BRAIN system",
      },
      deploymentCycle: {
        description:
          "Every deployment becomes data.\n\nEvery data point trains the brain.\n\nEvery brain makes the entire fleet smarter.",
        items: [
          { key: "deploy", label: "Deploy" },
          { key: "learn", label: "Learn" },
          { key: "evolve", label: "Evolve" },
        ],
      },
      latestEvents: {
        kicker: "Latest from Edenverse AI",
        title: "Deployments, partnerships, and platform news from the field.",
        description:
          "A running view of what Edenverse AI is shipping, where our robots are going, and who we are building with.",
        ctaLabel: "View all news",
        ctaHref: "/media-center/news",
        previousLabel: "Previous article",
        nextLabel: "Next article",
        currentOfTotalLabel: "{current} of {total}",
      },
      solutions: {
        kicker: "We Solve Your Problems",
        title: "Built for applied robotics across multiple environments.",
        description: "",
      },
      featuredSolutions: [
        {
          tag: "Inspection AI: Factories",
          title:
            "Inspection AI for factory patrol, anomaly detection, and operations visibility.",
          description:
            "Built for industrial sites that need robots to capture equipment status, identify irregular conditions, and feed actionable data back into the operation loop.",
          highlights: [
            "Routine patrol automation",
            "Condition monitoring workflows",
            "Factory-ready deployment",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/d51c478641b5483bb9df2eab5a2e5421.mp4",
        },
        {
          tag: "Cleaning AI: Malls / Factories",
          title: "Cleaning AI for commercial spaces and industrial facilities.",
          description:
            "Designed for teams that need autonomous cleaning, repeatable route coverage, and service quality across shopping centers, public facilities, and production floors.",
          highlights: [
            "Large-area coverage",
            "Autonomous cleaning routes",
            "Digitization and visualization of cleaning effects",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/a3f76e9d0a644bfa8087776cce13ca1a.mp4",
        },
        {
          tag: "Logistics AI: Warehouses",
          title:
            "Logistics AI for warehouse movement, transfer, and internal material flow.",
          description:
            "A strong fit for warehouse environments where robotic mobility can reduce manual transport friction and improve workflow continuity from storage to dispatch.",
          highlights: [
            "Multi-warehouse transport path optimization",
            "Multi-Robot Collaborative Material Handling",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/d6f84cb53bf04f7b9ff0b6acc9c490a7.mp4",
        },
        {
          tag: "Construction AI: Building Sites",
          title:
            "Construction AI for complex, changing, and high-noise building sites.",
          description:
            "Positioned for construction teams that need robotics to support site monitoring, data capture, and safer field execution in dynamic outdoor environments.",
          highlights: [
            "Site data capture",
            "Dynamic terrain communication",
            "Field deployment credibility",
          ],
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "Service AI: Hotels / Restaurants",
          title:
            "Service AI for guest-facing delivery, guidance, and hospitality workflows.",
          description:
            "Best suited for hotels and restaurants where a robotic presence can streamline service touchpoints while reinforcing a modern, technology-forward guest experience.",
          highlights: ["Guest interaction", "Hospitality delivery service"],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/db67a691d5584bb3a8276d80b128ee77.mp4",
        },
        {
          tag: "Companion AI: Homes",
          title:
            "Companion AI for household assistance, interaction, and daily support.",
          description:
            "A future-facing category for family environments where companionship, assistance, and intuitive interaction matter as much as the robotic platform itself.",
          highlights: [
            "Household assistance and care",
            "Emotion support and Health monitoring",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/2190306bf4a143d8a134f06fa6b78fb1.mp4",
        },
      ],
      callout: {
        kicker: "Let's build",
        title: "Ready to put Edenverse AI to work in your environment?",
        description:
          "Tell us about your operation and we'll map out the right platform, deployment, and support path with you.",
        primaryAction: "Talk to our team",
        secondaryAction: "About Edenverse AI",
      },
    },
    solutions: {
      pageHero: {
        kicker: "Solutions",
        title: "Robotics platforms aligned to real mission needs.",
        description:
          "Edenverse AI helps businesses automate operations with intelligent robotics. We don’t just provide solutions—we ensure they continuously improve, with robots learning from daily work, adapting over time, and performing tasks more efficiently.",
      },
      cards: [
        {
          tag: "Inspection AI: Factories",
          title: "Inspection AI for factory patrol, anomaly detection, and operations visibility.",
          description:
            "Built for industrial sites that need robots to capture equipment status, identify irregular conditions, and feed actionable data back into the operation loop.",
          highlights: [
            "Routine patrol automation",
            "Condition monitoring workflows",
            "Factory-ready deployment",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/d51c478641b5483bb9df2eab5a2e5421.mp4",
        },
        {
          tag: "Cleaning AI: Malls / Factories",
          title: "Cleaning AI for commercial spaces and industrial facilities.",
          description:
            "Designed for teams that need autonomous cleaning, repeatable route coverage, and service quality across shopping centers, public facilities, and production floors.",
          highlights: [
            "Large-area coverage",
            "Autonomous cleaning routes",
            "Digitization and visualization of cleaning effects",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/a3f76e9d0a644bfa8087776cce13ca1a.mp4",
        },
        {
          tag: "Logistics AI: Warehouses",
          title: "Logistics AI for warehouse movement, transfer, and internal material flow.",
          description:
            "A strong fit for warehouse environments where robotic mobility can reduce manual transport friction and improve workflow continuity from storage to dispatch.",
          highlights: [
            "Intra-warehouse transport",
            "Operational efficiency",
            "Scalable fulfillment",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/d6f84cb53bf04f7b9ff0b6acc9c490a7.mp4",
        },
        {
          tag: "Construction AI: Building Sites",
          title: "Construction AI for complex, changing, and high-noise building sites.",
          description:
            "Inspired by the current site’s life-safety messaging, this section emphasizes remote operation, situational awareness, and personnel protection.",
          highlights: [
            "Site intelligence capture",
            "Dynamic terrain communication",
            "Field deployment credibility",
          ],
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "Service AI: Hotels / Restaurants",
          title: "Service AI for guest-facing delivery, guidance, and hospitality workflows.",
          description:
            "Best suited for hotels and restaurants where a robotic presence can streamline service touchpoints while reinforcing a modern, technology-forward guest experience.",
          highlights: [
            "Guest interaction",
            "Hospitality delivery service",
            "Front-of-house automation value",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/db67a691d5584bb3a8276d80b128ee77.mp4",
        },
        {
          tag: "Companion AI: Homes",
          title: "Companion AI for household assistance, interaction, and daily support.",
          description:
            "A future-facing category for family environments where companionship, assistance, and intuitive interaction matter as much as the robotic platform itself.",
          highlights: [
            "Household assistance and care",
            "Emotion support and Health monitoring",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/2190306bf4a143d8a134f06fa6b78fb1.mp4",
        },
      ],
      callout: {
        kicker: "Next step",
        title: "Don't see your exact use case?",
        description:
          "Every environment has its own constraints. We'll walk through your operation and scope a platform that fits.",
        primaryLabel: "Contact us",
        primaryHref: "/contact",
      },
    },
    about: {
      pageHero: {
        kicker: "Physical AI",
        title: "Building the Brain Behind the Machine.",
        description:
          "Edenverse AI is a physical artificial intelligence company based in Irvine, specializing in advanced robotics applications and next-generation robot intelligence systems. Founded by a team of leading robotics experts, Edenverse AI is dedicated to redefining how robots perceive, think, and act in the real world.",
      },
      mission: {
        kicker: "Core Technology — Xmind",
        title: "One Brain. Multiple Robots. Multiple Tasks.",
        description:
          "At the core of Edenverse AI is our proprietary robot brain model, Xmind — a powerful AI system trained on large-scale multimodal data. Xmind enables a \"one brain, multiple robots, multiple tasks\" architecture, allowing diverse robotic platforms — including humanoid robots, quadrupeds, and robotic arms — to share a unified intelligence layer.",
        values: [
          {
            title: "Unified Intelligence",
            description:
              "A single Xmind model drives perception, planning, and control across humanoid robots, quadrupeds, and robotic arms — eliminating the need for separate AI systems per platform.",
          },
          {
            title: "Strong Generalization",
            description:
              "Unlike traditional systems that require task-specific programming and retraining, Xmind-powered robots seamlessly adapt to new environments and complex tasks — navigation, manipulation, and autonomous operations — without extensive reconfiguration.",
          },
          {
            title: "Cross-Platform Coverage",
            description:
              "The same intelligence layer runs across diverse form factors. One software investment scales across every robot in the fleet.",
          },
        ],
      },
      advantage: {
        kicker: "Solution Focus",
        title: "Scalable Automation for Unstructured Environments.",
        description:
          "Edenverse AI focuses on deploying intelligent robotic solutions across real-world, unstructured environments where rigid legacy systems have historically failed to scale.",
        points: [
          {
            index: "01",
            title: "Industrial Operations & Warehousing",
            description:
              "Autonomous patrol, anomaly detection, and logistics automation for factories, warehouses, and industrial sites requiring continuous, reliable operations.",
          },
          {
            index: "02",
            title: "Inspection & Infrastructure",
            description:
              "Intelligent inspection robots that capture equipment status, identify irregular conditions, and feed actionable data back into operations — with no human in the loop.",
          },
          {
            index: "03",
            title: "Emergency Response",
            description:
              "Robotic platforms designed for high-risk environments including firefighting and hazmat response, where human safety constraints demand autonomous capability.",
          },
        ],
      },
      traction: {
        kicker: "Growth",
        title: "$5M Seed Round. Strategic Partnerships.",
        description:
          "Edenverse AI has secured $5 million in seed funding and established strategic partnerships with leading robotics innovators, accelerating the integration of advanced AI with cutting-edge robotic hardware.",
        stats: [
          { value: "$5M", label: "Seed Funding Secured" },
          { value: "2+", label: "Strategic Hardware Partners" },
          { value: "3+", label: "Deployment Environments" },
        ],
        partners: [
          {
            name: "AGIBOT",
            description:
              "Strategic partner advancing humanoid robot development and commercialization. The collaboration brings Xmind intelligence to AGIBOT's next-generation humanoid platforms.",
          },
          {
            name: "Unitree Robotics",
            description:
              "World-leading quadruped and humanoid robot manufacturer. Unitree's hardware paired with Xmind enables high-performance autonomous operation across field and industrial environments.",
          },
        ],
      },
      vision: {
        kicker: "Vision",
        statement:
          "At Edenverse AI, we believe the future of robotics lies in intelligent, adaptable systems that can operate across forms and functions. By building the brain behind the machine, we are shaping a new era of physical AI.",
      },
      history: {
        pageHero: {
          kicker: "OUR STORY",
          title: "History",
          statusBadge: "Under construction",
          description:
            "We're writing the story of how Edenverse AI came to be. Check back soon.",
        },
      },
      team: {
        pageHero: {
          kicker: "The Team",
          title: "The people building Edenverse AI.",
          description:
            "Meet the leadership team driving innovation in physical AI and intelligent robotics.",
        },
        members: [
          {
            name: "Sam Li",
            role: "Chief Executive Officer (CEO)",
            bio: "Sam Li is the Chief Executive Officer of Edenverse AI and a visionary entrepreneur in the field of physical artificial intelligence and robotics. He leads the company's overall strategy, business development, and global expansion. With a strong background in technology innovation and company building, Sam has a proven track record of bringing cutting-edge ideas from concept to commercialization. He is passionate about advancing intelligent robotics and shaping the future of automation across industries.",
          },
          {
            name: "Jason Liu",
            role: "Chief Technology Officer (CTO)",
            bio: "Jason serves as the Chief Technology Officer of Edenverse AI, where he leads the development of the company's core AI technologies, including the Xmind robot brain model. With deep expertise in robotics, artificial intelligence, and large-scale systems, Jason has extensive experience in building intelligent platforms that integrate perception, planning, and control. He is responsible for driving technological innovation and ensuring the scalability and performance of Edenverse AI's solutions.",
          },
          {
            name: "Evelyn Zhou",
            role: "Chief Financial Officer (CFO)",
            bio: "Evelyn is the Chief Financial Officer of Edenverse AI, overseeing the company's financial strategy, capital planning, and investor relations. She brings strong expertise in financial management, corporate finance, and fundraising, with experience supporting high-growth technology companies. Evelyn plays a key role in optimizing financial operations and supporting the company's long-term growth and expansion.",
          },
          {
            name: "Vera Zhang",
            role: "Chief Operating Officer (COO)",
            bio: "Vera is the Chief Operating Officer of Edenverse AI, responsible for managing the company's day-to-day operations and ensuring efficient execution across all departments. She has extensive experience in operations management, process optimization, and organizational scaling. Vera focuses on building strong internal systems and driving operational excellence to support the company's rapid growth.",
          },
          {
            name: "Carrie Wang",
            role: "Chief Marketing Officer (CMO)",
            bio: "Carrie is the Chief Marketing Officer of Edenverse AI, leading the company's branding, marketing strategy, and global communications. With a strong background in technology marketing and brand development, she specializes in positioning innovative products in competitive markets. Carrie is responsible for driving market awareness, customer engagement, and the overall brand presence of Edenverse AI.",
          },
        ],
      },
    },
    contact: {
      pageHero: {
        kicker: "Contact",
        title: "Start the robotics conversation.",
        description:
          "",
      },
      info: {
        kicker: "Reach Edenverse AI",
        title: "Talk with our team about solutions, deployment, or collaboration.",
        description:
          "",
        address: sharedAddress,
        phoneLabel: sharedPhoneLabel,
        phoneRaw: sharedPhoneRaw,
        email: sharedEmail,
      },
      form: {
        kicker: "Inquiry Form",
        title: "Tell us what you are building.",
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "Your email",
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your robotics use case, timeline, or question.",
        submitLabel: "Send Inquiry",
        submittingLabel: "Sending…",
        successTitle: "Thank you for reaching out.",
        successBody:
          "Your message has been sent. Our team will get back to you shortly.",
        errorMessage:
          "Something went wrong while sending your message. Please try again.",
      },
    },
    technology: {
      pageHero: {
        kicker: "Technology",
        title: "RX BRAIN — Technology",
        description:
          "Detailed technology page coming soon. For now, explore our solutions or get in touch.",
      },
    },
    news: {
      hero: {
        kicker: "News",
        title: "Press, partnerships, and platform milestones.",
          description:
            "Official announcements from Edenverse AI — partnership news, program memberships, and platform milestones.",
      },
      meta: {
        categoryLabel: "Category",
        dateLabel: "Published",
        readArticle: "Read article",
        backToNews: "Back to Media Center",
        notTranslatedYet: "This article has not been translated yet. Showing the English version.",
        previousArticle: "Previous",
        nextArticle: "Next",
        currentOfTotalLabel: "{current} of {total}",
        paginationLabel: "Article pagination",
      },
    },
    demoCenter: {
      hero: {
        kicker: "Demo Center",
        title: "Field deployments, in their own words.",
        description:
          "Customer pilots, working deployments, and platform demos from real Edenverse AI field work.",
      },
    },
  },
  zh: {
    meta: {
      title: "Edenverse AI",
      description: "面向工业、教育与关键任务场景的先进机器人解决方案。",
    },
    navigation: {
      items: [
        { label: "解决方案", href: "/solutions" },
        {
          label: "媒体中心",
          children: [
            { label: "新闻", href: "/media-center/news" },
            { label: "演示中心", href: "/media-center/demo-center" },
          ],
        },
        {
          label: "关于我们",
          href: "/about",
          children: [
            { label: "发展历程", href: "/about/history" },
            { label: "团队", href: "/about/team" },
          ],
        },
        { label: "联系我们", href: "/contact" },
      ],
      languages: [{ locale: "en" }, { locale: "zh" }],
      submenuLabel: "展开子菜单",
    },
    footer: {
      tagline: "面向未来的机器人品牌",
      title: "与 Edenverse AI 一起打造下一代机器人应用场景。",
      description:
        "我们用更技术化、更清晰的方式呈现机器人能力，把先进硬件、感知控制与真实部署需求连接起来。",
      navigationHeading: "页面导航",
      contactHeading: "联系信息",
      links: [
        { label: "解决方案", href: "/solutions" },
        { label: "新闻", href: "/media-center/news" },
        { label: "演示中心", href: "/media-center/demo-center" },
        { label: "关于我们", href: "/about" },
        { label: "团队", href: "/about/team" },
        { label: "联系我们", href: "/contact" },
      ],
      address: sharedAddress,
      phoneLabel: sharedPhoneLabel,
      phoneRaw: sharedPhoneRaw,
      email: sharedEmail,
    },
    home: {
      hero: {
        kicker: "Edenverse AI",
        title: "以部署驱动规模,以数据铸造壁垒。",
        description:
          "我们专注于工业、教育、人形机器人与消防等方向的先进机器人平台与解决方案，强调精确控制、工程能力与落地部署。",
        primaryAction: "查看解决方案",
        secondaryAction: "联系我们",
        backgroundVideoSrc: homepageHeroVideoSrc,
        backgroundPosterSrc: homepageHeroPosterSrc,
        videoAriaLabel: "四足巡检机器人在工业场景中行走",
      },
      companyIntroduction: {
        kicker: "公司简介",
        title: "以数据驱动智能的闭环生态",
        description:
          "我们依托全球供应链体系，并结合销售、租赁及教育等多元化业务模式，为客户提供稳定且可扩展的机器人解决方案。\n\n通过融合不同行业的实际数据，并结合先进的感知与运动控制技术，我们能够针对制造业、建筑业等复杂应用场景进行定制化开发。我们的机器人系统具备持续优化与智能升级的能力，能够随着客户需求不断演进。",
      },
      rxBrain: {
        kicker: "即将推出",
        subtitle:
          "RX BRAIN™ 是支撑每一台 Edenverse AI 机器人的通用智能核心。",
        description:
          "RX BRAIN 将感知、规划与控制融合在同一模型中，跨任务、跨场景持续进化。每一次部署都在训练它，每一台机器人都在运行它，整支机队变得更敏锐。",
        ctaLabel: "技术",
        wordmarkAlt: "RX BRAIN",
        imageSequenceAriaLabel: "RX BRAIN 系统的抽象可视化",
      },
      deploymentCycle: {
        description:
          "每一次部署都在采集数据,每一条数据都会训练大脑,每一个大脑都让整个机队更聪明。",
        items: [
          { key: "deploy", label: "Deploy" },
          { key: "learn", label: "Learn" },
          { key: "evolve", label: "Evolve" },
        ],
      },
      latestEvents: {
        kicker: "Edenverse AI 最新动态",
        title: "来自现场的部署、合作与平台更新。",
        description:
          "持续记录 Edenverse AI 正在落地的项目、机器人去往的场景，以及我们正在一起合作的伙伴。",
        ctaLabel: "查看全部新闻",
        ctaHref: "/media-center/news",
        previousLabel: "上一篇",
        nextLabel: "下一篇",
        currentOfTotalLabel: "{current} / {total}",
      },
      solutions: {
        kicker: "解决方案方向",
        title: "面向多种机器人应用环境而设计。",
        description: "",
      },
      featuredSolutions: [
        {
          tag: "巡检AI：工厂",
          title: "巡检AI——工厂巡检、异常检测与运营可视化。",
          description:
            "为需要机器人进行设备状态采集、异常情况识别并反馈可执行数据的工业现场量身打造。",
          highlights: ["例行巡检自动化", "设备状态监测工作流", "工厂部署就绪"],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/d51c478641b5483bb9df2eab5a2e5421.mp4",
        },
        {
          tag: "清洁AI：商场 / 工厂",
          title: "清洁AI——商业空间与工业设施的自动清洁。",
          description:
            "为需要自主清洁、全覆盖路线规划和服务质量标准化的购物中心、公共设施和生产车间而设计。",
          highlights: ["大面积覆盖", "自主清洁路线", "智能清洁"],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/a3f76e9d0a644bfa8087776cce13ca1a.mp4",
        },
        {
          tag: "物流AI：仓库",
          title: "物流AI——仓库搬运、转运与物料流优化。",
          description:
            "完美适配仓储环境，通过机器人移动能力减少人工搬运阻力，提升工作流连贯性，从存储到派遣的全流程优化。",
          highlights: ["多仓库运输路径优化", "多机器人协同重物搬运"],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/d6f84cb53bf04f7b9ff0b6acc9c490a7.mp4",
        },
        {
          tag: "建筑AI：建筑工地",
          title: "建筑AI——复杂、多变、高噪声建筑工地。",
          description:
            "为建筑团队提供现场监测、数据采集和动态户外环境中更安全、更高效的现场执行能力支持。",
          highlights: ["现场数据采集", "动态地形沟通", "现场部署可信度"],
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "服务AI：酒店 / 餐厅",
          title: "服务AI——面向客人的配送、引导与服务流程。",
          description:
            "最适合酒店和餐厅应用，机器人可优化服务接触点并强化现代科技导向的客户体验。",
          highlights: ["宾客互动", "酒店餐厅运送服务"],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/db67a691d5584bb3a8276d80b128ee77.mp4",
        },
        {
          tag: "陪伴AI：家庭",
          title: "陪伴AI——居家协助、互动与日常支持。",
          description:
            "面向未来的应用场景，在家庭环境中，陪伴、协助与直观交互与机器人平台本身一样重要。",
          highlights: ["协助与护理定位", "情感感知的产品叙事"],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/2190306bf4a143d8a134f06fa6b78fb1.mp4",
        },
      ],
      callout: {
        kicker: "合作洽谈",
        title: "准备将 Edenverse AI 部署到您的场景吗？",
        description:
          "告诉我们您的场地与运营需求，我们会一起规划合适的机器人平台、部署方案与支持路径。",
        primaryAction: "与团队沟通",
        secondaryAction: "了解 Edenverse AI",
      },
    },
    solutions: {
      pageHero: {
        kicker: "解决方案",
        title: "围绕真实任务需求构建的机器人能力展示。",
        description:
          "Edenverse AI 借助智能机器人技术，助力企业实现运营自动化。我们提供的不仅仅是解决方案，更致力于确保其持续优化——通过让机器人从日常工作中不断学习、随时间推移自我适应，从而更高效地执行各项任务。",
      },
      cards: [
        {
          tag: "巡检 AI：工厂",
          title: "面向工厂巡检、异常检测与运营可视化的巡检 AI。",
          description:
            "面向需要机器人捕捉设备状态、识别异常情况并将可执行数据回传到运营闭环的工业场景。",
          highlights: [
            "日常巡检自动化",
            "设备状态监测流程",
            "智能工厂部署",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/4d194693eac84a51955e75036c7a5a86.mp4",
        },
        {
          tag: "清洁 AI：商场 / 工厂",
          title: "面向商业空间与工业场所的清洁 AI。",
          description:
            "为需要自主清洁、可复用巡线与稳定服务质量的团队打造，覆盖购物中心、公共设施与生产车间。",
          highlights: [
            "大面积覆盖能力",
            "自主清洁路径规划",
            "智能清扫定位与效果可视化",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/a3f76e9d0a644bfa8087776cce13ca1a.mp4",
        },
        {
          tag: "物流 AI：仓储",
          title: "面向仓内搬运、调度与物料流转的物流 AI。",
          description:
            "适合机器人移动能力能够减少人工搬运摩擦、在存储到出货全流程中保持作业连续性的仓储环境。",
          highlights: [
            "仓内运输自动化",
            "运营效率提升",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/d6f84cb53bf04f7b9ff0b6acc9c490a7.mp4",
        },
        {
          tag: "施工 AI：工地",
          title: "面向复杂、多变与高噪声建筑工地的施工 AI。",
          description:
            "延续当前网站中安全优先的表达，强调远程操控、态势感知与人员保护能力。",
          highlights: [
            "工地态势采集",
            "动态地形通讯",
          ],
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "服务 AI：酒店 / 餐饮",
          title: "面向面客配送、引导与酒店餐饮流程的服务 AI。",
          description:
            "适合酒店与餐饮场景，机器人可以优化服务触点，同时强化现代、科技感的宾客体验。",
          highlights: [
            "宾客互动",
            "酒店餐饮运送服务",
            "前厅自动化",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/db67a691d5584bb3a8276d80b128ee77.mp4",
        },
        {
          tag: "陪伴 AI：家庭",
          title: "面向家庭陪伴、互动与日常辅助的陪伴 AI。",
          description:
            "面向家庭环境的未来方向，陪伴、辅助与自然互动与机器人平台本身同等重要。",
          highlights: [
            "家务辅助与关怀定位",
            "情感感知与健康监测",
          ],
          backgroundVideoSrc: "https://cdn.shopify.com/videos/c/o/v/2190306bf4a143d8a134f06fa6b78fb1.mp4",
        },
      ],
      callout: {
        kicker: "下一步",
        title: "没有找到您的场景？",
        description:
          "每个场景都有独特的约束。我们会和您一起梳理运营流程，规划合适的机器人平台与部署方案。",
        primaryLabel: "联系我们",
        primaryHref: "/contact",
      },
    },
    about: {
      pageHero: {
        kicker: "具身人工智能",
        title: "构建机器背后的大脑。",
        description:
          "Edenverse AI 是一家总部位于加州尔湾的具身人工智能公司，专注于先进机器人应用与下一代机器人智能系统的研发。公司由顶尖机器人专家团队创立，致力于重新定义机器人的感知、思考与行动方式。",
      },
      mission: {
        kicker: "核心技术 — Xmind",
        title: "一个大脑，多种机器人，多类任务。",
        description:
          "Edenverse AI 的核心是我们自主研发的机器人大脑模型 Xmind —— 一套基于大规模多模态数据训练的强大 AI 系统。Xmind 实现了「一脑多机多任务」架构，使人形机器人、四足机器人、机械臂等多种平台共享统一的智能层。",
        values: [
          {
            title: "统一智能",
            description:
              "单一 Xmind 模型驱动人形机器人、四足机器人和机械臂的感知、规划与控制，无需为每个平台单独开发 AI 系统。",
          },
          {
            title: "强泛化能力",
            description:
              "与需要针对特定任务编程和重新训练的传统系统不同，Xmind 驱动的机器人能够无缝适应新环境，执行导航、操作、自主运行等复杂任务，无需大量重新配置。",
          },
          {
            title: "跨平台覆盖",
            description:
              "同一智能层运行于多种形态的机器人平台，单次软件投入即可覆盖整个机器人集群。",
          },
        ],
      },
      advantage: {
        kicker: "部署方向",
        title: "面向非结构化环境的可扩展自动化。",
        description:
          "Edenverse AI 专注于在真实、非结构化的场景中部署智能机器人解决方案，覆盖传统刚性系统长期难以规模化的行业领域。",
        points: [
          {
            index: "01",
            title: "工业运营与仓储物流",
            description:
              "面向工厂、仓库及工业现场的自主巡检、异常检测与物流自动化，实现持续可靠的全天候运营。",
          },
          {
            index: "02",
            title: "巡检与基础设施维护",
            description:
              "智能巡检机器人采集设备状态、识别异常情况，并将可操作数据回传至运营系统，无需人工干预。",
          },
          {
            index: "03",
            title: "应急响应",
            description:
              "专为高风险环境设计的机器人平台，覆盖消防、危化品处置等场景，在人员安全受限的情况下实现自主处置能力。",
          },
        ],
      },
      traction: {
        kicker: "增长",
        title: "500万美元种子轮融资，战略合作伙伴已就位。",
        description:
          "Edenverse AI 已完成 500 万美元种子轮融资，并与顶尖机器人创新企业建立战略合作，加速先进 AI 与前沿机器人硬件的融合落地。",
        stats: [
          { value: "$500万", label: "种子轮融资" },
          { value: "2+", label: "战略硬件合作伙伴" },
          { value: "3+", label: "已覆盖部署场景" },
        ],
        partners: [
          {
            name: "宇树科技 (Unitree Robotics)",
            description:
              "全球领先的四足及人形机器人制造商。宇树的硬件与 Xmind 结合，实现了在野外及工业环境中的高性能自主运行。",
          },
          {
            name: "智元机器人 (AGIBOT)",
            description:
              "专注于人形机器人研发与商业化的战略合作伙伴。此次合作将 Xmind 智能引入 AGIBOT 的下一代人形机器人平台。",
          },
        ],
      },
      vision: {
        kicker: "愿景",
        statement:
          "在 Edenverse AI，我们相信机器人的未来在于能够跨越形态与功能界限的智能、可适应系统。通过构建机器背后的大脑，我们正在开创具身人工智能的新纪元。",
      },
      history: {
        pageHero: {
          kicker: "我们的故事",
          title: "发展历程",
          statusBadge: "建设中",
          description: "我们正在整理 Edenverse AI 的发展故事，敬请期待。",
        },
      },
      team: {
        pageHero: {
          kicker: "核心团队",
          title: "构建 Edenverse AI 的人们。",
          description:
            "认识推动具身人工智能与智能机器人领域创新的领导团队。",
        },
        members: [
          {
            name: "Sam Li",
            role: "首席执行官 (CEO)",
            bio: "Sam Li 是 Edenverse AI 的首席执行官，是具身人工智能与机器人领域极具远见的企业家。他负责领导公司整体战略、业务拓展与全球化布局。凭借深厚的技术创新与企业建设背景，Sam 拥有将前沿创意从概念推向商业化的丰富经验。他热衷于推动智能机器人的发展，致力于重塑跨行业自动化的未来。",
          },
          {
            name: "Jason Liu",
            role: "首席技术官 (CTO)",
            bio: "Jason 担任 Edenverse AI 首席技术官，负责领导公司核心 AI 技术的研发，包括 Xmind 机器人大脑模型。他在机器人学、人工智能及大规模系统领域拥有深厚积累，具备丰富的智能平台建设经验，擅长融合感知、规划与控制能力。Jason 负责推动技术创新，确保 Edenverse AI 解决方案的可扩展性与性能表现。",
          },
          {
            name: "Evelyn Zhou",
            role: "首席财务官 (CFO)",
            bio: "Evelyn 是 Edenverse AI 的首席财务官，负责监管公司财务战略、资本规划与投资者关系。她在财务管理、公司金融与融资方面拥有丰富专长，并具备支持高速成长型科技企业的实战经验。Evelyn 在优化财务运营、推动公司长期增长与扩张方面发挥着关键作用。",
          },
          {
            name: "Vera Zhang",
            role: "首席运营官 (COO)",
            bio: "Vera 是 Edenverse AI 的首席运营官，负责统筹公司日常运营，确保各部门高效协同执行。她在运营管理、流程优化与组织规模化方面积累了深厚经验。Vera 专注于构建稳健的内部体系，以运营卓越为驱动力支撑公司的快速成长。",
          },
          {
            name: "Carrie Wang",
            role: "首席营销官 (CMO)",
            bio: "Carrie 是 Edenverse AI 的首席营销官，负责领导公司品牌建设、营销战略与全球传播。她在科技营销与品牌发展领域具有深厚积累，擅长在竞争激烈的市场中精准定位创新产品。Carrie 负责提升市场认知度、深化客户互动，并全面塑造 Edenverse AI 的品牌影响力。",
          },
        ],
      },
    },
    contact: {
      pageHero: {
        kicker: "联系我们",
        title: "开启一次关于机器人应用的沟通。",
        description:
          "",
      },
      info: {
        kicker: "联系 Edenverse AI",
        title: "欢迎与我们讨论解决方案、部署需求或合作想法。",
        description:
          "",
        address: sharedAddress,
        phoneLabel: sharedPhoneLabel,
        phoneRaw: sharedPhoneRaw,
        email: sharedEmail,
      },
      form: {
        kicker: "咨询表单",
        title: "告诉我们你的需求。",
        nameLabel: "姓名",
        namePlaceholder: "请输入姓名",
        emailLabel: "邮箱",
        emailPlaceholder: "请输入邮箱",
        messageLabel: "留言",
        messagePlaceholder: "请介绍你的机器人应用场景、时间计划或具体问题。",
        submitLabel: "发送咨询",
        submittingLabel: "发送中…",
        successTitle: "感谢你的咨询。",
        successBody: "你的信息已发送，我们的团队会尽快与你联系。",
        errorMessage: "发送信息时出现问题，请重试。",
      },
    },
    technology: {
      pageHero: {
        kicker: "技术",
        title: "RX BRAIN — 技术",
        description: "详细技术说明即将上线。欢迎先浏览我们的解决方案或联系我们。",
      },
    },
    news: {
      hero: {
        kicker: "新闻",
        title: "新闻稿、合作公告与平台节点。",
        description:
          "来自 Edenverse AI 的官方公告：战略合作、计划入选与平台里程碑都会在这里同步。",
      },
      meta: {
        categoryLabel: "分类",
        dateLabel: "发布时间",
        readArticle: "阅读全文",
        backToNews: "返回媒体中心",
        notTranslatedYet: "本篇文章尚未翻译，当前显示英文版本。",
        previousArticle: "上一篇",
        nextArticle: "下一篇",
        currentOfTotalLabel: "{current} / {total}",
        paginationLabel: "文章翻页",
      },
    },
    demoCenter: {
      hero: {
        kicker: "演示中心",
        title: "来自现场的部署与试点。",
        description:
          "客户试点、实地部署与平台演示，记录 Edenverse AI 在真实场景中的工作。",
      },
    },
  },
};

export function getSiteContent(locale: Locale): SiteContent {
  return siteContentByLocale[locale] ?? siteContentByLocale.en;
}
