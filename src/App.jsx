import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  AudioLines,
  BookOpenText,
  Check,
  ChevronRight,
  Clock3,
  Globe2,
  Languages,
  Mic,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'features', label: 'Features' },
  { id: 'courses', label: 'Courses / Languages' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'dashboard', label: 'Practice Dashboard' },
]

const featureCards = [
  {
    icon: Target,
    title: 'Interactive Vocabulary Modules',
    description: 'Context-rich flashcards with audio, repetition loops, and rapid recall checks built for retention.',
  },
  {
    icon: Mic,
    title: 'AI Pronunciation Coach',
    description: 'Real-time speech scoring gives instant feedback on clarity, rhythm, and accent accuracy.',
  },
  {
    icon: BookOpenText,
    title: 'Immersive Conversation Practice',
    description: 'Role-play with lifelike dialogue scenarios that adapt to your pronunciation and confidence level.',
  },
  {
    icon: TrendingUp,
    title: 'Gamified Progress Tracking',
    description: 'Daily streaks, match scores, and achievement badges keep your language growth visible and motivating.',
  },
]

const courseTabs = ['Spanish', 'French', 'Japanese', 'German', 'Mandarin', 'English']

const courseCatalog = {
  Spanish: [
    { level: 'Beginner A1–A2', lessons: '24 lessons', duration: '4 weeks', accent: 'purple', detail: 'Travel phrases and everyday confidence' },
    { level: 'Intermediate B1–B2', lessons: '32 lessons', duration: '6 weeks', accent: 'cyan', detail: 'Conversation flow and grammar depth' },
    { level: 'Advanced C1', lessons: '18 lessons', duration: '4 weeks', accent: 'mint', detail: 'Nuanced expression and workplace fluency' },
  ],
  French: [
    { level: 'Beginner A1–A2', lessons: '22 lessons', duration: '4 weeks', accent: 'purple', detail: 'Practical speaking starters' },
    { level: 'Intermediate B1–B2', lessons: '30 lessons', duration: '6 weeks', accent: 'cyan', detail: 'Listening and real-world dialogue' },
    { level: 'Advanced C1', lessons: '20 lessons', duration: '5 weeks', accent: 'mint', detail: 'Fluency for travel and business' },
  ],
  Japanese: [
    { level: 'Beginner A1–A2', lessons: '26 lessons', duration: '5 weeks', accent: 'purple', detail: 'Hiragana, phrases, and confidence' },
    { level: 'Intermediate B1–B2', lessons: '35 lessons', duration: '7 weeks', accent: 'cyan', detail: 'Natural speech patterns and nuance' },
    { level: 'Advanced C1', lessons: '22 lessons', duration: '5 weeks', accent: 'mint', detail: 'Presentation polish and cultural fluency' },
  ],
  German: [
    { level: 'Beginner A1–A2', lessons: '23 lessons', duration: '4 weeks', accent: 'purple', detail: 'Core words and sentence building' },
    { level: 'Intermediate B1–B2', lessons: '29 lessons', duration: '6 weeks', accent: 'cyan', detail: 'Grammar with practical speaking' },
    { level: 'Advanced C1', lessons: '19 lessons', duration: '4 weeks', accent: 'mint', detail: 'Professional and academic confidence' },
  ],
  Mandarin: [
    { level: 'Beginner A1–A2', lessons: '28 lessons', duration: '5 weeks', accent: 'purple', detail: 'Pinyin, tones, and everyday phrases' },
    { level: 'Intermediate B1–B2', lessons: '33 lessons', duration: '6 weeks', accent: 'cyan', detail: 'Fluid conversations and listening practice' },
    { level: 'Advanced C1', lessons: '21 lessons', duration: '5 weeks', accent: 'mint', detail: 'Complex discussion and presentation skills' },
  ],
  English: [
    { level: 'Beginner A1–A2', lessons: '18 lessons', duration: '3 weeks', accent: 'purple', detail: 'Conversation, grammar, and confidence' },
    { level: 'Intermediate B1–B2', lessons: '25 lessons', duration: '5 weeks', accent: 'cyan', detail: 'Business communication and speaking fluency' },
    { level: 'Advanced C1', lessons: '17 lessons', duration: '4 weeks', accent: 'mint', detail: 'High-impact writing and public speaking' },
  ],
}

