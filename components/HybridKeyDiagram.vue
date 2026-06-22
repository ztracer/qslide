<template>
  <div class="hybrid-key-diagram">
    <div class="hk-head">
      <span class="hk-head-tag">混合密钥建立</span>
      <span class="hk-head-sub">ECDH + KEM → HKDF → 双层密钥</span>
    </div>

    <div class="hk-stage hk-stage-1">
      <div class="hk-stream hk-stream-quantum">
        <div class="hk-source hk-source-quantum">
          <span class="hk-source-name">ECDH</span>
          <span class="hk-source-note">经典 · 量子脆弱</span>
        </div>
        <div class="hk-arrow-wrap">
          <svg class="hk-arrow" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
            <line x1="2" y1="12" x2="86" y2="12"
                  stroke="var(--color-quantum-danger)"
                  stroke-width="2"
                  stroke-dasharray="7 5"
                  stroke-linecap="round" />
            <path d="M 86 6 L 96 12 L 86 18 Z"
                  fill="var(--color-quantum-danger)" />
          </svg>
        </div>
        <div class="hk-secret hk-secret-quantum">ecdhSS</div>
      </div>

      <div class="hk-stream hk-stream-pq">
        <div class="hk-source hk-source-pq">
          <span class="hk-source-name">KEM</span>
          <span class="hk-source-note">后量子 · 安全</span>
        </div>
        <div class="hk-arrow-wrap">
          <svg class="hk-arrow" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
            <line x1="2" y1="12" x2="86" y2="12"
                  stroke="var(--color-pq-safe)"
                  stroke-width="2"
                  stroke-linecap="round" />
            <path d="M 86 6 L 96 12 L 86 18 Z"
                  fill="var(--color-pq-safe)" />
          </svg>
        </div>
        <div class="hk-secret hk-secret-pq">kemSS</div>
      </div>
    </div>

    <div class="hk-converge">
      <svg viewBox="0 0 200 28" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 50 2 C 50 16, 100 22, 100 26"
              fill="none" stroke="var(--color-quantum-danger)"
              stroke-width="2" stroke-dasharray="6 4" />
        <path d="M 150 2 C 150 16, 100 22, 100 26"
              fill="none" stroke="var(--color-pq-safe)"
              stroke-width="2" />
      </svg>
    </div>

    <div class="hk-stage hk-stage-2">
      <div class="hk-hkdf">
        <div class="hk-hkdf-tag">HKDF</div>
        <div class="hk-hkdf-name">extract + expand</div>
        <div class="hk-hkdf-formula">
          <span class="hk-fn">HKDF.extract</span><span class="hk-paren">(</span><span class="hk-arg">IKM</span><span class="hk-eq">=</span><span class="hk-val-quantum">ecdhSS</span><span class="hk-comma">,</span> <span class="hk-arg">salt</span><span class="hk-eq">=</span><span class="hk-val-pq">kemSS</span><span class="hk-paren">)</span>
        </div>
      </div>

      <div class="hk-output-wrap">
        <svg class="hk-out-arrow" viewBox="0 0 60 24" preserveAspectRatio="none" aria-hidden="true">
          <line x1="2" y1="12" x2="48" y2="12"
                stroke="var(--text-secondary)" stroke-width="2" />
          <path d="M 48 6 L 58 12 L 48 18 Z" fill="var(--text-secondary)" />
        </svg>
      </div>

      <div class="hk-output">
        <div class="hk-output-tag">派生输出</div>
        <div class="hk-output-value">rk ∥ ck</div>
        <div class="hk-output-note">根密钥 · 链密钥</div>
      </div>
    </div>

    <div class="hk-foot">
      <span class="hk-foot-pill hk-foot-pill-quantum">ecdhSS</span>
      <span class="hk-foot-text">量子攻破后·需要重新协商</span>
      <span class="hk-foot-sep">|</span>
      <span class="hk-foot-pill hk-foot-pill-pq">kemSS</span>
      <span class="hk-foot-text">KEM 安全·保持后量子保护</span>
    </div>
  </div>
</template>

<script setup>
// Static diagram — no props, no state.
</script>

<style scoped>
.hybrid-key-diagram {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  background: var(--bg-card);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  font-family: 'Noto Sans CJK SC', 'Source Han Sans SC', system-ui, sans-serif;
}

