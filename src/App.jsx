import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Languages,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'languages', label: 'Offered Languages' },
  { id: 'pricing', label: 'Course Tiers & Pricing' },
  { id: 'curriculum', label: 'Curriculum Guide' },
  { id: 'outcomes', label: 'Student Outcomes' },
  { id: 'contact', label: 'Contact' },
]

const languageCards = [
  {
    name: 'Japanese',
    tag: 'JLPT N5 Prep & Career Pathways',
    description: 'Structured modules for speaking, reading, listening, and official exam preparation.',
  },
  {
    name: 'French',
    tag: 'Foundations to Professional Communication',
    description: 'Build fluency from A1 through confident B2 communication for daily and work contexts.',
  },
  {
    name: 'Mandarin & Cantonese',
    tag: 'Speaking, Listening & Cultural Practice',
    description: 'Focused training for conversation, pronunciation, and practical communication in real situations.',
  },
  {
    name: 'Spanish',
    tag: 'Travel, Communication & Confidence',
    description: 'Progressive grammar and vocabulary sequences designed for day-to-day conversational fluency.',
  },
  {
    name: 'Portuguese',
    tag: 'Practical and Career-Oriented Learning',
    description: 'Strong speaking foundations and useful expressions for social and professional use.',
  },
  {
    name: 'Thai',
    tag: 'Tone, Scripts & Everyday fluency',
    description: 'Build strong pronunciation habits and daily communication confidence through guided practice.',
  },
]

const pricingCards = [
  {
    title: 'VIP Online Class (One-on-One)',
    price: '₱30,000',
    detail: 'Personalized 1-on-1 online instruction tailored to student pace and specific goals.',
    badge: 'Private coaching',
    featured: false,
  },
  {
    title: 'Home Base - Group Class',
    price: '₱40,000',
    detail: 'Interactive group instruction including all instructor-related expenses for on-site learning.',
    badge: 'Small group',
    featured: false,
  },
  {
    title: 'All-Inclusive Full Program Batch Package',
    price: '₱40,000',
    promo: '₱60,000',
    detail: 'Complete 22-session intensive pathway covering vocabulary, grammar, reading, listening, speaking, mock exams, and certification.',
    badge: 'September Batch Promo',
    featured: true,
  },
]

const curriculumSets = {
  French: [
    { range: 'Sessions 1–5', title: 'Language Foundations', text: 'Pronunciation, alphabet/phonics, basic vocabulary, and essential listening patterns.' },
    { range: 'Sessions 6–11', title: 'Grammar & Daily Communication', text: 'Sentence structure, verbs like Être and Avoir, verbs in context, and daily routines.' },
    { range: 'Sessions 12–15', title: 'Practical Vocabulary & Real Situations', text: 'Food, shopping, directions, time, dates, and quick-response language learners can use immediately.' },
    { range: 'Sessions 16–19', title: 'Reading & Listening Mastery', text: 'Integrated comprehension, speaking confidence, and short reading/listening drills.' },
    { range: 'Sessions 20–22', title: 'Mock Exams & Final Evaluation', text: 'Timed simulations, targeted remediation, and a final performance review with feedback.' },
  ],
  'JLPT N5': [
    { range: 'Sessions 1–5', title: 'Foundations', text: 'Romaji/Hiragana basics, pronunciation, core vocabulary, and sound recognition.' },
    { range: 'Sessions 6–11', title: 'Core Grammar & Structure', text: 'Particles, sentence patterns, essential verbs, and everyday expression building.' },
    { range: 'Sessions 12–15', title: 'Integrated Daily Use', text: 'Food, travel, directions, dates, and practical vocabulary checkpoints.' },
    { range: 'Sessions 16–19', title: 'Listening & Reading Practice', text: 'Build comprehension with guided drills and discussion-based practice.' },
    { range: 'Sessions 20–22', title: 'Mock Examinations', text: 'Full-length practice, remediation, and final assessment simulation.' },
  ],
}

const outcomes = [
  'Diagnostic baseline to establish learner starting level.',
  'Ongoing tracking against skill mastery targets (80%+ in vocab/grammar).',
  'Mock examinations before official evaluation and final review.',
  'Official Certificate of Completion issued by I Learn.',
]

const requirements = [
  'Active email address for coordination and contract processing',
  'Viber or WhatsApp account for student updates and scheduling',
  'Proof of payment receipt to lock in batch slots',
]

