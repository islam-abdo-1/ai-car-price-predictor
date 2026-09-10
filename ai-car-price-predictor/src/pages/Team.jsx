import { useState } from 'react';
import { SectionCard } from '../components/ui/SectionCard';
import { User, ChevronLeft, ChevronRight, Sparkles, GraduationCap, Briefcase, MapPin } from 'lucide-react';

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const ICON_SIZES = {
  avatar: { container: 'w-20 h-20', icon: 'w-10 h-10' },
  social: { container: 'w-10 h-10', icon: 'w-5 h-5' },
  action: { icon: 'w-4 h-4' },
  skillDot: 'w-1.5 h-1.5',
};

const teamMembers = [
  {
    name: 'Yusuf Lotfy',
    role: 'Team Lead',
    github: 'https://github.com/Yusuf-Lotfy',
    linkedin: 'https://www.linkedin.com/in/yusuf-lotfy-b3022a2b1',
    skills: ['Data Cleaning', 'Data Processing'],
  },
  {
    name: 'Lotfy El Shazly',
    role: 'ML Engineer / Data Scientist',
    github: 'https://github.com/lotfynsr-creator',
    linkedin: 'https://www.linkedin.com/in/lotfynsr-el-shazly-5310213a0',
    skills: ['Data Cleaning', 'Data Processing'],
  },
  {
    name: 'Islam Abdo',
    role: 'Full-Stack Developer',
    github: 'https://github.com/islam-abdo-1',
    linkedin: 'https://www.linkedin.com/in/islam-abdo-15094139b',
    skills: ['UI', 'Deployment'],
  },
  {
    name: 'Mohamed Hussein',
    role: 'Frontend Developer / ML Engineer',
    github: 'https://github.com/mohamedmhmh123456789-sys',
    linkedin: 'https://www.linkedin.com/in/mohamed-hussein-1b9b0b397',
    skills: ['UI', 'Deployment'],
  },
  {
    name: 'Mahmoud El Shafiy',
    role: 'ML Engineer',
    github: 'https://github.com/shaf3iiiii',
    linkedin: 'https://www.linkedin.com/in/mahmoud-elshafiy-a561272a2',
    skills: [],
  },
  {
    name: 'Mosab Ahmed',
    role: 'ML Engineer',
    github: 'https://github.com/mosab06',
    linkedin: 'https://www.linkedin.com/in/mosab-ahmed-2023a3328',
    skills: [],
  },
];

