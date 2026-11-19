<script setup lang="ts">
import { computed, ref } from 'vue'

type AuthMode = 'login' | 'register'

const projects = [
  {
    number: '01',
    name: 'AOSS',
    category: 'PLATFORM · PHP',
    description: 'A modular backend platform for bringing common services and admin capabilities together.',
    tags: ['PHP', 'ThinkPHP'],
    color: 'violet',
    url: 'https://github.com/tobycroft/AOSS'
  },
  {
    number: '02',
    name: 'TuuzGoWeb',
    category: 'FRAMEWORK · GO',
    description: 'A layered Go web framework built for clear boundaries, practical patterns and room to grow.',
    tags: ['Go', 'Gin', 'Architecture'],
    color: 'cyan',
    url: 'https://github.com/tobycroft/TuuzGoWeb'
  },
  {
    number: '03',
    name: 'Go Tuuz',
    category: 'WEB APPLICATION · FULL STACK',
    description: 'A personal web experience connecting a thoughtful Vue interface with a Go service layer.',
    tags: ['Vue', 'Go', 'Full stack'],
    color: 'lime',
    url: 'https://github.com/tobycroft/go_tuuz'
  }
]

const skills = ['Vue 3', 'TypeScript', 'Go', 'PHP', 'REST API', 'MySQL', 'Docker', 'Linux']
const authOpen = ref(false)
const authMode = ref<AuthMode>('login')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const notice = ref('')
const submitting = ref(false)
const isRegister = computed(() => authMode.value === 'register')

function openAuth(mode: AuthMode) {
  authMode.value = mode
  notice.value = ''
  authOpen.value = true
}

function closeAuth() {
  authOpen.value = false
  notice.value = ''
}

function submitAuth() {
  notice.value = ''
  if (!email.value.trim() || !password.value) {
    notice.value = 'Please enter your email and password.'
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    notice.value = 'Please enter a valid email address.'
    return
  }
  if (password.value.length < 8) {
    notice.value = 'Use at least 8 characters for your password.'
    return
  }
  if (isRegister.value && password.value !== confirmPassword.value) {
    notice.value = 'Your passwords do not match.'
    return
  }

  submitting.value = true
  window.setTimeout(() => {
    submitting.value = false
    notice.value = isRegister.value
      ? 'You’re all set — account creation will be available soon.'
      : 'Welcome back — sign in will be available soon.'
  }, 450)
}
</script>

