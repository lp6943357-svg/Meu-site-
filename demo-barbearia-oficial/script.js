(function(){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header=document.getElementById('header');
  const toggle=document.getElementById('navToggle');
  const nav=document.getElementById('nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');
    }));
  }
  const updateHeader=()=>{if(header)header.classList.toggle('scrolled',window.scrollY>24)};
  window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  if(reduced){document.documentElement.classList.add('reduce-motion');return}
  if(!window.gsap||!window.ScrollTrigger)return;
  document.documentElement.classList.add('js-motion');
  gsap.registerPlugin(ScrollTrigger);
  gsap.timeline({defaults:{ease:'power3.out'}})
    .to('.hero-eyebrow',{y:0,opacity:1,duration:.7},.15)
    .to('.hero-title',{y:0,opacity:1,duration:1},.28)
    .to('.hero-description',{y:0,opacity:1,duration:.7},.55)
    .to('.hero-actions',{y:0,opacity:1,duration:.7},.68);
  gsap.utils.toArray('.reveal').forEach(el=>{
    if(el.closest('.hero'))return;
    gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
  });
  gsap.utils.toArray('.parallax').forEach(el=>{
    const speed=Number(el.dataset.speed||.08);
    if(window.innerWidth<700&&speed>.1)return;
    gsap.fromTo(el,{yPercent:-speed*45},{yPercent:speed*45,ease:'none',scrollTrigger:{trigger:el.closest('section')||el,start:'top bottom',end:'bottom top',scrub:true}});
  });
  gsap.fromTo('.hero-image',{scale:1.13},{scale:1.03,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.fromTo('.hero-index',{y:-18,opacity:.4},{y:18,opacity:1,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  ScrollTrigger.refresh();
  window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
})();