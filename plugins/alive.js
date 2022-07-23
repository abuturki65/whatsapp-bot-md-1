const { bot, aliveMessage } = require('../lib/')

bot(
	{
		pattern: 'شغال ?(.*)',
		fromMe: true,
		desc: 'معرفة ما إذا كان البوت يعمل أم لا',
		type: 'misc',
	},
	async (message, match) => {
		const { msg, options, type } = await aliveMessage(match, message)
		return await message.sendMessage(msg, options, type)
	}
)
