import * as mysql from 'mysql'
import * as Sequelize from 'sequelize'
import { Next } from '../functions'

const sequelize = new Sequelize('aug', 'aug', 'aug', {
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

export const User = sequelize.define<augDb.User, augDb.UserAttr>('user',
	{ // Go on reading for further information about primary keys
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true
		},
		name: {
			type: Sequelize.STRING,
			field: 'name'
		}
	}, {
		freezeTableName: true
	}
);

export const initdb = (): Promise<void> => {
	return Promise.resolve()
}