/* ============================================================
   script.js — Anime.js animations + full translation system
   ============================================================ */

/* ── 1. TOAST ── */
const toastStyles = document.createElement('style');
toastStyles.textContent = `.welcome-toast{position:fixed;bottom:1.75rem;left:1.75rem;z-index:9000;background:rgba(10,10,15,.88);border:1px solid rgba(255,45,117,.25);border-radius:14px;padding:.9rem 1.25rem;backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.04) inset;max-width:280px;opacity:0}.welcome-toast.toast-visible{opacity:1}.toast-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#ff2d75;box-shadow:0 0 8px #ff2d75;animation:pulseDot 1.5s ease-in-out infinite;margin-right:8px;vertical-align:middle}@keyframes pulseDot{0%,100%{box-shadow:0 0 4px #ff2d75}50%{box-shadow:0 0 12px #ff2d75,0 0 24px rgba(255,45,117,.3)}}.toast-title{font-family:'Orbitron',sans-serif;font-size:.72rem;font-weight:700;color:#f0f0f5;letter-spacing:.08em;display:block;margin-bottom:4px}.toast-body{font-size:.75rem;color:#8a8f9a;line-height:1.5}`;
document.head.appendChild(toastStyles);
const toast = document.createElement('div');
toast.className = 'welcome-toast';
toast.innerHTML = '<span class="toast-title"><span class="toast-dot"></span><span class="t-toast-title">Modulo cargado</span></span><span class="toast-body t-toast-body">Mantenimiento y Aseguramiento de Sistemas Informaticos</span>';
document.body.appendChild(toast);

