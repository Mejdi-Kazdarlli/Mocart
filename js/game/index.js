import { skate3d} from './indexScene.js';
import * as THREE from '../THREE/three.module.js';
import { TWEEN } from '../THREE/tween.module.min.js';
import {OutlinePass} from '../THREE/OutlinePass.js';
import { product3d} from '../productScene.js';
import {productRow} from './productrow.js';
import { ShaderPass } from '../THREE/ShaderPass.js';
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  var myimg = document.getElementById("logoimg")
  nav.classList.toggle("sticky", window.scrollY > 200)
  if(window.scrollY > 200){
    myimg.src = "./images/mocartlogoblack.png";
  }else{
    myimg.src = "./images/mocartlogo.png";
  }
})
function _(elm){return document.getElementById(elm)}
window.addEventListener('scroll', preventScroll, { passive: false });
window.addEventListener('wheel', preventScroll, { passive: false });
window.addEventListener('keydown', preventScroll, { passive: false });

function preventScroll(event) {
  const target = event.target;
  const sceneElement = document.querySelector('.game');
  const list_container = document.querySelector('.list_container');

  if (
    sceneElement.contains(target) &&
    !list_container.contains(target)
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}
function isArrowKey(event) {
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  return arrowKeys.includes(event.key);
}
window.customElements.define("panel-row",productRow);

var productName;
var raycaster, mouse = { x : 0, y : 0 };
raycaster = new THREE.Raycaster()
var intersects = []
let glowColor = "#ffffff";
let loadingbgSrc = "public/skatepark.jpg"
let isSwiping = false;
const delta = 1.5;
let sogliaMove = 0;
let startX;
let startY;
let firstTouch = true;
let isMobile = false;
let carthover = false;
let cartOpen = false;
const annotation = document.querySelector('.annotation');
let annotationPreviousPosition=new THREE.Vector3();
let productScene = new product3d(_("product-canvas"));
let Valnumber = 0;
let ListRowNames=[];
var boldDollarSign = document.createElement("b");
boldDollarSign.innerHTML = "&#36;";
boldDollarSign.style.fontWeight = "bold";
const ListOfPrices=[]
const info = document.querySelector('.info');
const closeinfo = document.querySelector('.closeInfo')
const infoPanel = document.querySelector('.help___2jUfb');
var distanceTOproduct;



gameScene = new skate3d(_("gameScene"));
gameScene.initScene("superMarket.glb");
gameScene.animate();
const contrastluminosity=  new ShaderPass({
  uniforms: {
    tDiffuse: { value: null },
    contrast: { value: 0.78 }, // Increase or decrease contrast by modifying this value
    luminosity: { value: 1.1 } // Increase or decrease luminosity by modifying this value
  },
  vertexShader:`
      varying vec2 vUv;
      void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float contrast;
    uniform float luminosity;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      color.rgb = (color.rgb - 0.5) * contrast + 0.5; // Adjust contrast
      color.rgb *= luminosity; // Adjust luminosity
      gl_FragColor = color;
    }`
});

gameScene.render = function() {
  TWEEN.update()
  gameScene.renderer.render(gameScene.scene, gameScene.camera);
}
setTimeout(() => {
  
  console.log(gameScene.composer.passes)
}, 1000);
let rect = gameScene.renderer.domElement.getBoundingClientRect();
async function removescene(currentScene){
  _("loading").style.display = "flex";
  _("loadingbtn").style.opacity=1
  _("loadingbtn").style.display = "flex";
  _("gameScene").removeChild(_("gameScene").lastElementChild)
  list_Product.querySelector('.subtotal').innerHTML = "..."
  list_Product.querySelector('.total').innerHTML = "..."
  cartIcon.setAttribute('value', "0");
  while (document.querySelector('.list_container').hasChildNodes()) {
    document.querySelector('.list_container').removeChild(document.querySelector('.list_container').firstChild);
  }
  currentScene.scene.clear()
  while (currentScene.scene.children.length > 0) {currentScene.scene.remove(currentScene.scene.children[0]);}
  currentScene.scene.traverse(function (object) {
    if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        object.material.dispose();
    }
});
currentScene.renderer.dispose();
}
async function NewScene(Newscene,glb){
  Newscene.initScene(glb);
  Newscene.scene.add( plane );
  rect = Newscene.renderer.domElement.getBoundingClientRect();
  outlinePass = new OutlinePass(new THREE.Vector2(rect.width, rect.height), Newscene.scene, Newscene.camera);
  outlinePass.renderToScreen = true;
  Newscene.composer.addPass(Newscene.renderPass);
  Newscene.composer.addPass(outlinePass);
  Newscene.composer.addPass(contrastluminosity);
  Newscene.composer.addPass(Newscene.bokehPass);
  const passes = Newscene.composer.passes
  const bokehPass = passes[3];
  let scene = glb.split('.')[0]
  switch (scene) {
    case "skate_park":
      bokehPass.uniforms.aperture.value= 0.0005
      Newscene.renderer.toneMappingExposure = 1.5;
      Newscene.camera.fov = 50
      contrastluminosity.uniforms.luminosity.value = 1.2
      contrastluminosity.uniforms.contrast.value = 1.0
      glowColor = "#ffffff";
      _('loadingbtn').style.backgroundImage = 'url("public/superMarket.jpg")'
    break;
    case "superMarket":
      bokehPass.uniforms.aperture.value= 0.0001
      Newscene.renderer.toneMappingExposure = 3.5;
      Newscene.camera.fov = 60
      contrastluminosity.uniforms.luminosity.value = 1.2
      contrastluminosity.uniforms.contrast.value = 1.0
      glowColor = "#ffffff"
      _('loadingbtn').style.backgroundImage = 'url("public/superMarket.jpg")'
    break;
    default:
      bokehPass.uniforms.aperture.value= 0.0005
    break;
  }
  Newscene.composer.render();
}
const tabLinks = document.querySelectorAll('.tab-link');
tabLinks.forEach((link) => {
  link.addEventListener('click', async(event) => {
    event.preventDefault();
    const clickedLink = event.target;
    tabLinks.forEach((tabs) => {
      tabs.classList.remove('current');
    });
    clickedLink.classList.add('current');
    const targetglb = clickedLink.dataset.glb;
   await removescene(gameScene)
   await NewScene(gameScene,targetglb)
   _("loadingbtn").style.opacity=0
   setTimeout(() => {
    _("loadingbtn").style.display = "none";
  }, 1000);

  });
  
});



