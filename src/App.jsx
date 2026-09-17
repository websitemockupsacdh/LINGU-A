import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe2,
  GraduationCap,
  Languages,
  Mail,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  Phone,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'booking', label: 'Book a Service' },
]

const featureCards = [
  {
    icon: Target,
    title: 'Structured Learning',
    description:
      'Lessons follow a clear progression based on language level and learning objectives.',
  },
  {
    icon: MessageSquareText,
    title: 'Practical Communication',
    description:
      'Focus on useful language learners can apply beyond the classroom and into daily life.',
  },
  {
    icon: Globe2,
    title: 'Cultural Context',
    description:
      'Language is taught together with cultural context and appropriate usage in real situations.',
  },
  {
    icon: Users,
    title: 'Personalized Progress',
    description:
      'Learning targets are adjusted according to learner needs, level, and goals.',
  },
  {
    icon: Languages,
    title: 'Multi-Level Instruction',
    description:
      'Support learners from beginner foundations through more advanced communication.',
  },
  {
    icon: CheckCircle2,
    title: 'Continuous Development',
    description:
      'Each lesson contributes to measurable, long-term progress and future fluency.',
  },
]

const pillars = [
  {
    number: '01',
    title: 'CURIOSITY',
    text: 'Lessons begin by creating curiosity and giving learners a reason to engage.',
  },
  {
    number: '02',
    title: 'ASSESSMENT',
    text: 'Identify current ability, gaps, strengths, and learning needs with clarity.',
  },
  {
    number: '03',
    title: 'PRIOR KNOWLEDGE',
    text: 'Connect new concepts with what the learner already knows and can use.',
  },
  {
    number: '04',
    title: 'KNOWLEDGE TO FUTURE',
    text: 'Turn today’s learning into tomorrow’s ability through practical progression.',
  },
  {
    number: '05',
    title: 'EFFECTIVE TEACHER',
    text: 'Guide, adapt, and inspire through explanation, feedback, and support.',
  },
]

const languages = [
  {
    id: 'japanese',
    name: 'Japanese',
    nativeName: '日本語',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'Japan',
    variants: ['Standard Japanese'],
    description: 'Build a clear foundation in pronunciation, sentence structure, and practical communication.',
    levels: ['Beginner', 'Elementary', 'Intermediate', 'Advanced'],
    accent: 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(15,30,50,0.88))',
  },
  {
    id: 'cantonese',
    name: 'Cantonese',
    nativeName: '廣東話',
    country: 'Hong Kong',
    flag: '🇭🇰',
    region: 'Hong Kong',
    variants: ['Hong Kong Cantonese'],
    description: 'Develop tone awareness, everyday speaking, and natural conversational confidence.',
    levels: ['Beginner', 'Elementary', 'Intermediate', 'Advanced'],
    accent: 'linear-gradient(135deg, rgba(96,165,250,0.16), rgba(15,30,50,0.9))',
  },
  {
    id: 'mandarin',
    name: 'Mandarin',
    nativeName: '普通話 / 中文',
    country: 'China',
    flag: '🇨🇳',
    region: 'China',
    variants: ['Standard Mandarin'],
    description: 'Strengthen listening, pronunciation, and structured language growth across practical topics.',
    levels: ['Beginner', 'Elementary', 'Intermediate', 'Advanced'],
    accent: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(15,30,50,0.9))',
  },
  {
    id: 'thai',
    name: 'Thai',
    nativeName: 'ภาษาไทย',
    country: 'Thailand',
    flag: '🇹🇭',
    region: 'Thailand',
    variants: ['Standard Thai'],
    description: 'Learn tonal accuracy, script basics, and useful communication patterns for daily life.',
    levels: ['Beginner', 'Elementary', 'Intermediate', 'Advanced'],
    accent: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(15,30,50,0.9))',
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    country: 'Portugal',
    flag: '🇵🇹',
    region: 'Portugal',
    variants: ['Brazilian Portuguese', 'European Portuguese'],
    description: 'Focus on pronunciation, sentence formation, and practical interaction in varied contexts.',
    levels: ['Beginner', 'Elementary', 'Intermediate', 'Advanced'],
    accent: 'linear-gradient(135deg, rgba(147,197,253,0.16), rgba(15,30,50,0.9))',
  },
  {
    id: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    country: 'Spain',
    flag: '🇪🇸',
    region: 'Spain',
    variants: ['Latin American Spanish', 'European Spanish'],
    description: 'Develop essential skills for communication, vocabulary growth, and practical confidence.',
    levels: ['Beginner', 'Elementary', 'Intermediate', 'Advanced'],
    accent: 'linear-gradient(135deg, rgba(59,130,246,0.16), rgba(15,30,50,0.9))',
  },
]