<template>
  <div class="portfolio-shell">
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>

    <header class="site-header">
      <a class="brand" href="#top" aria-label="Tuuz home">
        <span class="brand-mark">T</span>
        <span class="brand-name">tuuz<span class="brand-dot">.</span></span>
      </a>

      <nav class="desktop-nav" aria-label="Main navigation">
        <a href="#work">Selected work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <div class="header-actions">
        <button class="text-action" type="button" @click="openAuth('login')">Log in</button>
        <button class="header-cta" type="button" @click="openAuth('register')">
          <span>Create account</span><span aria-hidden="true">↗</span>
        </button>
      </div>
    </header>

    <main id="top">
      <section class="hero section-wrap">
        <div class="hero-copy">
          <div class="eyebrow"><span class="status-dot"></span> INDEPENDENT FULL STACK DEVELOPER</div>
          <h1>Thoughtful code.<br /><span>Memorable</span> digital<br class="mobile-break" /> experiences<span class="hero-period">.</span></h1>
          <p class="hero-intro">I build considered web products from the first pixel to the last API call — with a soft spot for clean systems and sharp details.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
            <a class="button button-quiet" href="https://github.com/tobycroft" target="_blank" rel="noopener noreferrer"><span class="github-icon">⌘</span> GitHub</a>
          </div>
          <div class="hero-meta"><span>BASED IN ASIA</span><i></i><span>AVAILABLE FOR SELECT PROJECTS</span></div>
        </div>

        <div class="hero-art" aria-label="Abstract glowing orbital illustration">
          <div class="art-grid"></div>
          <div class="orbit orbit-outer"></div>
          <div class="orbit orbit-inner"></div>
          <div class="orbit orbit-diagonal"></div>
          <div class="planet planet-large"></div>
          <div class="planet planet-small"></div>
          <div class="planet planet-pin"></div>
          <div class="art-core"><span>T</span></div>
          <div class="art-label label-top">DESIGN<br />× ENGINEERING</div>
          <div class="art-label label-bottom"><span class="status-dot"></span> BUILDING WITH INTENTION</div>
          <div class="art-cross cross-one">+</div><div class="art-cross cross-two">+</div>
        </div>

        <div class="hero-bottom-line"><span>SCROLL TO EXPLORE</span><span class="scroll-line"></span><span>01 / 03</span></div>
      </section>

      <section id="work" class="work-section section-wrap">
        <div class="section-heading">
          <div><div class="eyebrow">A FEW THINGS I’VE MADE</div><h2>Selected work<span class="hero-period">.</span></h2></div>
          <p>Small collection, big intention.<br />More experiments are always in progress.</p>
        </div>
        <div class="project-grid">
          <a
            v-for="project in projects"
            :key="project.number"
            class="project-card"
            :class="`project-${project.color}`"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="project-top"><span>{{ project.number }} / SELECTED PROJECT</span><span class="project-arrow" aria-hidden="true">↗</span></div>
            <div class="project-visual" aria-hidden="true">
              <div class="visual-orbit"></div><div class="visual-orbit visual-orbit-two"></div>
              <div class="visual-core"><span>{{ project.name === 'TuuzGoWeb' ? 'G' : project.name === 'AOSS' ? 'A' : 'T' }}</span></div>
              <span class="visual-label">{{ project.category }}</span>
              <span class="visual-coordinate">{{ project.number }}.{{ project.number }} / 26</span>
            </div>
            <div class="project-info">
              <div class="project-title-row"><h3>{{ project.name }}</h3><span class="project-type">{{ project.category.split(' · ')[0] }}</span></div>
              <p>{{ project.description }}</p>
              <div class="tag-list"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
            </div>
          </a>
        </div>
      </section>

      <section id="about" class="about-section section-wrap">
        <div class="about-left">
          <div class="eyebrow">A LITTLE ABOUT ME</div>
          <h2>Curious by nature.<br /><span>Builder</span> by choice.</h2>
        </div>
        <div class="about-right">
          <p class="about-lede">I’m a full stack developer who enjoys making the complicated feel simple.</p>
          <p class="about-copy">From shaping a friendly interface to designing the systems behind it, I care about the full experience. I like useful products, well-structured code, and details that make someone’s day a little easier.</p>
          <div class="skill-block"><span class="skill-label">TOOLS I REACH FOR</span><div class="skill-list"><span v-for="skill in skills" :key="skill">{{ skill }}</span></div></div>
        </div>
      </section>

      <section id="contact" class="contact-section section-wrap">
        <div class="contact-orb" aria-hidden="true"></div>
        <div class="eyebrow"><span class="status-dot"></span> HAVE A GOOD ONE IN MIND?</div>
        <h2>Let’s make<br /><span>something matter.</span></h2>
        <a class="contact-link" href="https://github.com/tobycroft" target="_blank" rel="noopener noreferrer">Start a conversation <span aria-hidden="true">↗</span></a>
      </section>
    </main>

    <footer class="site-footer section-wrap">
      <a class="brand footer-brand" href="#top"><span class="brand-mark">T</span><span class="brand-name">tuuz<span class="brand-dot">.</span></span></a>
      <span>MADE WITH CURIOSITY · © {{ new Date().getFullYear() }}</span>
      <a href="https://github.com/tobycroft" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
    </footer>

    <Transition name="modal">
      <div v-if="authOpen" class="modal-backdrop" @click.self="closeAuth" @keydown.esc="closeAuth">
        <section class="auth-panel" role="dialog" aria-modal="true" :aria-labelledby="'auth-title'">
          <button class="modal-close" aria-label="Close dialog" type="button" @click="closeAuth">×</button>
          <div class="auth-brand"><span class="brand-mark">T</span></div>
          <div class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
          <h2 id="auth-title">{{ isRegister ? 'Create your account' : 'Welcome back' }}<span class="hero-period">.</span></h2>
          <p class="auth-subtitle">{{ isRegister ? 'Join the space. It only takes a moment.' : 'Sign in to continue to your account.' }}</p>
          <form class="auth-form" @submit.prevent="submitAuth">
            <label>Email address<input v-model="email" type="email" placeholder="you@example.com" autocomplete="email" required /></label>
            <label>Password<input v-model="password" type="password" placeholder="At least 8 characters" :autocomplete="isRegister ? 'new-password' : 'current-password'" minlength="8" required /></label>
            <label v-if="isRegister" class="confirm-label">Confirm password<input v-model="confirmPassword" type="password" placeholder="Enter your password again" autocomplete="new-password" minlength="8" required /></label>
            <p v-if="notice" class="auth-notice" role="status">{{ notice }}</p>
            <button class="button button-primary auth-submit" type="submit" :disabled="submitting">{{ submitting ? 'One moment…' : isRegister ? 'Create account' : 'Log in' }} <span aria-hidden="true">↗</span></button>
          </form>
          <div class="auth-switch">{{ isRegister ? 'Already have an account?' : 'New around here?' }} <button type="button" @click="openAuth(isRegister ? 'login' : 'register')">{{ isRegister ? 'Log in' : 'Create account' }}</button></div>
          <p class="auth-disclaimer">This is a front-end preview. Account details aren’t sent or saved.</p>
        </section>
      </div>
    </Transition>
  </div>
</template>
