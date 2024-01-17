import { dirname, resolve } from 'path';

const baseDirectory = dirname(__dirname);
const swaggerPath = resolve(baseDirectory, 'swagger', 'swaggerRoutes');

export default swaggerPath;