function TeamCard({ member, index }) {
  const [flipped, setFlipped] = useState(false);

  const renderAvatar = () => (
    <div className="mx-auto mt-4 mb-4">
      <div className={`${ICON_SIZES.avatar.container} mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/30`}>
        <User className={`${ICON_SIZES.avatar.icon} text-accent`} aria-hidden="true" />
      </div>
    </div>
  );

  const renderSocialLinks = () => (
    <div className="flex items-center justify-center gap-3 mb-4">
      <a
        href={member.github}
        target="_blank"
        rel="noopener noreferrer"
        className={`${ICON_SIZES.social.container} flex items-center justify-center rounded-lg text-text-secondary hover:text-accent transition-colors hover:bg-bg-input`}
        aria-label={`${member.name} - GitHub`}
      >
        <GitHubIcon className={ICON_SIZES.social.icon} />
      </a>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${ICON_SIZES.social.container} flex items-center justify-center rounded-lg text-text-secondary hover:text-blue-400 transition-colors hover:bg-bg-input`}
        aria-label={`${member.name} - LinkedIn`}
      >
        <LinkedInIcon className={ICON_SIZES.social.icon} />
      </a>
    </div>
  );

  const renderSkillsList = () => (
    <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 scrollbar-thin">
      <div className="w-full max-w-xs">
        {member.skills.map((skill, i) => (
          <div key={i} className="flex items-center gap-2 p-2 bg-bg-input/50 rounded-lg border border-border-primary mb-2">
            <div className={`${ICON_SIZES.skillDot} rounded-full bg-accent flex-shrink-0`} aria-hidden="true" />
            <span className="text-body-sm text-text-primary">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFlipButton = (onClick, icon, label) => (
    <button
      onClick={onClick}
      className="btn-ghost w-full max-w-xs mx-auto mb-4"
    >
      <icon className={`${ICON_SIZES.action.icon} mr-2`} aria-hidden="true" />
      {label}
    </button>
  );

  const renderFooter = () => (
    <div className="pt-3 border-t border-border-primary">
      <p className="text-body-sm text-text-secondary text-center">
        NTI Summer Training Program 2026
      </p>
    </div>
  );

  return (
    <div className="flip-card min-h-[400px] relative flex flex-col" style={{ animationDelay: `${index * 100}ms` }}>
      <div className={`flip-card-inner ${flipped ? 'flipped z-10' : ''}`} style={{ height: '100%' }}>
        
        {/* Front Face */}
        <div className="flip-card-front section-card flex flex-col h-full">
          {renderAvatar()}
          
          <h3 className="text-h3 font-semibold text-text-primary mb-1 text-center">{member.name}</h3>
          
          {/* Skills displayed as tags on front face */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.skills.map((skill, i) => (
              <span key={i} className="text-xs font-medium text-accent bg-bg-input/50 rounded px-2 py-1">
                {skill}
              </span>
            ))}
          </div>
          
          {renderSocialLinks()}
          
          <div className="flex-1" />
          
          {/* Border added around "Show Skills" button */}
          {renderFlipButton(() => setFlipped(true), ChevronRight, 'Show Skills')}
        </div>

        {/* Back Face */}
        <div className="flip-card-back section-card flex flex-col h-full">
          {renderAvatar()}
          
          <h3 className="text-h3 font-semibold text-text-primary mb-3 text-center">{member.name}</h3>
          
          {/* Role displayed on back face */}
          <p className="text-body text-accent mb-4 text-center">{member.role}</p>
          
          {renderFlipButton(() => setFlipped(false), ChevronLeft, 'Hide Skills')}
          
          {renderFooter()}
        </div>
      </div>
    </div>
  );
}

export function Team() {
  return (
    <div className="container-main">
      <header className="mb-12 animate-fade-in">
        <h1 className="text-display font-bold text-text-primary mb-4">Project Team</h1>
        <p className="text-body-lg text-text-secondary max-w-3xl">
          Meet the team behind the AI Car Price Predictor. Six dedicated students from the NTI Summer Training Program
          who collaborated to build this machine learning application.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <TeamCard key={member.name} member={member} index={index} />
        ))}
      </div>

      <SectionCard className="mt-12 animate-fade-in">
        <h2 className="text-h2 font-semibold text-text-primary mb-6 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-accent" aria-hidden="true" />
          Project Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
              <GraduationCap className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Program</h3>
              <p className="text-body-sm text-text-secondary">NTI Summer Training Program</p>
              <p className="text-body-sm text-text-secondary">120 Hours - Graduation Project</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
              <Briefcase className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Project Type</h3>
              <p className="text-body-sm text-text-secondary">Machine Learning Application</p>
              <p className="text-body-sm text-text-secondary">Vehicle Price Prediction</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
              <MapPin className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Status</h3>
              <p className="text-body-sm text-text-secondary">Phase 1: Frontend Complete</p>
              <p className="text-body-sm text-text-secondary">Phase 2: ML Integration Pending</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-xl">
          <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
            Next Steps
          </h3>
          <ul className="space-y-1.5 text-body-sm text-text-secondary">
            <li>• Integrate trained ML models via backend API</li>
            <li>• Connect frontend to production prediction endpoint</li>
            <li>• Add model evaluation metrics dashboard</li>
            <li>• Deploy to production environment</li>
          </ul>
        </div>
      </SectionCard>
    </div>
  );
}