import { Flower2, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { PageRoute } from '../components/Navbar';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

const PILLARS = [
  {
    icon: Flower2,
    title: 'Pure Botanicals',
    text: 'Cold-pressed rosehip, white tea, and plant squalane chosen for gentle hydration.',
  },
  {
    icon: ShieldCheck,
    title: 'Dermatologist Tested',
    text: 'Balanced pH formulas crafted without harsh sulfates, parabens, or heavy silicones.',
  },
  {
    icon: Sparkles,
    title: 'Cruelty Free Always',
    text: '100% vegan pigments and recyclable frosted glass packaging across every collection.',
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-20 space-y-16">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
          <p className="text-xs font-medium tracking-wider text-[#b9305c]">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2b1e24] leading-tight text-balance">
            Quiet luxury for everyday skin rituals.
          </h1>
          <p className="text-base text-[#614b54] leading-relaxed">
            Aura began with one simple goal: replace crowded 12-step shelves with breathable,
            soft-touch cosmetics that nourish your skin barrier while delivering effortless color.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="neu-pink-gradient px-7 py-3.5 rounded-full text-sm font-semibold cursor-pointer"
            >
              Browse Essentials
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 flex">
          <div className="neu-surface rounded-[2rem] p-4 w-full flex">
            <div className="w-full rounded-[1.5rem] overflow-hidden bg-[#f9eef2] min-h-[280px]">
              <img
                src={HERO_IMAGE}
                alt="Aura botanical skincare jars on alabaster pedestal"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.title} className="neu-surface rounded-3xl p-7 space-y-4">
              <div className="neu-btn w-12 h-12 rounded-2xl flex items-center justify-center text-[#c63664]">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-[#2b1e24]">{pillar.title}</h2>
              <p className="text-sm text-[#614b54] leading-relaxed">{pillar.text}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