const geometry = new THREE.PlaneGeometry(0.3,0.3 );
const material = new THREE.MeshBasicMaterial( {map: LoadTextures("marker_b.png", 1), side: THREE.FrontSide,transparent:true,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst:THREE.OneMinusSrcAlphaFactor,
      depthTest: false
} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x = -Math.PI / 2;
plane.layers.set(1)
gameScene.scene.add( plane );
function LoadTextures(texture, repeat) {
    var tex = new THREE.TextureLoader().load('img/' + texture);
    tex.encoding = THREE.sRGBEncoding;
    tex.flipY = false;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.x = tex.repeat.y = repeat
    tex.center.set(.5, .5);
    return tex
}
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent,
  )
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substring(0, 4),
  )
) {
  isMobile = true;
}

//pointer event works better than touch event
_("gameScene").style.touchAction = 'none';
  if (isMobile)
  {
    gameScene.orbit.enableZoom = true;
    _("gameScene").onpointerdown = function(event)
    {
        firstTouch = true; 
        startX = event.pageX;
        startY = event.pageY;
        isSwiping = false;
    }
    _("gameScene").onpointermove = function(event)
      {
          if (firstTouch) {
              startX = event.pageX;
              startY = event.pageY;
              firstTouch = false;
          } else {
              const diffX = Math.abs(event.pageX - startX);
              const diffY = Math.abs(event.pageY - startY);
              if (diffX < delta && diffY < delta && sogliaMove > 2) {
              // sogliaMove>2 means 2 frame still when isSwiping is true
              onDocumentTouchClick(event); // for iOS  
              }
          }
          isSwiping = true;
      }
    _("gameScene").onpointerup = function(event)
      {
        const diffX = Math.abs(event.pageX - startX);
        const diffY = Math.abs(event.pageY - startY);
        if (diffX < delta && diffY < delta) {
        onDocumentMouseClick(event); // Android old: is better desktop solution
        }
        firstTouch = true;
      }
  }
  else {
//desktop behavior
gameScene.orbit.enableZoom = false;
    _("gameScene").onpointerdown = (event) => {
        isSwiping = false;
        startX = event.pageX;
        startY = event.pageY;
      }
    _("gameScene").onpointermove = (event)=>{onDocumentMouseMove(event);isSwiping = true;}
    _("gameScene").onpointerup = (event) => {
      const diffX = Math.abs(event.pageX - startX);
      const diffY = Math.abs(event.pageY - startY);
      if (diffX < delta && diffY < delta) {onDocumentMouseClick(event);}
      }
    _("gameScene").addEventListener("contextmenu", e => e.preventDefault());
  }
