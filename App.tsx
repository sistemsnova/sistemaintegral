
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Logo from './components/Logo';
import { Service } from './types';

const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Nova Core ERP',
    description: 'El cerebro de su negocio. Todo lo que sucede en su mostrador, sucede en el sistema.',
    icon: '🔋'
  },
  {
    id: '2',
    title: 'Nova Web Sync',
    description: 'Su tienda online es una extensión de su local. Venda 24/7 con stock sincronizado.',
    icon: '🌐'
  },
  {
    id: '3',
    title: 'Control Unificado',
    description: 'Un solo panel para precios, stock y clientes. Sin duplicar tareas nunca más.',
    icon: '🎯'
  },
  {
    id: '4',
    title: 'Nova Pay',
    description: 'Integración nativa con pasarelas de pago para cobros físicos y digitales.',
    icon: '💳'
  }
];

const MODULES = [
  { title: 'Ventas y Facturación', icon: '📝', desc: 'Facturación electrónica, presupuestos, notas de crédito y manejo de múltiples puntos de venta.' },
  { title: 'Compras y Proveedores', icon: '📥', desc: 'Gestión de órdenes de compra, carga de facturas de proveedores y control de cuentas corrientes.' },
  { title: 'Stock e Inventarios', icon: '📦', desc: 'Control multidepósito, trazabilidad, códigos de barras y alertas de stock mínimo automáticas.' },
  { title: 'Fondos y Tesorería', icon: '💰', desc: 'Gestión de cajas, bancos, carteras de cheques, tarjetas de crédito y flujos de fondos.' },
  { title: 'E-commerce Sync', icon: '☁️', desc: 'Sincronización total de productos, precios y stock con su tienda online en tiempo real.' },
  { title: 'Producción / Talleres', icon: '⚙️', desc: 'Órdenes de trabajo, explosión de insumos, costos de fabricación y seguimiento de procesos.' },
  { title: 'Clientes y CRM', icon: '👥', desc: 'Base de datos unificada, historial de compras, programas de fidelización y cuentas corrientes.' },
  { title: 'Estadísticas e IA', icon: '📊', desc: 'Dashboards dinámicos, reportes de rentabilidad y proyecciones impulsadas por Nova IA.' },
];

const VERTICALS = [
  { name: 'Kioscos y Almacenes', icon: '🏪', desc: 'Venda en el barrio y envíe a toda la ciudad con su propia web.' },
  { name: 'Ferreterías y Corralones', icon: '🛠️', desc: 'Maneje miles de artículos con stock exacto en mostrador y online.' },
  { name: 'Contadores', icon: '⚖️', desc: 'Gestión de honorarios, clientes y documentación unificada en la nube.' },
  { name: 'Arquitectos', icon: '📐', desc: 'Seguimiento de obras, presupuestos y gestión de proyectos integrados.' },
  { name: 'Inmobiliarias', icon: '🏠', desc: 'Administración de propiedades, contratos y cobros automatizados.' },
  { name: 'Complejos Deportivos', icon: '⚽', desc: 'Reserva de turnos online, gestión de socios y venta de productos.' },
  { name: 'Distribuidoras', icon: '🚚', desc: 'Preventa digital y autogestión para sus clientes mayoristas.' },
  { name: 'Talleres y Servicios', icon: '🔧', desc: 'Turnos online y seguimiento de reparaciones en tiempo real.' }
];

