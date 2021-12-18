let handler = async (m, { conn, args }) => {
    let group = args[0] ? args[0] : m.chat
    if (/^[0-9]{5,16}-[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-[0-9]+@g\.us$/.test(group)) throw 'Hanya bisa dibuka di grup'
    let groupMetadata = await conn.groupMetadata(group)
    let groupName = m.isGroup ? groupMetadata.subject : ''
    if (!groupMetadata) throw 'groupMetadata is undefined'
    if (!'participants' in groupMetadata) throw 'participants is not defined'
    let me = groupMetadata.participants.find(user => user.jid === conn.user.jid)
    conn.reply(m.chat, `*Link Group ${groupName}*\n\nhttps://chat.whatsapp.com/` + await conn.groupInviteCode(group), m)
  }
  handler.help = ['linkgroup']
  handler.tags = ['group']
  handler.command = /^link(gro?up)?$/i
  handler.owner = false
  handler.mods = false
  handler.premium = false
  handler.group = false
  handler.private = false
  
  handler.admin = false
  handler.botAdmin = true
  
  handler.fail = null
  
  module.exports = handler