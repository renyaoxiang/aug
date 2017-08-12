import * as mysql from 'mysql'
import * as Sequelize from 'sequelize'
import { Next } from '../functions'
var sequelize = new Sequelize('aug', 'aug', 'aug', {
	host: '127.0.0.1',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
declare namespace db {
	interface User {
		firstName: string
		lastName: string
	}
	interface UserAttr {
		firstName: string
		lastName: string
	}
}

export const User = sequelize.define<db.User, db.UserAttr>('user',
	{
		firstName: {
			type: Sequelize.STRING,
			field: 'first_name'
		},
		lastName: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true
	}
);
User.sync({ force: true }).then(function () {
	// 已创建数据表
	return User.create({
		firstName: 'John',
		lastName: 'Hancock'
	});
});
export const initdb = (): Promise<void> => {

	return Promise.resolve()
}