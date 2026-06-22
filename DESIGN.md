# DESIGN.md — qslide

## Tone
学术报告，克制、清晰。不用花哨动画，靠排版层次和颜色语义传递信息。

## Typography
- 中文字体：Noto Sans CJK SC / Source Han Sans SC / Microsoft YaHei / PingFang SC
- 等宽字体：JetBrains Mono / Fira Code
- 标题：32–48px，正文：20–28px，注释/公式：16–18px
- 行高：中文 1.6–1.8，英文 1.4–1.5

## Color Semantics
- **量子威胁/红**：#E53E3E — 表示风险、失效
- **后量子安全/青**：#00A19B — 表示抗量子、保护
- **形式化方法/紫**：#7C3AED — 表示数学严谨、证明
- **协议/蓝**：#2563EB — 表示工程实现、工具
- **过渡/橙**：#EA580C — 表示混合方案、降级
- 背景：深色 #0F172A（主要），辅助暗色卡片 #1E293B
- 文字：白色 #F8FAFC，次要灰 #94A3B8

## Layout
- 深色背景为主，高对比度文字
- 标题左上或居中，正文左对齐
- 公式居中或左对齐带缩进
- 图表使用 SVG/Vue 组件，保持尺寸稳定

## Motion
- 禁用手风琴式展开和大面积位移动画
- 仅使用 fade-in 用于 bullet 逐条展示

## Anti-Patterns
- 禁止等大灰色卡片堆叠
- 禁止 README 式逐条罗列
- 禁止装饰性阴影
- 禁止暴露 agent prompt 或生产笔记