const featuredHighlights = [
  {
    title: 'TOP 2 - PROFESSIONAL LANGUAGE PROFICIENCY LICENSURE EXAMINATION (JANUARY 2026)',
    rating: 'OVERALL RATING: 100%',
    image: '/prev1.jpg',
    link: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02LZDszouLZBdyJRAUnXrDM8MGZXmRTiiwWY14xLqEPU3ABidoNcdyZ88Ycg77EEM4l&id=61593960765889',
  },
  {
    title: 'English Night Class 09-14-2026',
    rating: 'Featured class showcase',
    image: '/prev2.png',
    link: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02pkRejMYq2rBXRKh3CS16bwimuyr325M1G9FeWSfXgUyR7rMknc8suAxhEZTxst7wl&id=61593960765889',
  },
]

const studyModes = [
  {
    title: 'A. Online Class',
    description: 'The students may make their time productive by studying at home or in any place where they are comfortable. This is perfect for those who want to learn new knowledge while avoiding going outside.',
  },
  {
    title: 'B. Face to Face Class (in the office)',
    description: 'The student may already enroll to get the ₱3,000 discount and to reserve a slot. Most of the time, the slots are full. You may attend the onsite class once it is already available in your preferred branch.',
  },
  {
    title: 'C. Combined Class (Online and Onsite)',
    description: 'The student may do the Online Class in the meantime. Once the Onsite Class is already available in your preferred branch, the person may already continue the class in the office.',
  },
]

