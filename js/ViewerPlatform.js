import { product3d} from './FrontScene.js';
function _(elm){return document.getElementById(elm)}
const productScene = new product3d(_("viewer"));
productScene.initScene("backpack",'brown_photostudio.hdr');
productScene.animate();