const steps = [
  'Choose your target language and starting level based on how you want to speak, write, and learn.',
  'Practice for 10 minutes a day with micro lessons that mix listening, speaking, reading, and writing.',
  'Track real-world fluency growth through timed quizzes, speech reviews, and milestone badges.',
]

const testimonials = [
  { name: 'Maya R.', role: 'Spanish • reached B1 in 3 months', quote: 'The pronunciation coach made me feel confident speaking on day one. I finally stopped avoiding real conversations.', score: '4.9/5' },
  { name: 'Ethan K.', role: 'French • daily streak 120 days', quote: 'The lessons feel bite-sized but powerful. I keep learning even on busy weeks because the structure is so clear.', score: '4.8/5' },
  { name: 'Nadia L.', role: 'Japanese • advanced track', quote: 'The AI feedback catches tiny pronunciation issues instantly, and the cultural prompts make the language feel alive.', score: '5.0/5' },
]

const pricingPlans = [
  { name: 'Free', price: '$0', description: 'Core daily practice and vocabulary decks.', perks: ['Daily drills', '3 beginner modules', 'Basic streak tracking'], featured: false },
  { name: 'Pro', price: '$19', description: 'Unlimited AI practice and personalized coaching.', perks: ['Everything in Free', 'AI speech scoring', 'Unlimited lesson access', 'Offline practice mode'], featured: true },
  { name: 'Teams', price: '$39', description: 'Built for study groups and shared progress.', perks: ['Multi-user tracking', 'Group leaderboard', 'Shared vocabulary sets', 'Team progress dashboard'], featured: false },
]

