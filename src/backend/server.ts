import * as express from 'express'
import * as koa from 'koa'
import * as Router from 'koa-router'
import * as session from 'koa-session'
import * as Sequelize from 'sequelize'
const views = require('koa-ejs')
import * as db from './initdb'
import {
	initdb,
	User
} from './initdb'
const start = async () => {
	try {
		await initdb()
	} catch (e) {
		console.log(e)
	}
	const app = new koa()
	const router = new Router();
	const CONFIG = {
		key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
		/** (number || 'session') maxAge in ms (default is 1 days) */
		/** 'session' will result in a cookie that expires when session/browser is closed */
		/** Warning: If a session cookie is stolen, this cookie will never expire */
		maxAge: 86400000,
		overwrite: true, /** (boolean) can overwrite or not (default true) */
		httpOnly: true, /** (boolean) httpOnly or not (default true) */
		signed: true, /** (boolean) signed or not (default true) */
		/*  (boolean) Force a session identifier cookie
	   		to be set on every response. The expiration is reset to
			the original maxAge, resetting the expiration
			countdown. default is false
		*/
		rolling: false
	};
	app.use(session(CONFIG, app))
	router.get('/', function (ctx, next) {
		ctx.redirect('/user/list')
	})
	router.get('/user/add/:name', function (ctx, next) {
		return User.sync({ force: true }).then(function () {
			const name: string = ctx.params['name'] as string
			ctx.body = 'add success'
			return User.create({
				name
			});
		});
	})
	router.get('/user/remove/:name', function (ctx, next) {
		const name: string = ctx.params['name'] as string
		console.log(name)
		return User.destroy({
			where: {
				name
			}
		}).then((it) => {
			// ctx.render('list')
		})
	});
	router.get('/user/list', function (ctx, next) {
		return User.findAll().then(datas => {
			console.log(datas.length)
			const names = datas.map(it => it.name).join(';')

			ctx.body = JSON.stringify({
				names,
				isNew: ctx.session.isNew
			})

		})
	});
	router.get('/user', function (ctx, next) {
		ctx.redirect('/user/list')
	});
	app.on('error', function (err) {
		console.error('server error', err);
	});
	app.use(router.routes())
	app.use(router.allowedMethods())

	app.listen(3000, () => {
	})
}
start()
const start1 = async () => {
	try {
		await initdb()
	} catch (e) {
		console.log(e)
	}
	const app = new koa()
	const router = new Router();
	app.use((ctx, next) => {
		ctx.body = 'demo'
		next()
	})
	app.listen(3000, () => {
	})
}
// start1()