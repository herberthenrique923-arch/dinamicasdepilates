/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  BookOpen, 
  ChevronDown,
  Check,
  X,
  ShoppingCart,
  Star,
  Gift,
  Smile,
  ListChecks,
  Home,
  Layout,
  Trophy,
  Calendar,
  Sparkles,
  Users,
  Clock,
  Target,
  Lightbulb,
  Flame,
  Dumbbell,
  Activity,
  Play,
  Pause
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-4 mb-8 max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 p-6 text-white shadow-2xl">
      <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest">
        <Clock className="h-4 w-4" />
        OFERTA ESPECIAL EXPIRA EM:
      </div>
      <div className="flex justify-center gap-3">
        {[
          { label: "HORAS", value: timeLeft.hours },
          { label: "MIN", value: timeLeft.minutes },
          { label: "SEG", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl font-black text-indigo-600 shadow-inner">
              {String(item.value).padStart(2, '0')}
            </div>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-tighter opacity-80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-semibold text-stone-800"
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-2 text-stone-600 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

const SpecialOfferModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-stone-900/60 p-4 backdrop-blur-sm sm:items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="fixed inset-0"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative my-8 w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-2xl"
      >
        <h2 className="text-2xl font-black text-stone-800">Espere! Oferta Especial</h2>
        <p className="mt-2 text-sm font-medium text-stone-500">
          Leve o <span className="font-bold text-indigo-600">Plano Completo</span> com todos os bônus agora!
        </p>

        <div className="my-8 rounded-2xl bg-indigo-50 py-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-bold text-stone-400 line-through">De R$27</span>
            <span className="text-4xl font-black text-emerald-500">R$17</span>
          </div>
        </div>

        <div className="mb-8 space-y-3 text-left">
          {[
            "85 Dinâmicas Interativas",
            "BÔNUS: Aulas Prontas",
            "BÔNUS: Desafios Semanais",
            "BÔNUS: +20 Jogos Adaptados",
            "Acesso Vitalício"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check className="h-4 w-4 shrink-0 text-indigo-500" strokeWidth={3} />
              <span className="text-[13px] font-medium text-stone-600">{text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <a 
            href="https://pay.wiapy.com/A5ddhyXih9"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl bg-emerald-600 py-4 text-sm font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 active:scale-95"
          >
            COMPRAR O COMPLETO POR R$17
          </a>
          <a 
            href="https://pay.wiapy.com/Ez3hJHeB2H"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
          >
            Continuar com o Básico
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const PurchaseNotification = () => {
  const [currentPurchase, setCurrentPurchase] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const names = ["Juliana R.", "Marcos S.", "Ana P.", "Carla M.", "Beatriz L.", "Ricardo F.", "Fernanda O.", "Patrícia K.", "Luciana V.", "Gustavo M."];
  const locations = ["Salvador, BA", "São Paulo, SP", "Curitiba, PR", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Porto Alegre, RS", "Fortaleza, CE", "Brasília, DF", "Recife, PE", "Manaus, AM"];
  const products = ["Plano Básico", "Plano Profissional"];
  const times = ["agora mesmo", "há 2 minutos", "há 5 minutos", "há 12 minutos", "há 30 segundos"];

  const getRandomPurchase = () => ({
    name: names[Math.floor(Math.random() * names.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    product: products[Math.floor(Math.random() * products.length)],
    time: times[Math.floor(Math.random() * times.length)],
  });

  useEffect(() => {
    const triggerNotification = () => {
      const nextPurchase = getRandomPurchase();
      setCurrentPurchase(nextPurchase);
      
      // Delay before showing
      setTimeout(() => {
        setIsVisible(true);
        
        // Hide after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
          
          // Schedule next one with random delay between 15 and 45 seconds
          const nextDelay = Math.floor(Math.random() * (45000 - 15000) + 15000);
          setTimeout(triggerNotification, nextDelay);
        }, 5000);
      }, 1000);
    };

    // Initial trigger after 5 seconds
    const initialTimeout = setTimeout(triggerNotification, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  if (!currentPurchase) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 50, 
        y: isVisible ? 0 : -20,
        scale: isVisible ? 1 : 0.9
      }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed top-20 right-4 z-[150] flex items-center gap-4 rounded-[1.5rem] bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-emerald-50 md:top-24 md:right-8 md:p-5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-100 md:h-12 md:w-12">
        <Check className="h-5 w-5 md:h-6 md:w-6" strokeWidth={4} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-black text-stone-800 leading-tight">{currentPurchase.name}</span>
        <span className="text-[11px] font-medium text-stone-500 leading-tight">
          Comprou: <span className="font-bold text-indigo-600">{currentPurchase.product}</span>
        </span>
        <span className="mt-0.5 text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
          {currentPurchase.location} — {currentPurchase.time}
        </span>
      </div>
    </motion.div>
  );
};

export default function App() {
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isVideoMuted) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsVideoMuted(false);
        setIsPaused(false);
      } else {
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPaused(false);
        } else {
          videoRef.current.pause();
          setIsPaused(true);
        }
      }
    }
  };

  useEffect(() => {
    if (isOfferModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOfferModalOpen]);

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-stone-900 selection:bg-indigo-100">
      {/* Top Banner */}
      <div className="bg-indigo-600 py-3 px-4 text-center">
        <p className="text-[11px] font-black tracking-widest text-white uppercase md:text-sm">
          Acesso Imediato com Condição Especial — Só Hoje {currentDate}
        </p>
      </div>

      <SpecialOfferModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} />
      <PurchaseNotification />

      {/* Hero Section */}
      <header className="relative px-4 pt-10 pb-10 text-center md:px-6 md:pt-24 md:pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="mb-6 text-2xl font-black leading-tight tracking-tight text-stone-800 md:text-6xl md:leading-[1.1]">
            <span className="text-indigo-600">+85 Dinâmicas</span> interativas de Pilates para Aulas Mais <span className="text-indigo-600">Fluídas, Criativas e Eficientes</span> <span className="text-emerald-500">+ Bônus</span>
          </h1>
          
          <div className="mb-8 inline-block rounded-full border-2 border-indigo-200 bg-indigo-50 px-6 py-2 md:mb-10 md:px-8 md:py-3">
            <span className="text-xs font-black tracking-widest text-indigo-700 uppercase md:text-base">
              INOVAÇÃO • CRIATIVIDADE • RETENÇÃO
            </span>
          </div>

          <p className="mx-auto mb-10 max-w-2xl text-base font-medium leading-relaxed text-stone-500 md:mb-12 md:text-xl">
            Descubra como sair da rotina, aumentar o engajamento dos alunos e criar aulas mais dinâmicas, criativas e envolventes — <span className="font-bold text-stone-800">mesmo sem ter tempo para planejar.</span>
          </p>

          {/* TikTok Style Video VSL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mb-12 w-full max-w-[320px] overflow-hidden rounded-[3rem] bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:max-w-[350px]"
          >
            <div 
              onClick={handleVideoClick}
              className="relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[2.5rem] bg-stone-900 shadow-inner ring-1 ring-stone-200/50"
            >
              <video 
                ref={videoRef}
                className="h-full w-full object-cover"
                muted
                playsInline
                onEnded={() => setIsPaused(true)}
              >
                <source src="https://videotourl.com/videos/1776119144316-cd986e18-0945-4a80-bd9a-545009f3a91c.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
              
              {/* TikTok Style Mute Overlay Overlay */}
              {isVideoMuted && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-4 rounded-3xl bg-red-500/90 p-8 text-white backdrop-blur-sm shadow-xl animate-pulse">
                    <span className="text-sm font-black uppercase tracking-tighter">Clique aqui</span>
                    <div className="relative">
                      <Activity className="h-16 w-16 opacity-20 absolute -inset-2 animate-ping" />
                      <Zap className="h-12 w-12" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">para ativar o som</span>
                  </div>
                </div>
              )}

              {/* Pause Icon Overlay */}
              {!isVideoMuted && isPaused && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                  <div className="rounded-full bg-white/20 p-6 backdrop-blur-md">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <div className="mt-12 flex justify-center md:mt-16">
            <button 
              onClick={scrollToPricing}
              className="group relative flex items-center gap-3 rounded-full bg-emerald-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-emerald-200 transition-all hover:scale-105 hover:bg-emerald-700 active:scale-95 md:px-12 md:py-6 md:text-xl"
            >
              <Sparkles className="h-6 w-6 fill-white" />
              QUERO TRANSFORMAR MINHAS AULAS
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[10px] shadow-lg group-hover:animate-bounce">
                🔥
              </div>
            </button>
          </div>
        </motion.div>
      </header>

      {/* SEÇÃO DE DOR */}
      <section className="bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-black text-stone-900 md:text-4xl">Sente que suas aulas caíram na rotina?</h2>
              <p className="mb-8 text-lg text-stone-500">
                Muitas instrutoras de Pilates enfrentam os mesmos desafios todos os dias:
              </p>
              <div className="space-y-4">
                {[
                  "Aulas repetitivas e sem criatividade",
                  "Falta de ideias novas para surpreender os alunos",
                  "Alunos desmotivados que param de frequentar",
                  "Dificuldade em inovar e se destacar",
                  "Medo constante de perder alunos para a concorrência"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl bg-stone-50 p-4 border border-stone-100">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                      <X className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-stone-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[3rem] bg-indigo-100/50 blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Alunos de Pilates em atividade" 
                className="relative rounded-[2.5rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* APRESENTAÇÃO DA SOLUÇÃO */}
      <section className="bg-indigo-900 px-4 py-20 text-white md:px-6 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-black md:text-5xl">A Solução Definitiva para Instrutoras Criativas</h2>
          <p className="mb-12 text-lg opacity-80 md:text-xl">
            Apresentamos o Guia Prático com mais de <span className="font-bold text-indigo-400">85 Dinâmicas Interativas</span> prontas para aplicação imediata. Um material focado em simplicidade, praticidade e resultados no mesmo dia.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <Zap />, title: "Simplicidade", desc: "Passo a passo fácil de entender e executar." },
              { icon: <Target />, title: "Praticidade", desc: "Abra o guia e escolha a dinâmica em segundos." },
              { icon: <Activity />, title: "Aplicação Imediata", desc: "Use na sua próxima aula, sem complicações." }
            ].map((item, i) => (
              <div key={i} className="rounded-3xl bg-white/10 p-8 backdrop-blur-sm border border-white/10">
                <div className="mb-4 flex justify-center text-indigo-400">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-sm opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-white px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-stone-900 md:text-4xl">Por que você precisa deste guia?</h2>
            <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-indigo-500"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Ideias Infinitas", desc: "Nunca mais fique sem saber o que fazer na aula.", icon: <Lightbulb className="h-8 w-8" /> },
              { title: "Mais Engajamento", desc: "Torne seus alunos participantes ativos e motivados.", icon: <Users className="h-8 w-8" /> },
              { title: "Aulas Interessantes", desc: "Saia do óbvio e traga dinamismo para o estúdio.", icon: <Smile className="h-8 w-8" /> },
              { title: "Melhor Retenção", desc: "Alunos que se divertem e evoluem, não cancelam.", icon: <Heart className="h-8 w-8" /> },
              { title: "Destaque Profissional", desc: "Seja reconhecida como uma instrutora inovadora.", icon: <Trophy className="h-8 w-8" /> },
              { title: "Economia de Tempo", desc: "Planeje aulas incríveis em menos de 5 minutos.", icon: <Clock className="h-8 w-8" /> }
            ].map((item, i) => (
              <div key={i} className="group rounded-[2rem] border border-stone-100 bg-stone-50 p-8 transition-all hover:bg-indigo-600 hover:text-white">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 group-hover:bg-white/20 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-sm opacity-70 group-hover:opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-indigo-50 px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-stone-900 md:text-4xl">O que você encontra em cada dinâmica?</h2>
            <p className="mt-4 text-stone-500">Estrutura completa para você não ter dúvidas na hora de aplicar.</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Nome criativo e chamativo",
              "Objetivo técnico e emocional",
              "Passo a passo simples e direto",
              "Tempo estimado de aplicação",
              "Variações para diferentes níveis",
              "Dicas profissionais exclusivas"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm border border-indigo-100">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
                <span className="font-bold text-stone-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ VAI RECEBER */}
      <section className="bg-white px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-12 md:flex-row md:items-center">
            <div className="flex-1">
              <h2 className="mb-8 text-3xl font-black text-stone-900 md:text-4xl">Conteúdo Organizado por Categorias</h2>
              <div className="space-y-6">
                {[
                  { title: "Aquecimento Dinâmico", desc: "Prepare o corpo de forma lúdica e eficiente.", icon: <Activity /> },
                  { title: "Engajamento em Grupo", desc: "Dinâmicas para conectar os alunos entre si.", icon: <Users /> },
                  { title: "Foco em Emagrecimento", desc: "Dinâmicas com maior gasto calórico e intensidade.", icon: <Flame /> },
                  { title: "Consciência e Postura", desc: "Jogos que auxiliam no alinhamento e foco.", icon: <Layout /> },
                  { title: "Relaxamento Profundo", desc: "Encerramentos memoráveis para suas aulas.", icon: <Heart /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-800">{item.title}</h3>
                      <p className="text-sm text-stone-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="rounded-[3rem] bg-stone-900 p-8 text-white shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-indigo-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest">Acesso Digital</span>
                  <BookOpen className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-4 text-2xl font-black">Guia +85 Dinâmicas</h3>
                <p className="mb-8 text-sm opacity-60">Material completo, organizado e pronto para você usar no celular, tablet ou imprimir.</p>
                <ul className="space-y-3">
                  {["Acesso imediato após a compra", "Vitalício", "Suporte via e-mail", "Atualizações gratuitas"].map((text, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold">
                      <Check className="h-4 w-4 text-indigo-400" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="bg-stone-50 px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-stone-900 md:text-4xl">Bônus Exclusivos para você</h2>
            <p className="mt-4 text-stone-500">Disponíveis apenas na Oferta Completa.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Aulas Prontas", desc: "Roteiros completos de 50 minutos para aplicar.", icon: <Calendar /> },
              { title: "Desafios Semanais", desc: "Material para engajar alunos fora do estúdio.", icon: <Target /> },
              { title: "+20 Jogos Adaptados", desc: "Dinâmicas clássicas adaptadas para o Pilates.", icon: <Dumbbell /> }
            ].map((item, i) => (
              <div key={i} className="relative rounded-3xl bg-white p-8 shadow-xl border border-indigo-100">
                <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-white shadow-lg">
                  <Gift className="h-6 w-6" />
                </div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-stone-800">{item.title}</h3>
                <p className="text-sm text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA / PRICING */}
      <section id="pricing" className="bg-stone-50 px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-5xl">

          <CountdownTimer />
          
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-stone-900 md:text-5xl">Escolha seu plano</h2>
            <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-indigo-500"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Plano Básico */}
            <div className="flex flex-col rounded-[2rem] border-2 border-indigo-100 bg-white p-6 shadow-2xl shadow-indigo-100/50 md:p-10">
              <div className="mb-8 text-center">
                <h3 className="text-xl font-bold text-stone-800 uppercase tracking-widest">Plano Básico</h3>
                <div className="mt-6 flex flex-col items-center">
                  <span className="text-sm font-bold text-stone-400 line-through">R$ 47</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-emerald-500">R$ 9,90</span>
                  </div>
                  <span className="mt-1 text-xs font-bold text-stone-500 uppercase">pagamento único</span>
                  <div className="mt-4 text-center text-[11px] font-bold text-emerald-500">
                    Você economiza R$ 37,10
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-xl bg-stone-50 py-4 text-center">
                <p className="text-xs font-bold text-stone-600">+842 pessoas escolheram essa oferta</p>
              </div>

              <div className="mb-10 space-y-4 flex-grow">
                {[
                  "+85 Dinâmicas de Pilates PDF",
                  "Organizadas por objetivo",
                  "Acesso digital imediato",
                  "Atualizações mensais",
                  "Suporte prioritário",
                  "Garantia de 7 dias"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                    <span className="text-sm font-medium text-stone-700">{text}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsOfferModalOpen(true)}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 py-5 text-lg font-black text-white shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-95"
              >
                COMPRAR O BÁSICO
              </button>
            </div>

            {/* Plano Profissional */}
            <div className="relative flex flex-col rounded-[2rem] border-4 border-indigo-500 bg-white p-6 shadow-2xl shadow-indigo-200 md:p-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1 text-[10px] font-black text-white uppercase tracking-widest shadow-md">
                Mais escolhido 🔥
              </div>

              <div className="mb-8 text-center">
                <h3 className="text-xl font-bold text-indigo-600 uppercase tracking-widest">Plano Profissional</h3>
                <div className="mt-6 flex flex-col items-center">
                  <span className="text-sm font-bold text-stone-400 line-through">R$ 97</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-emerald-500">R$ 27,00</span>
                  </div>
                  <span className="mt-1 text-xs font-bold text-stone-500 uppercase">pagamento único</span>
                  <div className="mt-4 text-center text-[11px] font-bold text-emerald-500 leading-relaxed">
                    Você economiza R$ 70,00
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-xl bg-stone-50 py-4 text-center">
                <p className="text-xs font-bold text-stone-600">+1736 pessoas escolheram essa oferta</p>
              </div>

              <div className="mb-10 space-y-4 flex-grow">
                {[
                  "+85 Dinâmicas de Pilates PDF",
                  "Organizadas por objetivo",
                  "Acesso vitalício",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                    <span className="text-sm font-medium text-stone-700">{text}</span>
                  </div>
                ))}

                {[
                  { text: "Aulas Prontas (roteiros completos)", icon: Gift },
                  { text: "Desafios Semanais para alunos", icon: Gift },
                  { text: "+20 Jogos Adaptados para as aulas", icon: Gift }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-indigo-500">
                    <item.icon className="h-4 w-4" strokeWidth={3} />
                    <span className="text-sm font-bold uppercase tracking-tight">BÔNUS: {item.text}</span>
                  </div>
                ))}

                {[
                  "Atualizações mensais",
                  "Suporte prioritário",
                  "Garantia de 7 dias"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                    <span className="text-sm font-medium text-stone-700">{text}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://pay.wiapy.com/g54lrsXK34"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 py-5 text-lg font-black text-white shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-95"
              >
                COMPRAR O COMPLETO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERT SECTION */}
      <section className="bg-white px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-stone-100 bg-stone-50/50 p-6 md:rounded-[3rem] md:p-16 shadow-sm">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <div className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                Sobre a Especialista
              </div>
              <h2 className="mb-2 text-3xl font-black text-stone-900 md:text-4xl">
                Juliana Martins Rocha
              </h2>
              <p className="mb-8 text-sm font-bold text-indigo-600 uppercase tracking-tight md:text-base">
                Instrutora de Pilates e Especialista em Aulas Dinâmicas e Engajamento de Alunos
              </p>
              
              <div className="space-y-4 text-sm leading-relaxed text-stone-600 md:text-base">
                <p>
                  “Depois de anos dando aulas de pilates, percebi que o maior problema não era a falta de exercícios — era a falta de dinamismo nas aulas.
                </p>
                <p>
                  Muitos alunos começavam motivados, mas com o tempo perdiam o interesse por aulas repetitivas e previsíveis.
                </p>
                <p>
                  Foi então que comecei a testar dinâmicas diferentes, formas mais interativas e estratégias simples para tornar cada aula mais envolvente.
                </p>
                <p>
                  Com o tempo, percebi um aumento enorme no engajamento, na motivação e na retenção dos alunos.
                </p>
                <p>
                  Foi assim que organizei todas essas estratégias em um método simples, prático e fácil de aplicar — para que qualquer instrutor consiga transformar suas aulas sem complicação.”
                </p>
              </div>

              {/* Authority Numbers */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-y border-stone-200 py-8 text-center">
                <div>
                  <p className="text-xl font-black text-indigo-600 md:text-2xl">+2.500</p>
                  <p className="text-[8px] font-bold uppercase tracking-tighter text-stone-400 md:text-[10px]">Alunos Impactados</p>
                </div>
                <div>
                  <p className="text-xl font-black text-indigo-600 md:text-2xl">8+</p>
                  <p className="text-[8px] font-bold uppercase tracking-tighter text-stone-400 md:text-[10px]">Anos de Experiência</p>
                </div>
                <div>
                  <p className="text-xl font-black text-indigo-600 md:text-2xl">+85</p>
                  <p className="text-[8px] font-bold uppercase tracking-tighter text-stone-400 md:text-[10px]">Dinâmicas Testadas</p>
                </div>
              </div>

              {/* Benefits List */}
              <div className="mt-10 space-y-3">
                {[
                  "Baseado em experiência real em aulas de pilates",
                  "Aplicado com alunos de diferentes níveis",
                  "Focado em engajamento e retenção",
                  "Linguagem simples e aplicação prática"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-3 w-3" strokeWidth={4} />
                    </div>
                    <span className="text-sm font-medium text-stone-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative mx-auto max-w-[280px] md:max-w-sm">
                <div className="absolute -inset-4 rounded-[3rem] bg-indigo-200/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl md:rounded-[3rem] md:border-8">
                  <img 
                    src="https://i.postimg.cc/7ZzvG00W/3dc15cb56134e787d1a043c96f44f1ab-balance-ball-exercises-exercises-for-hips.jpg" 
                    alt="Juliana Martins Rocha" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUEBRA DE OBJEÇÕES */}
      <section className="bg-white px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-stone-900 md:text-4xl">Dúvidas Frequentes</h2>
            <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-indigo-500"></div>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "É difícil aplicar as dinâmicas?",
                a: "De forma alguma! Cada dinâmica foi escrita com um passo a passo simples e direto, para que você possa ler e aplicar na mesma hora, sem complicação."
              },
              {
                q: "Preciso de equipamentos caros?",
                a: "Não. A grande maioria das dinâmicas utiliza apenas o que você já tem no estúdio ou itens simples do dia a dia. Focamos em criatividade, não em custo."
              },
              {
                q: "Serve para alunos iniciantes?",
                a: "Sim! O guia inclui variações para diferentes níveis de prática, permitindo que você adapte as dinâmicas tanto para quem está começando quanto para alunos avançados."
              },
              {
                q: "Como recebo o material?",
                a: "O acesso é imediato. Assim que o pagamento for confirmado, você receberá um e-mail com o link para download do PDF e acesso aos bônus."
              }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-stone-100 bg-stone-50 p-2 shadow-sm">
                <FAQItem question={item.q} answer={item.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="bg-indigo-50 px-4 py-16 md:px-6 md:py-32">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-white p-8 text-center shadow-2xl border-2 border-indigo-500 md:rounded-[3rem] md:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 md:mb-8 md:h-24 md:w-24">
            <ShieldCheck className="h-10 w-10 md:h-12 md:w-12" />
          </div>
          <h2 className="mb-4 text-2xl font-black text-stone-900 md:text-3xl">Garantia Incondicional</h2>
          <p className="mb-8 text-base text-stone-500 md:text-lg">
            Você tem <span className="font-bold text-stone-800">7 dias</span> para testar o material. Se sentir que não agregou valor às suas aulas ou não era o que você esperava, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest md:text-xs">
            <Check className="h-4 w-4" />
            Risco Zero para você
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-stone-900 px-4 py-20 text-center text-white md:px-6 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-indigo-500 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-500 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-black leading-tight md:mb-8 md:text-6xl">
            Pronta para dar um novo fôlego às suas aulas?
          </h2>
          <p className="mb-10 text-base opacity-60 md:mb-12 md:text-xl">
            Junte-se a centenas de instrutoras que já estão transformando a experiência de seus alunos com o Guia +85 Dinâmicas de Pilates.
          </p>
          <button 
            onClick={scrollToPricing}
            className="mx-auto flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-5 text-base font-black text-white shadow-2xl shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-emerald-400 active:scale-95 md:px-12 md:py-6 md:text-xl"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            QUERO ACESSAR AGORA E TRANSFORMAR MINHAS AULAS
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 px-6 py-16 text-center text-stone-500">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center gap-6">
            <Heart className="h-6 w-6 opacity-20" />
            <Activity className="h-6 w-6 opacity-20" />
            <Sparkles className="h-6 w-6 opacity-20" />
          </div>
          <p className="mb-4 text-sm font-medium">
            © 2025 Pilates Dinâmicas. Todos os direitos reservados.
          </p>
          <p className="text-[10px] leading-relaxed opacity-40 max-w-lg mx-auto">
            Este produto não substitui o aconselhamento profissional. Sempre consulte um profissional de saúde antes de iniciar qualquer prática de exercícios.
          </p>
        </div>
      </footer>

      {/* STICKY CTA MOBILE */}
      <div className="fixed bottom-0 left-0 z-[90] w-full border-t border-stone-100 bg-white/90 p-4 backdrop-blur-xl md:hidden">
        <button 
          onClick={scrollToPricing}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 font-black text-white shadow-lg active:scale-95"
        >
          <ShoppingCart className="h-5 w-5" />
          QUERO O GUIA AGORA
        </button>
      </div>
    </div>
  );
}
