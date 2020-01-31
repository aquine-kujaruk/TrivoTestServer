/**
 * PUERTO
 */
export const PORT = process.env.PORT || 3000;

/**
 * Environment
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Database connection
 */
export let MONGO_CONNECTION =
	'mongodb+srv://trivio-test-admin:n5hst5HEmxCRCsSu@cluster0-gylmp.mongodb.net/test?retryWrites=true&w=majority';
if (process.env.NODE_ENV !== 'dev') {
	MONGO_CONNECTION = process.env.MONGO_URI;
}

/**
 * Firebase private key
 */
process.env.GOOGLE_APPLICATION_CREDENTIALS =
	process.env.GOOGLE_APPLICATION_CREDENTIALS || 'src/config/firebase-key.json';
