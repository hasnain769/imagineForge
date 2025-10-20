import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import rehypeRaw from 'rehype-raw'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'posts')
const caseStudiesDirectory = path.join(process.cwd(), 'case-studies')

function getSortedData(directory: string) {
  // Get file names under the directory
  const fileNames = fs.readdirSync(directory)
  const allData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(directory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string; excerpt: string; image: string })
    }
  })
  // Sort by date
  return allData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

function getAllIds(directory: string) {
  const fileNames = fs.readdirSync(directory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

async function getData(directory: string, slug: string) {
  const fullPath = path.join(directory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; excerpt: string; image: string })
  }
}

export function getSortedPostsData() {
  return getSortedData(postsDirectory)
}

export function getAllPostIds() {
  return getAllIds(postsDirectory)
}

export async function getPostData(slug: string) {
  return getData(postsDirectory, slug)
}

export function getSortedCaseStudiesData() {
  return getSortedData(caseStudiesDirectory)
}

export function getAllCaseStudyIds() {
  return getAllIds(caseStudiesDirectory)
}

export async function getCaseStudyData(slug: string) {
  return getData(caseStudiesDirectory, slug)
}
