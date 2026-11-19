# vue_tuuz

个人网站前端：Vue 3 + Vite + Nuxt UI v4（Vue 插件模式）+ Tailwind CSS 4。

## 本地开发

```bash
pnpm install
pnpm dev
```

构建产物位于 `dist/`：

```bash
pnpm build
pnpm preview
```

类型检查（需先执行过一次 build，Nuxt UI 会在构建时生成 `auto-imports.d.ts` / `components.d.ts`）：

```bash
pnpm type-check
```

## 部署链路

- 仓库：`tobycroft/vue_tuuz` → `tobycroft/fe_tuuz`
- 触发：push 到 `master`，或在 Actions 页面手动触发 `workflow_dispatch`
- 流程：安装依赖 → `pnpm run build` → 将 `./dist` 推送到 `fe_tuuz` 的 `master` 分支
- 凭证：`vue_tuuz` 的 Actions Secret `DEPLOY_KEY`（同时保留别名 `GH_PAT` 以兼容其他仓库的命名），对应 `fe_tuuz` 中可写的 Deploy Key

如果站点部署在子路径，构建时设置 `VITE_BASE`，例如：

```bash
VITE_BASE=/fe_tuuz/ pnpm build
```

## 说明

`fe_tuuz` 只保存静态构建产物，请勿直接在该仓库修改源码。
