<script setup lang="ts">
const projects = [
  {
    name: 'AOSS',
    description: '基于 ThinkPHP 的全栈能力中枢，统一沉淀后台能力与服务。',
    tags: ['PHP', 'ThinkPHP'],
    url: 'https://github.com/tobycroft/AOSS'
  },
  {
    name: 'TuuzGoWeb',
    description: '基于 Gin 的四层架构 Go Web 框架，支持 Gorose-Pro 与泛型。',
    tags: ['Go', 'Gin'],
    url: 'https://github.com/tobycroft/TuuzGoWeb'
  },
  {
    name: 'go_tuuz',
    description: '个人网站的服务端，直接复用 TuuzGoWeb 框架。',
    tags: ['Go', 'Backend'],
    url: 'https://github.com/tobycroft/go_tuuz'
  }
]

const links = [
  { label: 'GitHub', href: 'https://github.com/tobycroft' },
  { label: '项目', href: '#projects' },
  { label: '联系', href: '#contact' }
]
</script>

<template>
  <div class="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
    <header class="border-b border-neutral-200 dark:border-neutral-800">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" class="text-lg font-semibold tracking-tight">tuuz<span class="text-primary">.</span></a>
        <nav class="flex items-center gap-5 text-sm">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="text-neutral-600 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </header>

    <main id="top">
      <section class="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <UBadge color="primary" variant="subtle">Personal Website</UBadge>
        <h1 class="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          你好，我是 Tuuz。
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          这里存放我的项目、技术记录与个人作品。前端使用 Vue 3 与 Nuxt UI 构建，
          构建产物自动同步到 <code class="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">fe_tuuz</code>，
          服务端基于 TuuzGoWeb。
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton href="#projects" color="primary" size="lg">查看项目</UButton>
          <UButton
            href="https://github.com/tobycroft"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            color="neutral"
            size="lg"
          >
            GitHub
          </UButton>
        </div>
      </section>

      <section id="projects" class="border-t border-neutral-200 dark:border-neutral-800">
        <div class="mx-auto max-w-5xl px-6 py-16">
          <h2 class="text-2xl font-semibold tracking-tight">项目</h2>
          <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">持续维护中的一部分仓库。</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <UCard v-for="project in projects" :key="project.name">
              <div class="flex h-full flex-col">
                <div class="flex items-start justify-between gap-3">
                  <h3 class="font-semibold">{{ project.name }}</h3>
                  <a
                    :href="project.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-primary hover:underline"
                  >
                    查看
                  </a>
                </div>
                <p class="mt-3 flex-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {{ project.description }}
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <UBadge v-for="tag in project.tags" :key="tag" variant="subtle" color="neutral">
                    {{ tag }}
                  </UBadge>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </section>

      <section class="border-t border-neutral-200 dark:border-neutral-800">
        <div class="mx-auto max-w-5xl px-6 py-16">
          <h2 class="text-2xl font-semibold tracking-tight">关于</h2>
          <p class="mt-4 max-w-3xl leading-7 text-neutral-600 dark:text-neutral-400">
            主要使用 PHP、Go 与 Vue 构建工具与产品。这个站点同时作为三条仓库链路的示例：
            <code class="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">vue_tuuz</code> 负责界面，
            <code class="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">fe_tuuz</code> 存放静态产物，
            <code class="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">go_tuuz</code> 提供服务端能力。
          </p>
        </div>
      </section>

      <section id="contact" class="border-t border-neutral-200 dark:border-neutral-800">
        <div class="mx-auto max-w-5xl px-6 py-16">
          <h2 class="text-2xl font-semibold tracking-tight">联系</h2>
          <p class="mt-4 text-neutral-600 dark:text-neutral-400">
            欢迎通过 GitHub 交流：<a class="text-primary hover:underline" href="https://github.com/tobycroft" target="_blank" rel="noopener noreferrer">github.com/tobycroft</a>
          </p>
        </div>
      </section>
    </main>

    <footer class="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800">
      © {{ new Date().getFullYear() }} Tuuz · Built with Vue 3 & Nuxt UI
    </footer>
  </div>
</template>
