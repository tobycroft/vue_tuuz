<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Locale = 'zh' | 'en'
type AuthMode = 'login' | 'register'

const projects = [
  { name: 'gorose-pro', category: 'DATABASE · GO', description: 'AI 亲和的多引擎数据库框架：兼容 MySQL、PostgreSQL、MSSQL、Oracle，拥有类 ThinkPHP 的链式查询体验，并内置防注入机制。', descriptionEn: 'An AI-friendly, multi-engine database framework for MySQL, PostgreSQL, MSSQL, and Oracle, with fluent ThinkPHP-style queries and built-in injection protection.', tags: ['Go', 'ORM', '多数据库'], tagsEn: ['Go', 'ORM', 'Multi-DB'], tone: 'mint', url: 'https://github.com/tobycroft/gorose-pro' },
  { name: 'TuuzGoWeb', category: 'WEB FRAMEWORK · GO', description: '四层路由结构，GorosePro 数据库支持与泛型能力。稳定、快速，面向新项目和持续维护。', descriptionEn: 'A layered Go web framework with GorosePro support and generics, built for stable, fast projects that keep evolving.', tags: ['Go', 'Gin', 'Framework'], tagsEn: ['Go', 'Gin', 'Framework'], tone: 'blue', url: 'https://github.com/tobycroft/TuuzGoWeb' },
  { name: 'kcptun', category: 'NETWORK · GO', description: '基于 KCP 协议的 TCP 加速隧道：把 TCP 连接复用到 KCP（UDP），适合高丢包、高延迟的网络环境。', descriptionEn: 'A TCP acceleration tunnel built on KCP, multiplexing TCP connections over UDP for high-latency and lossy networks.', tags: ['Go', 'KCP', 'Networking'], tagsEn: ['Go', 'KCP', 'Networking'], tone: 'orange', url: 'https://github.com/tobycroft/kcptun' },
  { name: 'AOSSTP8', category: 'APPLICATION · PHP', description: 'AOSSTP 的 ThinkPHP 8 升级版，在熟悉的业务基础上持续演进。', descriptionEn: 'The ThinkPHP 8 upgrade of AOSSTP, continuing to evolve familiar application capabilities.', tags: ['PHP', 'ThinkPHP 8'], tagsEn: ['PHP', 'ThinkPHP 8'], tone: 'pink', url: 'https://github.com/tobycroft/AOSSTP8' },
  { name: 'AOSS-Go', category: 'MIDDLEWARE · GO', description: 'AOSS 的 Golang 重构版，支持原版功能，为中间件场景提供更高安全性的选择。', descriptionEn: 'A Go rewrite of AOSS that retains its original features and offers a more secure option for middleware use.', tags: ['Go', 'Middleware'], tagsEn: ['Go', 'Middleware'], tone: 'yellow', url: 'https://github.com/tobycroft/AOSS-Go' },
  { name: 'TuuzNet', category: 'NETWORK PACKAGE · GO', description: '专注高性能与易用性的网络请求工具包，覆盖 HTTP、curl 与 WebSocket。', descriptionEn: 'A high-performance, easy-to-use Go networking package for HTTP requests, curl, and WebSocket.', tags: ['Go', 'HTTP', 'WebSocket'], tagsEn: ['Go', 'HTTP', 'WebSocket'], tone: 'violet', url: 'https://github.com/tobycroft/TuuzNet' },
  { name: 'Go Tuuz', category: 'PERSONAL WEBSITE · FULL STACK', description: '这个个人网站的 Go 服务端项目，与 Vue 前端一起构成完整的全端实践。', descriptionEn: 'The Go backend behind this personal website, paired with a Vue frontend as a full-stack project.', tags: ['Go', 'Vue', '全端'], tagsEn: ['Go', 'Vue', 'Full stack'], tone: 'blue', url: 'https://github.com/tobycroft/go_tuuz' },
  { name: 'AossGoSdk', category: 'SDK · GO', description: 'AOSSTP.X 项目的 Go 语言 SDK，让 Go 服务可以直接接入 AOSSTP 能力。', descriptionEn: 'The Go SDK for AOSSTP.X, connecting Go services directly to AOSSTP capabilities.', tags: ['Go', 'SDK', 'API'], tagsEn: ['Go', 'SDK', 'API'], tone: 'mint', url: 'https://github.com/tobycroft/AossGoSdk' },
  { name: 'btapi', category: 'API · PHP', description: '宝塔面板 API 的 PHP 实现，面向面板自动化与程序化管理场景。', descriptionEn: 'A PHP client for the BT Panel API, designed for panel automation and programmatic management.', tags: ['PHP', 'API', '自动化'], tagsEn: ['PHP', 'API', 'Automation'], tone: 'orange', url: 'https://github.com/tobycroft/btapi' }
]