const tabHelpContents = document.querySelectorAll('.helpItem___2Tob5');
info.addEventListener('pointerdown',async function(e){
  if( e.button == 0 )
  {
    infoPanel.style.display="block"
  tabHelpContents.forEach((HelpContent) => {
    HelpContent.classList.remove('active___126Ku');
    if(isMobile && HelpContent.classList.contains("help-touche"))
    {
      HelpContent.classList.add('active___126Ku');
    }
    else if(!isMobile && HelpContent.classList.contains("help-mouse"))
    {
      HelpContent.classList.add('active___126Ku');
    }
  });
}
});
closeinfo.addEventListener('pointerdown',function(e){if( e.button == 0 ) {infoPanel.style.display="none"}});
function onDocumentTouchClick(event) {
  //event.preventDefault();
  gameScene.scene.updateMatrixWorld();
  const rect = gameScene.renderer.domElement.getBoundingClientRect();
  mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
  raycaster.setFromCamera(mouse, gameScene.camera);
  intersects = raycaster.intersectObject(gameScene.scene.children);

  if (intersects.length > 0 && firstTouch === false) {
    firstTouch = true; 
    evaluateRaycast("Floor");
  } 
}
var outlinePass = new OutlinePass(new THREE.Vector2(rect.width, rect.height), gameScene.scene, gameScene.camera);
outlinePass.edgeStrength = 2.5; // Change the strength of the outline
outlinePass.edgeGlow = 1; // Change the Glow of the outline
outlinePass.pulsePeriod = 2; // Change the pulsePeriod of the outline
outlinePass.visibleEdgeColor.set(glowColor); // Change the color of the visible edges
outlinePass.hiddenEdgeColor.set('#000000'); // Change the color of the hidden edges
outlinePass.renderToScreen = true;
gameScene.composer.addPass(gameScene.renderPass);
gameScene.composer.addPass(outlinePass);
gameScene.composer.addPass(gameScene.bokehPass);
gameScene.composer.addPass(contrastluminosity)
function updateScreenPosition(renderer,camera,vec) {
  const rect = renderer.domElement.getBoundingClientRect();
   const vector = new THREE.Vector3();
    vector.copy(vec)
   vector.project(camera);
   vector.x = Math.round((0.5 + vector.add(new THREE.Vector3(0,0.2,0)).x / 2) * (rect.width / window.devicePixelRatio));
   vector.y = Math.round((0.5 - vector.add(new THREE.Vector3(0,0.2,0)).y / 2) * (rect.height / window.devicePixelRatio));
   annotation.style.top = `${vector.y}px`;
   annotation.style.left = `${vector.x}px`;
}
_("gameScene").addEventListener('pointerdown', OnClickProduct);
let productLoader = document.createElement("div")
productLoader.classList.add("carouseldiv")
productLoader.id="loadingProduct"
let productLoadertx = document.createElement("span")
productLoadertx.id="loadertxt"
let productPlay = document.createElement("a")
productPlay.classList.add("video-play-button")
productPlay.id="play-video"
productLoader.append(productLoadertx,productPlay)

_('badge-Annotation').addEventListener('pointerdown', (e)=> {
  if( e.button == 0 )
  {cartIcon.setAttribute('value', (++value).toString());
  const productName = annotation.querySelector('.Product_Name_hover').innerHTML;
  AddRow(productName)}
},false);
_('badge-Annotation').addEventListener("mouseenter",() => {carthover=true},false);
_('badge-Annotation').addEventListener("mouseleave",() => {carthover=false},false);
async function OnClickProduct(event)
  {
    if( event.button == 0 )
    {
      if(isMobile){distanceTOproduct = 2.5}else{distanceTOproduct = 10000}
      cartgame.style.zIndex = "5"
      gameScene.scene.updateMatrixWorld();
      const rect = gameScene.renderer.domElement.getBoundingClientRect();
      mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
      mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
      raycaster.setFromCamera(mouse, gameScene.camera);
      intersects = raycaster.intersectObjects(gameScene.scene.children, true)
      if (intersects.length > 0 && carthover===false && cartOpen===false)
      {
        
        switch (true) {
          case intersects[0].object.name.includes("MocartProduct") && intersects[0].distance<distanceTOproduct:
            document.querySelector(".card").style.display="flex";
            annotation.style.display="none";
            _('loading').style.display="flex"
            productName = intersects[0].object.name.split('_')[1]
            if(productName )
              {
                while (_("product-canvas").hasChildNodes()){_("product-canvas").removeChild(_("product-canvas").firstChild);}
                _("product-canvas").appendChild(productLoader)
                productScene.initScene(productName);
                productScene.animate();
                updateData()
                cartOpen=true
              }
          break;
        }
      }
      //setTimeout(() => { cartOpen=false}, 100);
      console.log(cartOpen)
    }
  }
