<template>
  <div class="evo-chains">
    <div class="ec-head">
      <span class="ec-head-tag">演变链条</span>
      <span class="ec-head-sub">静态图基础研究 → 两条并行链 → 工业协议收敛</span>
    </div>

    <div class="ec-chains-wrap">
      <div class="ec-chain ec-chain-formal">
        <div class="ec-chain-label text-formal">PQ3 链</div>
        <div class="ec-chain-track">
          <div class="ec-node">
            <div class="ec-node-name">LWE 数学</div>
            <div class="ec-node-sub">Regev 2005</div>
          </div>
          <div class="ec-arrow ec-arrow-formal">→</div>
          <div class="ec-node">
            <div class="ec-node-name">混合 KEX</div>
            <div class="ec-node-sub">PQ3 2019+</div>
          </div>
          <div class="ec-arrow ec-arrow-formal">→</div>
          <div class="ec-node ec-node-shared ec-node-formal-shared">
            <div class="ec-node-name">符号验证</div>
            <div class="ec-node-sub">Tamarin</div>
          </div>
          <div class="ec-arrow ec-arrow-formal">→</div>
          <div class="ec-node ec-node-shared ec-node-quantum-shared">
            <div class="ec-node-name">HNDL 威胁</div>
            <div class="ec-node-sub">Moser 2016</div>
          </div>
          <div class="ec-arrow ec-arrow-formal ec-arrow-big">→</div>
          <div class="ec-endpoint ec-endpoint-formal">
            <div class="ec-endpoint-name">PQ3</div>
            <div class="ec-endpoint-sub">Apple · 2024</div>
          </div>
        </div>
      </div>

      <div class="ec-shared-row">
        <div class="ec-shared-label">共享基础</div>
        <div class="ec-shared-pill">
          <span class="ec-shared-dot ec-shared-quantum"></span>
          HNDL 威胁
        </div>
        <div class="ec-shared-pill">
          <span class="ec-shared-dot ec-shared-pq"></span>
          前向保密
        </div>
        <div class="ec-shared-pill">
          <span class="ec-shared-dot ec-shared-formal"></span>
          符号验证
        </div>
      </div>

      <div class="ec-chain ec-chain-hybrid">
        <div class="ec-chain-label text-hybrid">WireGuard 链</div>
        <div class="ec-chain-track">
          <div class="ec-node">
            <div class="ec-node-name">McEliece</div>
            <div class="ec-node-sub">1978 · 编码</div>
          </div>
          <div class="ec-arrow ec-arrow-hybrid">→</div>
          <div class="ec-node">
            <div class="ec-node-name">抗量子</div>
            <div class="ec-node-sub">Fourier 采样</div>
          </div>
          <div class="ec-arrow ec-arrow-hybrid">→</div>
          <div class="ec-node">
            <div class="ec-node-name">AKE 认证</div>
            <div class="ec-node-sub">eCK · Noise</div>
          </div>
          <div class="ec-arrow ec-arrow-hybrid">→</div>
          <div class="ec-node ec-node-shared ec-node-quantum-shared">
            <div class="ec-node-name">HNDL</div>
            <div class="ec-node-sub">量子 + 长期</div>
          </div>
          <div class="ec-arrow ec-arrow-hybrid ec-arrow-big">→</div>
          <div class="ec-endpoint ec-endpoint-hybrid">
            <div class="ec-endpoint-name">WireGuard</div>
            <div class="ec-endpoint-sub">PQ · ANSSI 2025</div>
          </div>
        </div>
      </div>
    </div>

    <div class="ec-callout">
      <div class="ec-callout-quote">
        <span class="ec-callout-mark">"</span>hybrid quantum-classical
        <span class="ec-callout-sep">·</span>
        forward-secure
        <span class="ec-callout-sep">·</span>
        verifiable PQ key exchange<span class="ec-callout-mark">"</span>
      </div>
      <div class="ec-callout-meta">
        <span class="ec-callout-source">arXiv:2511</span>
        <span class="ec-callout-note">— 几乎逐词预言 PQ3 设计要素</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Static diagram — fully rendered, no props, no state.
</script>

<style scoped>
.evo-chains {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-card);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  width: 100%;
  font-family: 'Noto Sans CJK SC', 'Source Han Sans SC', system-ui, sans-serif;
}

.ec-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  padding-bottom: 4px;
}
.ec-head-tag {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-formal-math);
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  background: var(--tint-formal);
  border: 1px solid rgba(124, 58, 237, 0.35);
}
.ec-head-sub {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.ec-chains-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ec-chain {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
}
.ec-chain-formal { background: var(--tint-formal); }
.ec-chain-hybrid { background: var(--tint-hybrid); }

.ec-chain-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  margin-bottom: 2px;
}

.ec-chain-track {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  min-width: 0;
}

.ec-node {
  flex: 1 1 0;
  min-width: 0;
  padding: 5px 6px;
  background: var(--bg-card);
  border: 1.4px solid currentColor;
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--text-secondary);
}
.ec-node-formal-shared { color: var(--color-formal-math); }
.ec-node-quantum-shared { color: var(--color-quantum-danger); border-style: dashed; }
.ec-node-shared { border-style: dashed; }

.ec-node-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0;
}
.ec-node-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: var(--text-muted);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ec-arrow {
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  line-height: 1;
}
.ec-arrow-formal { color: var(--color-formal-math); }
.ec-arrow-hybrid { color: var(--color-hybrid); }
.ec-arrow-big { font-size: 20px; }

.ec-endpoint {
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  text-align: center;
  border: 2px solid currentColor;
  min-width: 80px;
}
.ec-endpoint-formal {
  background: var(--tint-formal-strong);
  color: var(--color-formal-math);
}
.ec-endpoint-hybrid {
  background: var(--tint-hybrid-strong);
  color: var(--color-hybrid);
}
.ec-endpoint-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0;
}
.ec-endpoint-sub {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 1px;
  letter-spacing: 0;
}

/* Shared base row */
.ec-shared-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px 12px;
  background: var(--bg-card-alt);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  margin: 0 12px;
  flex-wrap: wrap;
}
.ec-shared-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--text-muted);
  text-transform: uppercase;
}
.ec-shared-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  font-size: 11px;
  color: var(--text-secondary);
  letter-spacing: 0;
}
.ec-shared-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ec-shared-quantum { background: var(--color-quantum-danger); }
.ec-shared-pq      { background: var(--color-pq-safe); }
.ec-shared-formal  { background: var(--color-formal-math); }

/* Callout */
.ec-callout {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 14px;
  background: var(--tint-formal);
  border: 1px solid rgba(124, 58, 237, 0.35);
  border-left: 3px solid var(--color-formal-math);
  border-radius: var(--radius-sm);
}
.ec-callout-quote {
  font-size: 13px;
  color: var(--text-primary);
  line-height: 1.5;
  letter-spacing: 0;
  font-style: italic;
}
.ec-callout-mark {
  color: var(--color-formal-math);
  font-size: 15px;
  font-weight: 600;
  font-style: normal;
}
.ec-callout-sep {
  color: var(--text-muted);
  margin: 0 4px;
  font-style: normal;
}
.ec-callout-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0;
}
.ec-callout-source {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  color: var(--color-formal-math);
  font-weight: 600;
  letter-spacing: 0;
}
</style>
