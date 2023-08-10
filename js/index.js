let isMobile = false;
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
var currentURL = window.location.href;
var pathname = new URL(currentURL).pathname;
var htmlPageName = pathname.substring(pathname.lastIndexOf("/") + 1).split(".")[0];

switch (htmlPageName) {
  case "industries":
    let industriesVideo = document.querySelector(".industriesVideo")
    let PivotPainter_vid = document.querySelector(".PivotPainterSRC")
    let ArtGallery_vid = document.querySelector(".ArtGallerySRC")
    let TLI_vid = document.querySelector(".TLISRC")
    let Fashion_vid = document.querySelector(".FashionSRC")
    if(isMobile)
    {
      PivotPainter_vid.src = "images/Pivot-Painter_mob.webm"
      document.getElementById("PivotPainter_poster").poster = "images/PivotPainter_mob.webp"

      ArtGallery_vid.src = "images/ArtGallery_mob.webm"
      document.getElementById("ArtGallery_poster").poster = "images/ArtGallery_mob.webp"

      TLI_vid.src = "images/TLI-3D_mob.webm"
      document.getElementById("TLI_poster").poster = "images/TLI-3d_mob.webp"

      Fashion_vid.src = "images/Fashion_CLIP_mob.webm"
      document.getElementById("Fashion_poster").poster = "images/Fashion_CLIP_mob.webp"

      industriesVideo.load();
    }
    else
    {
      PivotPainter_vid.src = "images/Pivot-Painter.webm"
      document.getElementById("PivotPainter_poster").poster = "images/PivotPainter.webp"

      ArtGallery_vid.src = "images/ArtGallery.webm"
      document.getElementById("ArtGallery_poster").poster = "images/ArtGallery.webp"

      TLI_vid.src = "images/TLI-3D.webm"
      document.getElementById("TLI_poster").poster = "images/TLI-3d.webp"

      Fashion_vid.src = "images/Fashion_CLIP.webm"
      document.getElementById("Fashion_poster").poster = "images/Fashion_CLIP.webp"
    }
    
    break;
    case "our_platform":
      let ourplatformvideo = document.querySelector(".ourplatformvideo")
      let Platform_vid = document.querySelector(".Platform_vidSRC")
      if(isMobile)
      {
        Platform_vid.src ="images/built-in-asset-library_Trim_mob.webm"
        ourplatformvideo.load();
      }
      else
      {
        Platform_vid.src ="images/built-in-asset-library_Trim.webm"
      }
      
      break;
}


window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  var myimg = document.getElementById("logoimg");
  var x = document.getElementById("resnav");
  if (x.style.display == "none") {
    nav.classList.toggle("sticky", window.scrollY > 200);
  }
  // if (window.scrollY > 200) {
  //   myimg.src = "./images/mocartlogoblack.png";
  // } else if (window.scrollY < 200) {
  //   if (x.style.display == "none") {
  //     myimg.src = "./images/mocartlogo.png";
  //   }
  // }
});

let isFunctionExecuted = false;
const counter = document.getElementById("counter");
window.addEventListener("scroll", function () {
  if (counter) {
    const rect = counter.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight) {
      if (!isFunctionExecuted) {
        counting();
        isFunctionExecuted = true;
      }
    } else {
      isFunctionExecuted = false;
    }
  }
});