function updateData()
{
  fetch("js/game/data.json")
              .then(response => response.json())
              .then(obj => {
                Object.keys(obj).forEach(product => {
                  if( product == productName)
                    {
                      const productData = obj[product][0];
                      Object.entries(productData).forEach(([prop, value]) => {
                        switch (true) {
                          case prop=="Collections":
                            document.querySelector(".collection_").innerHTML = value ;
                          break;
                          case prop=="Product_Name":
                            document.querySelector(".Product_Name").innerHTML = value ;
                          break;
                          case prop=="Price":
                            let dollara = document.createElement("span")
                            dollara.classList.add('fas','fa-dollar-sign')
                            document.querySelector(".Price").innerHTML = value ;
                            document.querySelector(".Price").appendChild(dollara)
                          break;
                          case prop=="FirtsPrice":
                            let dollarb = document.createElement("span")
                            dollarb.classList.add('fas','fa-dollar-sign')
                            document.querySelector(".FirtsPrice").innerHTML = value ;
                            document.querySelector(".FirtsPrice").appendChild(dollarb)
                          break;
                          
                          case prop=="Size":
                            let Size = document.querySelector(".Size")
                            if(value!=null)
                            {
                              Size.style.display='block';
                              document.querySelector(".foot").style.marginTop = "80px";
                              if(Size.childNodes.length>2)
                                {
                                  for (let i = Size.childNodes.length-1; i > 0; i--) {
                                    if(Size.childNodes[i].tagName  === "LI")
                                    {
                                      Size.removeChild(Size.childNodes[i]);
                                    }
                                  }
                                }
                                for (let e = 0; e < value.length; e++) {
                                  let li = document.createElement("li")
                                  li.classList.add('bg')
                                  li.innerHTML = value[e]
                                  Size.appendChild(li)
                                }
                            }
                            else{Size.style.display='none'; document.querySelector(".foot").style.marginTop = "180px";}
                          break;
                          case prop=="Color":
                            let col = document.querySelector(".Color")
                            if(value!=null)
                            {
                              col.style.display='block';
                              document.querySelector(".foot").style.marginTop = "80px";
                              if(col.childNodes.length>2)
                                {
                                  for (let i = col.childNodes.length - 1; i > 0; i--) {
                                    if(col.childNodes[i].tagName  === "LI")
                                    {
                                      col.removeChild(col.childNodes[i]);
                                    }
                                  }
                                }
                                for (let e = 0; e < value.length; e++) {
                                  let li = document.createElement("li")
                                  li.classList.add('col')
                                  li.style.backgroundColor = value[e]
                                  li.style.cursor="pointer"
                                  col.appendChild(li)
                                }
                            }
                            else{col.style.display='none';document.querySelector(".foot").style.marginTop = "180px";}
                          break;
                        }
                      });
                    }
                });
              });
}
function updateDataOnhover(productName)
{
  fetch("js/game/data.json")
              .then(response => response.json())
              .then(obj => {
                Object.keys(obj).forEach(product => {
                  if( product == productName)
                    {
                      const productData = obj[product][0];
                      Object.entries(productData).forEach(([prop, value]) => {
                        switch (true) {
                          case prop=="Collections":
                            document.querySelector(".collection_hover").innerHTML = value ;
                          break;
                          case prop=="Product_Name":
                            document.querySelector(".Product_Name_hover").innerHTML = value ;
                          break;
                          case prop=="Price":
                            let dollarc = document.createElement("span")
                            dollarc.classList.add('fas','fa-dollar-sign')
                            document.querySelector(".Price_hover").innerHTML = value ;
                            document.querySelector(".Price_hover").appendChild(dollarc)
                          break;
                        }
                      });
                    }
                });
              });
}
function onDocumentMouseMove(event)
  {
    gameScene.scene.updateMatrixWorld();
    const rect = gameScene.renderer.domElement.getBoundingClientRect();
    mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
    raycaster.setFromCamera(mouse, gameScene.camera);
    intersects = raycaster.intersectObjects(gameScene.scene.children, true)
    if (intersects.length > 0)
    {
      switch (true) {
        case intersects[0].object.name.includes("Floor"):
          gameScene.container.style.cursor="none";
          plane.position.set(intersects[0].point.x,intersects[0].point.y+0.01,intersects[0].point.z)  
        break;
        case intersects[0].object.name.includes("MocartProduct") && intersects[0].distance<1.5:
          outlinePass.selectedObjects = [intersects[0].object];
          annotation.style.display="flex";
          gameScene.container.style.cursor="pointer";
          annotationPreviousPosition.copy(intersects[0].object.position)
          updateScreenPosition(gameScene.renderer,gameScene.camera,annotationPreviousPosition)
          updateDataOnhover(intersects[0].object.name.split('_')[1])
        break;
        case intersects[0].object.name.includes("MocartProduct"):
          outlinePass.selectedObjects = [intersects[0].object];
          gameScene.container.style.cursor="pointer";
        break;
        default :
        outlinePass.selectedObjects = []
        gameScene.container.style.cursor="default";
        annotation.style.display="none";
        break
      }
    }
  }