const lessonTargetDatabase = {
  japanese: {
    beginner: [
      'Understand basic Japanese pronunciation.',
      'Read and write Hiragana.',
      'Read and write Katakana.',
      'Understand basic greetings.',
      'Introduce yourself.',
      'Ask and answer simple questions.',
      'Use basic sentence patterns.',
      'Understand basic particles.',
      'Develop basic listening comprehension.',
      'Construct simple everyday sentences.',
    ],
    elementary: [
      'Expand everyday vocabulary.',
      'Develop basic Kanji recognition.',
      'Use common verb forms.',
      'Understand past, present, and future expressions.',
      'Describe people, places, and activities.',
      'Handle basic conversations.',
      'Improve listening comprehension.',
      'Read short practical texts.',
    ],
    intermediate: [
      'Use longer sentence structures with accuracy.',
      'Understand more complex verb and adjective forms.',
      'Handle everyday conversations with greater fluency.',
      'Describe experiences and opinions more clearly.',
      'Read intermediate-level texts and articles.',
      'Improve listening comprehension for real-world contexts.',
    ],
    upperIntermediate: [
      'Discuss ideas with greater clarity and nuance.',
      'Use a wider range of grammar and expressions.',
      'Handle spontaneous conversation more naturally.',
      'Develop stronger reading comprehension across topics.',
      'Write structured responses and short narratives.',
    ],
    advanced: [
      'Communicate with precision and flexibility.',
      'Engage in extended discussion on professional and academic topics.',
      'Understand nuanced language use and register.',
      'Read and interpret complex texts.',
      'Refine pronunciation and expressive communication.',
    ],
  },
  cantonese: {
    beginner: [
      'Understand Cantonese pronunciation.',
      'Develop tone awareness.',
      'Learn Jyutping fundamentals.',
      'Use everyday greetings.',
      'Introduce yourself.',
      'Build practical vocabulary.',
      'Form basic sentences.',
      'Understand common conversational expressions.',
    ],
    elementary: [
      'Use more everyday phrases in conversation.',
      'Expand topic-based vocabulary.',
      'Handle simple social interactions.',
      'Improve listening comprehension for common speech patterns.',
      'Develop sentence structures for daily needs.',
    ],
    intermediate: [
      'Handle routine conversations with confidence.',
      'Understand spoken Cantonese in common settings.',
      'Use more varied vocabulary and expressions.',
      'Discuss familiar topics in greater detail.',
    ],
    upperIntermediate: [
      'Respond naturally in more open-ended conversations.',
      'Engage with nuanced social language.',
      'Understand and participate in practical discussion.',
      'Improve listening and speaking fluency across settings.',
    ],
    advanced: [
      'Participate in complex discussion and professional dialogue.',
      'Understand cultural nuance and idiomatic language.',
      'Speak flexibly across formal and informal contexts.',
      'Refine accuracy, flow, and expression.',
    ],
  },
  mandarin: {
    beginner: [
      'Understand Pinyin.',
      'Develop accurate pronunciation.',
      'Learn the four tones.',
      'Introduce yourself.',
      'Use basic sentence structures.',
      'Ask and answer everyday questions.',
      'Build foundational vocabulary.',
      'Understand basic measure words.',
      'Develop listening comprehension.',
    ],
    elementary: [
      'Expand everyday vocabulary in context.',
      'Use common sentence patterns confidently.',
      'Describe daily routines and familiar topics.',
      'Develop stronger listening for conversation.',
      'Read and write basic Chinese characters.',
    ],
    intermediate: [
      'Discuss routine life and interests in more detail.',
      'Use a wider range of grammar and structures.',
      'Understand longer spoken passages.',
      'Improve reading speed and comprehension.',
    ],
    upperIntermediate: [
      'Speak more fluently on familiar and abstract topics.',
      'Use varied expressions and longer discourse.',
      'Read more complex texts and summaries.',
      'Handle structured discussion with flexibility.',
    ],
    advanced: [
      'Communicate with precision in academic and professional contexts.',
      'Understand nuanced ideas and formal expressions.',
      'Read complex materials and discuss them confidently.',
      'Refine accuracy and rhetorical flexibility.',
    ],
  },
  thai: {
    beginner: [
      'Learn Thai pronunciation.',
      'Understand tonal distinctions.',
      'Learn basic Thai script.',
      'Read simple words.',
      'Use everyday greetings.',
      'Introduce yourself.',
      'Build basic vocabulary.',
      'Form simple sentences.',
    ],
    elementary: [
      'Expand vocabulary for daily life.',
      'Practice basic script recognition and reading.',
      'Use sentence patterns in conversation.',
      'Understand and respond to everyday questions.',
    ],
    intermediate: [
      'Discuss familiar topics with more ease.',
      'Use a wider range of expressions and structures.',
      'Handle more natural conversation flow.',
      'Improve listening and speaking accuracy.',
    ],
    upperIntermediate: [
      'Participate in more natural social interaction.',
      'Use slightly more complex grammar and vocabulary.',
      'Describe experiences and opinions more clearly.',
      'Develop stronger pragmatic communication.',
    ],
    advanced: [
      'Engage in nuanced discussion across contexts.',
      'Use formal and informal registers appropriately.',
      'Read and understand more complex texts.',
      'Communicate with confidence and precision.',
    ],
  },
  portuguese: {
    beginner: [
      'Develop pronunciation fundamentals.',
      'Introduce yourself.',
      'Build everyday vocabulary.',
      'Form basic sentences.',
      'Ask and answer common questions.',
      'Understand basic verb structures.',
      'Handle simple everyday interactions.',
    ],
    elementary: [
      'Expand practical vocabulary.',
      'Use present and past structures more confidently.',
      'Talk about routines and personal experiences.',
      'Strengthen listening for common exchanged dialogue.',
    ],
    intermediate: [
      'Speak with more confidence in routine situations.',
      'Understand common texts and spoken interactions.',
      'Use connection words and more complex sentence patterns.',
      'Describe ideas and opinions more clearly.',
    ],
    upperIntermediate: [
      'Discuss a wider range of topics with greater accuracy.',
      'Use more nuanced language structures.',
      'Participate in sustained conversation.',
      'Read and respond effectively to practical texts.',
    ],
    advanced: [
      'Communicate with flexibility in business and social contexts.',
      'Handle nuanced discussion and sophisticated expression.',
      'Read complex texts with confidence.',
      'Refine interaction, register, and clarity.',
    ],
  },
  spanish: {
    beginner: [
      'Develop pronunciation fundamentals.',
      'Introduce yourself.',
      'Build foundational vocabulary.',
      'Understand gender and articles.',
      'Form basic sentences.',
      'Use common verbs.',
      'Ask and answer everyday questions.',
      'Handle simple conversations.',
    ],
    elementary: [
      'Expand vocabulary for daily situations.',
      'Use present tense patterns more accurately.',
      'Describe everyday routines and preferences.',
      'Build confidence in simple interaction.',
    ],
    intermediate: [
      'Discuss familiar topics in more detail.',
      'Use broader grammar structures accurately.',
      'Handle practical listening and speaking tasks.',
      'Read short texts and respond appropriately.',
    ],
    upperIntermediate: [
      'Speak more naturally in extended conversation.',
      'Handle varied topics and opinions with clarity.',
      'Understand more complex spoken language.',
      'Write structured responses and narratives.',
    ],
    advanced: [
      'Command nuanced grammar and expression.',
      'Engage in advanced discussion across contexts.',
      'Read and assess more complex material.',
      'Communicate with strong fluency and adaptability.',
    ],
  },
}

