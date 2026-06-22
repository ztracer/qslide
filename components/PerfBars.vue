<template>
  <div class="perf-bars">
    <div class="pb-head">
      <span class="pb-head-tag">性能对比</span>
      <span class="pb-head-sub">吞吐量 · 基线 = 原 WireGuard</span>
    </div>

    <div class="pb-chart">
      <div class="pb-scale" aria-hidden="true">
        <span style="left: 25%">25%</span>
        <span style="left: 50%">50%</span>
        <span style="left: 75%">75%</span>
        <span style="left: 100%">100%</span>
      </div>

      <div class="pb-row">
        <div class="pb-label">原 WireGuard</div>
        <div class="pb-track">
          <div class="pb-bar pb-bar-baseline" :style="{ width: '100%' }">
            <span class="pb-value">100%</span>
            <span class="pb-note">基线</span>
          </div>
        </div>
      </div>

      <div class="pb-row">
        <div class="pb-label">
          <span class="text-pq">PQ-WireGuard</span>
        </div>
        <div class="pb-track">
          <div class="pb-bar pb-bar-pq" :style="{ width: '62.5%' }">
            <span class="pb-value">~62%</span>
            <span class="pb-note">&lt;60% 慢</span>
          </div>
        </div>
      </div>

      <div class="pb-row">
        <div class="pb-label">IPsec</div>
        <div class="pb-track">
          <div class="pb-bar pb-bar-muted" :style="{ width: '20%' }">
            <span class="pb-value-out pb-value-out--ipsec">20% · 1/5 速度</span>
          </div>
        </div>
      </div>

      <div class="pb-row">
        <div class="pb-label">OpenVPN</div>
        <div class="pb-track">
          <div class="pb-bar pb-bar-faint" :style="{ width: '0.2%' }">
            <span class="pb-value-out">0.1% · 1/1000 速度</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pb-foot">
      <div class="pb-foot-item pb-foot-pq">
        <span class="pb-foot-bullet">▸</span>
        PQ-WireGuard 只比原版慢 60% · <strong>工业可用</strong>
      </div>
      <div class="pb-foot-item pb-foot-muted">
        <span class="pb-foot-bullet">▸</span>
        仍 <strong>5× 快于 IPsec</strong>，<strong>1000× 快于 OpenVPN</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
// Static chart — no props, no state, no animation.
</script>

<style scoped>
.perf-bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-card);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  font-family: 'Noto Sans CJK SC', 'Source Han Sans SC', system-ui, sans-serif;
}

.pb-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  padding-bottom: 4px;
}
.pb-head-tag {
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
.pb-head-sub {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.pb-chart {
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  padding-top: 18px;
}

/* Scale grid above bars */
.pb-scale {
  position: absolute;
  top: 0;
  left: 130px; /* match label column width */
  right: 0;
  height: 16px;
  pointer-events: none;
}
.pb-scale span {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.pb-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: var(--space-sm);
}

.pb-label {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
  letter-spacing: 0;
  text-align: right;
  padding-right: 4px;
}

.pb-track {
  height: 28px;
  background: var(--bg-card-alt);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  position: relative;
  overflow: visible;
}

.pb-bar {
  height: 100%;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px 0 10px;
  gap: 8px;
  position: relative;
  white-space: nowrap;
  min-width: 4px;
  transition: none;
}

.pb-bar-baseline {
  background: linear-gradient(90deg, var(--bg-card-alt), rgba(148, 163, 184, 0.35));
}
.pb-bar-pq {
  background: linear-gradient(90deg, var(--tint-pq-strong), rgba(0, 161, 155, 0.55));
  border: 1px solid rgba(0, 161, 155, 0.4);
  border-right: 1px solid var(--color-pq-safe);
}
.pb-bar-muted {
  background: linear-gradient(90deg, rgba(100, 116, 139, 0.15), rgba(100, 116, 139, 0.4));
  border: 1px solid rgba(100, 116, 139, 0.5);
}
.pb-bar-faint {
  background: rgba(100, 116, 139, 0.5);
  border: 1px solid var(--text-muted);
  border-radius: var(--radius-sm);
}

.pb-value {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0;
  flex-shrink: 0;
}
.pb-note {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0;
  flex-shrink: 0;
}
.pb-bar-pq .pb-note { color: var(--color-pq-safe); }

/* Out-of-bar labels for narrow bars (IPsec, OpenVPN) */
.pb-value-out {
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0;
  white-space: nowrap;
}

.pb-foot {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: var(--space-sm);
  border-top: 1px solid var(--line-soft);
  font-size: 14px;
  color: var(--text-secondary);
}
.pb-foot-item {
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.45;
}
.pb-foot-bullet { font-size: 12px; opacity: 0.8; }
.pb-foot-pq    .pb-foot-bullet { color: var(--color-pq-safe); }
.pb-foot-muted .pb-foot-bullet { color: var(--text-muted); }
.pb-foot-item strong { color: var(--text-primary); font-weight: 600; }
</style>
