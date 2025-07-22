// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true
});


// CURSOR EFFECT
var timeout = "";

var cursor_div = document.querySelector("#cursor");
function cursorMove(xScale, yScale){
    document.addEventListener("mousemove",(dets)=>{
        clearTimeout(timeout);
    // console.log(dets);
    cursor_div.style.transform = `translate(${dets.x-5}px,${dets.y-5}px) scale(${xScale},${yScale})`;
    timeout = setTimeout(() => {
         cursor_div.style.transform = `translate(${dets.x-5}px,${dets.y-5}px) scale(1,1)`;
    }, 100);
})
}

function circleChaptaKaro(){
    // define scale value

    var xPrev =0;
    var yPrev =0;

    window.addEventListener("mousemove",(dets)=>{
        // alert("chapta")
        // gsap.utils.clamp(Min_Value, Max_Value, Current_Value);
        // is current value is bigger than max_value then current_value will be set to max_value and vice versa.
        xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPrev);
        yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yPrev);
        // UPAR KE CODE MAI DIFFERENCE CALCULATE HO RAHA HAI, DIFFERENCE OF MOUSE START POINT AND MOUSE END POINT

        xPrev = dets.clientX;       //PREVIOUS/(START) VALUE OF CURSOR IN X AXIS
        yPrev = dets.clientY;
        cursorMove(xScale,yScale)
    })
}
circleChaptaKaro();

// cursorMove();


    // alert("loaded");
    document.addEventListener("DOMContentLoaded",()=>{

        // ***************PAGE 1
        gsap.to(".down-to-up",{
            // y:0,
            transform:"translateY(0%)",
            duration:1,
            ease:"sine.inOut"
        })

        gsap.to(".up-to-down-1",{
            // y:0,
            transform:"translateY(0%)",
            duration:1,
            ease:"sine.inOut",
            delay:0.5
        })

        gsap.to(".up-to-down-2",{
            // y:0,
            transform:"translateY(0%)",
            duration:1,
            ease:"sine.inOut",
            delay:0.6
        })

         gsap.to("#text-end",{
            opacity:1,
            duration:1,
            ease:"sine.inOut",
            delay:0.7
        })
        
        // ***************PAGE 2
        var li_list = document.querySelectorAll(".li-s");
        var li_imgs = document.querySelectorAll(".li-s img");
        // console.log(li_imgs);
        
        li_list.forEach((li_div,index)=>{
            li_div.addEventListener("mousemove",(dets)=>{
                console.log(dets);
                
                // alert("entered")
                cursor_div.style.height = "80px";
                cursor_div.style.width = "80px";
                cursor_div.style.opacity = 0.7;
                cursor_div.style.mixBlendMode = "normal";
                cursor_div.innerText = "VIEW";
                li_imgs[index].style.opacity = "1";
                li_imgs[index].style.zIndex = "10";
                // li_imgs[index].transform = `translate(${dets.x}px,${dets.y}px`;
                li_imgs[index].style.transform = `translate(${dets.x}px,${dets.y}px)`;
            })       
            li_div.addEventListener("mouseleave",()=>{
                // alert("entered")
                cursor_div.style.height = "10px";
                cursor_div.style.width = "10px";
                cursor_div.style.opacity = 1;
                cursor_div.style.mixBlendMode = "difference";
                cursor_div.innerText = "";
                li_imgs[index].style.opacity = "0";
                li_imgs[index].style.zIndex = "-1";
            })         
        })
        
    })
