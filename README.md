# 后量子协议迁移的形式化验证

这是一份用 Slidev 制作的演示文稿，讨论后量子迁移进入真实协议时会遇到的建模、状态和部署问题。文稿围绕“现在收集、未来解密”（HNDL）威胁展开，重点关注 KEM 接入、混合密钥派生、泄露边界、可信入口和形式化证明之间的关系。

## 在线阅读

GitHub Pages 地址：

https://ztracer.github.io/qslide/#/1

页码链接使用下面的格式：

```text
https://ztracer.github.io/qslide/#/<页码>
```

例如第 2 页：

```text
https://ztracer.github.io/qslide/#/2
```

## 文稿内容

这份 deck 主要回答四个问题：

- HNDL 为什么会让后量子迁移提前变成工程问题。
- KEM 和 DH 的角色差异会怎样影响协议状态机。
- 混合方案怎样绑定经典秘密、后量子秘密、身份和上下文。
- 形式化验证怎样说明安全性质、泄露窗口和模型外假设。

## 案例安排

| 部分 | 主题 | 阅读重点 |
| --- | --- | --- |
| 背景 | HNDL、KEM、DH、混合迁移 | 量子风险为什么会影响今天产生的数据，以及算法替换为什么不足以完成协议迁移 |
| Case A | PQ3 | 长期消息状态里的后量子密钥刷新，以及 Tamarin 如何表达消息保密、认证和泄露例外 |
| Case B | Hybrid-WireGuard | WireGuard 握手中的 DH 语义、KEM 接入位置、混合密钥派生和 ProVerif 查询结果 |
| Case C | PQConnect | DNS 发现、keyserver、0-RTT 隧道、密钥轮换和透明部署边界 |
| 收束 | 迁移方案设计 | 敌手模型、可信边界、性能成本和可证明性质需要一起检查 |

## 本地运行

安装依赖并启动 Slidev：

```bash
npm ci
npm run dev
```

生成普通静态产物：

```bash
npm run build
```

按 GitHub Pages 项目路径构建：

```bash
npm run build:pages
npm run check:notes
```

`build:pages` 会使用 `/qslide/` 作为资源路径，并保留讲者备注。

## 部署流程

GitHub Actions 工作流位于 `.github/workflows/deploy-pages.yml`。推送到 `main` 或手动触发工作流后，会依次执行：

1. 检出仓库。
2. 安装 Node.js 和 npm 依赖。
3. 执行 `slidev build --base /qslide/`。
4. 上传 `dist/` 作为 GitHub Pages 产物。
5. 发布到 `https://ztracer.github.io/qslide/`。

仓库主页的 Website 字段也指向同一个 Pages 地址，便于从 GitHub 页面直接进入演示文稿。

发布产物会包含讲者备注，因此 `#/presenter/1` 可以在 GitHub Pages 上显示 notes。这个仓库是公开仓库，备注也会随静态产物公开；如果备注不能公开，需要使用私有部署或单独构建不含备注的公开版本。

## 路由规则

这个站点发布在 GitHub Pages 的项目路径 `/qslide/` 下，Slidev 页码放在 hash 里，例如 `#/1`、`#/2`。

推荐写法：

```text
https://ztracer.github.io/qslide/#/2
```

误写成下面这种重复路径时：

```text
https://ztracer.github.io/qslide/#/qslide/2
```

`setup/routes.ts` 会自动改回 `#/2`，用于兼容 Slidev 子路径部署时可能出现的重复 base 路由。
