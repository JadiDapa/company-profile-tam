import {
  RiNodeTree as Network,
  RiShareLine as Share2,
  RiShieldCheckLine as ShieldCheck,
  RiBox3Line as PackageSearch,
} from "react-icons/ri";

export const services = [
  {
    slug: "it-consultant",
    name: "IT Consultant",
    description:
      "IT consulting services include IT governance, information security management systems, IT infrastructure design, training services, IT master planning, and more.",
    image:
      "https://images.unsplash.com/photo-1742112125635-6f8201c6ee3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Network,
    points: [
      "IT governance and information security management system consulting",
      "IT infrastructure design and master planning tailored to your business",
      "Ongoing training and knowledge transfer for your internal team",
    ],
  },
  {
    slug: "integrator",
    name: "Integrator",
    description:
      "Installation, Configuration, and Integration Services for Information and Telecommunication Technology Infrastructure.",
    image:
      "https://images.unsplash.com/photo-1676630656246-3047520adfdf?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Share2,
    points: [
      "Installation and configuration of IT & telecommunication infrastructure",
      "End-to-end system integration across your existing technology stack",
      "Rigorous testing and handover to ensure a smooth go-live",
    ],
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    description:
      "Regular and Routine IT Equipment Maintenance Services to minimize the risk of damage and address any existing IT equipment issues.",
    image:
      "https://images.unsplash.com/photo-1748027869634-fc2e545cfb0c?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: ShieldCheck,
    points: [
      "Scheduled preventive maintenance to reduce the risk of downtime",
      "Fast response troubleshooting for existing IT equipment issues",
      "Ongoing monitoring to catch problems before they escalate",
    ],
  },
  {
    slug: "trading-supplier",
    name: "Trading & Supplier",
    description:
      "IT Equipment Trading & Supply Services with competitive prices and high quality.",
    image:
      "https://images.unsplash.com/photo-1683821791876-9d2ad0c90bf6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: PackageSearch,
    points: [
      "Sourcing of IT equipment from trusted, quality-assured suppliers",
      "Competitive pricing without compromising on product quality",
      "Flexible procurement to match your project timeline and budget",
    ],
  },
];
