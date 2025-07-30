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

        // timeout banaya hai, taki jab mouse hold ho jaye tab normal state mai aaa jaye. (nikal ke dekho, phir pata chalega kyu add kiya tha, [scale reamins paused])
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
sab li element ko select karo, uske ke baad li elems par ek mousemove lagao, ab muosemove ho to ye pata karo ki mouse kaha par hai, jiska matlab ye hia ki mouse ki x and y position pata karo, ab mouse ki x, y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo and jaise jaise mouse tezt chale waise wasie roation bhi tez ha jaye
*/

function page2anim(){
     // ***************PAGE 2
    var li_list = document.querySelectorAll(".li-s");

    li_list.forEach((li_div) => {
        let rotate = 0;
        let imgDiv = li_div.querySelector("img");

        function displayImg(dets){
            // var diff = dets.clientY-li_div.getBoundingClientRect().top;
            console.log(dets);
            var diff = dets.offsetY;
            
            var rotateDif = gsap.utils.clamp(-20,20,(dets.clientX-rotate));     /* difference between start point and end point will be stored */
            rotate = dets.clientX;
            console.log(rotateDif);
            
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
                rotate:rotateDif,
                top: `${diff-30}px`,
                left:`${dets.clientX-55}px`,
             })
        }

        function hideImg(dets){
            cursor_div.style.height = "10px";
            cursor_div.style.width = "10px";
            cursor_div.style.top = "0px";
            cursor_div.style.left = "0px";
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
        }

        li_div.addEventListener("mousemove", (dets) => {
            displayImg(dets)
        })

        li_div.addEventListener("wheel",(dets)=>{
            clearTimeout(imgTimeout);
            displayImg(dets);
            var imgTimeout = setTimeout(()=>{
                hideImg(dets);
            },1000);
        })


        li_div.addEventListener("mouseleave", (dets) => {
            // alert("entered")
            // cusror
            hideImg(dets);
        })
    })


}

var menu = document.querySelector("#menu");
var main = document.querySelector("main");
var circle = document.querySelector("#circle");
var mnCircles = document.querySelectorAll(".mnCircle");
var stripe = document.querySelectorAll(".stripe");

function menuAnim(){
    let active = 3;
    gsap.to(circle,{
        rotate:0,
        ease: Expo.easeInOut,
        // delay:0.5,
        duration:1.5
    })

    gsap.to(mnCircles[active-1],{
        opacity: 1
    })

    gsap.to(stripe[active-1],{
        opacity: 1
    })

    mnCircles.forEach((circle,index)=>{
        circle.addEventListener("click",()=>{
            gsap.to("#circle",{
                rotate: (3-(index+1))*10,
                duration:1.5,
                ease: Expo.easeInOut
            })

            greyout();

            gsap.to(circle,{
                opacity:1,
            })
            gsap.to(stripe[index],{
                opacity:1,
            })
        })
    })

    function greyout(){
        gsap.to(mnCircles,{
            opacity:0.5,
        })
        gsap.to(stripe,{
            opacity:0.5,
        })
    }
}

document.querySelector("#open-menu").addEventListener("click",()=>{
    gsap.to(menu,{
        opacity:1,
        zIndex:60,
        ease: "power3.inOut",
        duration:1
    })
    gsap.to(main,{
        opacity:0,
        zIndex:10,
        ease: "power3.inOut",
        // duration:0.5
    })
    menuAnim();
})

document.querySelector("#close-menu").addEventListener("click",()=>{
    gsap.to(menu,{
        opacity:0,
        zIndex:10,
        ease: "power3.inOut",
        duration:1
    })
    gsap.to(main,{
        opacity:1,
        zIndex:40,
        ease: "power3.inOut",
        // duration:0.5
    })
})


// alert("loaded");
document.addEventListener("DOMContentLoaded", () => {

    page1Anim();

   page2anim();
})