const translations = {
  zh: {
    navWork: '项目作品', navAbout: '关于我', navContact: '联系', login: '登录', signup: '注册',
    eyebrow: '全端开发 · 独立创造', titleA: '把想法，', titleB: '写成现实。', intro: '我用代码搭建有用的产品。从交互界面到服务架构，让每一层都清晰、可靠，也值得细细打磨。',
    workCta: '浏览项目', github: '访问 GitHub', location: '面向全球 · 持续创作', scroll: '向下探索',
    selected: '开源项目 · 持续迭代', workTitle: '从底层工具，到完整产品。', workIntro: '在 GitHub 上公开维护的项目。这里展示的是我长期投入的一部分。', viewProject: '查看仓库',
    aboutLabel: '关于我', aboutTitle: '写代码，也在意为什么而写。', aboutLead: '一个人可以做很多事。', aboutCopy: '我喜欢把想法做成真实可用的东西：梳理问题、设计数据结构、搭建服务，再把体验一点点打磨好。平时主要使用 Go、PHP、Vue，也乐于研究网络、数据库和跨平台产品。', toolkit: '常用技术', contactLabel: '一起做点有意思的？', contactTitle: '好想法，值得开始。', contactCta: '在 GitHub 上找到我',
    footer: '用好奇心与代码制作', dialogEyebrow: '欢迎回来', createTitle: '创建你的账号', loginTitle: '登录你的账号', joinText: '注册界面已准备好，稍后接入服务端。', welcomeText: '登录界面已准备好，稍后接入服务端。', email: '邮箱地址', password: '密码', passwordHint: '至少 8 位字符', confirmPassword: '确认密码', confirmHint: '再次输入密码', createButton: '创建账号', loginButton: '登录', hasAccount: '已经有账号？', noAccount: '还没有账号？', switchLogin: '直接登录', switchCreate: '创建账号', close: '关闭', emailError: '请输入有效的邮箱地址。', passwordError: '密码至少需要 8 位字符。', confirmError: '两次输入的密码不一致。', localNotice: '这是前端演示，表单信息不会发送或保存。'
  },
  en: {
    navWork: 'Selected work', navAbout: 'About', navContact: 'Contact', login: 'Log in', signup: 'Sign up',
    eyebrow: 'FULL STACK DEVELOPER · INDEPENDENT BUILDER', titleA: 'Ideas,', titleB: 'made real.', intro: 'I build useful products with code. From interfaces to service architecture, every layer should feel clear, dependable, and carefully made.',
    workCta: 'Explore projects', github: 'Visit GitHub', location: 'Building from anywhere', scroll: 'Scroll to explore',
    selected: 'OPEN SOURCE · ALWAYS ITERATING', workTitle: 'From low-level tools to complete products.', workIntro: 'A selection of projects I build and maintain in public on GitHub.', viewProject: 'View repository',
    aboutLabel: 'A LITTLE ABOUT ME', aboutTitle: 'I write code, and care why.', aboutLead: 'One person can build a lot.', aboutCopy: 'I enjoy turning an idea into something useful: understanding the problem, shaping the data, building the service, then refining the experience. My everyday tools are Go, PHP, and Vue, with a curiosity for networking, databases, and cross-platform products.', toolkit: 'TOOLS I REACH FOR', contactLabel: 'Have something interesting in mind?', contactTitle: 'Good ideas deserve a start.', contactCta: 'Find me on GitHub',
    footer: 'Made with curiosity and code', dialogEyebrow: 'GOOD TO SEE YOU', createTitle: 'Create your account', loginTitle: 'Welcome back', joinText: 'Your account flow is ready for a future backend.', welcomeText: 'Your sign-in flow is ready for a future backend.', email: 'Email address', password: 'Password', passwordHint: 'At least 8 characters', confirmPassword: 'Confirm password', confirmHint: 'Enter your password again', createButton: 'Create account', loginButton: 'Log in', hasAccount: 'Already have an account?', noAccount: 'New around here?', switchLogin: 'Log in', switchCreate: 'Create account', close: 'Close', emailError: 'Please enter a valid email address.', passwordError: 'Use at least 8 characters for your password.', confirmError: 'Your passwords do not match.', localNotice: 'Front-end preview only. Form details are not sent or saved.'
  }
} as const