.hk-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--line-soft);
}
.hk-head-tag {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-formal-math);
}
.hk-head-sub {
  font-size: 15px;
  color: var(--text-muted);
  letter-spacing: 0;
}

/* Stage 1: two parallel streams */
.hk-stage-1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  padding: var(--space-sm) 0;
}
.hk-stream {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.hk-source {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  min-width: 80px;
  font-weight: 600;
  letter-spacing: 0;
}
.hk-source-quantum {
  background: var(--tint-quantum);
  border: 1px solid rgba(229, 62, 62, 0.4);
  border-left: 3px solid var(--color-quantum-danger);
  color: var(--color-quantum-danger);
}
.hk-source-pq {
  background: var(--tint-pq);
  border: 1px solid rgba(0, 161, 155, 0.4);
  border-left: 3px solid var(--color-pq-safe);
  color: var(--color-pq-safe);
}
.hk-source-name {
  font-size: 16px;
  font-weight: 600;
}
.hk-source-note {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 400;
  margin-top: 2px;
  letter-spacing: 0;
}

.hk-arrow-wrap {
  flex: 1;
  min-width: 60px;
  height: 24px;
}
.hk-arrow {
  width: 100%;
  height: 100%;
  display: block;
}

.hk-secret {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  min-width: 80px;
  text-align: center;
}
.hk-secret-quantum {
  background: var(--tint-quantum);
  color: var(--color-quantum-danger);
  border: 1px solid rgba(229, 62, 62, 0.35);
}
.hk-secret-pq {
  background: var(--tint-pq);
  color: var(--color-pq-safe);
  border: 1px solid rgba(0, 161, 155, 0.35);
}

/* Converge: SVG bringing the two streams into HKDF */
.hk-converge {
  width: 100%;
  height: 20px;
  margin: -2px 0 -2px 0;
}
.hk-converge svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Stage 2: HKDF → output */
.hk-stage-2 {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.hk-hkdf {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  background: var(--tint-formal);
  border: 1px solid rgba(124, 58, 237, 0.4);
  border-left: 3px solid var(--color-formal-math);
  border-radius: var(--radius-md);
}
.hk-hkdf-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-formal-math);
  margin-bottom: 2px;
}
.hk-hkdf-name {
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 6px;
  letter-spacing: 0;
}
.hk-hkdf-formula {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.5;
  background: var(--bg-primary);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line-soft);
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hk-fn { color: var(--color-formal-math); font-weight: 600; }
.hk-paren { color: var(--text-secondary); }
.hk-arg { color: var(--text-secondary); }
.hk-eq { color: var(--text-muted); margin: 0 2px; }
.hk-val-quantum { color: var(--color-quantum-danger); font-weight: 600; }
.hk-val-pq { color: var(--color-pq-safe); font-weight: 600; }
.hk-comma { color: var(--text-secondary); }

.hk-output-wrap {
  width: 60px;
  height: 24px;
  flex-shrink: 0;
}
.hk-out-arrow {
  width: 100%;
  height: 100%;
  display: block;
}

.hk-output {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  background: var(--tint-pq-strong);
  border: 1px solid rgba(0, 161, 155, 0.5);
  border-radius: var(--radius-md);
  min-width: 100px;
}
.hk-output-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-pq-safe);
  margin-bottom: 2px;
}
.hk-output-value {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0;
}
.hk-output-note {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
  letter-spacing: 0;
}

.hk-foot {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--line-soft);
  font-size: 14px;
  color: var(--text-secondary);
  flex-wrap: wrap;
}
.hk-foot-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  font-weight: 600;
}
.hk-foot-pill-quantum {
  background: var(--tint-quantum);
  color: var(--color-quantum-danger);
  border: 1px solid rgba(229, 62, 62, 0.3);
}
.hk-foot-pill-pq {
  background: var(--tint-pq);
  color: var(--color-pq-safe);
  border: 1px solid rgba(0, 161, 155, 0.3);
}
.hk-foot-sep {
  color: var(--text-muted);
  opacity: 0.5;
  margin: 0 4px;
}
.hk-foot-text {
  letter-spacing: 0;
}
</style>