// counter function
const counting = () => {
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 2000;
  valueDisplays.forEach((val) => {
    let startValue = 0;
    let endValue = parseInt(val.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      startValue += 1;
      val.textContent = startValue;
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
};

// mission side bar function
//window.addEventListener("scroll", function(event) {preventScroll(event);}, { passive: false });
//window.addEventListener("wheel", function(event) {preventScroll(event);}, { passive: false });
let wheel = false
let previousScrollPosition =
  window.scrollY || document.documentElement.scrollTop;
let wheelCounter = 0;
function preventScroll(event) {
  const div = document.querySelector(".ourMission");
  const rect = div.getBoundingClientRect();
  const currentScrollPosition =
    window.scrollY || document.documentElement.scrollTop;

  if (currentScrollPosition > previousScrollPosition) {
    if (
      rect.bottom >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
      if (wheelCounter < 3) {
        if (wheel === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
      if (wheelCounter === 0) {
        side("inovation");
        console.log("inovation");
      } else if (wheelCounter === 1) {
        side("empoyer");
        console.log("empoyer");
      } else if (wheelCounter === 2) {
        wheel = true
        side("experiences");
        console.log("experiences");
      }
      wheelCounter = (wheelCounter + 1) % 3;
      return false;
    }
  } else {
    wheel = false
  }
  //  else {
  //   if (rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
  //     console.log("Scrolling up");
  //     if (wheelCounter < 3) {
  //       if(wheel===false)
  //       {
  //         event.preventDefault();
  //         event.stopPropagation();
  //       }
  //     }else{ wheel=false}
  //     if (wheelCounter === 0) {
  //       side("inovation");
  //     } else if (wheelCounter === 1) {
  //       side("empoyer");
  //     } else if (wheelCounter === 2) {
  //       wheel=true
  //       side("experiences");
  //     }

  //     wheelCounter = (wheelCounter + 1) % 3;
  //     return false;
  //   }
  // }
  previousScrollPosition = currentScrollPosition;
}

window.side = (keyword) => {
  const els = document.getElementsByClassName("text1");
  const els2 = document.getElementsByClassName("text2");
  const els3 = document.getElementsByClassName("text3");

  const emp = document.getElementById("Empower");
  const ex = document.getElementById("Experiences");
  const ino = document.getElementById("inovation");
  switch (keyword) {
    case "inovation":
      ino.style.borderBottom = "1.5px solid white"
      ex.style.borderBottom = "none"
      emp.style.borderBottom = "none"
  
      for (const el of els) {
        el.style.display = "none";
      }
      for (const el2 of els2) {
        el2.style.display = "none";
      }
      for (const el3 of els3) {
        el3.style.display = "block";
      }
      break;
    case "empoyer":
    
    ino.style.borderBottom = "none"
    ex.style.borderBottom = "none"
    emp.style.borderBottom = "1.5px solid white"
      for (const el of els) {
        el.style.display = "block";
      }
      for (const el2 of els2) {
        el2.style.display = "none";
      }
      for (const el3 of els3) {
        el3.style.display = "none";
      }
      break;
    case "experiences":
      ino.style.borderBottom = "none"
      ex.style.borderBottom = "1.5px solid white"
      emp.style.borderBottom = "none"

      for (const el of els) {
        el.style.display = "none";
      }
      for (const el2 of els2) {
        el2.style.display = "block";
      }
      for (const el3 of els3) {
        el3.style.display = "none";
      }
  }
};

window.showpopup = (arg) => {
  const el = document.getElementById("popupparent");
  var x = document.getElementsByTagName("BODY")[0];
  x.style.overflowY = "hidden"
  var title = document.querySelector(".popup_title");
  switch (arg) {
    case "BookADemo":
      title.innerHTML = "Book A Demo"
      break;
    case "contactUS":
      title.innerHTML = "Contact us"
      break;
  }
  el.style.opacity = "1";
  el.style.display = "block";
};

window.hidepopup = () => {
  const el = document.getElementById("popupparent");
  var x = document.getElementsByTagName("BODY")[0];
  var form = document.getElementById('emailForm');
  el.style.opacity = "1";
  el.style.display = "none";
  x.style.overflowY = "scroll"

  if (form) {
    form.reset();
  }

};
// function togglenav() {
//   var x = document.getElementById("resnav");
//   var nav = document.querySelector("nav");
//     var myimg = document.getElementById("logoimg")
//   nav.classList.add("sticky")
//   if (x.style.display == "none") {
//     x.style.display = "flex";
//   } else if (x.style.display == "flex") {
//     x.style.display = "none";
//   }
// }
function togglenav() {
  var x = document.getElementById("resnav");
  var nav = document.querySelector("nav");
  var myimg = document.getElementById("logoimg");
  var h1 = document.getElementById("hamburger1");
  var h2 = document.getElementById("hamburger2");
  var h3 = document.getElementById("hamburger3");
  var h = document.getElementById("hamburger")
  nav.classList.add("sticky");
  if (x.style.display == "none") {
    x.style.display = "flex";
    //myimg.src = "./images/mocartlogoblack.png";
    h2.style.display = "none"
    h1.style.transform = "rotate(45deg)"
    h3.style.transform = "rotate(-45deg)"
    h.style.height = "auto"

  } else if (x.style.display == "flex") {
    x.style.display = "none";
    nav.classList.remove("sticky");
    //myimg.src = "./images/mocartlogo.png";
    h1.style.transform = "rotate(0deg)"
    h3.style.transform = "rotate(0deg)"
    h2.style.display = "block"

    h.style.height = "30px"
  }
}
const ContactUs = document.getElementById("contactEL");
ContactUs.addEventListener(
  "pointerdown",
  function () {
    showpopup(this.dataset.title);
  },
  false
);
ContactUs.addEventListener(
  "touchend",
  function (e) {
    showpopup(this.dataset.title);
  },
  false
);


window.addEventListener('load', function () {

  var loadingElement = document.querySelector('#loadingpage');
  var x = document.getElementsByTagName("BODY")[0];


  if (loadingElement) {
    loadingElement.style.display = 'none';
    x.style.overflowY = "scroll"
  }
  
});

const videos = document.querySelectorAll('.industriesVideo');
let currentlyPlayingVideo = null;
videos.forEach(video => {
  if (isMobile) {
    video.addEventListener('pointerdown', () => {
      if (currentlyPlayingVideo) {currentlyPlayingVideo.pause();}
      video.play();
      currentlyPlayingVideo = video;
    });
  } else {
    video.addEventListener('mouseenter', () => {video.play();});
    video.addEventListener('mouseleave', () => {video.pause();});
  }
});


$(document).ready(function () {
  // Check if the element with id 'emailForm' exists
  if ($('#emailForm').length) {
    $('#emailForm').submit(function (e) {
      e.preventDefault(); // Prevent the form from submitting normally

      var to = $('#to').val();
      var from = $('#fname').val();
      var cname = $('#cname').val();
      var email = $('#email').val();
      var message = $('#msg').val();

      // Send the data to the PHP script for sending email
      $.ajax({
        url: 'send_email.php',
        type: 'POST',
        data: {
          to: to,
          from: from,
          cname: cname,
          email: email,
          message: message
        },
        success: function (response) {
          if (response === "success") {
            window.hidepopup(); // Call the hidepopup function when the email is successfully sent
          }
          // Alert or handle other responses if needed
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
        }
      });
    });
  }
});








