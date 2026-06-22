<template>
  <div class="nested-hybrid">
    <div class="nh-head">
      <span class="nh-head-tag">嵌套混合密钥交换</span>
      <span class="nh-head-sub">PQConnect · 三层 KE 嵌套叠加</span>
    </div>

    <div class="nh-stack">
      <div class="nh-layer nh-layer-outer">
        <div class="nh-layer-tag nh-tag-outer">外层</div>
        <div class="nh-layer-body">
          <div class="nh-layer-name text-pq">Classic McEliece</div>
          <div class="nh-layer-meta">PQ · 编码密码</div>
        </div>
      </div>
      <div class="nh-layer nh-layer-middle">
        <div class="nh-layer-tag nh-tag-middle">中层</div>
        <div class="nh-layer-body">
          <div class="nh-layer-name text-hybrid">ECC / X25519</div>
          <div class="nh-layer-meta">经典 · 高速</div>
        </div>
      </div>
      <div class="nh-layer nh-layer-inner">
        <div class="nh-layer-tag nh-tag-inner">内层</div>
        <div class="nh-layer-body">
          <div class="nh-layer-name text-pq">Streamlined NTRU Prime</div>
          <div class="nh-layer-meta">PQ · 格密码</div>
        </div>
      </div>
      <div class="nh-final">
        <div class="nh-final-name">Final Key</div>
        <div class="nh-final-meta">三层共享秘密</div>
      </div>
    </div>

    <div class="nh-narrative">
      <div class="nh-narr-row nh-narr-pq">
        <span class="nh-narr-bullet">●</span>
        <span class="nh-narr-text">
          <strong>外 + 内两层 PQ</strong>：任一 KEM 安全即可保量子安全
        </span>
      </div>
      <div class="nh-narr-row nh-narr-hybrid">
        <span class="nh-narr-bullet">●</span>
        <span class="nh-narr-text">
          <strong>中层经典 KE</strong>：保障性能与互操作
        </span>
      </div>
      <div class="nh-narr-row nh-narr-formal">
        <span class="nh-narr-bullet">●</span>
        <span class="nh-narr-text">
          <strong>嵌套结构</strong>：协议层不修改，只在握手层叠加
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Static diagram — fully rendered, no props, no state.
</script>

<style scoped>
.nested-hybrid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 18px;
  background: var(--bg-card);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  width: 100%;
  max-width: 690px;
  margin: 0 auto;
  font-family: 'Noto Sans CJK SC', 'Source Han Sans SC', system-ui, sans-serif;
}

.nh-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  padding-bottom: 4px;
}
.nh-head-tag {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-pq-safe);
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  background: var(--tint-pq);
  border: 1px solid rgba(0, 161, 155, 0.35);
}
.nh-head-sub {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.nh-stack {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  padding: 6px;
}

.nh-layer {
  border-radius: var(--radius-md);
  padding: 10px 14px;
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  border: 1.6px solid;
  margin-bottom: 3px;
}
.nh-layer-outer  { background: var(--tint-pq);      border-color: var(--color-pq-safe); }
.nh-layer-middle { background: var(--tint-hybrid);   border-color: var(--color-hybrid); margin-left: 18px; margin-right: 18px; }
.nh-layer-inner  { background: var(--tint-pq-strong); border-color: var(--color-pq-safe); margin-left: 36px; margin-right: 36px; }

.nh-layer-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.nh-tag-outer  { background: var(--bg-card); color: var(--color-pq-safe);   border: 1px solid var(--color-pq-safe); }
.nh-tag-middle { background: var(--bg-card); color: var(--color-hybrid);  border: 1px solid var(--color-hybrid); }
.nh-tag-inner  { background: var(--bg-card); color: var(--color-pq-safe);   border: 1px solid var(--color-pq-safe); }

.nh-layer-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}
.nh-layer-name {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nh-layer-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.nh-final {
  text-align: center;
  padding: 11px 14px;
  margin: 5px 54px 0 54px;
  background: var(--bg-card);
  border: 1.8px solid var(--color-formal-math);
  border-radius: var(--radius-md);
}
.nh-final-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0;
}
.nh-final-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
  letter-spacing: 0;
}

.nh-narrative {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
  padding-top: 8px;
  border-top: 1px solid var(--line-soft);
}
.nh-narr-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.nh-narr-bullet {
  flex-shrink: 0;
  font-size: 8px;
  line-height: 1.6;
  opacity: 0.9;
}
.nh-narr-pq     .nh-narr-bullet { color: var(--color-pq-safe); }
.nh-narr-hybrid .nh-narr-bullet { color: var(--color-hybrid); }
.nh-narr-formal .nh-narr-bullet { color: var(--color-formal-math); }

.nh-narr-text strong {
  color: var(--text-primary);
  font-weight: 600;
  letter-spacing: 0;
}
</style>