const services = [
  {
    icon: BookOpen,
    title: 'Private Language Lessons',
    description: 'One-on-one instruction tailored to the learner’s objectives and pace.',
  },
  {
    icon: GraduationCap,
    title: 'Structured Language Programs',
    description: 'Multi-session learning programs designed around specific proficiency goals.',
  },
  {
    icon: MessageSquareText,
    title: 'Conversational Practice',
    description: 'Practical speaking sessions focused on confidence and real-world communication.',
  },
  {
    icon: Sparkles,
    title: 'Academic / JLPT Preparation',
    description: 'Structured preparation for language examinations where applicable.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Business & Professional Language',
    description: 'Language development for workplace communication and professional confidence.',
  },
  {
    icon: Building2,
    title: 'Customized Learning Programs',
    description: 'Lessons designed around personal, academic, travel, or professional objectives.',
  },
]

const languageMatrix = [
  { label: 'Japanese', levels: { beginner: true, elementary: true, intermediate: true, advanced: true } },
  { label: 'Cantonese', levels: { beginner: true, elementary: true, intermediate: true, advanced: true } },
  { label: 'Mandarin', levels: { beginner: true, elementary: true, intermediate: true, advanced: true } },
  { label: 'Thai', levels: { beginner: true, elementary: true, intermediate: true, advanced: true } },
  { label: 'Portuguese', levels: { beginner: true, elementary: true, intermediate: true, advanced: true } },
  { label: 'Spanish', levels: { beginner: true, elementary: true, intermediate: true, advanced: true } },
]

