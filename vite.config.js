import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const MAX_BODY_BYTES = 100_000

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > MAX_BODY_BYTES) {
        reject(new Error('Request body too large'))
        req.destroy()
      }
    })
    req.on('error', reject)
    req.on('end', () => {
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
  })
}

/**
 * `vite dev` does not run the functions in api/, so the contact form would 404
 * locally. This mounts the same core handler at the same path, meaning local
 * development exercises the identical code the deployed function runs.
 *
 * `env` comes from loadEnv with an empty prefix, which returns every variable
 * rather than only VITE_* ones — these are secrets and must never be exposed to
 * the client, so they are read here in the Node-side config and passed straight
 * to the handler.
 */
function contactApiDev(env) {
  return {
    name: 'contact-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const send = (status, body) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }

        // Mirrors api/contact.js rather than falling through to the SPA, so a
        // wrong method surfaces here exactly as it would in production.
        if (req.method !== 'POST') {
          res.setHeader('Allow', 'POST')
          return send(405, { ok: false, message: 'Method not allowed' })
        }

        try {
          const payload = await readJsonBody(req)
          // ssrLoadModule keeps the handler hot-reloadable during development.
          const { handleContact } = await server.ssrLoadModule(
            '/api/_lib/handleContact.js',
          )
          const { status, body } = await handleContact(payload, env)
          send(status, body)
        } catch (error) {
          server.config.logger.error(`[contact] ${error.message}`)
          send(400, { ok: false, message: 'Invalid request body.' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), contactApiDev(env)],
  }
})
