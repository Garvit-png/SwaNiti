import { serveSvanitiSnapshot } from '../svanitiSnapshot'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  return serveSvanitiSnapshot(request, 'blank')
}
