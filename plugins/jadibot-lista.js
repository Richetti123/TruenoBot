import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ws from 'ws'

async function handler(m, { conn, usedPrefix, command }) {
// carpetas creadas
const __filename = fileURLToPath(import.meta?.url)
const __dirname = path?.dirname(__filename)
const carpetaBase = path?.resolve(__dirname, '..', 'GataJadiBot')
const cantidadCarpetas = (fs?.readdirSync(carpetaBase, { withFileTypes: true }).filter(item => item?.isDirectory())?.length) || 0

// servidor
let _uptime = process.uptime() * 1000
let uptime = convertirMs(_uptime)
  
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]

const message = users.map((v, index) => `👤 \`[${index + 1}]\` *${v.user.name || global.db.data.users[v.user.jid]?.name || 'Anónimo' }*
⏱️ \`\`\`${v.uptime ? convertirMs(Date.now() - v.uptime) : "Desconocido"}\`\`\`
🐈 wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot+code`).join('\n\n∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵\n\n')
const replyMessage = message.length === 0 ? `*NO HAY SUB BOTS DISPONIBLE. VERIFIQUE MÁS TARDE.*\n🐈 wa.me/${conn.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot%20code` : message
const totalUsers = users.length
const responseMessage = `☄️ *LISTA DE SUB-BOTS V${vsJB}*\n
\`¡Conviértete en sub bot desde otros sub bots!\`\n
🔄 *Auto conexión automática*
✨ *Novedades:* 
_${canal1}_

${totalUsers ? `💠 *Sub Bots conectados:* ${totalUsers || 0}\n` : ''}${cantidadCarpetas ? `📁 *Sesiones creadas:* ${cantidadCarpetas}\n` : ''}${totalUsers ? `📁 *Sesiones activas:* ${totalUsers || 0}\n` : ''}💻 *Servidor:* \`\`\`${uptime}\`\`\`\n\n${replyMessage.trim()}`.trim()
await conn.sendMessage(m.chat, { image: { url: ['https://qu.ax/spUwF.jpeg', 'https://qu.ax/ZfKAD.jpeg', 'https://qu.ax/UKUqX.jpeg'].getRandom() }, caption: responseMessage }, { quoted: m })
}
handler.command = /^(listjadibots|bots|subsbots)$/i
export default handler

function convertirMs(ms) {
const s = Math.floor(ms / 1000) % 60;
const m = Math.floor(ms / 60000) % 60;
const h = Math.floor(ms / 3600000) % 24;
const d = Math.floor(ms / 86400000);
return [ d > 0 ? `${d}d` : "", `${h}h`, `${m}m`, `${s}s` ].filter(Boolean).join(" ")
}
