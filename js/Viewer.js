import { product3d} from './FrontScene.js';
function _(elm){return document.getElementById(elm)}
const productScene = new product3d(_("viewer"));
productScene.initScene("shoes-0");
productScene.animate();