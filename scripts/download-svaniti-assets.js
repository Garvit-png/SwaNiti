#!/usr/bin/env node

/**
 * Script to download images from svaniti.in and save them locally
 * Run: node scripts/download-svaniti-assets.js
 */

import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagesDir = path.join(__dirname, '../public/images')

// Create directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
  console.log(`Created directory: ${imagesDir}`)
}

const imagesToDownload = [
  {
    url: 'https://static.wixstatic.com/media/b42037_ca23002883644dec84ca9379ed9f60c6~mv2.png',
    name: 'inspiration-1.webp'
  },
  {
    url: 'https://static.wixstatic.com/media/b42037_f6d2aa5ea360456aaae6d1729982ef01~mv2.png',
    name: 'ticker-1.webp'
  },
  {
    url: 'https://static.wixstatic.com/media/b42037_b5c9562e3a85446fa10c6063eb31bdd4~mv2.png',
    name: 'notions-1.webp'
  },
  {
    url: 'https://static.wixstatic.com/media/b42037_c0f2d53cf37c42e292cbac41bf5a4390~mv2.png',
    name: 'unconventional-1.webp'
  },
  {
    url: 'https://static.wixstatic.com/media/b42037_0f4cee33da4641a0a3817a402e433178~mv2.png',
    name: 'non-partisan-1.webp'
  },
  {
    url: 'https://static.wixstatic.com/media/b42037_896d1f06ac5043e5bbe2c61579e830be~mv2.png',
    name: 'policy-1.webp'
  }
]

async function downloadFile(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename)
    const file = fs.createWriteStream(filepath)

    https
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          downloadFile(response.headers.location as string, filename)
            .then(resolve)
            .catch(reject)
          return
        }

        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`✓ Downloaded: ${filename}`)
          resolve()
        })
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}) // Delete the file on error
        console.error(`✗ Failed to download ${filename}: ${err.message}`)
        reject(err)
      })
  })
}

async function downloadAllImages() {
  console.log('Starting to download images from svaniti.in...\n')

  for (const image of imagesToDownload) {
    try {
      await downloadFile(image.url, image.name)
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error)
    }
  }

  console.log('\n✓ Image download complete!')
}

downloadAllImages().catch(console.error)
