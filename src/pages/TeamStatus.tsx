import { motion } from "framer-motion";
import { Lightbulb, Trophy, Compass, Award } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const innovationProjects = [
  {
    season: "2025–2026",
    title: "Submerged / Marine Energy Monitor",
    description:
      "Developed a prototype sensor array to monitor tidal flow power usage and reduce local ocean energy footprint.",
  },
  {
    season: "2024–2025",
    title: "Masterpiece / Eco-Acoustic Panel",
    description:
      "Designed low-cost acoustic soundproofing using recycled community materials for school performance spaces.",
  },
  {
    season: "2023–2024",
    title: "SUPERPOWERED / Smart Grid Node",
    description:
      "Created an automated load-balancing simulator for local clean energy distribution.",
  },
];

const seasonAwards = [
  {
    season: "2025–2026",
    awards: [
      "1st Place - Innovation Project Award",
      "Global Innovation Nominee",
      "Robot Performance Finalist",
    ],
  },
  {
    season: "2024–2025",
    awards: [
      "Engineering Excellence Award",
      "2nd Place - State Championship",
      "Core Values Award",
    ],
  },
  {
    season: "2023–2024",
    awards: [
      "Breakthrough Award",
      "1st Place - Regional Qualifier",
      "Motivate Award",
    ],
  },
];

const journeyMilestones = [
  {
    year: "2025–2026",
    title: "Expanding Our Reach",
    description:
      "Grew team membership, established secondary school mentorship programs, and published open-source CAD designs for rookie teams.",
  },
  {
    year: "2024–2025",
    title: "Refining Engineering Standards",
    description:
      "Transitioned to full custom 3D-printed attachments, standardized sensor calibration routines, and reached State Finals.",
  },
  {
    year: "2023–2024",
    title: "The Founding Season",
    description:
      "Formed Tech Titans #32795, built our dedicated pit area, and secured our first regional competition victory.",
  },
];

const StatusPage = () => {
  return (
    <PageLayout>

