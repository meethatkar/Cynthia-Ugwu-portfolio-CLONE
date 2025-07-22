// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true
});


// CURSOR EFFECT
var timeout = "";

var cursor_div = document.querySelector("#cursor");
function cursorMove(xScale, yScale) {
    document.addEventListener("mousemove", (dets) => {
        clearTimeout(timeout);
        // console.log(dets);
        cursor_div.style.transform = `translate(${dets.x - 5}px,${dets.y - 5}px) scale(${xScale},${yScale})`;
        timeout = setTimeout(() => {
            cursor_div.style.transform = `translate(${dets.x - 5}px,${dets.y - 5}px) scale(1,1)`;
        }, 50);
    })
}

function circleChaptaKaro() {
    // define scale value

    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener("mousemove", (dets) => {
        // alert("chapta")
        // gsap.utils.clamp(Min_Value, Max_Value, Current_Value);
        // is current value is bigger than max_value then current_value will be set to max_value and vice versa.
        xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev);
        yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yPrev);
        // UPAR KE CODE MAI DIFFERENCE CALCULATE HO RAHA HAI, DIFFERENCE OF MOUSE START POINT AND MOUSE END POINT

        xPrev = dets.clientX;       //PREVIOUS/(START) VALUE OF CURSOR IN X AXIS
        yPrev = dets.clientY;
        cursorMove(xScale, yScale)
    })
}
circleChaptaKaro();

// ***************PAGE 1
function page1Anim() {
    gsap.to(".down-to-up", {
        // y:0,
        transform: "translateY(0%)",
        duration: 1,
        ease: "sine.inOut"
    })

    gsap.to(".up-to-down-1", {
        // y:0,
        transform: "translateY(0%)",
        duration: 1,
        ease: "sine.inOut",
        delay: 0.5
    })

    gsap.to(".up-to-down-2", {
        // y:0,
        transform: "translateY(0%)",
        duration: 1,
        ease: "sine.inOut",
        delay: 0.6
    })

    gsap.to("#text-end", {
        opacity: 1,
        duration: 1,
        ease: "sine.inOut",
        delay: 0.7
    })
}

// ********PAGE 2 ANIM

/*
sab li element ko select karo, uske ke baad li elems par ek mousemove lagao, hab muosemove ho to ye karo ki mouse kaha par hai, jiska matlab ye hia ki mouse ki x and y position pata karo, ab mouse ki x, y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo and jaise jaise mouse tezt chale waise wasie roation bu text ha jaye
*/

function page2anim(){
     // ***************PAGE 2
    var li_list = document.querySelectorAll(".li-s");
    var li_imgs = document.querySelectorAll(".li-s img");
    // console.log(li_imgs);

    li_list.forEach((li_div, index) => {
        let imgDiv = li_div.querySelector("img");
        li_div.addEventListener("mousemove", (dets) => {
            var diff = dets.clientY-li_div.getBoundingClientRect().top;
            var halfHeight = li_div.getBoundingClientRect().height/2;
            // console.log(halfHeight);
            
            var img_halfWidth = li_imgs[index].getBoundingClientRect().width/2;
            console.log(img_halfWidth);
            

            // alert("entered")
            // cursor
            cursor_div.style.height = "80px";
            cursor_div.style.width = "80px";
            cursor_div.style.top = "-35px";
            cursor_div.style.left = "-35px";
            cursor_div.style.opacity = 0.7;
            cursor_div.style.mixBlendMode = "normal";
            cursor_div.innerText = "VIEW";

            // li
            li_div.style.zIndex = "1";

            // imgs
             gsap.to(imgDiv,{
                opacity:1,
                zIndex:10,
                scale:1,
                top: `${diff-30}px`,
                left:`${dets.clientX-30}px`
             })
            
        })
        li_div.addEventListener("mouseleave", () => {
            // alert("entered")
            // cusror
            cursor_div.style.height = "10px";
            cursor_div.style.width = "10px";
            cursor_div.style.opacity = 1;
            cursor_div.style.mixBlendMode = "difference";
            cursor_div.innerText = "";

            // li
            li_div.style.zIndex = "60";

            // img
            gsap.to(imgDiv,{
                opacity:0,
                zIndex:-1,
                scale:0.85,
             })
        })
    })
}

// alert("loaded");
document.addEventListener("DOMContentLoaded", () => {

    page1Anim();

   page2anim();

})
