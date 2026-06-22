import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const distDir = new URL('../dist', import.meta.url).pathname
const requiredNotes = [
  '今天录下来的东西',
  '协议迁移到量子密码环境下还能不能保障安全',
]

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

const missing = requiredNotes.filter(note => !content.includes(note))

if (missing.length > 0) {
  console.error('Presenter notes are missing from dist. Do not build Pages with --without-notes.')
  for (const note of missing)
    console.error(`- Missing: ${note}`)
  process.exit(1)
}

console.log('Presenter notes are present in dist.')