const ieltsInclusions = [
  'The ONLY ACCREDITED IELTS Center that offers no expiration on the IELTS Review. With a lifetime warranty.',
  'FREE IELTS Materials',
  'Unlimited lectures (Online and Onsite) on the entire IELTS structure such as Listening, Reading, Writing, Speaking, Vocabulary Enhancement, Pronunciation, Filipinism, Accent Development and all aspects of the entire IELTS course.',
  'Unlimited 1 on 1 Coaching every day.',
  'Unlimited Online lectures and 1 on 1 coaching sessions.',
  'Unlimited Onsite lectures and 1 on 1 coaching sessions.',
  'Unlimited Mock Tests',
  'Unlimited Practice Tests',
  'Unlimited Handouts',
  'FREE Grand Coaching',
  'FREE Ultimate Coaching',
  'FREE Writing and Speaking workshop sponsored by IELTS Experts.',
  'FREE IELTS Pretest',
  'FREE Grand Mock',
  'FREE Ultimate Mock',
  'FREE IELTS Test Registration.',
  'Guaranteed IELTS Test slot on ILTC Exclusive IELTS Tests.',
]

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [activeCurriculum, setActiveCurriculum] = useState('French')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    language: 'Japanese',
    mode: 'VIP Online Class',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <div className="app-shell">
      {/* Topbar Navigation */}
      <header className="topbar">
        <div className="container nav-wrap">
          <button className="brand" type="button" onClick={() => scrollToSection('home')} aria-label="Go to home section">
            <img src="/illtclogo.jpg" alt="I Learn Language Tutorial Center logo" className="brand-logo" />
            <span className="brand-name">I Learn Language Tutorial Center</span>
          </button>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <button key={item.id} type="button" className="nav-link" onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>

          <button type="button" className="btn btn-primary" onClick={() => scrollToSection('contact')}>
            Enroll Now / Inquire
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="eyebrow">Multilingual Language Educator & Training Center</span>
              <h1>Master Foreign Languages with Practical, Structured Pathways</h1>
              <p className="subtitle">
                From foundational speech to professional fluency in Japanese (JLPT N5–N3), French (A1–B2), Mandarin, Cantonese, Spanish, Thai, and Portuguese.
              </p>

              <div className="hero-actions">
                <button type="button" className="btn btn-primary" onClick={() => scrollToSection('languages')}>
                  Explore Courses <ArrowRight size={18} />
                </button>
                <button type="button" className="btn btn-promote" onClick={() => scrollToSection('pricing')}>
                  Claim Promo Rate
                </button>
              </div>

              <div className="trust-row">
                <div className="mini-card">
                  <Star size={16} fill="currentColor" />
                  4.9/5 Learning Experience
                </div>
                <div className="mini-card muted">
                  <ShieldCheck size={16} />
                  Fast-track results
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-panel"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="hero-visual surface-card">
                <div className="visual-badge">
                  <Sparkles size={14} />
                  September Batch Promo
                </div>

                <div className="visual-metric">
                  <div>
                    <span>22-Session Program</span>
                    <strong>99 contact hours</strong>
                  </div>
                  <div className="mini-pill">Limited time</div>
                </div>

                <div className="visual-list">
                  <div className="list-item"><Check size={16} /> Vocabulary & grammar mastery</div>
                  <div className="list-item"><Check size={16} /> Reading, listening & speaking</div>
                  <div className="list-item"><Check size={16} /> Mock exams & final evaluation</div>
                </div>

                <div className="visual-footer">
                  <div>
                    <small>Active promo rate</small>
                    <strong>₱40,000</strong>
                  </div>
                  <button type="button" className="btn btn-primary small" onClick={() => scrollToSection('pricing')}>View package</button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Highlights */}
        <section className="section-block featured-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Featured highlights</span>
              <h2>Recent class wins and public recognition.</h2>
            </div>

            <div className="featured-grid">
              {featuredHighlights.map((feature) => (
                <a
                  key={feature.title}
                  href={feature.link}
                  target="_blank"
                  rel="noreferrer"
                  className="landscape-card glow-card featured-link"
                >
                  <div
                    className="featured-preview-image"
                    style={{
                      backgroundImage: feature.image
                        ? `url(${feature.image})`
                        : 'linear-gradient(135deg, rgba(96, 165, 250, 0.82), rgba(15, 23, 42, 0.96), rgba(190, 18, 60, 0.72))',
                    }}
                  >
                    <span className="feature-card-tag">Featured photo</span>
                  </div>
                  <div className="featured-preview-body">
                    <h3>{feature.title}</h3>
                    <p>{feature.rating}</p>
                  </div>
                  <div className="featured-preview-footer">
                    <span>Open Facebook post</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Offered Languages */}
        <section id="languages" className="section-block">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Offered languages</span>
              <h2>Learning tracks designed for real progress.</h2>
            </div>

            <div className="language-grid landscape-layout">
              {languageCards.map((language, index) => (
                <motion.article
                  key={language.name}
                  className="surface-card language-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <div className="language-topline">
                    <span className="language-badge">{language.name}</span>
                    <Languages size={18} />
                  </div>
                  <h3>{language.tag}</h3>
                  <p>{language.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Course Tiers & Pricing */}
        <section id="pricing" className="section-block price-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Course tiers & pricing</span>
              <h2>Choose the format that fits your goals.</h2>
            </div>

            <div className="pricing-grid">
              {pricingCards.map((plan, index) => (
                <motion.article
                  key={plan.title}
                  className={plan.featured ? 'pricing-card featured' : 'pricing-card'}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <div className="pricing-header">
                    <span className="plan-name">{plan.title}</span>
                    {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
                  </div>

                  <div className="price-wrap">
                    <strong>{plan.price}</strong>
                    {plan.promo ? <span className="promo-line"><s>{plan.promo}</s></span> : null}
                  </div>

                  <p>{plan.detail}</p>

                  <ul className="perk-list">
                    <li><Check size={16} /> Personalized learning roadmap</li>
                    <li><Check size={16} /> Structured progress checks</li>
                    <li><Check size={16} /> Instructor-guided support</li>
                  </ul>

                  <button
                    type="button"
                    className={plan.featured ? 'btn btn-primary' : 'btn btn-secondary'}
                    onClick={() => scrollToSection('contact')}
                  >
                    {plan.featured ? 'Reserve your slot' : 'Inquire now'}
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Guide */}
        <section id="curriculum" className="section-block curriculum-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Curriculum guide</span>
              <h2>What students complete inside the 22-session pathway.</h2>
            </div>

            <div className="curriculum-shell surface-card">
              <div className="curriculum-tabs" aria-label="Curriculum tabs">
                {Object.keys(curriculumSets).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={activeCurriculum === key ? 'curriculum-tab active' : 'curriculum-tab'}
                    onClick={() => setActiveCurriculum(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="curriculum-panels">
                {curriculumSets[activeCurriculum].map((module) => (
                  <div key={module.range} className="curriculum-row">
                    <div className="module-range">{module.range}</div>
                    <div className="module-detail">
                      <h3>{module.title}</h3>
                      <p>{module.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Student Outcomes */}
        <section id="outcomes" className="section-block outcomes-section">
          <div className="container outcomes-grid">
            <div className="outcomes-copy">
              <span className="eyebrow">Student outcomes</span>
              <h2>A structured four-step growth system.</h2>
            </div>

            <div className="outcomes-flow">
              {outcomes.map((item, index) => (
                <motion.div
                  key={item}
                  className="outcome-card surface-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <div className="outcome-number">0{index + 1}</div>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Options */}
        <section className="section-block study-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Study options</span>
              <h2>Several ways to study and review with ILTC.</h2>
            </div>

            <div className="study-layout">
              <div className="study-modes">
                {studyModes.map((mode) => (
                  <div key={mode.title} className="study-mode glass-card glow-card">
                    <h3>{mode.title}</h3>
                    <p>{mode.description}</p>
                  </div>
                ))}
              </div>

              <div className="ielts-card glass-card glow-card">
                <h3>I Learn-Language Tutorial Center IELTS Inclusions</h3>
                <ul>
                  {ieltsInclusions.map((item) => (
                    <li key={item}><Check size={15} /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment Requirements */}
        <section className="section-block enrollment-section">
          <div className="container requirements-grid">
            <div className="requirement-panel surface-card">
              <span className="eyebrow">Enrollment requirements</span>
              <h3>Student portal & onboarding essentials</h3>
              <ul className="mini-list">
                {requirements.map((item) => (
                  <li key={item}><Check size={16} /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="requirement-panel surface-card accent-panel">
              <span className="eyebrow">Enrollment flow</span>
              <h3>How to reserve your slot</h3>
              <div className="step-stack">
                <div><strong>1.</strong> Submit the inquiry form below.</div>
                <div><strong>2.</strong> Confirm your target language and preferred class mode.</div>
                <div><strong>3.</strong> Send proof of payment to lock in the batch placement.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Inquiry */}
        <section id="contact" className="section-block contact-section">
          <div className="container contact-shell surface-card">
            <div className="contact-copy">
              <span className="eyebrow">Contact & inquiry</span>
              <h2>Inquire & reserve your slot.</h2>
              <p>Share your target language and preferred class format and the team will guide you with the next step.</p>

              <div className="contact-items">
                <a href="mailto:ilearnlanguagetutorialcenter@gmail.com"><Mail size={18} /> ilearnlanguagetutorialcenter@gmail.com</a>
                <a href="tel:+639611244639"><Phone size={18} /> +63 961 124 4639</a>
                <a href="https://wa.me/639611244639" target="_blank" rel="noreferrer"><MessageSquareText size={18} /> WhatsApp / Viber coordination</a>
                <div className="contact-highlight">
                  <strong>Facebook Page:</strong> I Learn-Language Learning School
                </div>
                <div className="contact-highlight">
                  <strong>Branches:</strong> Quezon City, Makati City, Alabang, Calamba City, Dasmariñas City, Lipa City
                </div>
                <div className="contact-highlight">
                  <strong>WhatsApp:</strong> ILTC Philippines • 0961-124-4639
                </div>
              </div>
            </div>

            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="field-grid">
                <label>
                  Full Name
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </label>
                <label>
                  Email Address
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                  Phone / Viber Number
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                  Target Language
                  <select name="language" value={formData.language} onChange={handleChange}>
                    <option>Japanese</option>
                    <option>French</option>
                    <option>Mandarin</option>
                    <option>Cantonese</option>
                    <option>Spanish</option>
                    <option>Portuguese</option>
                    <option>Thai</option>
                  </select>
                </label>
                <label className="wide">
                  Preferred Class Mode
                  <select name="mode" value={formData.mode} onChange={handleChange}>
                    <option>VIP Online Class</option>
                    <option>Home Base - Group Class</option>
                  </select>
                </label>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">Inquire & Reserve Slot</button>

              {submitted && (
                <p className="success-message">Thank you! Your inquiry has been recorded and I Learn Language Tutorial Center will contact you shortly.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand brand-footer">
              <img src="/illtclogo.jpg" alt="I Learn Language Tutorial Center logo" className="brand-logo" />
              <span className="brand-name">I Learn</span>
            </div>
            <p className="footer-copy">Structured multilingual training for confident communication, exam preparation, and real-world fluency.</p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <a href="#languages">Offered Languages</a>
            <a href="#pricing">Pricing</a>
            <a href="#curriculum">Curriculum</a>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <a href="mailto:ilearnlanguagetutorialcenter@gmail.com">Email</a>
            <a href="tel:+639611244639">Phone</a>
            <a href="https://wa.me/639611244639" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 I Learn Language Tutorial Center. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default App

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <button className="brand">
          <img src="/logo.jpg" alt="Logo" className="brand-logo" />
          <span className="brand-name">My Brand</span>
        </button>

        {/* Hamburger Button para sa Mobile */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <button className="nav-link">Home</button>
          <button className="nav-link">Courses</button>
          <button className="nav-link">Pricing</button>
          <button className="btn btn-primary small">Get Started</button>
        </nav>
      </div>
    </header>
  );
}