/* ── 2. PARTICLES ── */
const hero = document.querySelector('.hero');
if (hero) {
  const ps3 = document.createElement('style');
  ps3.textContent = `.particles-container{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}.particle{position:absolute;border-radius:50%;background:rgba(255,45,117,.55);animation:floatParticle linear infinite;will-change:transform,opacity}@keyframes floatParticle{0%{transform:translateY(0) scale(1);opacity:0}10%{opacity:1}90%{opacity:.5}100%{transform:translateY(-120vh) scale(.5);opacity:0}}`;
  document.head.appendChild(ps3);
  const c = document.createElement('div'); c.className = 'particles-container'; hero.appendChild(c);
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div'); p.className = 'particle';
    const s = Math.random() * 3 + 2;
    const colors = ['rgba(255,45,117,.55)', 'rgba(0,240,255,.45)', 'rgba(168,85,247,.45)', 'rgba(251,191,36,.35)'];
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;bottom:-10px;animation-duration:${Math.random()*12+8}s;animation-delay:-${Math.random()*15}s;background:${colors[i%4]};box-shadow:0 0 ${s*2}px ${colors[i%4]}`;
    c.appendChild(p);
  }
}

/* ── 3. BUSQUEDA ── */
const overlay = document.createElement('div'); overlay.className = 'search-overlay';
const searchPanel = document.createElement('div'); searchPanel.className = 'search-panel';
searchPanel.innerHTML = '<button class="search-close" aria-label="Cerrar busqueda">&#10005;</button><span class="search-label t-search-label">Buscar en el modulo</span><input type="text" id="search-input" class="t-search-placeholder" placeholder="Escribe un tema: ISO, ITIL, preventivo..." autocomplete="off" /><div class="search-results" id="search-results"></div>';
const searchTrigger = document.createElement('button'); searchTrigger.className = 'search-trigger';
searchTrigger.setAttribute('aria-label', 'Abrir busqueda'); searchTrigger.innerHTML = '&#9906;';
document.body.appendChild(overlay); document.body.appendChild(searchPanel); document.body.appendChild(searchTrigger);

function getSearchEls() {
  return {
    input: document.getElementById('search-input'),
    results: document.getElementById('search-results'),
    close: searchPanel.querySelector('.search-close')
  };
}
let allSections = Array.from(document.querySelectorAll('section[id]'));

function openSearch() {
  searchPanel.classList.add('open'); overlay.classList.add('open');
  const s = getSearchEls();
  if (s.input) requestAnimationFrame(() => s.input.focus());
  renderResults('');
}
function closeSearch() {
  searchPanel.classList.remove('open'); overlay.classList.remove('open');
  const s = getSearchEls();
  if (s.input) s.input.value = '';
  if (s.results) s.results.innerHTML = '';
}
function renderResults(q) {
  const s = getSearchEls();
  if (!s.results) return;
  s.results.innerHTML = '';
  allSections = Array.from(document.querySelectorAll('section[id]'));
  const f = allSections.filter(sec => { const t = sec.querySelector('h2')?.textContent||''; const x = sec.textContent||''; return t.toLowerCase().includes(q.toLowerCase())||x.toLowerCase().includes(q.toLowerCase()); });
  if (!f.length) { s.results.innerHTML = '<p style="color:var(--grey-400);font-size:0.85rem;padding:0.5rem 0;" class="t-no-results">Sin resultados para esa busqueda.</p>'; return; }
  f.forEach(sec => { const t = sec.querySelector('h2')?.textContent||sec.id; const it = document.createElement('div'); it.className = 'search-result-item'; it.textContent = t; it.addEventListener('click', () => { closeSearch(); sec.scrollIntoView({behavior:'smooth',block:'start'}); }); s.results.appendChild(it); });
}
searchTrigger.addEventListener('click', openSearch);
overlay.addEventListener('click', closeSearch);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

/* ── 4. BACK TO TOP ── */
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', e => { e.preventDefault(); document.getElementById('inicio')?.scrollIntoView({behavior:'smooth'}); });
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  });
}


/* ============================================================
   5. ANIME.JS ANIMATIONS
   ============================================================ */

function initAnimations() {
  if (typeof anime === 'undefined') return;

  /* ── Hero entrance ── */
  const heroTimeline = anime.timeline({ easing: 'easeOutExpo' });
  heroTimeline
    .add({ targets: '.hero-label[data-anime="hero"]', opacity: [0, 1], translateY: [30, 0], duration: 800 })
    .add({ targets: '.hero-title[data-anime="hero"]', opacity: [0, 1], translateY: [40, 0], duration: 1000 }, '-=500')
    .add({ targets: '.hero-text[data-anime="hero"]', opacity: [0, 1], translateY: [30, 0], duration: 800 }, '-=600')
    .add({ targets: '.btn-primary[data-anime="hero"]', opacity: [0, 1], translateY: [20, 0], scale: [0.95, 1], duration: 700 }, '-=500');

  /* ── Toast entrance ── */
  anime({ targets: toast, opacity: [0, 1], translateY: [20, 0], duration: 600, delay: 800, easing: 'easeOutExpo',
    complete: () => { toast.classList.add('toast-visible'); }
  });
  anime({ targets: toast, opacity: 0, translateY: [0, 20], duration: 400, delay: 5000, easing: 'easeInExpo',
    complete: () => { toast.remove(); }
  });

  /* ── Scroll-triggered reveals ── */
  setupScrollReveal();
}

function setupScrollReveal() {
  if (typeof anime === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const type = el.getAttribute('data-anime');

        if (type === 'card') {
          anime({ targets: el, opacity: [0, 1], translateY: [40, 0], scale: [0.96, 1], duration: 700, easing: 'easeOutExpo' });
        } else if (type === 'step') {
          anime({ targets: el, opacity: [0, 1], translateX: [-30, 0], duration: 700, easing: 'easeOutExpo' });
        } else if (type === 'iso') {
          anime({ targets: el, opacity: [0, 1], translateY: [30, 0], rotateY: [8, 0], duration: 800, easing: 'easeOutExpo' });
        } else {
          anime({ targets: el, opacity: [0, 1], translateY: [30, 0], duration: 700, easing: 'easeOutExpo' });
        }

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-anime]').forEach(el => {
    if (el.hasAttribute('data-anime') && el.getAttribute('data-anime') !== 'hero') {
      observer.observe(el);
    }
  });

  /* ── Generic section reveals for elements without data-anime ── */
  const genericObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({ targets: entry.target, opacity: [0, 1], translateY: [25, 0], duration: 600, easing: 'easeOutExpo' });
        genericObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.text-block, .highlight-box, .checklist-box, .table-wrapper, .conclusion-content, .section-header').forEach(el => {
    el.style.opacity = '0';
    genericObserver.observe(el);
  });
}

/* ── Init on DOM ready ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { setTimeout(initAnimations, 50); });
} else {
  setTimeout(initAnimations, 50);
}


/* ============================================================
   6. SISTEMA DE TRADUCCION (DOM walking)
   ============================================================ */

const REPLACEMENTS = [
  ['Todo sistema informatico, sin importar su tamano o proposito, requiere atencion constante. Esta pagina reune los fundamentos del mantenimiento preventivo y correctivo, los planes de contingencia, las normas ISO y las practicas de ITIL v3 que hacen posible que los sistemas sigan operando de forma confiable, segura y eficiente a lo largo del tiempo.', 'Every IT system, regardless of size or purpose, requires constant attention. This page brings together the fundamentals of preventive and corrective maintenance, contingency plans, ISO standards, and ITIL v3 practices that keep systems running reliably, securely, and efficiently over time.'],
  ['El mantenimiento de un sistema informatico es el conjunto de acciones tecnicas y organizativas que se realizan para garantizar que los equipos, software y servicios funcionen correctamente, de forma continua y dentro de los parametros de calidad esperados por la organizacion.', 'IT system maintenance is the set of technical and organizational actions performed to ensure that equipment, software, and services function correctly, continuously, and within the quality parameters expected by the organization.'],
  ['No se trata unicamente de reparar lo que falla. El mantenimiento moderno implica anticiparse a los problemas antes de que ocurran, documentar cada proceso, cumplir con estandares internacionales y adoptar metodologias que han demostrado ser efectivas en la industria tecnologica.', 'It is not just about fixing what fails. Modern maintenance involves anticipating problems before they occur, documenting each process, complying with international standards, and adopting methodologies proven effective in the technology industry.'],
  ['Un sistema que no se mantiene adecuadamente tiende a degradarse con el tiempo. Las fallas se vuelven mas frecuentes, los costos de reparacion aumentan y la productividad de la organizacion se ve comprometida. Por eso, el mantenimiento no es un gasto, sino una inversion en la estabilidad operativa.', 'A system that is not properly maintained tends to degrade over time. Failures become more frequent, repair costs increase, and the organization\'s productivity is compromised. That is why maintenance is not an expense, but an investment in operational stability.'],
  ['El mantenimiento de sistemas informaticos no es un proceso unico. Dependiendo del momento en que se aplique y del objetivo que persiga, se clasifica en distintas categorias, cada una con sus propias tecnicas, herramientas y responsabilidades.', 'IT system maintenance is not a single process. Depending on when it is applied and its objective, it is classified into different categories, each with its own techniques, tools, and responsibilities.'],
  ['Se realiza de forma programada y periodica para evitar que los problemas ocurran. Incluye limpieza de equipos, actualizaciones de software, revision de logs y verificacion del rendimiento del sistema.', 'Performed on a scheduled and periodic basis to prevent problems from occurring. Includes equipment cleaning, software updates, log review, and system performance verification.'],
  ['Se ejecuta cuando ya existe un fallo o anomalia en el sistema. Su objetivo es restaurar el funcionamiento normal en el menor tiempo posible, minimizando el impacto en la operacion de la organizacion.', 'Executed when a failure or anomaly already exists in the system. Its objective is to restore normal operation in the shortest time possible, minimizing the impact on the organization\'s operations.'],
  ['Utiliza datos en tiempo real, metricas de rendimiento y herramientas de monitoreo para anticipar cuando podria fallar un componente, permitiendo actuar antes de que el problema se materialice.', 'Uses real-time data, performance metrics, and monitoring tools to anticipate when a component might fail, allowing action before the problem materializes.'],
  ['El mantenimiento preventivo parte de una premisa simple: es mejor invertir tiempo y recursos en revisar el sistema regularmente que esperar a que algo falle. A diferencia del mantenimiento correctivo, este no responde a un problema, sino que trabaja para que ese problema nunca llegue a ocurrir.', 'Preventive maintenance is based on a simple premise: it is better to invest time and resources in regularly reviewing the system than to wait for something to fail. Unlike corrective maintenance, it does not respond to a problem but works to ensure that problem never occurs.'],
  ['En la practica, esto significa programar revisiones periodicas, establecer calendarios de actualizacion, monitorear el uso de recursos del sistema y documentar cada actividad realizada. Todo queda registrado para poder analizar tendencias y tomar decisiones con informacion concreta.', 'In practice, this means scheduling periodic reviews, establishing update calendars, monitoring system resource usage, and documenting each activity. Everything is recorded to analyze trends and make decisions based on concrete information.'],
  ['Una organizacion que aplica mantenimiento preventivo de forma disciplinada reduce significativamente los tiempos de inactividad no planificados, extiende la vida util de sus equipos y mantiene un ambiente de trabajo mas estable para sus usuarios.', 'An organization that applies preventive maintenance in a disciplined manner significantly reduces unplanned downtime, extends the useful life of its equipment, and maintains a more stable work environment for its users.'],
  ['Por mas riguroso que sea el mantenimiento preventivo, los fallos no siempre se pueden evitar. El mantenimiento correctivo es el proceso que entra en accion cuando el sistema ya presenta una falla, y su efectividad depende directamente de que tan bien preparado este el equipo tecnico para responder.', 'No matter how rigorous preventive maintenance is, failures cannot always be avoided. Corrective maintenance is the process that comes into action when a system already presents a failure, and its effectiveness depends directly on how well-prepared the technical team is to respond.'],
  ['El primer paso es identificar con precision que componente, servicio o proceso ha fallado. Esto puede suceder por reportes de usuarios, alertas del sistema de monitoreo o durante una revision rutinaria.', 'The first step is to precisely identify which component, service, or process has failed. This can happen through user reports, monitoring system alerts, or during a routine review.'],
  ['Una vez detectado el fallo, el tecnico analiza los logs, revisa el estado de los servicios y determina la causa raiz del problema. Un buen diagnostico evita aplicar soluciones temporales que no resuelven el problema de fondo.', 'Once the failure is detected, the technician analyzes the logs, reviews the status of services, and determines the root cause. A good diagnosis prevents applying temporary solutions that do not address the underlying problem.'],
  ['Con la causa identificada, se aplica la correccion correspondiente: puede ser un reinicio de servicio, reemplazo de hardware, restauracion desde backup, reinstalacion de software o ajuste de configuraciones.', 'With the cause identified, the corresponding correction is applied: it can be a service restart, hardware replacement, restoration from backup, software reinstallation, or configuration adjustment.'],
  ['Despues de aplicar la solucion, se verifica que el sistema funcione correctamente. Todo el proceso debe quedar documentado: que fallo, cuando, como se resolvio y que tiempo tomo la recuperacion.', 'After applying the solution, it is verified that the system functions correctly. The entire process must be documented: what failed, when, how it was resolved, and how long recovery took.'],
  ['Un plan de contingencia es un documento formal que describe que debe hacer la organizacion cuando ocurre una falla grave que afecta la continuidad del servicio. No se improvisa en el momento del problema: se prepara con anticipacion, se prueba y se actualiza periodicamente.', 'A contingency plan is a formal document that describes what the organization must do when a severe failure occurs that affects service continuity. It is not improvised at the time of the problem: it is prepared in advance, tested, and updated periodically.'],
  ['El plan operativo, por su parte, establece las rutinas diarias del equipo de TI: quien es responsable de que, cuales son los procedimientos estandar, como se escala un problema y cuales son los tiempos de respuesta esperados para cada tipo de incidente.', 'The operational plan, on the other hand, establishes the daily routines of the IT team: who is responsible for what, what the standard procedures are, how a problem is escalated, and what the expected response times are for each type of incident.'],
  ['Juntos, estos dos documentos forman la base de una operacion estable. Una organizacion que cuenta con ellos puede responder a crisis de forma ordenada, sin depender de la memoria o el criterio individual de una sola persona.', 'Together, these two documents form the foundation of a stable operation. An organization that has them can respond to crises in an orderly manner, without relying on the memory or individual judgment of a single person.'],
  ['Es el tiempo maximo aceptable que un sistema puede estar fuera de servicio despues de una falla. Definir el RTO permite priorizar los recursos durante una crisis y establece expectativas claras para la organizacion.', 'It is the maximum acceptable time a system can be out of service after a failure. Defining RTO allows prioritizing resources during a crisis and sets clear expectations for the organization.'],
  ['Es la cantidad maxima de datos que la organizacion esta dispuesta a perder en caso de falla. Determina con que frecuencia deben realizarse los respaldos y que tan reciente debe ser la ultima copia de seguridad disponible.', 'It is the maximum amount of data the organization is willing to lose in case of failure. It determines how often backups should be made and how recent the last available backup should be.'],
  ['Las normas ISO son estandares reconocidos a nivel mundial que establecen criterios minimos de calidad, seguridad y eficiencia para distintos procesos organizacionales. En el ambito de los sistemas informaticos, varias de estas normas son especialmente relevantes para garantizar una operacion confiable.', 'ISO standards are internationally recognized standards that establish minimum criteria for quality, security, and efficiency for various organizational processes. In the field of IT systems, several of these standards are especially relevant for ensuring reliable operation.'],
  ['Establece los requisitos para implementar un sistema de gestion de calidad dentro de una organizacion. Aplicada a TI, asegura que los procesos de soporte, mantenimiento y entrega de servicios tecnologicos se realicen de forma consistente y orientada a la mejora continua.', 'Establishes the requirements for implementing a quality management system within an organization. Applied to IT, it ensures that support, maintenance, and technology service delivery processes are carried out consistently and oriented toward continuous improvement.'],
  ['Define los requisitos para establecer, implementar y mantener un Sistema de Gestion de Seguridad de la Informacion (SGSI). Cubre la proteccion de datos frente a accesos no autorizados, perdidas, alteraciones y cualquier amenaza que comprometa la confidencialidad del sistema.', 'Defines the requirements for establishing, implementing, and maintaining an Information Security Management System (ISMS). It covers data protection against unauthorized access, losses, alterations, and any threat that compromises system confidentiality.'],
  ['Es el estandar internacional especifico para la gestion de servicios de tecnologia de informacion. Define buenas practicas para la planificacion, entrega, control y mejora de los servicios de TI, y esta directamente alineado con los principios de ITIL.', 'It is the specific international standard for IT service management. It defines best practices for the planning, delivery, control, and improvement of IT services, and is directly aligned with ITIL principles.'],
  ['Se centra en los planes de continuidad de negocio. Establece como las organizaciones deben prepararse para hacer frente a interrupciones graves en sus operaciones, incluyendo fallos tecnologicos mayores, desastres naturales o incidentes de seguridad criticos.', 'Focuses on business continuity plans. It establishes how organizations should prepare to deal with serious disruptions to their operations, including major technological failures, natural disasters, or critical security incidents.'],
  ['ITIL (Information Technology Infrastructure Library) es un conjunto de buenas practicas para la gestion de servicios de tecnologia de informacion. Su version 3, publicada en 2007 y actualizada en 2011, organiza la gestion de TI en torno a un ciclo de vida del servicio compuesto por cinco fases claramente definidas.', 'ITIL (Information Technology Infrastructure Library) is a set of best practices for IT service management. Version 3, published in 2007 and updated in 2011, organizes IT management around a service lifecycle composed of five clearly defined phases.'],
  ['A diferencia de una norma obligatoria, ITIL es un marco de referencia: las organizaciones lo adoptan de forma voluntaria y lo adaptan a su contexto particular. Su valor radica en que no fue disenado en un laboratorio academico, sino que surge de la experiencia acumulada de miles de organizaciones en todo el mundo.', 'Unlike a mandatory standard, ITIL is a reference framework: organizations adopt it voluntarily and adapt it to their particular context. Its value lies in the fact that it was not designed in an academic laboratory, but rather emerges from the accumulated experience of thousands of organizations around the world.'],
  ['Aplicar ITIL implica definir procesos claros para la gestion de incidentes, problemas, cambios, niveles de servicio y capacidad. Cada proceso tiene roles definidos, entradas, salidas y metricas de desempeno que permiten evaluar si el servicio se esta entregando correctamente.', 'Applying ITIL involves defining clear processes for incident management, problem management, change management, service level management, and capacity management. Each process has defined roles, inputs, outputs, and performance metrics.'],
  ['El aseguramiento de la calidad en sistemas informaticos no es solo ejecutar pruebas antes de lanzar una aplicacion. Es un proceso continuo que abarca todo el ciclo de vida del sistema: desde su diseno hasta su retiro, pasando por cada actualizacion, cambio de configuracion y mejora que se realice durante su operacion.', 'Quality assurance in IT systems is not just about running tests before launching an application. It is a continuous process that encompasses the entire system lifecycle: from its design to its retirement, including every update, configuration change, and improvement made during its operation.'],
  ['Implementar herramientas de monitoreo en tiempo real permite detectar anomalias antes de que se conviertan en fallos. Se monitorea el uso de CPU, memoria, red, almacenamiento y los tiempos de respuesta de los servicios criticos.', 'Implementing real-time monitoring tools allows detecting anomalies before they become failures. CPU usage, memory, network, storage, and critical service response times are monitored.'],
  ['Todo cambio en el sistema debe evaluarse, aprobarse y documentarse antes de aplicarse. Un cambio no controlado puede introducir nuevos fallos. La gestion de cambios reduce ese riesgo sin frenar la evolucion del sistema.', 'Every change in the system must be evaluated, approved, and documented before being applied. An uncontrolled change can introduce new failures. Change management reduces that risk without slowing down system evolution.'],
  ['Medir es la base de la mejora. Indicadores como la disponibilidad del sistema (uptime), el tiempo medio entre fallos (MTBF) y el tiempo medio de reparacion (MTTR) permiten evaluar objetivamente el desempeno del servicio.', 'Measurement is the foundation of improvement. Indicators such as system availability (uptime), mean time between failures (MTBF), and mean time to repair (MTTR) allow objectively evaluating service performance.'],
  ['El mantenimiento y aseguramiento de la operacion de un sistema informatico es una disciplina que exige planificacion, disciplina tecnica y una cultura organizacional comprometida con la calidad. No basta con tener buenos equipos o un software actualizado si no existe un proceso formal que garantice su correcta operacion a lo largo del tiempo.', 'The maintenance and assurance of IT system operation is a discipline that demands planning, technical discipline, and an organizational culture committed to quality. It is not enough to have good equipment or updated software if there is no formal process to ensure its correct operation over time.'],
  ['A lo largo de este modulo se ha visto que el mantenimiento preventivo evita problemas antes de que ocurran, el correctivo los resuelve cuando ya existen, y los planes de contingencia aseguran que la organizacion sepa exactamente que hacer cuando la situacion se sale del control ordinario.', 'Throughout this module, it has been shown that preventive maintenance prevents problems before they occur, corrective maintenance resolves them when they already exist, and contingency plans ensure that the organization knows exactly what to do when the situation goes beyond ordinary control.'],
  ['Las normas ISO ofrecen un marco de referencia reconocido internacionalmente para estructurar estos procesos, mientras que ITIL v3 proporciona las buenas practicas concretas para operarlos dia a dia. Juntas, estas herramientas forman una base solida sobre la que cualquier organizacion puede construir una operacion tecnologica confiable, eficiente y sostenible.', 'ISO standards offer an internationally recognized reference framework for structuring these processes, while ITIL v3 provides concrete best practices for operating them day by day. Together, these tools form a solid foundation on which any organization can build a reliable, efficient, and sustainable technology operation.'],
  ['Un sistema bien mantenido no es el que nunca falla, sino el que cuando falla, sabe exactamente como recuperarse.', 'A well-maintained system is not one that never fails, but one that when it fails, knows exactly how to recover.'],
  ['La continuidad de un sistema no es casualidad', 'System continuity is not by chance'],
  ['Que es el mantenimiento de un sistema informatico', 'What is IT System Maintenance'],
  ['Tipos de mantenimiento', 'Types of Maintenance'],
  ['Mantenimiento preventivo', 'Preventive Maintenance'],
  ['Mantenimiento correctivo', 'Corrective Maintenance'],
  ['Planes operativos y de contingencia', 'Operational and Contingency Plans'],
  ['Normas ISO aplicadas a sistemas informaticos', 'ISO Standards Applied to IT Systems'],
  ['ITIL v3: Gestion de servicios de TI', 'ITIL v3: IT Service Management'],
  ['Aseguramiento de la calidad del sistema', 'System Quality Assurance'],
  ['Indicadores clave de desempeno (KPIs) en sistemas informaticos', 'Key Performance Indicators (KPIs) in IT Systems'],
  ['Frecuencia recomendada de actividades', 'Recommended Activity Frequency'],
  ['Elementos de un plan de contingencia', 'Contingency Plan Elements'],
  ['Las 5 fases del ciclo de vida ITIL v3', 'The 5 Phases of the ITIL v3 Lifecycle'],
  ['Introduccion', 'Introduction'],
  ['Clasificacion', 'Classification'],
  ['Estandares internacionales', 'International Standards'],
  ['Buenas practicas', 'Best Practices'],
  ['Calidad y sostenibilidad', 'Quality and Sustainability'],
  ['Planificacion', 'Planning'],
  ['Cierre del modulo', 'Module Closing'],
  ['Modulo de formacion tecnica', 'Technical Training Module'],
  ['Objetivos principales', 'Main Objectives'],
  ['Actividades tipicas', 'Typical Activities'],
  ['Deteccion del fallo', 'Failure Detection'],
  ['Diagnostico', 'Diagnosis'],
  ['Solucion y restauracion', 'Solution and Restoration'],
  ['Verificacion y documentacion', 'Verification and Documentation'],
  ['Monitoreo continuo', 'Continuous Monitoring'],
  ['Gestion de cambios', 'Change Management'],
  ['Metricas y KPIs', 'Metrics and KPIs'],
  ['Sistemas de Gestion de Calidad', 'Quality Management Systems'],
  ['Seguridad de la Informacion', 'Information Security'],
  ['Gestion de Servicios de TI', 'IT Service Management'],
  ['Continuidad del Negocio', 'Business Continuity'],
  ['Limpieza fisica de equipos y perifericos', 'Physical cleaning of equipment and peripherals'],
  ['Actualizacion de sistema operativo y aplicaciones', 'Operating system and application updates'],
  ['Revision y limpieza de archivos temporales y logs', 'Review and cleanup of temporary files and logs'],
  ['Verificacion del estado del disco duro (SMART)', 'Hard drive status verification (SMART)'],
  ['Comprobacion de copias de seguridad (backups)', 'Backup verification'],
  ['Analisis de rendimiento de la red y servidores', 'Network and server performance analysis'],
  ['Revision de licencias y vigencia de software', 'Software license and validity review'],
  ['Documentacion de todas las actividades realizadas', 'Documentation of all activities performed'],
  ['Limpieza fisica de equipos', 'Physical equipment cleaning'],
  ['Cada 3 meses', 'Every 3 months'],
  ['Tecnico de soporte', 'Support technician'],
  ['Actualizaciones de seguridad', 'Security updates'],
  ['Administrador de sistemas', 'System administrator'],
  ['Verificacion de backups', 'Backup verification'],
  ['Revision de logs del sistema', 'System log review'],
  ['Equipo de operaciones', 'Operations team'],
  ['Auditoria completa del sistema', 'Complete system audit'],
  ['Equipo de TI + Auditores', 'IT Team + Auditors'],
  ['Disponibilidad del sistema', 'System availability'],
  ['Porcentaje del tiempo que el sistema esta operativo', 'Percentage of time the system is operational'],
  ['99.9% o mas', '99.9% or more'],
  ['Tiempo medio entre fallos', 'Mean time between failures'],
  ['Tiempo promedio que transcurre entre un fallo y el siguiente', 'Average time between one failure and the next'],
  ['Lo mas alto posible', 'As high as possible'],
  ['Tiempo medio de reparacion', 'Mean time to repair'],
  ['Tiempo promedio que toma restaurar el sistema tras un fallo', 'Average time to restore the system after a failure'],
  ['Lo mas bajo posible', 'As low as possible'],
  ['Tasa de incidentes resueltos', 'Incident resolution rate'],
  ['Porcentaje de incidentes resueltos en el primer contacto', 'Percentage of incidents resolved on first contact'],
  ['Mayor al 70%', 'Greater than 70%'],
  ['Estrategia del Servicio:', 'Service Strategy:'],
  ['Define que servicios ofrecer, a quien y con que modelo de negocio.', 'Defines what services to offer, to whom, and with what business model.'],
  ['Diseno del Servicio:', 'Service Design:'],
  ['Establece como se disenan los servicios, incluyendo seguridad, disponibilidad y capacidad.', 'Establishes how services are designed, including security, availability, and capacity.'],
  ['Transicion del Servicio:', 'Service Transition:'],
  ['Gestiona el paso de un servicio del desarrollo a produccion, incluyendo la gestion de cambios.', 'Manages the transition of a service from development to production, including change management.'],
  ['Operacion del Servicio:', 'Service Operation:'],
  ['Administra los servicios en funcionamiento: incidentes, problemas, accesos y eventos.', 'Manages services in operation: incidents, problems, access, and events.'],
  ['Mejora Continua del Servicio:', 'Continual Service Improvement:'],
  ['Evalua el desempeno y aplica mejoras basadas en metricas reales.', 'Evaluates performance and applies improvements based on real metrics.'],
  ['Garantizar la disponibilidad continua del sistema', 'Ensure continuous system availability'],
  ['Prevenir fallos antes de que afecten la operacion', 'Prevent failures before they affect operations'],
  ['Reducir el tiempo de inactividad no planificado', 'Reduce unplanned downtime'],
  ['Prolongar la vida util de los equipos y el software', 'Extend the useful life of equipment and software'],
  ['Asegurar la integridad y seguridad de la informacion', 'Ensure data integrity and security'],
  ['Cumplir con normas y estandares reconocidos internacionalmente', 'Comply with internationally recognized standards'],
  ['Identificacion de riesgos y amenazas criticas', 'Identification of critical risks and threats'],
  ['Definicion de escenarios de fallo posibles', 'Definition of possible failure scenarios'],
  ['Roles y responsabilidades del equipo de respuesta', 'Roles and responsibilities of the response team'],
  ['Procedimientos paso a paso para cada escenario', 'Step-by-step procedures for each scenario'],
  ['Plan de comunicacion interna y externa', 'Internal and external communication plan'],
  ['Estrategia de recuperacion de datos (RTO y RPO)', 'Data recovery strategy (RTO and RPO)'],
  ['Cronograma de pruebas y simulacros', 'Testing and drill schedule'],
  ['Historial de actualizaciones del documento', 'Document update history'],
  ['Indicador', 'Indicator'],
  ['Descripcion', 'Description'],
  ['Meta tipica', 'Typical target'],
  ['Sigla', 'Acronym'],
  ['Inicio', 'Home'],
  ['Que es', 'What is it'],
  ['Tipos', 'Types'],
  ['Preventivo', 'Preventive'],
  ['Correctivo', 'Corrective'],
  ['Planes', 'Plans'],
  ['Normas ISO', 'ISO Standards'],
  ['Calidad', 'Quality'],
  ['Conclusion', 'Conclusion'],
  ['Explorar el modulo', 'Explore the Module'],
  ['Leer mas', 'Read more'],
  ['Ver planes', 'See plans'],
  ['Contenido cubierto', 'Content Covered'],
  ['Mantenimiento preventivo y correctivo', 'Preventive and corrective maintenance'],
  ['Buenas practicas ITIL v3', 'ITIL v3 best practices'],
  ['Aseguramiento de la calidad', 'Quality assurance'],
  ['Elaborado por', 'Created by'],
  ['Trabajo individual', 'Individual project'],
  ['Formacion tecnica en mantenimiento de sistemas', 'Technical training in systems maintenance'],
  ['Pagina informativa elaborada con fines academicos. Todos los contenidos son de caracter educativo.', 'Informational page created for academic purposes. All content is educational in nature.'],
  ['Mantenimiento y Aseguramiento de la Operacion del Sistema Informatico', 'IT System Operation Maintenance and Assurance'],
  ['Actividad', 'Activity'],
  ['Frecuencia', 'Frequency'],
  ['Responsable', 'Responsible'],
  ['Modulo cargado', 'Module loaded'],
  ['Buscar en el modulo', 'Search the module'],
  ['Sin resultados para esa busqueda.', 'No results for that search.'],
  ['Cerrar busqueda', 'Close search'],
  ['Abrir busqueda', 'Open search'],
  ['Abrir menu', 'Open menu'],
  ['Volver al inicio de la pagina', 'Back to top of page'],
  ['Mantenimiento y Aseguramiento de Sistemas Informaticos', 'IT Systems Maintenance &amp; Assurance'],
  ['Modulo Tecnico', 'Technical Module'],
  ['Modulo', 'Module'],
  ['Tipo 01', 'Type 01'],
  ['Tipo 02', 'Type 02'],
  ['Tipo 03', 'Type 03'],
  ['Practica 01', 'Practice 01'],
  ['Practica 02', 'Practice 02'],
  ['Practica 03', 'Practice 03'],
  ['Predictivo', 'Predictive'],
  ['Mensual', 'Monthly'],
  ['Semanal', 'Weekly'],
  ['Diaria', 'Daily'],
  ['Anual', 'Annual'],
];

let isEnglish = false;

function replaceInText(text) {
  let result = text;
  for (const [es, en] of REPLACEMENTS) {
    if (result.includes(es)) result = result.split(es).join(en);
  }
  return result;
}

function walkAndTranslate(toEN) {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    null
  );
  let node;
  while (node = treeWalker.nextNode()) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (toEN) {
        node._origText = node.textContent;
        node.textContent = replaceInText(node.textContent);
      } else if (node._origText !== undefined) {
        node.textContent = node._origText;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const attrs = ['placeholder', 'aria-label', 'title', 'alt'];
      for (const attr of attrs) {
        if (node.hasAttribute && node.hasAttribute(attr)) {
          if (toEN) {
            node._origAttrs = node._origAttrs || {};
            node._origAttrs[attr] = node.getAttribute(attr);
            node.setAttribute(attr, replaceInText(node.getAttribute(attr)));
          } else if (node._origAttrs && node._origAttrs[attr] !== undefined) {
            node.setAttribute(attr, node._origAttrs[attr]);
          }
        }
      }
    }
  }
}

function applyTranslation(toEN) {
  walkAndTranslate(toEN);
  document.documentElement.lang = toEN ? 'en' : 'es';
}

/* ── Boton modo fiesta ── */
const partyBtnStyles = document.createElement('style');
partyBtnStyles.textContent = `.party-toggle{position:fixed;bottom:16.5rem;left:1.75rem;z-index:1000;width:50px;height:50px;border-radius:var(--r-pill);border:1px solid rgba(251,191,36,.3);background:rgba(251,191,36,.07);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);color:#fbbf24;font-size:1.3rem;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(251,191,36,.2);transition:transform var(--t-fast) var(--ease),box-shadow var(--t-fast),background var(--t-fast);user-select:none}.party-toggle:hover{transform:scale(1.1);box-shadow:0 0 40px rgba(251,191,36,.35);background:rgba(251,191,36,.14)}html.party .party-toggle{border-color:#fbbf24;background:rgba(251,191,36,.2);box-shadow:0 0 30px rgba(251,191,36,.4);animation:partyBtnPulse .8s ease-in-out infinite alternate}@keyframes partyBtnPulse{from{box-shadow:0 0 20px rgba(255,45,117,.4)}to{box-shadow:0 0 30px rgba(0,240,255,.4)}}`;
document.head.appendChild(partyBtnStyles);

const partyToggle = document.createElement('button');
partyToggle.className = 'party-toggle';
partyToggle.setAttribute('aria-label', 'Modo fiesta');
partyToggle.innerHTML = '&#127881;';
document.body.appendChild(partyToggle);

let partyConfetti = [];
const savedParty = localStorage.getItem('party');
if (savedParty === 'on') {
  document.documentElement.classList.add('party');
  startParty();
}

partyToggle.addEventListener('click', () => {
  const isParty = document.documentElement.classList.toggle('party');
  if (isParty) { startParty(); } else { stopParty(); }
  localStorage.setItem('party', isParty ? 'on' : 'off');
});

function startParty() {
  /* Rainbow border animation on all cards */
  const partyCSS = document.createElement('style');
  partyCSS.id = 'party-css';
  partyCSS.textContent = `
    @keyframes partyRainbow {
      0%   { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    @keyframes partyBounce {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-4px) rotate(1deg); }
      75% { transform: translateY(-4px) rotate(-1deg); }
    }
    html.party body { animation: partyRainbow 4s linear infinite; }
    html.party .hero-title { animation: partyBounce 0.6s ease-in-out infinite; }
    html.party .hero-label { animation: partyBounce 0.8s ease-in-out infinite; }
    html.party .site-title { animation: partyBounce 0.7s ease-in-out infinite; }
    html.party .logo-icon { animation: partyBounce 0.5s ease-in-out infinite; }
    html.party .info-card, html.party .step-card, html.party .iso-card, html.party .concept-card {
      border-image: linear-gradient(135deg, #ff2d75, #a855f7, #00f0ff, #fbbf24, #ff2d75) 1;
      border-image-slice: 1;
      animation: partyBounce 1.2s ease-in-out infinite;
    }
    html.party .section-tag {
      background: linear-gradient(90deg, rgba(255,45,117,.15), rgba(168,85,247,.15), rgba(0,240,255,.15), rgba(251,191,36,.15));
      background-size: 300% 100%;
      animation: partyShimmer 2s linear infinite;
    }
    @keyframes partyShimmer {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    }
    html.party .btn-primary {
      background: linear-gradient(135deg, rgba(255,45,117,.2), rgba(168,85,247,.15), rgba(0,240,255,.2), rgba(251,191,36,.15));
      background-size: 300% 300%;
      animation: partyShimmer 2s linear infinite;
      border-color: #fbbf24;
    }
    html.party .speed-line { animation-duration: 0.8s !important; opacity: 0.8; }
    html.party .particle { animation-duration: 3s !important; }
    html.party .footer-col h4 { animation: partyBounce 1s ease-in-out infinite; }
    html.party .highlight-box::before {
      background: linear-gradient(180deg, transparent, #ff2d75, #a855f7, #00f0ff, #fbbf24, transparent);
      box-shadow: 0 0 20px #ff2d75;
    }
    html.party .numbered-list li::before {
      animation: partyBounce 0.8s ease-in-out infinite;
      text-shadow: 0 0 12px #fbbf24;
    }
    html.party .check-mark { animation: partyBounce 0.6s ease-in-out infinite; }
    html.party .concept-title {
      background: linear-gradient(135deg, #ff2d75, #fbbf24, #00f0ff, #a855f7);
      background-size: 200% 200%;
      animation: partyShimmer 3s linear infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    html.party .final-quote {
      border-left-color: #fbbf24;
      animation: partyBounce 1.5s ease-in-out infinite;
    }
  `;
  document.head.appendChild(partyCSS);

  /* Spawn confetti particles */
  spawnConfetti();
  partyConfettiInterval = setInterval(spawnConfetti, 2000);
}

let partyConfettiInterval;
function spawnConfetti() {
  const colors = ['#ff2d75', '#a855f7', '#00f0ff', '#fbbf24', '#4ade80', '#ff6b35'];
  for (let i = 0; i < 15; i++) {
    const c = document.createElement('div');
    c.className = 'party-confetti';
    const size = Math.random() * 8 + 4;
    c.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}vw;width:${size}px;height:${size*1.4}px;background:${colors[i%colors.length]};border-radius:${Math.random()>0.5?'50%':'2px'};pointer-events:none;z-index:9998;opacity:0.85;animation:confettiFall ${Math.random()*3+2}s linear forwards;animation-delay:${Math.random()*0.5}s`;
    document.body.appendChild(c);
    c.addEventListener('animationend', () => c.remove());
  }
}

/* Confetti keyframes */
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `@keyframes confettiFall{0%{opacity:.9;transform:translateY(0) rotate(0deg) scale(1)}50%{opacity:.7}100%{opacity:0;transform:translateY(105vh) rotate(${Math.random()*720}deg) scale(.3)}}`;
document.head.appendChild(confettiStyle);

function stopParty() {
  const pcss = document.getElementById('party-css');
  if (pcss) pcss.remove();
  clearInterval(partyConfettiInterval);
  document.querySelectorAll('.party-confetti').forEach(c => c.remove());
}

/* ── Boton modo oscuro/claro ── */
const themeBtnStyles = document.createElement('style');
themeBtnStyles.textContent = `.theme-toggle{position:fixed;bottom:11rem;left:1.75rem;z-index:1000;width:50px;height:50px;border-radius:var(--r-pill);border:1px solid var(--cyan-border);background:rgba(0,240,255,.07);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);color:var(--cyan);font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px var(--cyan-glow);transition:transform var(--t-fast) var(--ease),box-shadow var(--t-fast),background var(--t-fast),color var(--t-fast),border-color var(--t-fast);user-select:none}.theme-toggle:hover{transform:scale(1.1);box-shadow:0 0 40px rgba(0,240,255,.35);background:rgba(0,240,255,.14)}`;
document.head.appendChild(themeBtnStyles);

const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Cambiar modo');
themeToggle.innerHTML = '&#9789;';
document.body.appendChild(themeToggle);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.documentElement.classList.add('light');
  themeToggle.innerHTML = '&#9788;';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');
  themeToggle.innerHTML = isLight ? '&#9788;' : '&#9789;';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ── Boton de idioma ── */
const langBtnStyles = document.createElement('style');
langBtnStyles.textContent = `.lang-toggle{position:fixed;bottom:5.5rem;left:1.75rem;z-index:1000;width:50px;height:50px;border-radius:var(--r-pill);border:1px solid var(--pink);background:rgba(255,45,117,.07);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);color:var(--pink);font-family:var(--font-display);font-size:.7rem;font-weight:700;letter-spacing:.05em;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px var(--pink-glow);transition:transform var(--t-fast) var(--ease),box-shadow var(--t-fast),background var(--t-fast);user-select:none}.lang-toggle:hover{transform:scale(1.1);box-shadow:0 0 40px rgba(255,45,117,.35);background:rgba(255,45,117,.14)}.lang-toggle .lang-text{pointer-events:none}`;
document.head.appendChild(langBtnStyles);

const langToggle = document.createElement('button');
langToggle.className = 'lang-toggle';
langToggle.setAttribute('aria-label', 'Switch to English');
langToggle.innerHTML = '<span class="lang-text">EN</span>';
document.body.appendChild(langToggle);

const savedLang = localStorage.getItem('lang');
if (savedLang === 'en') {
  isEnglish = true;
  langToggle.innerHTML = '<span class="lang-text">ES</span>';
  langToggle.setAttribute('aria-label', 'Cambiar a espanol');
  applyTranslation(true);
}

langToggle.addEventListener('click', () => {
  isEnglish = !isEnglish;
  applyTranslation(isEnglish);
  langToggle.innerHTML = isEnglish ? '<span class="lang-text">ES</span>' : '<span class="lang-text">EN</span>';
  langToggle.setAttribute('aria-label', isEnglish ? 'Cambiar a espanol' : 'Switch to English');
  localStorage.setItem('lang', isEnglish ? 'en' : 'es');
});
