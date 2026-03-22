import { motion } from "framer-motion";
import {
  User, Star, Heart, Zap, Users, Lightbulb, Bot, Trophy, Cpu, Target,
  Search, FlaskConical, Presentation, Compass, Globe, UsersRound, Handshake,
  PartyPopper, ArrowRight, type LucideIcon,
} from "lucide-react";
import type { Block } from "@/lib/siteData";

const iconMap: Record<string, LucideIcon> = {
  star: Star, heart: Heart, zap: Zap, users: Users, lightbulb: Lightbulb,
  bot: Bot, trophy: Trophy, cpu: Cpu, target: Target, search: Search,
  flask: FlaskConical, presentation: Presentation, compass: Compass,
  globe: Globe, usersRound: UsersRound, handshake: Handshake,
  partyPopper: PartyPopper, user: User,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Star;
}

interface BlockRendererProps {
  block: Block;
  isAdmin?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const BlockRenderer = ({ block, isAdmin, isSelected, onClick }: BlockRendererProps) => {
  const p = block.props;
  const wrapper = (children: React.ReactNode) => (
    <div
      onClick={onClick}
      className={`relative ${isAdmin ? "cursor-pointer" : ""} ${isSelected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-950 rounded" : ""}`}
    >
      {children}
      {isAdmin && isSelected && (
        <div className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium z-10">
          {block.type}
        </div>
      )}
    </div>
  );

  switch (block.type) {
    case "hero":
      return wrapper(
        <section className={`${p.bgColor === "black" ? "bg-black" : "bg-blue-600"} text-white py-20 px-6`}>
          <div className="max-w-4xl mx-auto text-center">
            {p.badge && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-sm font-medium tracking-wider text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full mb-6">
                {p.badge as string}
              </motion.span>
            )}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-4" style={{ textShadow: "0 0 20px rgba(59,130,246,0.4)" }}>
              {p.title as string}
            </motion.h1>
            {p.subtitle && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-300 italic">
                {p.subtitle as string}
              </motion.p>
            )}
          </div>
        </section>
      );

    case "heading": {
      const Tag = (p.level as string) === "h3" ? "h3" : "h2";
      const size = Tag === "h3" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl";
      const alignCls = p.align === "center" ? "text-center" : p.align === "right" ? "text-right" : "text-left";
      const text = p.text as string;
      const accent = p.accent as string;
      return wrapper(
        <div className={`px-6 py-8 max-w-4xl mx-auto ${alignCls}`}>
          <Tag className={`${size} font-bold`}>
            {accent && text.includes(accent)
              ? <>{text.split(accent)[0]}<span className="text-blue-500">{accent}</span>{text.split(accent).slice(1).join(accent)}</>
              : text
            }
          </Tag>
        </div>
      );
    }

    case "text":
      return wrapper(
        <div className={`px-6 py-4 max-w-4xl mx-auto ${p.align === "center" ? "text-center" : p.align === "right" ? "text-right" : ""}`}>
          <p className="text-gray-400 text-lg leading-relaxed">{p.content as string}</p>
        </div>
      );

    case "image":
      return wrapper(
        <div className="px-6 py-4 max-w-4xl mx-auto">
          {(p.src as string) ? (
            <img src={p.src as string} alt={p.alt as string} className="w-full rounded-lg object-cover" style={{ height: `${p.height}px` }} />
          ) : (
            <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center" style={{ height: `${p.height}px` }}>
              <p className="text-gray-500">{p.caption as string || p.alt as string || "Image Placeholder"}</p>
            </div>
          )}
          {p.caption && p.src && <p className="text-center text-sm text-gray-500 mt-2">{p.caption as string}</p>}
        </div>
      );

    case "button": {
      const alignCls = p.align === "center" ? "text-center" : p.align === "right" ? "text-right" : "";
      const variant = p.variant === "outline"
        ? "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white";
      return wrapper(
        <div className={`px-6 py-4 max-w-4xl mx-auto ${alignCls}`}>
          <a href={p.href as string} className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors ${variant}`}>
            {p.text as string} <ArrowRight size={16} />
          </a>
        </div>
      );
    }

    case "divider":
      return wrapper(
        <div className="px-6 py-4 max-w-4xl mx-auto">
          <div className={`h-0.5 mx-auto ${p.color === "blue" ? "bg-blue-500" : "bg-gray-700"}`} style={{ width: `${p.width}px` }} />
        </div>
      );

    case "spacer":
      return wrapper(<div style={{ height: `${p.height}px` }} />);

    case "cards": {
      const cards = p.cards as { title: string; description: string; icon: string }[];
      const cols = p.columns === "2" ? "md:grid-cols-2" : p.columns === "4" ? "md:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
      return wrapper(
        <div className="px-6 py-8 max-w-5xl mx-auto">
          <div className={`grid ${cols} gap-6`}>
            {cards.map((c, i) => {
              const Icon = getIcon(c.icon);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 border-2 border-gray-700 hover:border-blue-500 rounded-lg p-6 transition-all">
                  <Icon className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-gray-500 text-sm">{c.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    }

    case "stats": {
      const stats = p.stats as { label: string; value: string }[];
      return wrapper(
        <div className="px-6 py-8 max-w-4xl mx-auto">
          <div className={`grid grid-cols-2 ${stats.length >= 4 ? "md:grid-cols-4" : `md:grid-cols-${stats.length}`} gap-6`}>
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-blue-500 text-white rounded-lg p-6 text-center">
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-blue-100">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    case "team": {
      const members = p.members as { id: string; name: string; role: string; photo?: string }[];
      return wrapper(
        <div className="px-6 py-8 max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="border-2 border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gray-800 flex items-center justify-center">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-blue-500" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <p className="text-sm text-blue-500 font-medium">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    case "coreValues": {
      const values = p.values as { title: string; description: string; howWeDoIt: string }[];
      const cvIcons = [Compass, Lightbulb, Globe, UsersRound, Handshake, PartyPopper];
      return wrapper(
        <div className="px-6 py-8 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = cvIcons[i % cvIcons.length];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="border-2 border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors group">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-white" /></div>
                  <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{v.description}</p>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">How We Live This</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.howWeDoIt}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    }

    case "twoColumn":
      return wrapper(
        <div className="px-6 py-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-gray-400 leading-relaxed">{p.left as string}</div>
            <div className="text-gray-400 leading-relaxed">{p.right as string}</div>
          </div>
        </div>
      );

    case "iconFeatures": {
      const features = p.features as { icon: string; title: string; description: string }[];
      return wrapper(
        <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }

    case "quote":
      return wrapper(
        <div className="px-6 py-8 max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl italic text-gray-300 mb-4">"{p.text as string}"</blockquote>
          {p.author && <p className="text-blue-400 font-medium">— {p.author as string}</p>}
        </div>
      );

    case "banner":
      return wrapper(
        <div className="px-6 py-8 max-w-4xl mx-auto">
          <div className={`${p.bgColor === "blue" ? "bg-blue-500" : "bg-gray-800 border border-gray-700"} rounded-lg p-8 text-center`}>
            <p className="text-white text-lg font-medium mb-4">{p.text as string}</p>
            {p.buttonText && (
              <a href={p.href as string} className="inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                {p.buttonText as string} <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>
      );

    default:
      return wrapper(<div className="px-6 py-4 text-gray-500">Unknown block type: {block.type}</div>);
  }
};

export default BlockRenderer;
