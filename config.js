exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						'mongodb://travel-user:TRAholytiger657@ds151289.mlab.com:51289/travel-buddy';
exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/trips');

exports.PORT = process.env.PORT || 3000;