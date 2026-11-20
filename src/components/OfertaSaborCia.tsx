import React, { useState, useEffect, useRef } from 'react';

const OFERTA = {
  selosCard: 'OFERTA DE HOJE',
  tituloCard: 'Combo Noite Perfeita',
  subtitulo: 'Pizza Margherita + X-Bacon Especial quentinhos na sua casa.',
  nomeCombo: 'Pizza + X-Bacon Especial',
  precoAntigo: 'R$ 80,80',
  precoNovo: 'R$ 59,90',
  textoBotao: 'QUERO ESSE COMBO AGORA',
  whatsappLink:
    'https://wa.me/5567993174612?text=Ol%C3%A1!%20Vi%20a%20oferta%20do%20Combo%20Noite%20Perfeita%20(R%24%2059%2C90)%20no%20site%20e%20quero%20pedir%20agora!',
  imagemCard:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80',
  imagemModal:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80',
  // Cronômetro perpétuo para prospecção: sempre inicia com 2h 47m 18s
  segundosIniciais: 2 * 3600 + 47 * 60 + 18,
};

export default function OfertaSaborCia() {
  const [modalAberto, setModalAberto] = useState(false);
  const [segundos, setSegundos] = useState(OFERTA.segundosIniciais);
  const cardRef = useRef<HTMLElement | null>(null);
  const jaAbriuNestaVisita = useRef(false);

  // 1. Cronômetro regressivo contínuo (reinicia se zerar, ideal para demo)
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((prev) => (prev > 1 ? prev - 1 : OFERTA.segundosIniciais));
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  // 2. Abre o pop-up automaticamente quando o cliente rola até o card
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !jaAbriuNestaVisita.current) {
          jaAbriuNestaVisita.current = true;
          timer = setTimeout(() => {
            setModalAberto(true);
          }, 500);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Trava o scroll do fundo quando o modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = modalAberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalAberto]);

  const horas = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const segs = String(segundos % 60).padStart(2, '0');

  const blocosTempo = [
    { valor: horas, label: 'horas' },
    { valor: minutos, label: 'min' },
    { valor: segs, label: 'seg' },
  ];

  return (
    <>
      {/* ===== 1. CARD DE OFERTA NO CORPO DO BIOLINK ===== */}
      <section
        ref={cardRef}
        className="w-full max-w-md mx-auto my-6 px-4"
      >
        <div className="rounded-[28px] overflow-hidden bg-gradient-to-b from-[#1a110b] to-[#0f0906] text-white shadow-xl border border-orange-500/20">
          {/* Imagem com selo terracota no estilo da página */}
          <div className="relative h-52 w-full bg-zinc-900">
            <img
              src={OFERTA.imagemCard}
              alt={OFERTA.tituloCard}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a110b] via-transparent to-black/25" />
            <span className="absolute top-3.5 right-3.5 bg-[#c23b1c] text-white text-[11px] font-extrabold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-md">
              {OFERTA.selosCard}
            </span>
          </div>

          {/* Conteúdo */}
          <div className="p-5 pt-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              {OFERTA.tituloCard}
            </h2>
            {/* Barrinha degradê laranja igual à seção Mais pedidos / Nossos Produtos */}
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#f59e0b] my-2.5" />
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              {OFERTA.subtitulo}
            </p>

            {/* Box de preço */}
            <div className="bg-white/5 border border-orange-400/20 rounded-2xl p-4 mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-stone-300 text-xs uppercase tracking-wider font-semibold">
                  {OFERTA.nomeCombo}
                </p>
                <p className="text-stone-400 text-xs line-through mt-0.5">
                  De {OFERTA.precoAntigo}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-amber-400 font-semibold block">
                  Por apenas
                </span>
                <p className="text-2xl font-black text-white leading-tight">
                  {OFERTA.precoNovo}
                </p>
              </div>
            </div>

            {/* Cronômetro do card */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {blocosTempo.map((item) => (
                <div
                  key={item.label}
                  className="bg-black/40 border border-white/10 rounded-xl py-2.5 text-center"
                >
                  <div className="text-2xl font-black text-amber-400 leading-none tabular-nums">
                    {item.valor}
                  </div>
                  <div className="text-[11px] text-stone-400 uppercase tracking-wide mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Botão CTA degradê laranja */}
            <a
              href={OFERTA.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#f59e0b] hover:brightness-110 active:scale-[0.99] transition-all text-black font-extrabold text-sm tracking-wide py-4 rounded-2xl shadow-lg shadow-orange-600/25"
            >
              <span>{OFERTA.textoBotao}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== 2. MODAL POP-UP ACIONADO AO DESLIZAR ===== */}
      {modalAberto && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalAberto(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[3px] p-4 animate-fadeIn"
        >
          <div className="w-full max-w-sm rounded-[28px] overflow-hidden bg-white shadow-2xl border border-orange-500/20">
            {/* Cabeçalho escuro + toque laranja da marca */}
            <div className="relative bg-gradient-to-r from-[#1a110b] via-[#2b150a] to-[#1a110b] text-white text-center px-10 py-4 border-b-2 border-[#ea580c]">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-amber-400">
                🔥 Oferta especial no site
              </p>
              <h3 className="text-xl font-extrabold mt-0.5 text-white">
                {OFERTA.tituloCard}
              </h3>

              {/* Botão circular fechar X */}
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                aria-label="Fechar oferta"
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white text-[#1a110b] ring-4 ring-orange-500/35 flex items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Foto chamativa no modal */}
            <div className="relative h-44 w-full bg-zinc-900">
              <img
                src={OFERTA.imagemModal}
                alt={OFERTA.nomeCombo}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2.5 left-3 bg-[#c23b1c] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                Economize R$ 20,90 hoje
              </span>
            </div>

            {/* Corpo branco de alto contraste */}
            <div className="p-5 text-center">
              <p className="text-xs font-semibold text-stone-400 line-through">
                De {OFERTA.precoAntigo}
              </p>
              <p className="text-4xl font-black text-[#c23b1c] tracking-tight leading-none mt-0.5">
                {OFERTA.precoNovo}
              </p>
              <p className="text-stone-600 text-xs mt-2 mb-4 px-2">
                {OFERTA.subtitulo}
              </p>

              {/* Cronômetro escuro de urgência */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {blocosTempo.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#1a110b] text-white rounded-xl py-2.5 text-center"
                  >
                    <div className="text-xl font-black text-amber-400 leading-none tabular-nums">
                      {item.valor}
                    </div>
                    <div className="text-[10px] text-stone-400 uppercase mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão principal para pedido */}
              <a
                href={OFERTA.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#c23b1c] via-[#ea580c] to-[#f59e0b] hover:brightness-110 transition-all text-white font-extrabold text-sm py-3.5 rounded-full shadow-lg shadow-orange-600/30"
              >
                {OFERTA.textoBotao}
              </a>

              {/* Dispensar oferta */}
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="mt-3 text-xs text-stone-400 underline hover:text-stone-600 cursor-pointer"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
