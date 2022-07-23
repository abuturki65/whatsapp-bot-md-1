const bot = require('../lib/events')
const {
	ctt,
	addSpace,
	textToStylist,
	PREFIX,
	getUptime,
	PLUGINS,
	getRam,
} = require('../lib/')
const { VERSION } = require('../config')
bot.addCommand(
	{
		pattern: 'مساعدة ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		const date = new Date()
		let CMD_HELP = `╭────────────────╮
						تم تطويره من أبو فيصل
╰────────────────╯

╭────────────────
│ الشفرة : ${PREFIX}
│ المستخدم : ${message.pushName}
│ الوقت : ${date.toLocaleTimeString()}
│ اليوم : ${date.toLocaleString('en', { weekday: 'long' })}
│ التاريخ : ${date.toLocaleDateString('hi')}
│ الإصدار : ${VERSION}
│ الإضافات : ${PLUGINS.count}
│ الرام : ${getRam()}
│ مدة التشغيل : ${getUptime('t')}
╰────────────────
╭────────────────
`
		const commands = []
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				commands.push(ctt(command.pattern))
			}
		})
		commands.forEach((command, i) => {
			CMD_HELP += `│ ${i + 1} ${addSpace(
				i + 1,
				commands.length
			)}${textToStylist(command.toUpperCase(), 'mono')}\n`
		})
		CMD_HELP += `╰────────────────`
		return await message.sendMessage('```' + CMD_HELP + '```')
	}
)

bot.addCommand(
	{
		pattern: 'القائمة ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		let msg = ''
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				msg += `${index} ${ctt(command.pattern)}\n${command.desc}\n\n`
			}
		})
		await message.sendMessage('```' + msg.trim() + '```')
	}
)
bot.addCommand(
	{
		pattern: 'الاوامر ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		const commands = {}
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				if (!commands[command.type]) commands[command.type] = []
				commands[command.type].push(ctt(command.pattern).trim())
			}
		})
		const date = new Date()

		let msg =
			'```' +
			`╭═══ تم تطويره من أبو فيصل ═══⊷
┃❃╭──────────────
┃❃│ الشفرة : ${PREFIX}
┃❃│ المستخدم : ${message.pushName}
┃❃│ الوقت : ${date.toLocaleTimeString()}
┃❃│ اليوم : ${date.toLocaleString('en', { weekday: 'long' })}
┃❃│ التاريخ : ${date.toLocaleDateString('hi')}
┃❃│ الإصدار : ${VERSION}
┃❃│ الإضافات : ${PLUGINS.count}
┃❃│ الرام : ${getRam()}
┃❃│ مدة التشغيل : ${getUptime('t')}
┃❃╰───────────────
╰═════════════════⊷
` +
			'```'
		for (const command in commands) {
			msg += ` ╭─❏ ${textToStylist(
				command.toLowerCase(),
				'smallcaps'
			)} ❏
`
			for (const plugin of commands[command])
				msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
			msg += ` ╰─────────────────
`
		}
		await message.sendMessage(msg.trim())
	}
)