function initialLocale(): Locale {
  if (typeof navigator === 'undefined') return 'zh'
  const languages = navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : []
  if (languages.length === 0) return 'zh'
  return languages.some(language => language.toLowerCase().startsWith('zh')) ? 'zh' : 'en'
}

const locale = ref<Locale>(initialLocale())
const darkMode = ref(true)
const t = computed(() => translations[locale.value])
const languageLabel = computed(() => locale.value === 'zh' ? 'EN' : '中文')
const authOpen = ref(false)
const authMode = ref<AuthMode>('login')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const notice = ref('')
const isRegister = computed(() => authMode.value === 'register')
const currentYear = new Date().getFullYear()

function setLocale(next: Locale) {
  locale.value = next
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
  document.title = next === 'zh' ? 'Tuuz · 全端开发者' : 'Tuuz · Full Stack Developer'
}

function openAuth(mode: AuthMode) {
  authMode.value = mode
  notice.value = ''
  authOpen.value = true
}

function closeAuth() {
  authOpen.value = false
  notice.value = ''
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeAuth()
}

onMounted(() => {
  document.documentElement.lang = locale.value === 'zh' ? 'zh-CN' : 'en'
  document.title = locale.value === 'zh' ? 'Tuuz · 全端开发者' : 'Tuuz · Full Stack Developer'
  try { darkMode.value = localStorage.getItem('tuuz-theme') !== 'light' } catch { /* Keep the dark default when storage is unavailable. */ }
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

function toggleTheme() {
  darkMode.value = !darkMode.value
  try { localStorage.setItem('tuuz-theme', darkMode.value ? 'dark' : 'light') } catch { /* Theme remains available for this visit. */ }
}

function submitAuth() {
  notice.value = ''
  if (!/^\S+@\S+\.\S+$/.test(email.value)) notice.value = t.value.emailError
  else if (password.value.length < 8) notice.value = t.value.passwordError
  else if (isRegister.value && password.value !== confirmPassword.value) notice.value = t.value.confirmError
  else notice.value = isRegister.value ? t.value.joinText : t.value.welcomeText
}
</script>

<template>
  <div class="portfolio-shell" :class="darkMode ? 'theme-dark' : 'theme-light'">
    <div class="aurora-field" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <div class="grain-overlay" aria-hidden="true"></div>

    <header class="site-header">
      <a class="brand" href="#top" aria-label="Tuuz home"><span class="brand-mark">T</span><span class="brand-name">TU<span>UZ</span><b>.</b></span></a>
      <nav class="desktop-nav" :aria-label="locale === 'zh' ? '主导航' : 'Main navigation'"><a href="#work">{{ t.navWork }}</a><a href="#about">{{ t.navAbout }}</a><a href="#contact">{{ t.navContact }}</a></nav>
      <div class="header-actions">
        <button class="control-pill" type="button" :aria-label="locale === 'zh' ? '切换语言' : 'Change language'" @click="setLocale(locale === 'zh' ? 'en' : 'zh')">{{ languageLabel }}</button>
        <button class="control-pill theme-control" type="button" :aria-label="darkMode ? 'Switch to light theme' : '切换到深色主题'" @click="toggleTheme"><span aria-hidden="true">{{ darkMode ? '☼' : '◐' }}</span></button>
        <button class="text-action" type="button" @click="openAuth('login')">{{ t.login }}</button>
        <button class="header-cta" type="button" @click="openAuth('register')">{{ t.signup }} <span aria-hidden="true">↗</span></button>
      </div>
    </header>

    <main id="top">
      <section class="hero wide-wrap">
        <div class="hero-copy">
          <div class="eyebrow"><span class="status-dot"></span>{{ t.eyebrow }}</div>
          <h1>{{ t.titleA }}<br /><span>{{ t.titleB }}</span><b>.</b></h1>
          <p class="hero-intro">{{ t.intro }}</p>
          <div class="hero-actions"><a class="button button-primary" href="#work">{{ t.workCta }} <span aria-hidden="true">↘</span></a><a class="button button-quiet" href="https://github.com/tobycroft" target="_blank" rel="noopener noreferrer"><span class="github-icon">⌘</span> GitHub</a></div>
          <div class="hero-meta"><span class="meta-line"></span>{{ t.location }}</div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="art-caption caption-a">FULL STACK<br />DEVELOPER</div><div class="art-caption caption-b">GO / PHP / VUE</div>
          <div class="orbital orbital-a"></div><div class="orbital orbital-b"></div><div class="orbital orbital-c"></div>
          <div class="art-glow"></div><div class="art-core"><span>T</span></div>
          <div class="art-node node-a"></div><div class="art-node node-b"></div><div class="art-node node-c"></div>
          <div class="art-cross cross-a">✳</div><div class="art-cross cross-b">+</div>
          <div class="art-bottom-note"><span class="status-dot"></span> {{ locale === 'zh' ? '持续构建中' : 'ALWAYS BUILDING' }}</div>
        </div>
        <div class="hero-index"><span>01</span><span class="index-rule"></span><span>{{ t.scroll }}</span></div>
      </section>

      <section id="work" class="work-section wide-wrap">
        <div class="section-heading"><div><div class="eyebrow"><span class="section-index">01</span>{{ t.selected }}</div><h2>{{ t.workTitle }}</h2></div><p>{{ t.workIntro }}</p></div>
        <div class="project-grid">
          <a v-for="(project, index) in projects" :key="project.name" class="project-card" :class="`tone-${project.tone}`" :href="project.url" target="_blank" rel="noopener noreferrer">
            <div class="project-top"><span>0{{ index + 1 }} <i>—</i> {{ project.category }}</span><span class="project-arrow" aria-hidden="true">↗</span></div>
            <div class="project-visual" aria-hidden="true"><div class="visual-orbit"></div><div class="visual-orbit visual-orbit-two"></div><div class="visual-block"><span>{{ project.name.slice(0, 1).toUpperCase() }}</span></div><div class="visual-grid"></div><span class="visual-index">{{ String(index + 1).padStart(2, '0') }} / 09</span></div>
            <div class="project-info"><div class="project-title-row"><h3>{{ project.name }}</h3><span class="project-link-hint">{{ t.viewProject }} ↗</span></div><p>{{ locale === 'zh' ? project.description : project.descriptionEn }}</p><div class="tag-list"><span v-for="tag in (locale === 'zh' ? project.tags : project.tagsEn)" :key="tag">{{ tag }}</span></div></div>
          </a>
        </div>
        <a class="all-projects" href="https://github.com/tobycroft?tab=repositories" target="_blank" rel="noopener noreferrer">{{ locale === 'zh' ? '在 GitHub 浏览全部公开仓库' : 'Browse all public repositories on GitHub' }} <span>↗</span></a>
      </section>

      <section id="about" class="about-section wide-wrap"><div class="about-visual" aria-hidden="true"><div class="about-ring ring-one"></div><div class="about-ring ring-two"></div><span class="about-symbol">{ }</span><span class="about-annotation">IDEA → INTERFACE<br />→ SYSTEM → PRODUCT</span></div><div class="about-content"><div class="eyebrow"><span class="section-index">02</span>{{ t.aboutLabel }}</div><h2>{{ t.aboutTitle }}</h2><p class="about-lede">{{ t.aboutLead }}</p><p class="about-copy">{{ t.aboutCopy }}</p><div class="skill-block"><span class="skill-label">{{ t.toolkit }}</span><div class="skill-list"><span v-for="skill in ['Go', 'PHP', 'Vue 3', 'TypeScript', 'MySQL', 'Linux', 'Docker', 'WebSocket']" :key="skill">{{ skill }}</span></div></div></div></section>

      <section id="contact" class="contact-section wide-wrap"><div class="contact-art" aria-hidden="true"><div class="contact-ring"></div><div class="contact-light"></div></div><div class="eyebrow"><span class="status-dot"></span>{{ t.contactLabel }}</div><h2>{{ t.contactTitle }}</h2><a class="contact-link" href="https://github.com/tobycroft" target="_blank" rel="noopener noreferrer">{{ t.contactCta }} <span>↗</span></a></section>
    </main>

    <footer class="site-footer wide-wrap"><a class="brand footer-brand" href="#top"><span class="brand-mark">T</span><span class="brand-name">TU<span>UZ</span><b>.</b></span></a><span>{{ t.footer }} · © {{ currentYear }}</span><a href="https://github.com/tobycroft" target="_blank" rel="noopener noreferrer">GITHUB ↗</a></footer>

    <Transition name="modal"><div v-if="authOpen" class="modal-backdrop" @click.self="closeAuth"><section class="auth-panel" role="dialog" aria-modal="true" aria-labelledby="auth-title"><button class="modal-close" :aria-label="t.close" type="button" @click="closeAuth">×</button><div class="auth-brand"><span class="brand-mark">T</span></div><div class="eyebrow"><span class="status-dot"></span>{{ t.dialogEyebrow }}</div><h2 id="auth-title">{{ isRegister ? t.createTitle : t.loginTitle }}<b>.</b></h2><p class="auth-subtitle">{{ isRegister ? t.joinText : t.welcomeText }}</p><form class="auth-form" @submit.prevent="submitAuth"><label>{{ t.email }}<input v-model="email" type="email" placeholder="you@example.com" autocomplete="email" required /></label><label>{{ t.password }}<input v-model="password" type="password" :placeholder="t.passwordHint" :autocomplete="isRegister ? 'new-password' : 'current-password'" minlength="8" required /></label><label v-if="isRegister">{{ t.confirmPassword }}<input v-model="confirmPassword" type="password" :placeholder="t.confirmHint" autocomplete="new-password" minlength="8" required /></label><p v-if="notice" class="auth-notice" role="status">{{ notice }}</p><button class="button button-primary auth-submit" type="submit">{{ isRegister ? t.createButton : t.loginButton }} <span>↗</span></button></form><div class="auth-switch">{{ isRegister ? t.hasAccount : t.noAccount }} <button type="button" @click="openAuth(isRegister ? 'login' : 'register')">{{ isRegister ? t.switchLogin : t.switchCreate }}</button></div><p class="auth-disclaimer">{{ t.localNotice }}</p></section></div></Transition>
  </div>
</template>