const ADVANTAGES = [
  {
    title: 'Gestión en la nube, sin límites de lugar ni horario.',
    desc: 'Sin instalaciones, sin descargas, sin complicaciones. Accedé a toda la información desde tu PC, tablet o celular, estés donde estés, las 24 horas.',
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  },
  {
    title: '¿Necesitás una persona del otro lado? También estamos.',
    desc: 'Hay consultas que se resuelven al instante y otras que necesitan alguien del otro lado. En Nova, combinamos lo mejor de los dos mundos para que nunca te quedes sin respuesta.',
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  },
  {
    title: 'Actualizaciones automáticas y datos seguros.',
    desc: 'No tenés que perder tiempo instalando versiones nuevas: todo se actualiza automáticamente. Tenemos servidores con las medidas de seguridad necesarias para que trabajes con tranquilidad.',
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

const PRICING_PLANS = [
  {
    name: 'Básico',
    price: '$ 57.000',
    description: 'Para emprendedores, freelancers y pequeños comercios que buscan una solución simple y efectiva.',
    features: [
      'Soporte por WhatsApp',
      '1 Usuario',
      'Módulos esenciales',
      'Control básico de stock',
      'Cuentas claras',
      'Clientes organizados',
      'Reportes esenciales',
      'Facturación rápida y fácil',
      'Sin límites en operaciones',
      'Límite de 20.000 productos'
    ],
    cta: 'Elegir plan',
    popular: false
  },
  {
    name: 'Inicial',
    price: '$ 78.000',
    description: 'Para comercios medianos y negocios en expansión que necesitan optimizar su gestión.',
    features: [
      'Todo lo del Plan Básico +',
      '3 Usuarios',
      'Facturación hasta 1 CUIT',
      'Acceso total al sistema',
      'Integración E-Commerce',
      'Uso de la aplicación móvil',
      'Portal de clientes',
      'Dashboard con indicadores',
      'Reportes contables',
      'Límite de 20.000 productos'
    ],
    cta: 'Elegir plan',
    popular: false
  },
  {
    name: 'Intermedio',
    price: '$ 107.000',
    description: 'Para medianas empresas (comercios, fábricas) y pequeñas Distribuidoras.',
    features: [
      'Todo lo del Plan Inicial +',
      '9 Usuarios',
      'Facturación hasta 2 CUIT',
      '3 Vendedores en la App',
      'Acceso total al sistema',
      'Integración E-Commerce',
      'Uso de la aplicación móvil',
      'Portal de clientes',
      'Multimoneda en Ventas',
      'Límite de 20.000 productos'
    ],
    cta: 'Elegir plan',
    popular: true
  },
  {
    name: 'Avanzado',
    price: '$ 140.000',
    description: 'Para grandes empresas y Distribuidoras con muchos vendedores preventistas.',
    features: [
      'Todo lo del Plan Intermedio +',
      '21 Usuarios',
      'Facturación hasta 3* CUIT',
      '9 Vendedores en la App',
      'Acceso total al sistema',
      'Integración E-Commerce',
      'Uso de la aplicación móvil',
      'Portal de clientes',
      'Percepciones por Provincias',
      'Límite de 50.000 productos'
    ],
    cta: 'Elegir plan',
    popular: false
  }
];

const FAQ_ITEMS = [
  {
    question: '¿Desde dónde se puede usar Nova?',
    answer: 'Nova es una plataforma accesible desde cualquier lugar con conexión a internet. Podés usarla en tu computadora, tablet o smartphone, lo que te permite gestionar tus procesos de negocio y acceder a herramientas analíticas estés donde estés.'
  },
  {
    question: '¿Con qué frecuencia se actualiza Nova?',
    answer: 'En Nova, actualizamos y mejoramos nuestro servicio cada 15 días. Priorizamos los requerimientos de nuestros clientes para garantizar que cada actualización aborde sus necesidades y mejore la plataforma de acuerdo con sus expectativas.'
  },
  {
    question: '¿Puedo importar mi información al sistema?',
    answer: 'Sí, podés importar tu información a Nova. Con esta funcionalidad, podés cargar de manera simple y rápida tus clientes, proveedores y productos. Para comenzar, consultá nuestra guía de importación o contactá con nuestro equipo de soporte.'
  },
  {
    question: '¿Necesito instalar algo para utilizar Nova?',
    answer: 'No, Nova es una plataforma que funciona en la nube, por lo que no necesitás instalar ningún software adicional en tu computadora. Solo necesitás un navegador web y una conexión a Internet para acceder y utilizar el sistema.'
  },
  {
    question: '¿Se realiza una copia de seguridad de mi información?',
    answer: 'Sí, se realizan copias de seguridad periódicas de tu información para garantizar su seguridad y disponibilidad. Esto asegura que tus datos estén protegidos y puedan ser recuperados en caso de cualquier imprevisto.'
  },
  {
    question: '¿Qué hago si necesito ayuda?',
    answer: 'Si necesitás ayuda, nuestro equipo de soporte está disponible para ayudarte. Podés contactarnos a través de WhatsApp, correo electrónico o llamada, y estaremos disponibles para resolver cualquier duda o inconveniente que tengas al usar Nova.'
  }
];

const App: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-200 overflow-x-hidden font-inter">
      <Navbar />

      {/* Hero Section */}
      <section id="inicio" className="relative pt-48 pb-32 md:pt-64 md:pb-48 px-6 text-center text-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-orange-600/5 rounded-full blur-[180px] -z-10"></div>
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 flex justify-center animate-float relative">
            <Logo size={100} />
            <div className="absolute -right-4 -top-4 bg-orange-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.5)] uppercase">Córdoba • Argentina</div>
          </div>
          <h1 className="text-6xl md:text-[8.5rem] font-black tracking-tighter mb-8 leading-[0.8] text-white">
            UN SOLO <br/><span className="nova-gradient">SISTEMA</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light tracking-wide">
            Desde Córdoba para todo el país: gestione su local físico y su tienda online con el mismo inventario en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#planes" className="group bg-orange-500 text-slate-950 px-12 py-5 rounded-2xl text-lg font-black hover:bg-white transition-all shadow-2xl shadow-orange-500/20 flex items-center justify-center">
              Elegir Plan
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modulos" className="py-32 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-orange-500 mb-4">Arquitectura del Software</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">Módulos de Nova Systems</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {MODULES.map((module, index) => (
              <div key={index} className="group glass-dark p-8 rounded-[2.5rem] border border-white/5 hover:border-orange-500/40 hover:bg-slate-900/40 transition-all duration-500">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform border border-white/5 shadow-inner">
                  {module.icon}
                </div>
                <h4 className="text-xl font-black text-white mb-4 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{module.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {module.desc}
                </p>
                <div className="h-1 w-0 group-hover:w-full bg-orange-500 transition-all duration-700 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Solutions */}
      <section id="rubros" className="py-32 px-6 bg-slate-900/10">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-4">Soluciones Verticales</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white text-center">Software Adaptado a su Rubro</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {VERTICALS.map((v, i) => (
              <div key={i} className="flex flex-col p-8 rounded-[3rem] bg-slate-900/40 border border-slate-800 hover:border-orange-500/20 transition-all group">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h4 className="text-xl font-black text-white mb-3 tracking-tight">{v.name}</h4>
                <p className="text-slate-500 leading-relaxed text-xs mb-6 flex-1">{v.desc}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Optimizado para {v.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-orange-500 mb-4">Ventajas Competitivas</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Aprovechá todas nuestras ventajas</h3>
            <p className="text-slate-500 max-w-3xl text-lg font-medium leading-relaxed">
              Todo lo que necesitás para gestionar tu negocio de manera sencilla, segura y sin complicaciones, con el mejor respaldo y un equipo para ayudarte.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ADVANTAGES.map((adv, idx) => (
              <div key={idx} className="glass-dark p-10 rounded-[3rem] border border-white/5 hover:bg-slate-900/40 transition-all duration-500 group">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xl border border-white/5">
                  {adv.icon}
                </div>
                <h4 className="text-xl font-black text-white mb-6 leading-snug group-hover:text-orange-500 transition-colors">
                  {adv.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="planes" className="py-40 px-6 relative overflow-hidden bg-slate-900/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[150px] -z-10"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-orange-500 mb-4">Escalabilidad</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Planes pensados para cada etapa</h3>
            <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">
              Elegí el plan que mejor se adapte a tu negocio. Todos incluyen soporte técnico y actualizaciones gratuitas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PRICING_PLANS.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col p-8 md:p-10 rounded-[3rem] transition-all duration-500 border group ${
                  plan.popular 
                    ? 'glass-dark border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.1)] scale-105 z-10' 
                    : 'glass-dark border-white/5 hover:border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-slate-950 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                    Más Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{plan.name}</h4>
                  <div className="flex flex-col mb-4">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-slate-500 font-bold text-xs tracking-tight uppercase">+IVA/mes</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium mb-4">{plan.description}</p>
                  <button className="text-orange-500 text-[10px] font-black uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                    Ver más <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>

                <div className="flex-1 space-y-3 mb-10 border-t border-white/5 pt-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-3 group/item">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${plan.popular ? 'bg-orange-500' : 'bg-slate-700 group-hover/item:bg-orange-500'}`}></div>
                      <span className="text-slate-300 text-[12px] font-medium leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href="#contacto" 
                  className={`w-full py-5 rounded-2xl text-center font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-lg ${
                    plan.popular 
                      ? 'bg-orange-500 text-slate-950 hover:bg-white hover:scale-[1.02] shadow-orange-500/20' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-orange-500 mb-4">Centro de Ayuda</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Preguntas Frecuentes</h3>
            <p className="text-slate-500 font-medium text-lg">Todo lo que necesitás saber sobre la experiencia Nova.</p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className={`glass-dark rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                  activeFaq === idx ? 'border-orange-500/30 bg-slate-900/40' : 'border-white/5'
                }`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-8 md:p-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors ${activeFaq === idx ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${activeFaq === idx ? 'rotate-180 bg-orange-500 border-orange-500' : ''}`}>
                    <svg className={`w-4 h-4 transition-colors ${activeFaq === idx ? 'text-slate-950' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeFaq === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-8 md:p-10 pt-0 text-slate-400 font-medium leading-relaxed border-t border-white/5 mt-2">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contacto" className="py-40 px-6 relative overflow-hidden bg-slate-900/10">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] -z-10"></div>
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
               <h2 className="text-5xl md:text-[6.5rem] font-black text-white mb-10 tracking-tighter leading-[0.85]">CONTACTO <br/><span className="text-orange-500">DIRECTO.</span></h2>
               
               <div className="space-y-8 mb-12">
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mr-6 border border-slate-800 group-hover:border-orange-500 transition-colors">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Ubicación</p>
                      <p className="text-white font-bold text-lg">Córdoba, Argentina</p>
                    </div>
                  </div>

                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mr-6 border border-slate-800 group-hover:border-orange-500 transition-colors">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Oficial</p>
                      <p className="text-white font-bold text-lg">sistemsnova@gmail.com</p>
                    </div>
                  </div>
               </div>

               <div className="flex items-center space-x-8">
                  <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800">
                    <Logo size={50} />
                  </div>
                  <div>
                    <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs mb-1">Base de Operaciones</p>
                    <p className="text-white font-black text-lg">Región Centro, AR</p>
                  </div>
               </div>
            </div>
            
            <div className="glass-dark p-12 md:p-16 rounded-[4rem] border border-white/10 shadow-3xl">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Nombre del Negocio</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-lg font-medium outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white" placeholder="Ej. Arquitectura Nova" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Tu Email</label>
                    <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-lg font-medium outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-4">Rubro</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-lg font-medium outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-400 appearance-none">
                      <option>Contadores</option>
                      <option>Arquitectos</option>
                      <option>Inmobiliarias</option>
                      <option>Complejo Deportivo</option>
                      <option>Ferretería / Corralón</option>
                      <option>Kiosco / Almacén</option>
                      <option>Distribuidora</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-slate-950 font-black py-7 rounded-3xl text-xl hover:bg-white hover:scale-[1.02] transition-all shadow-2xl shadow-orange-500/20 uppercase tracking-widest">
                  Enviar a sistemsnova@gmail.com
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center">
            <Logo size={40} className="mb-8" />
            <div className="text-3xl font-black text-white tracking-tighter mb-4">
              NOVA <span className="text-orange-500 uppercase">Systems</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-4 text-sm leading-relaxed font-medium">
              Córdoba, Argentina | sistemsnova@gmail.com
            </p>
            <p className="text-slate-600 text-[9px] font-black tracking-[0.5em] uppercase">
              © {new Date().getFullYear()} NOVA SYSTEMS - OMNICHANNEL TECHNOLOGY
            </p>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;
