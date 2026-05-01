import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const mobileUserAgentPattern =
  /Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Mobile|Opera Mini/i

export async function serveSvanitiSnapshot(request: Request, pageName: string) {
  const userAgent = request.headers.get('user-agent') ?? ''
  const variant = mobileUserAgentPattern.test(userAgent) ? 'mobile' : 'original'
  const html = await readFile(
    join(process.cwd(), 'public', 'svaniti-snapshot', `${pageName}.${variant}.html`),
    'utf8',
  )

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      vary: 'user-agent',
    },
  })
}
