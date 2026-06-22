<template>
  <div class="dh-kem-compare">
    <div class="dkc-head">
      <span class="dkc-head-tag">DH vs KEM</span>
      <span class="dkc-head-sub">对称 vs 单向 — 决定握手改造的非平凡性</span>
    </div>

    <div class="dkc-panel dkc-panel-proto">
      <div class="dkc-panel-head">
        <span class="dkc-tag dkc-tag-proto">DH</span>
        <span class="dkc-panel-title">Diffie-Hellman · 双向对称</span>
      </div>

      <div class="dkc-scene">
        <div class="dkc-entity dkc-entity-proto">
          <div class="dkc-entity-name">A</div>
          <div class="dkc-entity-key">sk_A · pk_A</div>
        </div>

        <div class="dkc-arrows dkc-arrows-bidir">
          <svg viewBox="0 0 200 70" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <text x="100" y="14" text-anchor="middle" fill="var(--text-muted)" font-size="11"
                  font-family="'JetBrains Mono', monospace">pk_B</text>
            <line x1="10" y1="26" x2="178" y2="26"
                  stroke="var(--color-protocol)" stroke-width="1.8" />
            <path d="M 172 22 L 184 26 L 172 30 Z" fill="var(--color-protocol)" />

            <text x="100" y="64" text-anchor="middle" fill="var(--text-muted)" font-size="11"
                  font-family="'JetBrains Mono', monospace">pk_A</text>
            <line x1="190" y1="46" x2="22" y2="46"
                  stroke="var(--color-protocol)" stroke-width="1.8" />
            <path d="M 28 42 L 16 46 L 28 50 Z" fill="var(--color-protocol)" />
          </svg>
        </div>

        <div class="dkc-entity dkc-entity-proto">
          <div class="dkc-entity-name">B</div>
          <div class="dkc-entity-key">sk_B · pk_B</div>
        </div>

        <div class="dkc-formula dkc-formula-proto">
          <div class="dkc-formula-line">
            <span class="dkc-fn">DH</span><span class="dkc-paren">(</span><span class="dkc-arg">A_sk</span><span class="dkc-comma">,</span> <span class="dkc-arg">B_pk</span><span class="dkc-paren">)</span>
            <span class="dkc-eq">=</span>
            <span class="dkc-fn">DH</span><span class="dkc-paren">(</span><span class="dkc-arg">B_sk</span><span class="dkc-comma">,</span> <span class="dkc-arg">A_pk</span><span class="dkc-paren">)</span>
          </div>
        </div>
      </div>

      <div class="dkc-bottom">
        <span class="dkc-label dkc-label-proto">双向对称</span>
        <span class="dkc-note">双方算出同一秘密</span>
      </div>
    </div>

    <div class="dkc-divider">
      <div class="dkc-divider-line"></div>
      <div class="dkc-divider-symbol">≠</div>
      <div class="dkc-divider-line"></div>
    </div>

    <div class="dkc-panel dkc-panel-hybrid">
      <div class="dkc-panel-head">
        <span class="dkc-tag dkc-tag-hybrid">KEM</span>
        <span class="dkc-panel-title">Key Encapsulation · 单向</span>
      </div>

      <div class="dkc-scene">
        <div class="dkc-entity dkc-entity-hybrid">
          <div class="dkc-entity-name">A</div>
          <div class="dkc-entity-key">持有 pk_B</div>
        </div>

        <div class="dkc-arrows dkc-arrows-onedir">
          <svg viewBox="0 0 200 70" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <text x="100" y="18" text-anchor="middle" fill="var(--color-hybrid)" font-size="12"
                  font-weight="600" font-family="'JetBrains Mono', monospace">Enc(pk_B) → c</text>
            <text x="100" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="11"
                  font-family="'Noto Sans CJK SC', sans-serif">密文 c</text>
            <line x1="10" y1="38" x2="178" y2="38"
                  stroke="var(--color-hybrid)" stroke-width="2" />
            <path d="M 172 34 L 184 38 L 172 42 Z" fill="var(--color-hybrid)" />
          </svg>
        </div>

        <div class="dkc-entity dkc-entity-hybrid">
          <div class="dkc-entity-name">B</div>
          <div class="dkc-entity-key">持有 sk_B</div>
        </div>

        <div class="dkc-formula dkc-formula-hybrid">
          <div class="dkc-formula-line">
            <span class="dkc-fn-hybrid">Enc</span><span class="dkc-paren">(</span><span class="dkc-arg">pk_B</span><span class="dkc-paren">)</span>
            <span class="dkc-arrow-inline">→</span>
            <span class="dkc-var-hybrid">c</span><span class="dkc-comma">,</span> <span class="dkc-var-hybrid">ss</span>
          </div>
          <div class="dkc-formula-line">
            <span class="dkc-fn-hybrid">Dec</span><span class="dkc-paren">(</span><span class="dkc-arg">sk_B</span><span class="dkc-comma">,</span> <span class="dkc-arg">c</span><span class="dkc-paren">)</span>
            <span class="dkc-arrow-inline">→</span>
            <span class="dkc-var-hybrid">ss</span>
          </div>
        </div>
      </div>

      <div class="dkc-bottom">
        <span class="dkc-label dkc-label-hybrid">单向</span>
        <span class="dkc-note">只有 B 能恢复 ss</span>
      </div>
    </div>


  </div>