function onDocumentMouseClick(event) {
    //event.preventDefault();
    if (!isSwiping) {
    gameScene.scene.updateMatrixWorld();
    const rect = gameScene.renderer.domElement.getBoundingClientRect();
    mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
    raycaster.setFromCamera(mouse, gameScene.camera);
    intersects = raycaster.intersectObjects(gameScene.scene.children, true)
    if (intersects.length > 0) {evaluateRaycast("Floor");}
    }
    isSwiping = false;
}
async function evaluateRaycast(obj)
{
  var lookDirection = new THREE.Vector3(0,0,0.1);
    if(intersects[0].object.name.includes(obj))
    {
      plane.position.set(intersects[0].point.x,intersects[0].point.y+0.001,intersects[0].point.z)
      new TWEEN.Tween(gameScene.camera.position)
          .to({x:intersects[0].point.x,z:intersects[0].point.z},1000)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()

      new TWEEN.Tween(gameScene.orbit.target)
          .to({x:intersects[0].point.x+0.001,z:intersects[0].point.z+0.001},1000)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(()=>{gameScene.orbit.enabled = false})
          .onComplete(()=>{gameScene.orbit.enabled = true;gameScene.camera.getWorldDirection( lookDirection);
            gameScene.orbit.enableRotate = true;
              gameScene.orbit.target.copy( gameScene.camera.position ).add( lookDirection.multiplyScalar(2))})
           .start()
    }
}

_("play-video").addEventListener('pointerdown', function(e)
{
  if(e.button ==0)
 { _("loadingbtn").style.opacity=0
  setTimeout(() => {
    _("loadingbtn").style.display = "none";
  }, 1000);}
});

_('close').addEventListener('pointerdown', function(e) {
  if(e.button ==0)
  {document.querySelector('.card').style.display = 'none';
  _('loading').style.display = 'none';
  cartOpen=false}
});
const cartIcon = document.querySelector('.cartgame i');
  let value = 0;
document.querySelector(".foot").addEventListener('pointerdown', function(e){
  if(e.button ==0)
 { cartIcon.setAttribute('value', (++value).toString());
  const productName = this.parentNode.querySelector(".Product_Name").innerHTML
  AddRow(productName)}
  })

const cartgame = document.querySelector('.cartgame');
const list_Product = document.querySelector('.list_Product');
const list_container = document.querySelector('.list_container');

cartgame.addEventListener('pointerdown', function(e){if(e.button ==0){list_Product.style.right = "1%"}})
const order = document.querySelector('.order');
order.addEventListener('pointerdown', function(e){if(e.button ==0){list_Product.style.right = "-100%"}})
document.querySelector(".close_list").addEventListener('pointerdown', function(e){if(e.button ==0){list_Product.style.right = "-100%"}})