const practiceData = {
  Spanish: {
    prompt: '¿Puedes repetir la frase más natural para invitar a un amigo a cenar?',
    options: ['¿Te gustaría cenar conmigo esta noche?', '¿Cómo está tu cena de noche?', '¿Comes conmigo esta noche?', '¿Tú vienes a cena?'],
    correct: '¿Te gustaría cenar conmigo esta noche?',
    tip: 'Natural invitations often use “te gustaría” when sounding polite and conversational.',
  },
  French: {
    prompt: 'Choisissez la réponse la plus naturelle pour proposer un café.',
    options: ['Tu veux prendre un café ?', 'Tu as un café ?', 'Café toi aujourd’hui ?', 'Prends café ?'],
    correct: 'Tu veux prendre un café ?',
    tip: 'This phrase sounds natural and conversational in everyday French.',
  },
  Japanese: {
    prompt: 'Choose the most natural way to suggest meeting up after class.',
    options: ['授業後、カフェに行きませんか？', '授業後にカフェ？', '授業後、カフェに行く？', '授業後、カフェですか？'],
    correct: '授業後、カフェに行きませんか？',
    tip: 'This phrase is natural, polite, and commonly used in invitation contexts.',
  },
  German: {
    prompt: 'Welche Antwort klingt am natürlichsten, um jemanden zum Abendessen einzuladen?',
    options: ['Möchtest du heute Abend mit mir essen?', 'Essen du heute mit mir?', 'Willst du Abend essen?', 'Du kommst heute Abend Essen?'],
    correct: 'Möchtest du heute Abend mit mir essen?',
    tip: 'A polite invitation usually uses “möchtest du…” for a natural tone.',
  },
}

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [activeLanguage, setActiveLanguage] = useState('Spanish')
  const [activeTab, setActiveTab] = useState('Spanish')
  const [flipped, setFlipped] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const activeCourseSet = courseCatalog[activeTab]
  const practice = practiceData[activeLanguage]
  const isAnswerCorrect = selectedAnswer === practice.correct

  const handleLanguagePick = (language) => {
    setActiveTab(language)
    setActiveLanguage(language)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  return (
    <div className="lingua-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <button className="brand" type="button" onClick={() => scrollToSection('home')} aria-label="Go to home section">
            <img src="/logo.jpg" alt="Lingu-A logo" className="brand-logo" />
            <span className="brand-name">Lingu-A</span>
          </button>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <label className="lang-select" aria-label="Select language">
              <Languages size={16} />
              <select value={activeLanguage} onChange={(event) => handleLanguagePick(event.target.value)}>
                {courseTabs.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </label>
            <button type="button" className="btn btn-ghost">Log In</button>
            <button type="button" className="btn btn-primary pulse" onClick={() => scrollToSection('pricing')}>
              Start Learning Free
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">AI-powered language learning</span>
              <h1>Master Any Language Through Context & Real-World Practice</h1>
              <p className="subtitle">
                Interactive, bite-sized lessons designed to help you reach conversational fluency faster with AI-guided feedback and immersive practice.
              </p>

              <div className="hero-actions">
                <button type="button" className="btn btn-primary pulse" onClick={() => scrollToSection('pricing')}>
                  Get Started Free <ArrowRight size={18} />
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => scrollToSection('courses')}>
                  Explore Courses
                </button>
              </div>

              <div className="proof-strip">
                <div className="proof-pill">
                  <Star size={16} fill="currentColor" />
                  4.9/5 rating from 10,000+ learners
                </div>
                <div className="proof-pill subtle">
                  <ShieldCheck size={16} />
                  Beginner to advanced pathways
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="preview-card">
                <div className="floating-badge">
                  <Sparkles size={14} />
                  Daily streak: 18 days
                </div>

                <div className={`flashcard ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped((state) => !state)}>
                  <div className="flashcard-face flashcard-front">
                    <span className="label">Vocabulary boost</span>
                    <h3>{activeLanguage === 'Japanese' ? 'おはようございます' : activeLanguage === 'French' ? 'Bonjour, comment ça va ?' : activeLanguage === 'German' ? 'Guten Morgen!' : activeLanguage === 'Mandarin' ? '你好，你好吗？' : 'Good morning! How are you?'}</h3>
                    <p>{activeLanguage === 'Japanese' ? 'Good morning — a polite greeting in daily life.' : 'Common phrase to greet someone naturally and warmly.'}</p>
                    <button type="button" className="mini-btn">
                      <Play size={14} />
                      Listen
                    </button>
                  </div>

                  <div className="flashcard-face flashcard-back">
                    <span className="label">Translation</span>
                    <h3>{activeLanguage === 'Japanese' ? 'おはようございます' : activeLanguage === 'French' ? 'Bonjour, comment ça va ?' : activeLanguage === 'German' ? 'Guten Morgen!' : activeLanguage === 'Mandarin' ? '你好，你好吗？' : 'Good morning! How are you?'}</h3>
                    <p>Usual phrase for greetings in friendly, everyday situations.</p>
                  </div>
                </div>

                <div className="speaker-row">
                  <div className="sound-bars" aria-label="Speech visualization">
                    {[...Array(8)].map((_, index) => (
                      <span key={index} style={{ height: `${18 + (index % 5) * 9}px` }} />
                    ))}
                  </div>
                  <button type="button" className="chip chip-active">
                    <AudioLines size={14} />
                    Pronunciation check
                  </button>
                </div>

                <div className="progress-card">
                  <div className="progress-head">
                    <span>Fluency progress</span>
                    <strong>82%</strong>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: '82%' }} />
                  </div>
                  <div className="progress-meta">
                    <span>+14% this month</span>
                    <span>Next milestone: B1</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="section-block">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Why learners stay</span>
              <h2>Everything you need to build real confidence.</h2>
            </div>

            <div className="feature-grid">
              {featureCards.map(({ icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  className="feature-card surface-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <div className="feature-icon">
                    <Icon size={20} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="courses" className="section-block">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Course catalog</span>
              <h2>Choose the path that fits your goals.</h2>
            </div>

            <div className="course-tabs" aria-label="Course languages">
              {courseTabs.map((language) => (
                <button
                  key={language}
                  type="button"
                  className={activeTab === language ? 'course-tab active' : 'course-tab'}
                  onClick={() => handleLanguagePick(language)}
                >
                  {language}
                </button>
              ))}
            </div>

            <div className="catalog-grid">
              {activeCourseSet.map((course, index) => (
                <motion.article
                  key={course.level}
                  className={`catalog-card ${course.accent}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <div className="catalog-topline">
                    <span className="catalog-pill">{course.level}</span>
                    <span className="catalog-lesson">{course.lessons}</span>
                  </div>
                  <h3>{course.detail}</h3>
                  <div className="catalog-meta">
                    <span><Clock3 size={14} /> {course.duration}</span>
                    <span><Zap size={14} /> AI-guided</span>
                  </div>
                  <button type="button" className="catalog-btn">
                    View path <ChevronRight size={16} />
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section-block">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">How it works</span>
              <h2>From day one to real fluency.</h2>
            </div>

            <div className="steps-row">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  className="step-card surface-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <div className="step-number">0{index + 1}</div>
                  <p>{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="dashboard" className="section-block dash-section">
          <div className="container dash-shell">
            <div className="dash-copy">
              <span className="eyebrow">Practice dashboard</span>
              <h2>Learn in short bursts. Track progress in real time.</h2>
              <p>
                Build speaking confidence with guided exercises, instant feedback, and adaptive recommendations based on your real performance.
              </p>

              <div className="mini-metrics">
                <div>
                  <strong>14 min</strong>
                  <span>Average daily session</span>
                </div>
                <div>
                  <strong>6x</strong>
                  <span>Faster recall</span>
                </div>
                <div>
                  <strong>92%</strong>
                  <span>Retention score</span>
                </div>
              </div>
            </div>

            <div className="exercise-panel surface-card">
              <div className="exercise-topbar">
                <div>
                  <span className="tiny-label">Current challenge</span>
                  <h3>{activeLanguage} conversation lab</h3>
                </div>
                <button type="button" className="chip chip-light">
                  <Globe2 size={14} />
                  Live practice
                </button>
              </div>

              <div className="exercise-prompt">
                <p>{practice.prompt}</p>
              </div>

              <div className="option-list">
                {practice.options.map((option) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === practice.correct
                  const className = showResult
                    ? isCorrect
                      ? 'answer answer-correct'
                      : isSelected
                        ? 'answer answer-wrong'
                        : 'answer'
                    : isSelected
                      ? 'answer answer-selected'
                      : 'answer'

                  return (
                    <button
                      key={option}
                      type="button"
                      className={className}
                      onClick={() => {
                        setSelectedAnswer(option)
                        setShowResult(true)
                      }}
                    >
                      {isCorrect && showResult ? <Check size={16} /> : null}
                      {option}
                    </button>
                  )
                })}
              </div>

              {showResult && (
                <div className={isAnswerCorrect ? 'feedback success' : 'feedback error'}>
                  {isAnswerCorrect ? 'Correct — excellent choice!' : `Not quite — ${practice.tip}`}
                </div>
              )}

              <div className="exercise-actions">
                <button type="button" className="btn btn-primary small">
                  <Play size={14} />
                  Play audio
                </button>
                <button type="button" className="btn btn-secondary small" onClick={() => { setSelectedAnswer(null); setShowResult(false) }}>
                  Try another
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block testimonials-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Loved by learners</span>
              <h2>Students are seeing real progress, fast.</h2>
            </div>

            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <article key={item.name} className="surface-card testimonial-card">
                  <div className="rating-row">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ))}
                    <span>{item.score}</span>
                  </div>
                  <p className="quote">“{item.quote}”</p>
                  <div className="user-meta">
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section-block pricing-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Flexible plans</span>
              <h2>Pick the plan that fits your learning rhythm.</h2>
            </div>

            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <article key={plan.name} className={plan.featured ? 'pricing-card featured' : 'pricing-card'}>
                  <div className="pricing-top">
                    <span className="pricing-name">{plan.name}</span>
                    {plan.featured ? <span className="featured-tag">Most popular</span> : null}
                  </div>
                  <div className="price-row">
                    <strong>{plan.price}</strong>
                    <span>/ month</span>
                  </div>
                  <p>{plan.description}</p>
                  <ul>
                    {plan.perks.map((perk) => (
                      <li key={perk}><Check size={14} /> {perk}</li>
                    ))}
                  </ul>
                  <button type="button" className={plan.featured ? 'btn btn-primary' : 'btn btn-secondary'}>
                    {plan.featured ? 'Start free trial' : 'Choose plan'}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand brand-footer">
              <img src="/logo.jpg" alt="Lingu-A logo" className="brand-logo" />
              <span className="brand-name">Lingu-A</span>
            </div>
            <p className="footer-copy">Bite-sized language learning for everyday confidence.</p>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <a href="#features">Features</a>
            <a href="#courses">Courses</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Language settings</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Lingu-A. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
