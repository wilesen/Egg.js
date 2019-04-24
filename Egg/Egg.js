import EggRoute from './route.js';
import RouteSpa from './RouteSpa.js';
export default class Egg {
    constructor(targetRoot) {
        console.warn('Egg is starting');
        this.app = new RouteSpa(targetRoot);
        const routeConfig=EggRoute();
        this.app.registeRoute(routeConfig)
    }
}