var basicPrice;
async function Row(productName)
{
    Valnumber = 0;
    const productRow = document.createElement("panel-row");
    const row = productRow.shadowRoot.querySelector('.row');
    list_container.insertBefore(productRow, list_container.firstChild);
    fetch("js/game/data.json")
    .then(response => response.json())
    .then(obj => {
      Object.keys(obj).forEach(product => {
        if (product === productName) {
          row.querySelector('.pic .number').innerHTML=(++Valnumber).toString()
          const productData = obj[product][0];
          Object.entries(productData).forEach(([prop, value]) => {
            switch (true) {
              case prop === "Collections":
                row.querySelector('.discription .collection').innerHTML = value;
                break;
              case prop === "Product_Name":
                row.querySelector('.discription .name').innerHTML = value;
                row.querySelector('.pic .thumb').src = "public/" + value + ".jpg";
                break;
                case prop === "Price":
                  row.querySelector('.price').innerHTML = value;
                  basicPrice = value
                  //SubTotal()
                  break;
                }
              });
        }
      });
    });
    
    row.querySelector('.remove').addEventListener('pointerdown',async function(event) {
      var currentNumber = Number(row.querySelector('.pic .number').innerHTML)
      if(currentNumber>0){
        row.querySelector('.pic .number').innerHTML=(--currentNumber).toString()
        cartIcon.setAttribute('value', (--value).toString());
        var currentPrice = Number(row.querySelector('.price').innerHTML)
        const updatedPrice =currentPrice - basicPrice
        row.querySelector('.price').innerHTML =updatedPrice.toString()
        setTimeout(() => {SubTotal()}, 100);
        setTimeout(() => {Total()}, 150);
      }
      if(currentNumber===0){
        let shadowRoot = event.target.getRootNode().host;
        shadowRoot.parentNode.removeChild(shadowRoot);
      }
      if(list_container.childNodes.length===0)
      {
        setTimeout(() => {
          list_Product.querySelector('.subtotal').innerHTML = "..."
          list_Product.querySelector('.total').innerHTML = "..."
        }, 150);
      }
    })
}
function sumTOTAL(ourArray) {
  let sum = 0;
  for (let i = 0; i < ourArray.length; i += 1) {sum += ourArray[i];}
  return sum;
}

async function SubTotal(){
  for (let i = 0; i < list_container.childNodes.length; i++) {
    const list_container_Elm = list_container.childNodes[i];
    const containerShadowRoot = list_container_Elm.shadowRoot;
    const row = containerShadowRoot.querySelector('.row');
    const Prices = Number(row.querySelector('.price').innerHTML)
    ListOfPrices.push(Prices)
    const result = ListOfPrices. slice(-list_container.childNodes.length);
    list_Product.querySelector('.subtotal').innerHTML =sumTOTAL(result).toString()
  }
}
async function Total(){
  const subtotal = Number(list_Product.querySelector('.subtotal').innerHTML)
  const Shipping = Number(list_Product.querySelector('.Shipping').innerHTML)
  list_Product.querySelector('.total').innerHTML = (subtotal+Shipping).toString()
}

async function AddRow(productName)
{
    let isRowFound = false;
    for (let i = 0; i < list_container.childNodes.length; i++) {
      const list_container_Elm = list_container.childNodes[i];
      const containerShadowRoot = list_container_Elm.shadowRoot;
      const row = containerShadowRoot.querySelector('.row');
      const RowName = row.querySelector('.discription .name').innerHTML;
      if (ListRowNames.includes(productName) && productName=== RowName ) {
        Valnumber = Number(row.querySelector('.pic .number').innerHTML)
        row.querySelector('.pic .number').innerHTML=(++Valnumber).toString()

        var multiplyNumber = Number(row.querySelector('.pic .number').innerHTML)
        const updatedPrice = basicPrice*multiplyNumber

        row.querySelector('.price').innerHTML =updatedPrice.toString()

        isRowFound = true;
        break;
      }
    }
    if (!isRowFound) {
      Row(productName);
      ListRowNames.push(productName)
    }
    setTimeout(() => {SubTotal()}, 100);
    setTimeout(() => {Total()}, 150);
}
const KEYS = {
  LEFT_ARROW: "ArrowLeft",
  UP_ARROW: "ArrowUp",
  RIGHT_ARROW: "ArrowRight",
  DOWN_ARROW: "ArrowDown"
};
const MOVEMENT_SPEED = 0.5;
const TWEEN_DURATION = 500;
const maxY = 1.5;
const minY = 0.4;

