// ========== DROPDOWN SOCIAL MOBILE =============
document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para o topo ao clicar no logo do header
  const logoLink = document.querySelector('.nav-logo a.logo');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  const socialDropdown = document.querySelector('.dropdown-social');
  const socialToggle = document.querySelector('.dropdown-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (socialDropdown && socialToggle) {
    socialToggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        socialDropdown.classList.toggle('open');
        return false;
      }
    }, { passive: false });
    // Fecha ao clicar fora
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && socialDropdown.classList.contains('open')) {
        if (!socialDropdown.contains(e.target)) {
          socialDropdown.classList.remove('open');
        }
      }
    });
    // Fecha dropdown e menu mobile ao clicar em um link de rede social
    document.querySelectorAll('.dropdown-menu-social a').forEach(link => {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            socialDropdown.classList.remove('open');
            if (navMenu) navMenu.classList.remove('active');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
          }, 200);
        }
      }, { passive: false });
    });
  }
});
// ==================== PREVENÇÃO DE FLASH DAS ANIMAÇÕES ====================
// Inicializa as animações assim que o ScrollReveal estiver disponível
document.addEventListener('DOMContentLoaded', () => {
  // FORÇA MÓVEIS PRIMEIRO - ANTES DE QUALQUER COISA
  if (window.innerWidth <= 768) {
    forceMobileFonts();
  }
  
  // Verifica a posição inicial do scroll para navbar
  const initialScrollY = window.scrollY;
  
  // Configura o menu mobile primeiro
  setupMobileMenu();
  
  // Inicializa o scroll reveal do título
  initHeroTitleReveal();
  
  // Força visibilidade no mobile imediatamente mas com animações rápidas
  if (window.innerWidth <= 768) {
    // No mobile, inicia ScrollReveal com delays muito menores
    setTimeout(() => {
      initScrollRevealMobile();
    }, 50);
  } else {
    // Só inicia animações em desktop
    setTimeout(() => {
      initScrollReveal(initialScrollY);
    }, 100);
  }
});

// ==================== FORÇA FONTES MÓVEIS ====================
function forceMobileFonts() {
  console.log('🔧 FORÇANDO FONTES MÓVEIS - Largura:', window.innerWidth);
  
  // Seleciona todos os títulos possíveis
  const titles = document.querySelectorAll('.title__left, .title__right, h1.title__left, h1.title__right, .hero-central .title__left, .hero-central .title__right');
  const texts = document.querySelectorAll('.text__left, .text__right, span.text__left, span.text__right, .hero-central .text__left, .hero-central .text__right');
  const msgs = document.querySelectorAll('.left__msg, .right__msg, h2.left__msg, h2.right__msg, .hero-central .left__msg, .hero-central .right__msg');
  
  console.log('📏 Elementos encontrados:', {
    titles: titles.length,
    texts: texts.length,
    msgs: msgs.length
  });
  
  // FORÇA TÍTULOS
  titles.forEach((el, index) => {
    el.style.setProperty('font-size', '3rem', 'important');
    el.style.setProperty('transform', 'none', 'important');
    el.style.setProperty('zoom', '1', 'important');
    console.log(`✅ Título ${index + 1} forçado para 3rem`);
  });
  
  // FORÇA TEXTOS
  texts.forEach((el, index) => {
    el.style.setProperty('font-size', '1.8rem', 'important');
    el.style.setProperty('transform', 'none', 'important');
    el.style.setProperty('zoom', '1', 'important');
    console.log(`✅ Texto ${index + 1} forçado para 1.8rem`);
  });
  
  // FORÇA MENSAGENS
  msgs.forEach((el, index) => {
    el.style.setProperty('font-size', '1.5rem', 'important');
    el.style.setProperty('transform', 'none', 'important');
    el.style.setProperty('zoom', '1', 'important');
    console.log(`✅ Mensagem ${index + 1} forçada para 1.5rem`);
  });
  
  // Verifica se funcionou após 1 segundo
  setTimeout(() => {
    titles.forEach((el, index) => {
      const computedStyle = window.getComputedStyle(el);
      const fontSize = computedStyle.fontSize;
      console.log(`🔍 Título ${index + 1} tamanho final: ${fontSize}`);
      
      // Se ainda estiver pequeno, força um pouco mais
      if (parseInt(fontSize) < 35) {
        console.log('⚠️ Ainda pequeno! Forçando 3.5rem');
        el.style.setProperty('font-size', '3.5rem', 'important');
      }
    });
  }, 1000);
}

