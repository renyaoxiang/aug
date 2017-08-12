import * as express from 'express'
import * as koa from 'koa'
import * as db from './initdb'
import {
	initdb,
	User

} from './initdb'
console.log('start')
const start = async () => {
	try {
		await initdb()
	} catch (e) {
		console.log(e)
	}
	const app = new koa()
	app.on('error', function (err) {
		console.error('server error', err);
	});
	app.use(function (ctx, next) {

		User.findOne().then(it => {
			if (it) {
				ctx.body = it.firstName
			}
			next()
		})
	});
	app.listen(8081, () => {
	})
}
start() 