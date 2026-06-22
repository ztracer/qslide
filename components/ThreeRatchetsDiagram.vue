<template>
  <div class="ratchet-diagram">
    <div class="rd-head">
      <span class="rd-head-tag rd-head-tag-formal">三级棘轮</span>
      <span class="rd-head-sub">公钥 · KEM · 对称 — 叠加前向保密 + 后妥协恢复</span>
    </div>

    <div class="rd-layers">
      <div class="rd-layer rd-layer-formal">
        <div class="rd-layer-label">
          <div class="rd-layer-name text-formal">公钥棘轮</div>
          <div class="rd-layer-sub">ECDH</div>
        </div>
        <div class="rd-track">
          <div class="rd-node rd-node-formal">
            <div class="rd-node-name">(pk<sub>A</sub>, sk<sub>A</sub>)</div>
            <div class="rd-node-sub">Alice 主叫</div>
          </div>
          <div class="rd-arrow rd-arrow-formal">→</div>
          <div class="rd-node rd-node-formal rd-node-emph">
            <div class="rd-node-name">(pk′<sub>A</sub>, sk′<sub>A</sub>)</div>
            <div class="rd-node-sub text-formal">Bob 主叫 · 新密钥</div>
          </div>
          <div class="rd-arrow rd-arrow-formal">→</div>
          <div class="rd-node rd-node-formal">
            <div class="rd-node-name">(pk″<sub>A</sub>, sk″<sub>A</sub>)</div>
            <div class="rd-node-sub">Alice 主叫</div>
          </div>
        </div>
      </div>

      <div class="rd-epoch-marker">
        <span class="rd-epoch-tag">role switch</span>
      </div>

      <div class="rd-layer rd-layer-pq">
        <div class="rd-layer-label">
          <div class="rd-layer-name text-pq">KEM 棘轮</div>
          <div class="rd-layer-sub">后量子</div>
        </div>
        <div class="rd-track">
          <div class="rd-node rd-node-pq">
            <div class="rd-node-name">kemSS₁</div>
            <div class="rd-node-sub">初始 KEM encap</div>
          </div>
          <div class="rd-arrow rd-arrow-pq">→</div>
          <div class="rd-node rd-node-pq rd-node-emph">
            <div class="rd-node-name">kemSS₂</div>
            <div class="rd-node-sub text-pq">可选新 KEM encap</div>
          </div>
          <div class="rd-arrow rd-arrow-pq">→</div>
          <div class="rd-node rd-node-pq">
            <div class="rd-node-name">kemSS₃</div>
            <div class="rd-node-sub">可选新 KEM encap</div>
          </div>
        </div>
      </div>

      <div class="rd-epoch-marker">
        <span class="rd-epoch-tag">role switch</span>
      </div>

      <div class="rd-layer rd-layer-hybrid">
        <div class="rd-layer-label">
          <div class="rd-layer-name text-hybrid">对称棘轮</div>
          <div class="rd-layer-sub">每条消息</div>
        </div>
        <div class="rd-track">
          <div class="rd-mks">
            <span class="rd-mk">mk₁</span>
            <span class="rd-mk-arrow">→</span>
            <span class="rd-mk">mk₂</span>
            <span class="rd-mk-arrow">→</span>
            <span class="rd-mk">mk₃</span>
          </div>
          <div class="rd-mks rd-mks-emph">
            <span class="rd-mk">mk₄</span>
            <span class="rd-mk-arrow">→</span>
            <span class="rd-mk">mk₅</span>
            <span class="rd-mk-arrow">→</span>
            <span class="rd-mk">mk₆</span>
          </div>
          <div class="rd-mks">
            <span class="rd-mk">mk₇</span>
            <span class="rd-mk-arrow">→</span>
            <span class="rd-mk">mk₈</span>
          </div>
        </div>
        <div class="rd-chain-labels">
          <span>ck₀ → mk, ck′</span>
          <span>ck₁ → mk, ck′</span>
          <span>ck₂ → mk, ck′</span>
        </div>
      </div>

      <div class="rd-time-axis">
        <span>t₀</span>
        <span>t₁</span>
        <span>t₂</span>
        <span class="rd-time-end">时间 →</span>
      </div>

      <div class="rd-fs-note">
        <strong class="text-pq">前向保密</strong> · 已知当前密钥无法推回历史密钥
      </div>
    </div>


  </div>
</template>

<script setup>
// Static diagram — fully rendered, no props, no state.
</script>

<style scoped>
.ratchet-diagram {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: 8px 12px;
  background: var(--bg-card);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  width: 100%;
  font-family: 'Noto Sans CJK SC', 'Source Han Sans SC', system-ui, sans-serif;
}

.rd-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  padding-bottom: 4px;
}
.rd-head-tag {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  color: var(--color-formal-math);
  background: var(--tint-formal);
  border: 1px solid rgba(124, 58, 237, 0.35);
}
.rd-head-sub {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.rd-layers {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rd-layer {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
}
.rd-layer-formal { background: var(--tint-formal); }
.rd-layer-pq     { background: var(--tint-pq); }
.rd-layer-hybrid { background: var(--tint-hybrid); }

.rd-layer-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.rd-layer-name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
}
.rd-layer-sub {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.rd-track {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  min-width: 0;
}

.rd-node {
  flex: 1 1 0;
  min-width: 0;
  padding: 4px 6px;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  text-align: center;
  border: 1.5px solid currentColor;
}
.rd-node-formal { border-color: var(--color-formal-math); color: var(--color-formal-math); }
.rd-node-pq     { border-color: var(--color-pq-safe);     color: var(--color-pq-safe); }

.rd-node-formal.rd-node-emph {
  background: var(--tint-formal-strong);
  border-width: 2px;
}
.rd-node-pq.rd-node-emph {
  background: var(--tint-pq-strong);
  border-width: 2px;
}

.rd-node-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rd-node-name sub {
  font-size: 0.75em;
}
.rd-node-sub {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
  letter-spacing: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rd-arrow {
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
  line-height: 1;
}
.rd-arrow-formal { color: var(--color-formal-math); }
.rd-arrow-pq     { color: var(--color-pq-safe); }

.rd-epoch-marker {
  display: flex;
  justify-content: flex-end;
  padding: 0 12px;
  margin-left: 100px;
}
.rd-epoch-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0;
  padding: 2px 10px;
  background: var(--bg-card);
  border: 1px solid var(--text-muted);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
}

/* Symmetric ratchet — message keys in a row */
.rd-mks {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 1 0;
  min-width: 0;
  justify-content: center;
}
.rd-mks-emph .rd-mk {
  background: var(--tint-hybrid-strong);
  border-color: var(--color-hybrid);
  border-width: 1.5px;
}
.rd-mk {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  padding: 5px 8px;
  background: var(--bg-card);
  border: 1px solid var(--color-hybrid);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}
.rd-mk-arrow {
  font-size: 14px;
  color: var(--color-hybrid);
  font-weight: 600;
}

.rd-chain-labels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
  margin-top: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--text-muted);
  text-align: center;
  white-space: nowrap;
}

.rd-time-axis {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 4px;
  margin-top: 8px;
  margin-left: 100px;
  padding: 6px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-secondary);
  border-top: 1px solid var(--line-soft);
  position: relative;
}
.rd-time-axis span {
  text-align: center;
}
.rd-time-end {
  color: var(--text-secondary);
  font-family: 'Noto Sans CJK SC', sans-serif;
  letter-spacing: 0;
  text-align: right;
  padding-right: 4px;
}

.rd-fs-note {
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
  padding-top: 6px;
  letter-spacing: 0;
}

</style>
