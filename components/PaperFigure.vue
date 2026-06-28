<template>
  <figure class="paper-figure" :class="[sizeClass, toneClass]">
    <div class="paper-figure-image-wrap">
      <img class="paper-figure-image" :src="resolvedSrc" :alt="alt || caption || label" />
    </div>
    <figcaption class="paper-figure-caption">
      <span v-if="label" class="paper-figure-label">{{ label }}</span>
      <span v-if="caption" class="paper-figure-text">{{ caption }}</span>
      <span v-if="source" class="paper-figure-source">{{ source }}</span>
    </figcaption>
  </figure>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  label: { type: String, default: '' },
  caption: { type: String, default: '' },
  source: { type: String, default: '' },
  size: { type: String, default: 'normal' },
  tone: { type: String, default: 'paper' },
})

const sizeClass = `paper-figure-${props.size}`
const toneClass = `paper-figure-${props.tone}`

const resolvedSrc = computed(() => {
  if (!props.src.startsWith('/')) {
    return props.src
  }

  return `${import.meta.env.BASE_URL}${props.src.slice(1)}`
})
</script>

<style scoped>
.paper-figure {
  width: 100%;
  min-height: 0;
  margin: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 8px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: #f8fafc;
  color: #0f172a;
}

.paper-figure-image-wrap {
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
}

.paper-figure-image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.paper-figure-caption {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  min-height: 34px;
  padding: 8px 10px;
  border-top: 1px solid rgba(15, 23, 42, 0.12);
  background: #e2e8f0;
  font-size: 12px;
  line-height: 1.25;
}

.paper-figure-label {
  font-weight: 700;
  white-space: nowrap;
}

.paper-figure-text {
  flex: 1;
  color: #334155;
  min-width: 0;
}

.paper-figure-source {
  max-width: 190px;
  color: #475569;
  font-family: inherit;
  font-weight: 650;
  text-align: right;
  white-space: normal;
  overflow-wrap: anywhere;
}

.paper-figure-normal {
  height: 100%;
}

.paper-figure-tall {
  height: 100%;
}

.paper-figure-short {
  height: 260px;
}

.paper-figure-wide {
  height: 430px;
}

.paper-figure-large {
  height: 100%;
}

.paper-figure-dark {
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
}

.paper-figure-dark .paper-figure-caption {
  background: rgba(15, 23, 42, 0.96);
  border-top-color: rgba(148, 163, 184, 0.18);
}

.paper-figure-dark .paper-figure-text,
.paper-figure-dark .paper-figure-source {
  color: #94a3b8;
}
</style>