</template>

<script setup>
// Static comparison — no props, no state.
</script>

<style scoped>
.dh-kem-compare {
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

.dkc-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--line-soft);
}
.dkc-head-tag {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--color-formal-math);
}
.dkc-head-sub {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0;
}

.dkc-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: 8px 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-soft);
}
.dkc-panel-proto {
  background: var(--tint-proto);
  border-color: rgba(37, 99, 235, 0.3);
  border-left: 3px solid var(--color-protocol);
}
.dkc-panel-hybrid {
  background: var(--tint-hybrid);
  border-color: rgba(234, 88, 12, 0.3);
  border-left: 3px solid var(--color-hybrid);
}

.dkc-panel-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
.dkc-tag {
  display: inline-block;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.dkc-tag-proto {
  background: var(--bg-primary);
  color: var(--color-protocol);
  border: 1px solid rgba(37, 99, 235, 0.4);
}
.dkc-tag-hybrid {
  background: var(--bg-primary);
  color: var(--color-hybrid);
  border: 1px solid rgba(234, 88, 12, 0.4);
}
.dkc-panel-title {
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 500;
  letter-spacing: 0;
}

.dkc-scene {
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px 0;
}
.dkc-entity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-weight: 600;
  text-align: center;
}
.dkc-entity-proto {
  background: var(--bg-primary);
  border: 2px solid var(--color-protocol);
  color: var(--color-protocol);
}
.dkc-entity-hybrid {
  background: var(--bg-primary);
  border: 2px solid var(--color-hybrid);
  color: var(--color-hybrid);
}
.dkc-entity-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
}
.dkc-entity-key {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 9px;
  color: var(--text-muted);
  margin-top: 2px;
  font-weight: 400;
  line-height: 1.1;
}

.dkc-arrows {
  height: 50px;
  min-width: 100px;
}
.dkc-arrows svg {
  width: 100%;
  height: 100%;
  display: block;
}
.dkc-arrows svg text {
  font-size: 11px !important;
}

.dkc-formula {
  grid-column: 1 / -1;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 11px;
  line-height: 1.7;
  background: var(--bg-primary);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line-soft);
  text-align: center;
  color: var(--text-primary);
}
.dkc-formula-proto { border-left: 2px solid var(--color-protocol); }
.dkc-formula-hybrid { border-left: 2px solid var(--color-hybrid); }

.dkc-formula-line { white-space: nowrap; overflow-x: auto; }
.dkc-fn { color: var(--color-protocol); font-weight: 600; }
.dkc-fn-hybrid { color: var(--color-hybrid); font-weight: 600; }
.dkc-paren { color: var(--text-secondary); }
.dkc-arg { color: var(--text-secondary); }
.dkc-var-hybrid { color: var(--color-hybrid); font-weight: 600; }
.dkc-comma { color: var(--text-secondary); }
.dkc-arrow-inline { color: var(--text-muted); margin: 0 4px; }
.dkc-eq { color: var(--text-muted); margin: 0 6px; }

.dkc-bottom {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 13px;
  padding-top: 4px;
  flex-wrap: wrap;
}
.dkc-label {
  display: inline-block;
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  letter-spacing: 0;
  font-size: 12px;
}
.dkc-label-proto {
  background: var(--bg-primary);
  color: var(--color-protocol);
  border: 1px solid rgba(37, 99, 235, 0.4);
}
.dkc-label-hybrid {
  background: var(--bg-primary);
  color: var(--color-hybrid);
  border: 1px solid rgba(234, 88, 12, 0.4);
}
.dkc-note {
  color: var(--text-muted);
  font-size: 12px;
  letter-spacing: 0;
}

.dkc-divider {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 2px 0;
}
.dkc-divider-line {
  flex: 1;
  height: 1px;
  background: var(--line-soft);
}
.dkc-divider-symbol {
  font-size: 24px;
  font-weight: 300;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  letter-spacing: 0;
  line-height: 1;
}

</style>
