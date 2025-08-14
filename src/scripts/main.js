// ==================== PREVENÇÃO DE FLASH DAS ANIMAÇÕES ====================
// Inicializa as animações assim que o ScrollReveal estiver disponível
document.addEventListener('DOMContentLoaded', () => {
  // Verifica a posição inicial do scroll
  const initialScrollY = window.scrollY;
  
  // Aplica estado inicial da navbar se necessário
  const nav = document.querySelector('nav');
  if (initialScrollY > 50) {
    nav.classList.add('scrolled');
  }
  
  // Força visibilidade no mobile imediatamente
  if (window.innerWidth <= 768) {
    const allElements = document.querySelectorAll('.title__left, .title__right, .text__left, .text__right, .left__msg, .right__msg, .saiba, .nav__left, .nav__right, .nav-logo');
    allElements.forEach(el => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.display = '';
    });
  } else {
    // Só inicia animações em desktop
    setTimeout(() => {
      initScrollReveal(initialScrollY);
    }, 100);
  }
});

// ==================== MENU MOBILE ====================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

// Toggle do menu mobile
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fecha o menu quando clica em um link
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Fecha o menu quando clica fora dele
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ==================== NAVBAR FIXA ====================
// Controla o fundo da navbar ao rolar a tela
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const scrolled = window.scrollY > 50;
  
  if (scrolled) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ==================== SCROLL REVEAL ====================
function initScrollReveal(initialScrollY = 0) {
  // Esta função só executa em desktop (já verificado antes da chamada)
  // Configurações do ScrollReveal
  const scrollRevealOption = {
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
  };

  // Torna os elementos visíveis para o ScrollReveal funcionar
  const elementsToReveal = document.querySelectorAll('.title__left, .title__right, .text__left, .text__right, .left__msg, .right__msg, .saiba, .nav__left, .nav__right, .nav-logo');
  elementsToReveal.forEach(el => {
    el.style.visibility = 'visible';
  });

  // Se a página foi carregada já scrollada, não executa animação da navbar
  const isPageScrolled = initialScrollY > 50;
  
  if (isPageScrolled) {
    // Se a página já está scrollada, aplica estado scrolled imediatamente
    const nav = document.querySelector('nav');
    nav.classList.add('scrolled');
    
    // Torna elementos da navbar imediatamente visíveis sem animação
    const navElements = document.querySelectorAll('.nav__left, .nav__right, .nav-logo');
    navElements.forEach(el => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    
    // Aplica estado final do logo imediatamente
    const logo = document.querySelector('.logo-mundial');
    logo.style.opacity = '1';
    logo.style.transform = 'scale(1) translateY(0)';
  }

  // Animações iniciais
  ScrollReveal().reveal(".container .title__left, .text__left", {
    ...scrollRevealOption,
    origin: 'right',
    delay: 1000
  });

  ScrollReveal().reveal(".container .title__right, .text__right", {
    ...scrollRevealOption,
    origin: 'left',
    delay: 1000
  });

  ScrollReveal().reveal(".container .saiba", {
    duration: 1000,
    delay: 2500
  });

  ScrollReveal().reveal(".container .left__msg", {
    ...scrollRevealOption,
    origin: 'right',
    delay: 1500
  });

  ScrollReveal().reveal(".container .right__msg", {
    ...scrollRevealOption,
    origin: 'left',
    delay: 1500
  });

  // Só executa animações da navbar se a página não estiver scrollada E for desktop
  if (!isPageScrolled && window.innerWidth > 768) {
    ScrollReveal().reveal("nav .nav-logo",{
      ...scrollRevealOption,
      origin: 'bottom',
      duration: 1000,
      delay: 1000
    });

    ScrollReveal().reveal("nav .nav__left",{
      ...scrollRevealOption,
      origin: 'bottom',
      duration: 1000,
      delay: 1200
    });

    ScrollReveal().reveal("nav .nav__right",{
      ...scrollRevealOption,
      origin: 'bottom',
      duration: 1000,
      delay: 1500
    });
  }
}
// Navegação suave com animação
document.querySelectorAll('a[href^="#"], .saiba').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Animação personalizada
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: targetElement,
        offsetY: 80
      },
      ease: "power2.inOut"
    });
    
    // Ativa a animação da seção
    setTimeout(() => {
      targetElement.classList.add('active');
    }, 500);
  });
});

// Observador de interseção para ativar seções quando visíveis
// (Removido para evitar duplicidade com o observer melhorado abaixo)

// Configurações do ScrollReveal (mantenha as existentes)
// ...

// Navegação suave com GSAP
document.querySelectorAll('a[href^="#"], .saiba').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: targetElement,
        offsetY: 80
      },
      ease: "power2.inOut",
      onComplete: () => {
        // Ativa a animação da seção
        targetElement.classList.add('active');
        // Ativa o botão de scroll
        updateScrollButton();
      }
    });
  });
});

// Observador de interseção melhorado
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      updateScrollButton();
    } else {
      // Mantém as animações visíveis mesmo ao scrollar para cima
      if (window.scrollY < entry.target.offsetTop) {
        entry.target.classList.remove('active');
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// ==================== GARANTIA PARA MOBILE ====================
// Verificação adicional para garantir que mobile funcione
window.addEventListener('load', () => {
  if (window.innerWidth <= 768) {
    // Força todos os elementos principais a ficarem visíveis no mobile
    const criticalElements = document.querySelectorAll('.title__left, .title__right, .text__left, .text__right, .left__msg, .right__msg, .saiba, .nav__left, .nav__right, .nav-logo');
    
    criticalElements.forEach(el => {
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('transform', 'none', 'important');
      el.style.setProperty('display', '', 'important');
    });
  }
});

