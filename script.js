const navbar=document.querySelector(".navbar");
const menuToggle=document.querySelector(".menu-toggle");
const navMenu=document.querySelector(".nav-menu");
const navLinks=document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll",()=>{
    navbar?.classList.toggle("scrolled",window.scrollY>30);
});

menuToggle?.addEventListener("click",()=>{
    navMenu?.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

navLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        navMenu?.classList.remove("active");
        menuToggle?.classList.remove("active");
    });
});

const revealElements=document.querySelectorAll(".reveal");

if("IntersectionObserver" in window){
    const observer=new IntersectionObserver((entries,obs)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    },{threshold:.12});

    revealElements.forEach(element=>observer.observe(element));
}else{
    revealElements.forEach(element=>element.classList.add("active"));
}

const sections=document.querySelectorAll("section[id]");

window.addEventListener("scroll",()=>{
    let current="";

    sections.forEach(section=>{
        if(window.scrollY>=section.offsetTop-150){
            current=section.id;
        }
    });

    navLinks.forEach(link=>{
        link.classList.toggle(
            "active",
            link.getAttribute("href")===`#${current}`
        );
    });
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener("click",event=>{
        const target=document.querySelector(link.getAttribute("href"));

        if(target){
            event.preventDefault();
            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });
        }
    });
});
