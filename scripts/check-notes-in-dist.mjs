import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const distDir = new URL('../dist', import.meta.url).pathname
const slidesPath = new URL('../slides.md', import.meta.url).pathname

function collectFiles(dir) {
  const entries = readdirSync(dir)
  const files = []

  for (const entry of entries) {
    const path = join(dir, entry)
    const stat = statSync(path)
    if (stat.isDirectory()) {
      files.push(...collectFiles(path))
    }
    else if (/\.(html|js|json)$/.test(entry)) {
      files.push(path)
    }
  }

  return files
}

const content = collectFiles(distDir)
  .map(file => readFileSync(file, 'utf8'))
  .join('\n')

const slidesContent = readFileSync(slidesPath, 'utf8')
const sourceNotes = [...slidesContent.matchAll(/<!--([\s\S]*?)-->/g)]
  .map(match => match[1].trim())
  .filter(Boolean)

if (sourceNotes.length === 0) {
  console.error('No presenter notes were found in slides.md.')
  process.exit(1)
}

const builtNotes = content.match(/noteHTML:`<p>/g) ?? []

if (builtNotes.length === 0) {
  console.error('Presenter notes are missing from dist. Do not build Pages with --without-notes.')
  process.exit(1)
}

console.log(`Presenter notes are present in dist (${builtNotes.length}/${sourceNotes.length} note blocks detected).`)