const levelNames = {
  beginner: 'Beginner',
  elementary: 'Elementary',
  intermediate: 'Intermediate',
  upperIntermediate: 'Upper-Intermediate',
  advanced: 'Advanced',
}

const levelOrder = ['beginner', 'elementary', 'intermediate', 'upperIntermediate', 'advanced']

const languageGoals = {
  conversation: {
    japanese: ['Hiragana & Katakana', 'Basic sentence patterns', 'Everyday vocabulary', 'Listening practice', 'Conversational drills'],
    cantonese: ['Jyutping foundations', 'Tone awareness', 'Everyday greetings', 'Listening drills', 'Conversation patterns'],
    mandarin: ['Pinyin fundamentals', 'Tone accuracy', 'Basic sentence patterns', 'Everyday phrases', 'Speaking practice'],
    thai: ['Thai script basics', 'Tonal accuracy', 'Everyday greetings', 'Practical vocabulary', 'Speaking repetition'],
    portuguese: ['Pronunciation basics', 'Everyday vocabulary', 'Simple sentence patterns', 'Conversation tasks', 'Listening practice'],
    spanish: ['Pronunciation fundamentals', 'Gender and articles', 'Core verbs', 'Everyday questions', 'Speaking practice'],
  },
  travel: {
    japanese: ['Travel phrases', 'Directions and locations', 'Ordering food', 'Public transport basics', 'Simple interaction prompts'],
    cantonese: ['Travel phrases', 'Directions', 'Ordering food', 'Everyday survival phrases', 'Listening practice'],
    mandarin: ['Travel vocabulary', 'Directions', 'Ordering essentials', 'Useful social phrases', 'Listening practice'],
    thai: ['Transport phrases', 'Directional language', 'Food and market language', 'Daily survival phrases', 'Pronunciation review'],
    portuguese: ['Travel phrases', 'Places and directions', 'Ordering food', 'Practical vocabulary', 'Conversation memory'],
    spanish: ['Travel phrases', 'Directions', 'Shopping basics', 'Food vocabulary', 'Basic interaction'],
  },
  business: {
    japanese: ['Professional introductions', 'Meeting language', 'Email etiquette', 'Presentation phrases', 'Politeness strategies'],
    cantonese: ['Meeting basics', 'Professional greetings', 'Workplace phrases', 'Listening for context', 'Confidence building'],
    mandarin: ['Professional introductions', 'Meeting vocabulary', 'Presentation starters', 'Workplace communication', 'Formal expressions'],
    thai: ['Professional greetings', 'Workplace phrases', 'Meeting participation', 'Politeness structures', 'Listening tasks'],
    portuguese: ['Professional introductions', 'Workplace vocabulary', 'Presenting information', 'Meeting language', 'Confidence routine'],
    spanish: ['Professional introductions', 'Business vocabulary', 'Presentation language', 'Meeting strategies', 'Practical speaking'],
  },
  exam: {
    japanese: ['JLPT-aligned grammar review', 'Reading comprehension', 'Listening patterns', 'Vocabulary control', 'Timed practice'],
    cantonese: ['Listening drills', 'Practical vocabulary', 'Sentence rhythm', 'Reading checkpoints', 'Speaking review'],
    mandarin: ['Pinyin control', 'Character recognition', 'Listening pattern review', 'Grammar checkpoints', 'Exam-style drills'],
    thai: ['Script reading', 'Tone accuracy', 'Listening check', 'Writing patterns', 'Vocabulary review'],
    portuguese: ['Grammar review', 'Listening patterns', 'Reading comprehension', 'Vocabulary control', 'Timed tasks'],
    spanish: ['Grammar review', 'Listening patterns', 'Reading tasks', 'Speaking drills', 'Comprehension checks'],
  },
}

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalLanguage, setModalLanguage] = useState(null)
  const [modalLevel, setModalLevel] = useState('beginner')
  const [explorer, setExplorer] = useState({
    language: 'japanese',
    currentLevel: 'beginner',
    targetLevel: 'elementary',
    goal: 'conversation',
  })
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    language: 'Japanese',
    currentLevel: 'Beginner',
    desiredLevel: 'Elementary',
    goal: 'Conversation',
    schedule: 'Flexible',
    format: 'Online',
    message: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const sectionElements = document.querySelectorAll('section[id], footer[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: '0px 0px -45% 0px', threshold: [0.15, 0.45, 0.7] },
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setModalLanguage(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const modalLanguageData = languages.find((language) => language.id === modalLanguage) || languages[0]
  const selectedLanguage = languages.find((language) => language.id === explorer.language) || languages[0]

  const explorerRecommendations = useMemo(() => {
    const goalSet = languageGoals[explorer.goal]?.[explorer.language] || ['Core vocabulary', 'Listening practice', 'Conversation drills']

    return {
      focus: goalSet,
      progression: [
        `${levelNames[explorer.currentLevel]} to ${levelNames[explorer.targetLevel]}`,
        'Targeted speaking and listening practice',
        'Progressive grammar and vocabulary control',
      ],
      activities: [
        'Guided speaking drills',
        'Short listening exercises',
        'Focused vocabulary review',
        'Goal-based practice tasks',
      ],
    }
  }, [explorer])

  const openLessonTargets = (languageId, level = 'beginner') => {
    setModalLanguage(languageId)
    setModalLevel(level)
  }

  const handleBookingChange = (event) => {
    const { name, value } = event.target
    setBookingForm((current) => ({ ...current, [name]: value }))
    setFormErrors((current) => ({ ...current, [name]: '' }))
  }

  const validateBookingForm = () => {
    const nextErrors = {}

    if (!bookingForm.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!bookingForm.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!bookingForm.phone.trim()) nextErrors.phone = 'Please enter a contact number.'
    if (!bookingForm.language.trim()) nextErrors.language = 'Please select a language.'
    if (!bookingForm.goal.trim()) nextErrors.goal = 'Please share a learning goal.'

    setFormErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateBookingForm()) {
      setSubmitSuccess(false)
      return
    }

    setSubmitSuccess(true)
    setFormErrors({})
    setBookingForm({
      fullName: '',
      email: '',
      phone: '',
      language: 'Japanese',
      currentLevel: 'Beginner',
      desiredLevel: 'Elementary',
      goal: 'Conversation',
      schedule: 'Flexible',
      format: 'Online',
      message: '',
    })
  }

  return (
    <div className="site-shell">
      <div className="bg-orb orb-one" aria-hidden="true" />
      <div className="bg-orb orb-two" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <header className="topbar">
        <div className="container nav-wrap">
          <button
            type="button"
            className="brand-badge"
            onClick={() => scrollToSection('home')}
            aria-label="Go to home section"
          >
            <span className="brand-mark">L</span>
            <span className="brand-text">LINGUÉA</span>
          </button>

          <nav className="main-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  scrollToSection(item.id)
                  setMobileMenuOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button type="button" className="secondary-btn nav-secondary" onClick={() => scrollToSection('features')}>
              EXPLORE LANGUAGES
            </button>
            <button type="button" className="primary-btn nav-primary" onClick={() => scrollToSection('booking')}>
              BOOK A SERVICE
            </button>
          </div>

          <button
            type="button"
            className="menu-button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={activeSection === item.id ? 'mobile-link active' : 'mobile-link'}
                  onClick={() => {
                    scrollToSection(item.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="eyebrow">MULTILINGUAL LANGUAGE EDUCATION</p>
              <h1>
                Learn. Connect.<br />
                Go Further.
              </h1>
              <p className="subtitle">
                Structured language learning designed to build practical communication, cultural understanding, and long-term confidence.
              </p>

              <div className="teacher-badge">
                <div className="teacher-badge__label">LINGUÉA</div>
                <div className="teacher-badge__title">Learn. Connect. Go Further.</div>
              </div>

              <div className="hero-actions">
                <button type="button" className="primary-btn" onClick={() => scrollToSection('booking')}>
                  BOOK A SERVICE <ArrowRight size={18} />
                </button>
                <button type="button" className="secondary-btn" onClick={() => scrollToSection('features')}>
                  EXPLORE LANGUAGES
                </button>
              </div>

              <div className="language-ticker" aria-label="Languages offered">
                <div className="ticker-track">
                  {[...Array(2)].flatMap(() => [
                    '日本語', '•', '廣東話', '•', '中文', '•', 'ภาษาไทย', '•', 'Português', '•', 'Español',
                  ])}
                </div>
              </div>

              <div className="hero-summary" aria-label="Program overview">
                <div className="glass-card summary-card summary-card__primary">
                  <div className="mini-stat">
                    <span className="stat-number">6</span>
                    <span className="stat-text">LANGUAGES</span>
                  </div>
                  <div className="stat-row">
                    <span>Multiple Learning Levels</span>
                    <span>Structured Lessons</span>
                  </div>
                </div>

                <div className="glass-card summary-card summary-card__secondary">
                  <div className="panel-header">
                    <span className="panel-label">Learning flow</span>
                    <span className="panel-dot" />
                  </div>
                  <ul>
                    <li>Personalized instruction</li>
                    <li>Practical communication</li>
                    <li>Long-term progression</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              <div className="visual-stack">
                <div className="orb-square orb-sky" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="section-block">
          <div className="container">
            <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <p className="eyebrow">A DIFFERENT WAY TO LEARN</p>
              <h2>A Different Way to Learn</h2>
              <p>Every lesson is designed around the learner—not simply the language.</p>
            </motion.div>

            <div className="feature-grid">
              {featureCards.map(({ icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  className="glass-card feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="container">
            <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <p className="eyebrow">THE FIVE PILLARS</p>
              <h2>The Five Pillars Behind Every Lesson</h2>
              <p>A lesson is more than information delivered. It is a carefully designed learning experience.</p>
            </motion.div>

            <div className="pillars-intro">
              {pillars.map(({ number, title, text }, index) => (
                <motion.div
                  key={title}
                  className="pillar-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="pillar-number">{number}</div>
                  <div className="pillar-content">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="languages" className="section-block languages-section">
          <div className="container">
            <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <p className="eyebrow">LANGUAGES WE TEACH</p>
              <h2>Languages We Teach</h2>
              <p>Explore a structured learning path across six languages and multiple levels.</p>
            </motion.div>

            <div className="language-grid">
              {languages.map((language, index) => (
                <motion.article
                  key={language.id}
                  className="glass-card language-card"
                  style={{ background: language.accent }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className="language-header">
                    <div className="language-flag" aria-label={`${language.country} flag`} title={language.country}>{language.flag}</div>
                    <div className="language-kicker">{language.name}</div>
                  </div>
                  <div className="language-region">{language.country}</div>
                  <div className="language-native">{language.nativeName}</div>
                  <p>{language.description}</p>
                  <div className="language-levels">
                    {language.levels.map((level) => (
                      <span key={level}>{level}</span>
                    ))}
                  </div>
                  <div className="language-variants" aria-label={`${language.name} variants`}>
                    {language.variants.map((variant) => (
                      <span key={variant}>{variant}</span>
                    ))}
                  </div>
                  <button type="button" className="text-btn" onClick={() => openLessonTargets(language.id, 'beginner')}>
                    VIEW LESSON TARGETS <ArrowUpRight size={16} />
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block explorer-section">
          <div className="container">
            <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <p className="eyebrow">LANGUAGE LEVEL EXPLORER</p>
              <h2>Find Your Learning Path</h2>
            </motion.div>

            <div className="explorer-shell glass-card">
              <div className="explorer-form">
                <div className="field-group">
                  <label htmlFor="languageSelect">Language</label>
                  <select id="languageSelect" value={explorer.language} onChange={(event) => setExplorer((current) => ({ ...current, language: event.target.value }))}>
                    {languages.map((language) => (
                      <option key={language.id} value={language.id}>{language.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group">
                  <label htmlFor="currentLevel">Current level</label>
                  <select id="currentLevel" value={explorer.currentLevel} onChange={(event) => setExplorer((current) => ({ ...current, currentLevel: event.target.value }))}>
                    {levelOrder.map((level) => (
                      <option key={level} value={level}>{levelNames[level]}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group">
                  <label htmlFor="targetLevel">Target level</label>
                  <select id="targetLevel" value={explorer.targetLevel} onChange={(event) => setExplorer((current) => ({ ...current, targetLevel: event.target.value }))}>
                    {levelOrder.map((level) => (
                      <option key={level} value={level}>{levelNames[level]}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group">
                  <label htmlFor="objectiveSelect">Learning objective</label>
                  <select id="objectiveSelect" value={explorer.goal} onChange={(event) => setExplorer((current) => ({ ...current, goal: event.target.value }))}>
                    <option value="conversation">Conversation</option>
                    <option value="travel">Travel</option>
                    <option value="business">Business</option>
                    <option value="exam">Examination</option>
                  </select>
                </div>
              </div>

              <div className="explorer-result">
                <div className="result-meta">
                  <span className="meta-label">LANGUAGE</span>
                  <strong>{selectedLanguage.name}</strong>
                </div>
                <div className="result-meta">
                  <span className="meta-label">CURRENT LEVEL</span>
                  <strong>{levelNames[explorer.currentLevel]}</strong>
                </div>
                <div className="result-meta">
                  <span className="meta-label">TARGET</span>
                  <strong>{levelNames[explorer.targetLevel]}</strong>
                </div>
                <div className="result-meta">
                  <span className="meta-label">GOAL</span>
                  <strong>{explorer.goal.charAt(0).toUpperCase() + explorer.goal.slice(1)}</strong>
                </div>

                <div className="result-block">
                  <h3>Recommended focus</h3>
                  <ul>
                    {explorerRecommendations.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="result-block">
                  <h3>Suggested progression</h3>
                  <ul>
                    {explorerRecommendations.progression.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="result-block">
                  <h3>Example activities</h3>
                  <ul>
                    {explorerRecommendations.activities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <button type="button" className="primary-btn compact" onClick={() => scrollToSection('booking')}>
                  BOOK A SERVICE <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="container">
            <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <p className="eyebrow">LEARNING DESIGNED AROUND YOUR GOALS</p>
              <h2>Learning Designed Around Your Goals</h2>
            </motion.div>

            <div className="service-grid">
              {services.map(({ icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  className="glass-card service-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-block about-section">
          <div className="container about-grid">
            <motion.div className="about-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <p className="eyebrow">MEET YOUR LANGUAGE EDUCATOR</p>
              <h2>Meet Your Language Educator</h2>
              <div className="teacher-name">LINGUÉA</div>
              <div className="teacher-role">Learn. Connect. Go Further.</div>

              <blockquote>
                “Language is not simply a collection of words, rules, and sounds. It is a system through which people understand ideas, cultures, experiences, and one another.”
              </blockquote>

              <p>
                Yuan CY approaches language education through structured, learner-centered instruction designed to connect curiosity with practical communication.
              </p>
              <p>
                Every lesson is built around understanding the learner’s current knowledge, identifying meaningful learning targets, and creating a pathway toward future capability.
              </p>

              <div className="contact-block">
                <h3>Contact</h3>
                <a href="mailto:cyyuan09@gmail.com">cyyuan09@gmail.com</a>
                <span>Flexible online and in-person learning options</span>
              </div>
            </motion.div>

            <motion.div className="glass-card matrix-card" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <div className="matrix-header">
                <h3>Language Matrix</h3>
                <span>Beginner to Advanced</span>
              </div>

              <div className="matrix-table" aria-label="Language levels matrix">
                <div className="matrix-row matrix-head">
                  <div>Language</div>
                  <div>Beginner</div>
                  <div>Elementary</div>
                  <div>Intermediate</div>
                  <div>Advanced</div>
                </div>
                {languageMatrix.map((entry) => (
                  <div key={entry.label} className="matrix-row">
                    <div>{entry.label}</div>
                    {Object.entries(entry.levels).map(([level, isActive]) => (
                      <div key={`${entry.label}-${level}`} className={isActive ? 'cell active' : 'cell'} title={`Designed for ${level} learners`}>
                        {isActive ? '✓' : '—'}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="booking" className="section-block booking-section">
          <div className="container booking-shell glass-card">
            <div className="booking-intro">
              <p className="eyebrow">READY TO START LEARNING?</p>
              <h2>Ready to Start Learning?</h2>
              <p>Tell us what you want to learn, where you are starting from, and where you want to go.</p>
              <button type="button" className="primary-btn" onClick={() => scrollToSection('booking')}>
                BOOK A SERVICE
              </button>
            </div>

            <form className="booking-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input id="fullName" name="fullName" type="text" value={bookingForm.fullName} onChange={handleBookingChange} />
                  {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
                </div>
                <div className="field-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" value={bookingForm.email} onChange={handleBookingChange} />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
                <div className="field-group">
                  <label htmlFor="phone">Contact Number</label>
                  <input id="phone" name="phone" type="tel" value={bookingForm.phone} onChange={handleBookingChange} />
                  {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                </div>
                <div className="field-group">
                  <label htmlFor="language">Language</label>
                  <select id="language" name="language" value={bookingForm.language} onChange={handleBookingChange}>
                    {languages.map((language) => (
                      <option key={language.id} value={language.name}>{language.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group">
                  <label htmlFor="currentLevel">Current Level</label>
                  <select id="currentLevel" name="currentLevel" value={bookingForm.currentLevel} onChange={handleBookingChange}>
                    {Object.values(levelNames).map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group">
                  <label htmlFor="desiredLevel">Desired Level</label>
                  <select id="desiredLevel" name="desiredLevel" value={bookingForm.desiredLevel} onChange={handleBookingChange}>
                    {Object.values(levelNames).map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group">
                  <label htmlFor="goal">Learning Goal</label>
                  <input id="goal" name="goal" type="text" value={bookingForm.goal} onChange={handleBookingChange} />
                  {formErrors.goal && <span className="error-message">{formErrors.goal}</span>}
                </div>
                <div className="field-group">
                  <label htmlFor="schedule">Preferred Schedule</label>
                  <select id="schedule" name="schedule" value={bookingForm.schedule} onChange={handleBookingChange}>
                    <option value="Flexible">Flexible</option>
                    <option value="Weekday mornings">Weekday mornings</option>
                    <option value="Weekday evenings">Weekday evenings</option>
                    <option value="Weekends">Weekends</option>
                  </select>
                </div>
                <div className="field-group wide">
                  <label htmlFor="format">Preferred Learning Format</label>
                  <select id="format" name="format" value={bookingForm.format} onChange={handleBookingChange}>
                    <option value="Online">Online</option>
                    <option value="In-person">In-person</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <div className="field-group wide">
                  <label htmlFor="message">Tell us more about your learning goals.</label>
                  <textarea id="message" name="message" rows="4" value={bookingForm.message} onChange={handleBookingChange} placeholder="Tell us about your objectives, preferred pace, and the kind of support you want." />
                </div>
              </div>

              <button type="submit" className="primary-btn submit-btn">
                SUBMIT SERVICE REQUEST
              </button>

              {submitSuccess && (
                <p className="success-message">Your service request has been submitted. Yuan CY will be in touch soon.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer id="footer" className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand-badge footer-brand">
              <span className="brand-mark">L</span>
              <span className="brand-text">LINGUÉA</span>
            </div>
            <p className="footer-tagline">Learn. Connect. Go Further.</p>
            <p className="footer-languages">Japanese • Cantonese • Mandarin • Thai • Portuguese • Spanish</p>
          </div>

          <div className="footer-links">
            <h3>Navigation</h3>
            {navItems.map((item) => (
              <button key={item.id} type="button" className="footer-link" onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>
            <a href="mailto:cyyuan09@gmail.com"><Mail size={16} /> cyyuan09@gmail.com</a>
            <a href="tel:+0000000000"><Phone size={16} /> Contact by email</a>
            <span className="footer-meta"><MonitorSmartphone size={16} /> Online, in-person, and flexible learning</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 LINGUÉA. All rights reserved.</span>
        </div>
      </footer>

      <AnimatePresence>
        {modalLanguage && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalLanguage(null)}
          >
            <motion.div
              className="modal-panel glass-card"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modalTitle"
            >
              <div className="modal-head">
                <div>
                  <p className="eyebrow modal-pretitle">Lesson targets</p>
                  <h3 id="modalTitle">{modalLanguageData.name} — {levelNames[modalLevel] || 'Beginner'}</h3>
                </div>
                <button type="button" className="icon-btn" aria-label="Close lesson targets" onClick={() => setModalLanguage(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-controls">
                <label htmlFor="modalLanguageSelect">Language</label>
                <select id="modalLanguageSelect" value={modalLanguage} onChange={(event) => {
                  setModalLanguage(event.target.value)
                  setModalLevel('beginner')
                }}>
                  {languages.map((language) => (
                    <option key={language.id} value={language.id}>{language.name}</option>
                  ))}
                </select>

                <label htmlFor="modalLevelSelect">Level</label>
                <select id="modalLevelSelect" value={modalLevel} onChange={(event) => setModalLevel(event.target.value)}>
                  {Object.entries(levelNames).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="modal-list">
                {(lessonTargetDatabase[modalLanguage] && lessonTargetDatabase[modalLanguage][modalLevel]) ? (
                  lessonTargetDatabase[modalLanguage][modalLevel].map((target, index) => (
                    <div key={`${modalLanguage}-${modalLevel}-${index}`} className="modal-item">
                      <CheckCircle2 size={18} />
                      <span>{target}</span>
                    </div>
                  ))
                ) : (
                  <p>No lesson targets available for this selection yet.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