// ==================== MENU MOBILE ====================
function setupMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');

  // Verifica se os elementos foram encontrados
  if (!mobileMenu || !navMenu) {
    console.error('Elementos do menu mobile não encontrados:', {
      mobileMenu: !!mobileMenu,
      navMenu: !!navMenu
    });
    return;
  }

  console.log('Menu mobile configurado com sucesso');

  // Remove qualquer listener anterior
  mobileMenu.removeEventListener('click', toggleMenu);
  
  // Adiciona o listener
  mobileMenu.addEventListener('click', toggleMenu);
  mobileMenu.addEventListener('touchstart', toggleMenu); // Para dispositivos touch

  function toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Menu clicado/tocado'); // Debug
    
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
      mobileMenu.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open'); // Remove classe do body
      console.log('Menu fechado - Classe menu-open removida do body');
    } else {
      mobileMenu.classList.add('active');
      navMenu.classList.add('active');
      document.body.classList.add('menu-open'); // Adiciona classe ao body
      console.log('Menu aberto - Classe menu-open adicionada ao body');
      console.log('Classes no body:', document.body.className);
    }
  }

  // Fecha o menu quando clica em um link, exceto links de redes sociais
  document.querySelectorAll('.nav__links a').forEach(link => {
    if (!link.closest('.dropdown-menu-social')) {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open'); // Remove classe do body
        console.log('Menu fechado via link');
      });
    }
  });

  // Fecha o menu quando clica fora dele
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open'); // Remove classe do body
    }
  });
}

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

// ==================== HERO TITLE REVEAL ====================
function initHeroTitleReveal() {
  const heroSection = document.querySelector('.hero-central');
  
  if (!heroSection) return;
  
  // Observador de interseção para detectar quando o hero entra na tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona a classe animate para iniciar as animações
        entry.target.classList.add('animate');
        
        // Remove o observador após a primeira ativação
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3, // Ativa quando 30% do elemento está visível
    rootMargin: '0px 0px -50px 0px' // Margem inferior para ativar um pouco antes
  });
  
  // Observa o hero section
  observer.observe(heroSection);
  
  // Para dispositivos que já estão no topo da página
  if (window.scrollY === 0) {
    setTimeout(() => {
      heroSection.classList.add('animate');
    }, 300); // Delay inicial para carregamento da página
  }
}

// ==================== SCROLL REVEAL MOBILE ====================
function initScrollRevealMobile() {
  // Configurações do ScrollReveal para mobile - mais parecido com desktop
  const scrollRevealOption = {
    distance: '50px', // Igual ao desktop
    origin: 'bottom',
    duration: 1000, // Igual ao desktop
  };

  // ==================== ANIMAÇÃO NAVBAR MOBILE (mais simples) ====================
  
  // Torna a navbar visível para manipulação
  const nav = document.querySelector('nav');
  const logo = document.querySelector('.nav-logo');
  const links = document.querySelector('.nav__links');
  
  if (nav && logo && links) {
    nav.style.visibility = 'visible';
    
    // Animação mais direta no mobile
    setTimeout(() => {
      // Logo aparece
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0)';
      logo.style.transition = 'all 0.6s ease-out';
      
      // Navbar aparece
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.transform = 'translateY(0)';
      nav.style.transition = 'all 0.6s ease-out';
    }, 200);
    
    // Links aparecem logo depois
    setTimeout(() => {
      links.style.opacity = '1';
      links.style.transform = 'translateY(0)';
      links.style.transition = 'all 0.4s ease-out';
    }, 600);
  }

  // Torna os outros elementos visíveis para o ScrollReveal funcionar
  const elementsToReveal = document.querySelectorAll('.title__left, .title__right, .text__left, .text__right, .left__msg, .right__msg, .saiba');
  elementsToReveal.forEach(el => {
    el.style.visibility = 'visible';
  });

  // Animações mobile - parecidas com desktop mas com delays menores
  ScrollReveal().reveal(".container .title__left, .text__left", {
    ...scrollRevealOption,
    origin: 'right',
    delay: 500 // Era 1000 no desktop
  });

  ScrollReveal().reveal(".container .title__right, .text__right", {
    ...scrollRevealOption,
    origin: 'left',
    delay: 500 // Era 1000 no desktop
  });

  ScrollReveal().reveal(".container .saiba", {
    duration: 1000, // Igual ao desktop
    delay: 1200 // Era 2500 no desktop
  });

  ScrollReveal().reveal(".container .left__msg", {
    ...scrollRevealOption,
    origin: 'right',
    delay: 700 // Era 1500 no desktop
  });

  ScrollReveal().reveal(".container .right__msg", {
    ...scrollRevealOption,
    origin: 'left',
    delay: 700 // Era 1500 no desktop
  });
}