_("gameScene").addEventListener('wheel', onScroll);
function onScroll(event) {
  const delta = event.deltaY;
  if (delta > 0) {Move_back()} else {Move_up()}
}

function Move_up()
{
  const cameraDirection = new THREE.Vector3(0,0,0.1);
    gameScene.camera.getWorldDirection(cameraDirection);
    cameraDirection.multiplyScalar(MOVEMENT_SPEED);
    const newPosition = gameScene.camera.position.clone().add(cameraDirection);
    newPosition.y = THREE.MathUtils.clamp(newPosition.y, minY, maxY);
    new TWEEN.Tween(gameScene.camera.position)
    .to(newPosition, TWEEN_DURATION)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(()=>{gameScene.orbit.enabled = false})
    .onComplete(()=>{gameScene.orbit.enabled = true;gameScene.camera.getWorldDirection( cameraDirection);
    gameScene.orbit.enableRotate = true;
    gameScene.orbit.target.copy( gameScene.camera.position ).add( cameraDirection.multiplyScalar(2))})
    .start();
}
function Move_back()
{
  const cameraDirectionBackward = new THREE.Vector3(0,0,0.1);
  gameScene.camera.getWorldDirection(cameraDirectionBackward);
  cameraDirectionBackward.multiplyScalar(-1 * MOVEMENT_SPEED);
  const newPosition = gameScene.camera.position.clone().add(cameraDirectionBackward);
  newPosition.y = THREE.MathUtils.clamp(newPosition.y, minY, maxY);
  new TWEEN.Tween(gameScene.camera.position)
  .to(newPosition, TWEEN_DURATION)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onUpdate(()=>{gameScene.orbit.enabled = false})
    .onComplete(()=>{gameScene.orbit.enabled = true;gameScene.camera.getWorldDirection( cameraDirectionBackward);
    gameScene.orbit.enableRotate = true;
    gameScene.orbit.target.copy( gameScene.camera.position ).add( cameraDirectionBackward.multiplyScalar(2))})
  .start();
}

function Move_Left(){
    const cameraLeft = new THREE.Vector3(-1, 0, 0.1);
    cameraLeft.applyQuaternion(gameScene.camera.quaternion);
    cameraLeft.multiplyScalar(MOVEMENT_SPEED);
    const newPosition = gameScene.camera.position.clone().add(cameraLeft);
    newPosition.y = THREE.MathUtils.clamp(newPosition.y, minY, maxY);
    new TWEEN.Tween(gameScene.camera.position)
    .to(newPosition, TWEEN_DURATION)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(()=>{gameScene.orbit.enabled = false})
    .onComplete(()=>{gameScene.orbit.enabled = true;gameScene.camera.getWorldDirection( cameraLeft);
    gameScene.orbit.enableRotate = true;
    gameScene.orbit.target.copy( gameScene.camera.position ).add( cameraLeft.multiplyScalar(2))})
    .start();
}

function Move_Right()
{
    const cameraRight = new THREE.Vector3(1, 0, 0);
    cameraRight.applyQuaternion(gameScene.camera.quaternion);
    cameraRight.multiplyScalar(MOVEMENT_SPEED);
    const newPosition = gameScene.camera.position.clone().add(cameraRight);
    newPosition.y = THREE.MathUtils.clamp(newPosition.y, minY, maxY);
    new TWEEN.Tween(gameScene.camera.position)
    .to(newPosition, TWEEN_DURATION)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(()=>{gameScene.orbit.enabled = false})
    .onComplete(()=>{gameScene.orbit.enabled = true;gameScene.camera.getWorldDirection( cameraRight);
    gameScene.orbit.enableRotate = true;
    gameScene.orbit.target.copy( gameScene.camera.position ).add( cameraRight.multiplyScalar(2))})
    .start();
}

document.addEventListener("keydown", function(event) {
  switch (event.key) {
    case KEYS.UP_ARROW:
      Move_up()
      event.preventDefault();
      event.stopPropagation();
    break;
    case KEYS.LEFT_ARROW:
      Move_Left()
    break;
    case KEYS.DOWN_ARROW:
      Move_back()
      event.preventDefault();
      event.stopPropagation();
    break;
    case KEYS.RIGHT_ARROW:
      Move_Right()
    break;
  }
});

