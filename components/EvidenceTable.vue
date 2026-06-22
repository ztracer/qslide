<template>
  <div class="evidence-table">
    <div class="evidence-table-head">
      <div>
        <div v-if="kicker" class="evidence-kicker">{{ kicker }}</div>
        <div class="evidence-title">{{ title }}</div>
      </div>
      <div v-if="source" class="evidence-source">{{ source }}</div>
    </div>
    <div class="evidence-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  kicker: { type: String, default: '' },
  source: { type: String, default: '' },
})
</script>

<style scoped>
.evidence-table {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
  min-height: 0;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.92);
}

.evidence-table-head {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: end;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.10);
}

.evidence-kicker {
  color: #64748b;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
}

.evidence-title {
  color: #0f172a;
  font-size: 21px;
  font-weight: 650;
  line-height: 1.2;
}

.evidence-source {
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  white-space: nowrap;
}

.evidence-body {
  min-height: 0;
  padding: 14px 16px 16px;
  overflow: hidden;
}

.evidence-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  line-height: 1.35;
}

.evidence-body :deep(th),
.evidence-body :deep(td) {
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 9px 10px;
  vertical-align: top;
}

.evidence-body :deep(th) {
  background: rgba(239, 246, 255, 0.9);
  color: #0f172a;
  font-weight: 650;
}

.evidence-body :deep(td) {
  color: #475569;
  background: rgba(248, 250, 252, 0.86);
}
</style>