// ==================== SCROLL REVEAL DESKTOP ====================
function initScrollReveal(initialScrollY = 0) {
  // Configurações do ScrollReveal
  const scrollRevealOption = {
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
  };

  // ==================== ANIMAÇÃO SEQUENCIAL DA NAVBAR ====================
  // Sequência: Logo aparece no centro → move para posição → fundo se expande → links aparecem
  
  const nav = document.querySelector('nav');
  const logo = document.querySelector('.nav-logo');
  const links = document.querySelector('.nav__links');
  
  if (nav && logo && links) {
    // Torna a navbar visível para manipulação
    nav.style.visibility = 'visible';
    
    // FASE 1: Logo aparece no centro da tela
    setTimeout(() => {
      logo.style.opacity = '1';
      logo.style.transform = 'translate(-50%, -50%) scale(1.2)';
      logo.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      logo.style.zIndex = '2000';
    }, 500);
    
    // FASE 2: Logo se move para posição final + navbar se expande
    setTimeout(() => {
      // Move logo para posição final na navbar
      logo.style.position = 'absolute';
      logo.style.top = '50%';
      logo.style.left = '2rem';
      logo.style.transform = 'translateY(-50%) scale(1)';
      logo.style.zIndex = '1001';
      
      // Expande o fundo da navbar de forma horizontal
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.borderBottom = '1px solid rgba(0, 123, 255, 0.1)';
      nav.style.boxShadow = '0 4px 20px rgba(0, 123, 255, 0.1)';
      nav.style.transform = 'scaleX(1)';
      nav.style.transformOrigin = 'center';
      nav.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
    }, 1300);
    
    // FASE 3: Links aparecem suavemente
    setTimeout(() => {
      links.style.opacity = '1';
      links.style.transform = 'translateY(0)';
      links.style.transition = 'all 0.8s ease-out';
    }, 2200);
  }

  // Torna os outros elementos visíveis para o ScrollReveal dos títulos
  const elementsToReveal = document.querySelectorAll('.title__left, .title__right, .text__left, .text__right, .left__msg, .right__msg, .saiba');
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
    const navElement = document.querySelector('nav');
    if (navElement) {
      navElement.style.visibility = 'visible';
      navElement.style.opacity = '1';
      navElement.style.transform = 'translateY(0) scale(1)';
    }
    
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

  // Animações antigas da navbar removidas - usando nova animação unificada
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

// ==================== FORÇAMENTO CONTÍNUO PARA MOBILE ====================
if (window.innerWidth <= 768) {
  // Força novamente a cada 2 segundos por 10 segundos
  let attempts = 0;
  const maxAttempts = 5;
  
  const forceInterval = setInterval(() => {
    console.log(`🔄 Tentativa ${attempts + 1} de forçar fontes móveis`);
    forceMobileFonts();
    
    attempts++;
    if (attempts >= maxAttempts) {
      clearInterval(forceInterval);
      console.log('🏁 Finalizou tentativas de força');
    }
  }, 2000);
}

// Event listener para redimensionamento
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    console.log('📱 Tela redimensionada para mobile, forçando fontes...');
    forceMobileFonts();
  }
});
