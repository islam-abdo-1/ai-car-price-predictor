import { SectionCard } from '../components/ui/SectionCard';
import { Sparkles, GraduationCap, BookOpen, Users, Calendar } from 'lucide-react';
import { CarIcon } from '../components/ui/CarIcon';

const projectInfo = {
  title: 'About the Project',
  subtitle: 'AI Car Price Predictor',
  description: 'AI Car Price Predictor is a Machine Learning-based application designed to estimate vehicle prices using vehicle specifications and trained regression models.',
  details: [
    {
      icon: GraduationCap,
      title: 'NTI Summer Training Program',
      description: 'This project was developed as part of the 120-hour NTI summer training program graduation project.',
    },
    {
      icon: BookOpen,
      title: 'Machine Learning Focus',
      description: 'The project experiments with multiple regression algorithms including Random Forest, XGBoost, and CatBoost to predict car prices based on various vehicle features.',
    },
    {
      icon: CarIcon,
      title: 'Real-World Data',
      description: 'The models are trained on automotive datasets with features like manufacturer, model, year, mileage, engine specifications, and interior/exterior attributes.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Developed by a team of 6 students working together on data preprocessing, model training, and frontend development.',
    },
  ],
  techStack: [
    { category: 'Frontend', technologies: ['React 18', 'Vite', 'Tailwind CSS', 'React Router', 'React Hook Form', 'Zod', 'Headless UI'] },
    { category: 'Machine Learning', technologies: ['Python', 'Scikit-learn', 'XGBoost', 'CatBoost', 'Pandas', 'NumPy'] },
    { category: 'Deployment', technologies: ['Vercel (Frontend)', 'FastAPI/Flask (Backend API)', 'GitHub Actions (CI/CD)'] },
  ],
};

export function About() {
  return (
    <div className="container-main">
      <header className="mb-12 animate-fade-in">
        <h1 className="text-display font-bold text-text-primary mb-4">{projectInfo.title}</h1>
        <h2 className="text-h1 font-semibold text-accent mb-6">{projectInfo.subtitle}</h2>
        <p className="text-body-lg text-text-secondary max-w-3xl">
          {projectInfo.description}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {projectInfo.details.map((detail, index) => (
          <SectionCard key={detail.title} className="hover:border-accent/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
                <detail.icon className={detail.icon === CarIcon ? 'w-7 h-7 text-white' : 'w-7 h-7 text-white'} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-h3 font-semibold text-text-primary mb-2">{detail.title}</h3>
                <p className="text-body text-text-secondary">{detail.description}</p>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>

      <section aria-labelledby="tech-stack-heading" className="animate-fade-in">
        <h2 id="tech-stack-heading" className="text-h2 font-semibold text-text-primary mb-6">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectInfo.techStack.map((stack, index) => (
            <SectionCard key={stack.category} className="hover:border-accent/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
              <h3 className="text-h3 font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
                {stack.category}
              </h3>
              <ul className="space-y-2">
                {stack.technologies.map((tech, i) => (
                  <li key={tech} className="flex items-center gap-2 text-body text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-accent/50 flex-shrink-0 mt-1.5" aria-hidden="true" />
                    {tech}
                  </li>
                ))}
              </ul>
            </SectionCard>
          ))}
        </div>
      </section>

      <SectionCard className="mt-12 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
        <h2 className="text-h2 font-semibold text-text-primary mb-4">Project Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Phase 1: Data Collection & Preprocessing</h3>
              <p className="text-body-sm text-text-secondary mt-1">Gathering automotive datasets, cleaning data, handling missing values, feature engineering</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Phase 2: Model Training & Evaluation</h3>
              <p className="text-body-sm text-text-secondary mt-1">Training Random Forest, XGBoost, and CatBoost models; hyperparameter tuning; cross-validation</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Phase 3: Frontend Development</h3>
              <p className="text-body-sm text-text-secondary mt-1">Building the React application with dark-themed UI, form validation, and API integration</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-bg-input/50 rounded-xl border border-border-primary">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Phase 4: Backend API & Deployment</h3>
              <p className="text-body-sm text-text-secondary mt-1">Creating FastAPI/Flask backend, deploying models, connecting frontend to API, production deployment</p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}