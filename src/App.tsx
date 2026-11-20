import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Star,
  Copy,
  Check,
  Search,
  LayoutGrid,
  List,
  Phone,
  Plus,
  Minus,
  Trash2,
  X,
  Sparkles,
  Clock,
  Flame,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ThumbsUp,
  Share2,
  MoreVertical,
} from 'lucide-react';
import {
  STORE_CONFIG,
  IMAGES,
  Product,
  ProductVideoItem,
  PIZZA_SIZES,
  PIZZA_COMPLEMENTS_DEFAULT,
  LANCHE_ADDITIONALS,
} from './data/storeData';
import OfertaSaborCia from './components/OfertaSaborCia';

interface SelectedAdditionalItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartItem {
  cartItemId: string;
  productId: string;
  category: Product['category'];
  name: string;
  unitPrice: number;
  quantity: number;
  img: string;
  selectedSize?: 'Média' | 'Grande';
  selectedAdditionals?: SelectedAdditionalItem[];
  observations?: string;
  customDetails?: string;
}

function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0012.031 2zm5.829 14.148c-.246.693-1.432 1.325-1.988 1.411-.51.078-1.156.111-1.869-.115-.432-.137-.986-.32-1.695-.626-2.984-1.288-4.933-4.293-5.082-4.492-.149-.199-1.214-1.615-1.214-3.081 0-1.466.768-2.187 1.041-2.485.273-.298.595-.373.794-.373.198 0 .397.002.57.01.183.009.428-.07.67.511.248.596.843 2.061.917 2.21.075.149.124.323.025.521-.099.199-.149.323-.298.497-.149.174-.313.388-.447.521-.149.149-.303.31-.13.608.174.298.771 1.272 1.656 2.061 1.138 1.014 2.097 1.329 2.395 1.478.298.149.471.124.645-.075.174-.199.744-.869.942-1.167.199-.298.397-.248.67-.149.273.099 1.736.819 2.034.968.298.149.496.224.57.348.075.124.075.72-.171 1.413z" />
    </svg>
  );
}

function PixDiamondIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
      <path d="M8.5 8.5l7 7" />
      <path d="M15.5 8.5l-7 7" />
    </svg>
  );
}

function YouTubeShortsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zM10 14.65v-5.3L15 12l-5 2.65z" />
    </svg>
  );
}

function InstagramReelsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M2 8h20" />
      <path d="M7 2l3 6" />
      <path d="M14 2l3 6" />
      <polygon points="10 11 16 14.5 10 18 10 11" fill="currentColor" />
    </svg>
  );
}

function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = IMAGES.pizzaArtesanal,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      className={className}
      loading="lazy"
    />
  );
}

export default function App() {
  // Pix Accordion & Copy state
  const [pixOpen, setPixOpen] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  // Catalog filter, search, sort, view mode, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'relevancia' | 'menor-preco' | 'maior-preco'>('relevancia');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Inline Interactive Builder State (Pizza & Burger Quick Builder)
  const [inlineBuilderTab, setInlineBuilderTab] = useState<'pizza' | 'lanche'>('pizza');
  const [inlinePizzaProduct, setInlinePizzaProduct] = useState<Product>(
    STORE_CONFIG.products[0]
  );
  const [inlinePizzaSize, setInlinePizzaSize] = useState<'Média' | 'Grande'>('Grande');
  const [inlinePizzaBorda, setInlinePizzaBorda] = useState<boolean>(true);
  const [inlineLancheProduct, setInlineLancheProduct] = useState<Product>(
    STORE_CONFIG.products[4]
  );
  const [inlineLancheExtras, setInlineLancheExtras] = useState<string[]>([
    'Bacon',
    'Catupiry',
  ]);

  // Product Customization Modal State (When clicking on a Pizza or Lanche card)
  const [customModalProduct, setCustomModalProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState<'Média' | 'Grande'>('Média');
  const [modalAdditionals, setModalAdditionals] = useState<Record<string, number>>({});
  const [modalObservations, setModalObservations] = useState('');

  // Shopping Cart & Checkout Form State (Matches Cardápio Magnético)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<
    'Pix' | 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito'
  >('Pix');
  const [changeFor, setChangeFor] = useState('');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // FAQ open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Shorts & Reels ("Nossos Produtos") Carousel State
  const [playingVideoId, setPlayingVideoId] = useState<string | null>('vid-1');
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});

  const toggleVideoLike = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const handleShareVideo = (video: ProductVideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Confira ${video.title} no ${STORE_CONFIG.name}! Peça pelo WhatsApp:`;
    const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${window.location.href}`
    )}`;
    openExternalLink(waShareUrl);
  };

  const handleOrderFromVideo = (video: ProductVideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const foundProduct = STORE_CONFIG.products.find(
      (p) => p.id === video.productId
    );
    if (foundProduct) {
      handleProductClick(foundProduct);
    }
  };

  // Weekly Promo Countdown State
  const [countdown, setCountdown] = useState({
    days: 4,
    hours: 11,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              days = days > 0 ? days - 1 : 4;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setAddedToast(msg);
    setTimeout(() => {
      setAddedToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_CONFIG.pixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const toggleInlineLancheExtra = (extraName: string) => {
    setInlineLancheExtras((prev) =>
      prev.includes(extraName)
        ? prev.filter((item) => item !== extraName)
        : [...prev, extraName]
    );
  };

  const inlineBuilderTotal = useMemo(() => {
    if (inlineBuilderTab === 'pizza') {
      const sizeMod = inlinePizzaSize === 'Grande' ? 10 : 0;
      const bordaMod = inlinePizzaBorda ? 8 : 0;
      return inlinePizzaProduct.price + sizeMod + bordaMod;
    } else {
      const extrasSum = inlineLancheExtras.reduce((acc, name) => {
        const found = LANCHE_ADDITIONALS.find((a) => a.name === name);
        return acc + (found ? found.price : 0);
      }, 0);
      return inlineLancheProduct.price + extrasSum;
    }
  }, [
    inlineBuilderTab,
    inlinePizzaProduct,
    inlinePizzaSize,
    inlinePizzaBorda,
    inlineLancheProduct,
    inlineLancheExtras,
  ]);

  const addInlineBuilderToCart = () => {
    if (inlineBuilderTab === 'pizza') {
      const selectedAddList: SelectedAdditionalItem[] = inlinePizzaBorda
        ? [{ name: 'Borda recheada', price: 8.0, quantity: 1 }]
        : [];
      const detailsParts = [
        `Tamanho: ${inlinePizzaSize} (${
          inlinePizzaSize === 'Grande' ? '35 cm • 8 fatias' : '30 cm • 6 fatias'
        })`,
      ];
      if (inlinePizzaBorda) {
        detailsParts.push('Com Borda recheada (+R$ 8,00)');
      }

      const cartItemId = `inline-pizza-${inlinePizzaProduct.id}-${inlinePizzaSize}-${inlinePizzaBorda}`;
      setCart((prev) => {
        const existing = prev.find((i) => i.cartItemId === cartItemId);
        if (existing) {
          return prev.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [
          ...prev,
          {
            cartItemId,
            productId: inlinePizzaProduct.id,
            category: 'pizzas',
            name: inlinePizzaProduct.name,
            unitPrice: inlineBuilderTotal,
            quantity: 1,
            img: inlinePizzaProduct.img,
            selectedSize: inlinePizzaSize,
            selectedAdditionals: selectedAddList,
            customDetails: detailsParts.join(' • '),
          },
        ];
      });
      showToast(`${inlinePizzaProduct.name} (${inlinePizzaSize}) adicionada!`);
    } else {
      const selectedAddList: SelectedAdditionalItem[] = inlineLancheExtras
        .map((name) => {
          const found = LANCHE_ADDITIONALS.find((a) => a.name === name);
          return found ? { name: found.name, price: found.price, quantity: 1 } : null;
        })
        .filter((x): x is SelectedAdditionalItem => x !== null);

      const detailsText =
        selectedAddList.length > 0
          ? `Adicionais: ${selectedAddList.map((a) => a.name).join(', ')}`
          : 'Sem adicionais extras';

      const cartItemId = `inline-lanche-${inlineLancheProduct.id}-${inlineLancheExtras
        .slice()
        .sort()
        .join(',')}`;

      setCart((prev) => {
        const existing = prev.find((i) => i.cartItemId === cartItemId);
        if (existing) {
          return prev.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [
          ...prev,
          {
            cartItemId,
            productId: inlineLancheProduct.id,
            category: 'lanches',
            name: inlineLancheProduct.name,
            unitPrice: inlineBuilderTotal,
            quantity: 1,
            img: inlineLancheProduct.img,
            selectedAdditionals: selectedAddList,
            customDetails: detailsText,
          },
        ];
      });
      showToast(`${inlineLancheProduct.name} adicionado à sacola!`);
    }
  };

  const handleProductClick = (product: Product) => {
    if (
      (product.sizes && product.sizes.length > 0) ||
      (product.additionals && product.additionals.length > 0)
    ) {
      setCustomModalProduct(product);
      setModalSize('Média');
      setModalAdditionals({});
      setModalObservations('');
      return;
    }

    const cartItemId = `prod-${product.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          category: product.category,
          name: product.name,
          unitPrice: product.price,
          quantity: 1,
          img: product.img,
        },
      ];
    });
    showToast(`${product.name} adicionado à sacola!`);
  };

  const updateModalAdditionalQty = (name: string, delta: number) => {
    setModalAdditionals((prev) => {
      const next = (prev[name] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return { ...prev, [name]: next };
    });
  };

  const modalCalculatedPrice = useMemo(() => {
    if (!customModalProduct) return 0;
    let total = customModalProduct.price;
    if (customModalProduct.sizes) {
      const sizeObj = customModalProduct.sizes.find((s) => s.name === modalSize);
      if (sizeObj) total += sizeObj.priceModifier;
    }
    const availableAddList =
      customModalProduct.complements || customModalProduct.additionals || [];
    for (const [name, qty] of Object.entries(modalAdditionals)) {
      const found = availableAddList.find((a) => a.name === name);
      if (found && qty > 0) {
        total += found.price * qty;
      }
    }
    return total;
  }, [customModalProduct, modalSize, modalAdditionals]);

  const confirmModalCustomization = () => {
    if (!customModalProduct) return;
    const availableAddList =
      customModalProduct.complements || customModalProduct.additionals || [];
    const selectedAddItems: SelectedAdditionalItem[] = Object.entries(modalAdditionals)
      .map(([name, quantity]) => {
        const found = availableAddList.find((a) => a.name === name);
        return found && quantity > 0
          ? { name, price: found.price, quantity }
          : null;
      })
      .filter((x): x is SelectedAdditionalItem => x !== null);

    const detailsParts: string[] = [];
    if (customModalProduct.sizes) {
      detailsParts.push(
        `Tamanho: ${modalSize} (${
          modalSize === 'Grande' ? '35 cm • 8 fatias' : '30 cm • 6 fatias'
        })`
      );
    }
    if (selectedAddItems.length > 0) {
      detailsParts.push(
        `Adicionais: ${selectedAddItems
          .map((a) => `${a.quantity}x ${a.name}`)
          .join(', ')}`
      );
    }
    if (modalObservations.trim()) {
      detailsParts.push(`Obs: ${modalObservations.trim()}`);
    }

    const cartItemId = `custom-${customModalProduct.id}-${
      customModalProduct.sizes ? modalSize : 'std'
    }-${selectedAddItems.map((a) => `${a.name}:${a.quantity}`).join('|')}-${modalObservations.trim()}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: customModalProduct.id,
          category: customModalProduct.category,
          name: customModalProduct.name,
          unitPrice: modalCalculatedPrice,
          quantity: 1,
          img: customModalProduct.img,
          selectedSize: customModalProduct.sizes ? modalSize : undefined,
          selectedAdditionals:
            selectedAddItems.length > 0 ? selectedAddItems : undefined,
          observations: modalObservations.trim() || undefined,
          customDetails: detailsParts.join(' • ') || undefined,
        },
      ];
    });

    const titleSuffix = customModalProduct.sizes ? ` (${modalSize})` : '';
    showToast(`${customModalProduct.name}${titleSuffix} adicionado!`);
    setCustomModalProduct(null);
  };

  const addWeeklyComboToCart = () => {
    const cartItemId = 'combo-familia-sabor-cia';
    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: 'combo-semana',
          category: 'pizzas',
          name: 'Combo Noite Sabor & Cia | Pizza Grande 35cm + Coca-Cola 2L',
          unitPrice: 59.9,
          quantity: 1,
          img: IMAGES.pizzaArtesanal,
          selectedSize: 'Grande',
          customDetails: 'Pizza Grande 35cm (8 fatias) + Coca-Cola 2L Gelada',
        },
      ];
    });
    showToast('Combo da Semana adicionado à sacola!');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const totalCartPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const isMinimumOrderMet = totalCartPrice >= STORE_CONFIG.minimumOrder;

  const openExternalLink = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const sendOrderToWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCheckoutError(null);

    if (cart.length === 0) {
      const defaultUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        'Olá! Quero fazer um pedido no Sabor & Cia (Cardápio Magnético).'
      )}`;
      openExternalLink(defaultUrl);
      return;
    }

    if (!isMinimumOrderMet) {
      setCheckoutError(
        `O pedido mínimo é de ${formatBRL(STORE_CONFIG.minimumOrder)}. Adicione mais ${formatBRL(
          STORE_CONFIG.minimumOrder - totalCartPrice
        )} para continuar.`
      );
      return;
    }

    if (!customerName.trim() || !customerWhatsapp.trim() || !customerAddress.trim()) {
      setCheckoutError(
        'Por favor, preencha seu Nome, WhatsApp e Endereço de entrega para enviar o pedido.'
      );
      return;
    }

    const groupedByCategory = cart.reduce<Record<string, CartItem[]>>((acc, item) => {
      const label =
        item.category === 'pizzas'
          ? 'Pizzas'
          : item.category === 'lanches'
          ? 'Lanches'
          : item.category === 'bebidas'
          ? 'Bebidas'
          : 'Sobremesas';
      if (!acc[label]) acc[label] = [];
      acc[label].push(item);
      return acc;
    }, {});

    const lines: string[] = [
      `Olá, meu nome é *${customerName.trim()}*. Meu pedido é:`,
      `*${STORE_CONFIG.name}* — 📍 ${STORE_CONFIG.city}`,
      '',
    ];

    Object.entries(groupedByCategory).forEach(([catName, items]) => {
      lines.push(`*${catName}:*`);
      items.forEach((item) => {
        const sizeLabel = item.selectedSize ? ` (${item.selectedSize})` : '';
        lines.push(
          `• ${item.quantity}x ${item.name}${sizeLabel} - ${formatBRL(
            item.unitPrice * item.quantity
          )}`
        );
        if (item.selectedAdditionals && item.selectedAdditionals.length > 0) {
          lines.push('  Adicionais:');
          item.selectedAdditionals.forEach((add) => {
            lines.push(
              `    - ${add.quantity}x ${add.name} (${formatBRL(
                add.price * add.quantity
              )})`
            );
          });
        }
        if (item.observations) {
          lines.push(`  🗒️ Observações: ${item.observations}`);
        } else if (item.customDetails && !item.selectedAdditionals) {
          lines.push(`  _${item.customDetails}_`);
        }
      });
      lines.push('');
    });

    lines.push(`*Total: ${formatBRL(totalCartPrice)}*`);
    lines.push(`*WhatsApp:* ${customerWhatsapp.trim()}`);
    lines.push(`*Endereço de entrega:* ${customerAddress.trim()}`);
    lines.push(`*Forma de pagamento:* ${paymentMethod}`);
    if (paymentMethod === 'Dinheiro' && changeFor.trim()) {
      lines.push(`*Troco para:* R$ ${changeFor.trim()}`);
    }
    if (paymentMethod === 'Pix') {
      lines.push(`*Chave Pix:* ${STORE_CONFIG.pixKey}`);
    }

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
    openExternalLink(url);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...STORE_CONFIG.products];

    if (activeCategory === 'mais-vendidos') {
      list = list.filter((p) => p.bestSeller);
    } else if (activeCategory !== 'todos') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'menor-preco') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'maior-preco') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen bg-[#efe6dc] text-[#261c16] flex justify-center">
      {/* Main Mobile-First Container (BiositesAi Template with Cardápio Magnético Colors & Data) */}
      <main className="w-full max-w-[480px] bg-[#fcfaf7] min-h-screen shadow-2xl overflow-x-hidden relative pb-28">
        {/* 1. HERO / CABEÇALHO COM VÍDEO DE FUNDO (HERO BURGER) */}
        <header className="relative w-full min-h-[540px] flex flex-col justify-between overflow-hidden bg-zinc-950 text-white shadow-2xl">
          {/* Vídeo de Fundo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={IMAGES.lancheBurger}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source
              src="/assets/aistudio/89154013_1794775977527166_ae9014a5.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay Escuro + Gradiente de Transição na Base */}
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-black/30" />

          {/* Topo: Status de Funcionamento e Avaliação */}
          <div className="relative z-10 flex items-center justify-between p-5">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/85 border border-zinc-800 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                Aberto Agora
              </span>
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-900/85 border border-zinc-800 backdrop-blur-md text-xs font-semibold text-amber-400 tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{STORE_CONFIG.rating}</span>
            </div>
          </div>

          {/* Centro/Base: Identidade da Hamburgueria & Pizzaria e CTA */}
          <div className="relative z-10 px-6 pb-10 pt-8 flex flex-col items-center text-center">
            {/* Logo */}
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border-2 border-amber-500/80 p-1 shadow-lg shadow-amber-500/20 mb-4 overflow-hidden">
              <SafeImage
                src={IMAGES.logo}
                fallbackSrc={IMAGES.lancheBurger}
                alt={`Logo ${STORE_CONFIG.name}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Badge de Especialidade */}
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold tracking-wider uppercase mb-2">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Burgers na Chapa & Pizzas Artesanais</span>
            </div>

            {/* Título e Subtítulo */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 drop-shadow-md">
              {STORE_CONFIG.name}
            </h1>
            <p className="text-sm text-zinc-200 max-w-xs mb-5 leading-relaxed">
              Blend suculento com queijo cheddar derretido no vapor, pão brioche selado na manteiga e pizzas artesanais quentinhas.
            </p>

            {/* Informações Rápidas (Tempo e Local) */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-300 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {STORE_CONFIG.averageDeliveryTime}
              </span>
              <span>•</span>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('onde-estamos')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-1 hover:text-amber-400 transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {STORE_CONFIG.city} • Delivery & Retirada
              </button>
            </div>

            {/* Botão Principal de Pedido */}
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Olá! Vim pelo Biosite do Sabor & Cia e quero fazer um pedido 🍔🍕'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 font-extrabold text-base shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-zinc-950 stroke-zinc-950 transition-transform group-hover:scale-110" />
              <span>FAZER PEDIDO AGORA</span>
            </a>
          </div>

          {/* Wave Separator at the bottom of the Hero */}
          <div className="relative z-10 -mb-1">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-9 preserve-3d"
              preserveAspectRatio="none"
            >
              <path
                d="M0 64L80 58.7C160 53 320 43 480 48C640 53 800 75 960 80C1120 85 1280 75 1360 69.3L1440 64V120H1360C1280 120 1120 120 960 120C800 120 640 120 480 120C320 120 160 120 80 120H0V64Z"
                fill="#fcfaf7"
              />
            </svg>
          </div>
        </header>

        {/* 2. LETREIRO ANIMADO (MARQUEE LARANJA/TERRACOTA INCLINADO) */}
        <div className="relative z-20 -mt-2 mb-3 -mx-2 transform -rotate-[1.2deg]">
          <div className="bg-[#b82d0b] text-white py-2.5 overflow-hidden shadow-md border-y border-orange-400/30 font-bold text-xs tracking-[0.12em] uppercase">
            <div className="animate-marquee flex items-center gap-6">
              <span>SABOR QUE CHEGA QUENTINHO</span>
              <span className="text-[#ffc029]">★</span>
              <span>PIZZAS 30CM E 35CM</span>
              <span className="text-[#ffc029]">★</span>
              <span>LANCHES COM +17 ADICIONAIS</span>
              <span className="text-[#ffc029]">★</span>
              <span>ENTREGA EM 40-50 MIN</span>
              <span className="text-[#ffc029]">★</span>
              <span>PEDIDO MÍNIMO R$ 25,00</span>
              <span className="text-[#ffc029]">★</span>
              <span>SABOR QUE CHEGA QUENTINHO</span>
              <span className="text-[#ffc029]">★</span>
              <span>PIZZAS 30CM E 35CM</span>
              <span className="text-[#ffc029]">★</span>
            </div>
          </div>
        </div>

        {/* 3. LINKS DE NAVEGAÇÃO RÁPIDA (MODELO BIOSITESAI COM CORES CARDÁPIO MAGNÉTICO) */}
        <section className="px-4 pt-2 pb-3 space-y-3" aria-label="Links principais">
          {/* CTA 1: Fazer pedido no WhatsApp (Card Laranja/Coral Degradê) */}
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Olá! Quero fazer um pedido no Sabor & Cia.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#d43d11] via-[#f96b1f] to-[#ff9f3d] text-white shadow-md hover:brightness-105 transition active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-black/20 px-2.5 py-0.5 rounded-full mb-1">
                  <span>Atendimento rápido • {STORE_CONFIG.averageDeliveryTime}</span>
                </span>
                <b className="block text-[16px] font-bold leading-snug">
                  Fazer pedido no WhatsApp
                </b>
                <small className="text-white/95 text-xs block mt-0.5">
                  Peça agora • {STORE_CONFIG.phoneDisplay}
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/90 shrink-0" />
          </a>

          {/* CTA 2: Ver cardápio */}
          <button
            type="button"
            onClick={() =>
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="w-full text-left flex items-center justify-between p-4 rounded-[24px] bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-gradient-brand text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <b className="block text-[15px] font-bold text-[#261c16]">
                  Ver cardápio digital
                </b>
                <small className="text-stone-500 text-xs block mt-0.5">
                  Pizzas, lanches, bebidas e sobremesas
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-500 shrink-0" />
          </button>

          {/* CTA 3: Destaque Pizzas & Lanches */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory('pizzas');
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full text-left relative flex items-center justify-between p-4 rounded-[24px] bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-sm transition active:scale-[0.99] overflow-hidden cursor-pointer"
          >
            {/* Badge QUENTINHO no canto superior direito */}
            <span className="absolute top-0 right-4 px-3 py-1 text-[10px] font-extrabold uppercase bg-[#b82d0b] text-white rounded-b-xl tracking-wider">
              DESTAQUE
            </span>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-gradient-brand text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <b className="block text-[15px] font-bold text-[#261c16]">
                  Pizzas 30cm / 35cm & Burgers
                </b>
                <small className="text-stone-500 text-xs block mt-0.5">
                  Borda recheada e até 17 adicionais
                </small>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-500 shrink-0 mt-2" />
          </button>

          {/* CTA 4: Pagar com Pix (Expansível) */}
          <div className="rounded-[24px] bg-white border border-orange-200/80 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setPixOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-orange-50/40 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-gradient-brand text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                  <PixDiamondIcon className="w-5 h-5" />
                </div>
                <div>
                  <b className="block text-[15px] font-bold text-[#261c16]">
                    Pagar com Pix
                  </b>
                  <small className="text-stone-500 text-xs block mt-0.5">
                    Chave Pix: {STORE_CONFIG.pixKey} • QR Code
                  </small>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-stone-500 transition-transform duration-200 ${
                  pixOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {pixOpen && (
              <div className="px-5 pb-5 pt-3 border-t border-orange-100 text-center space-y-3 bg-[#faf5ef]">
                <div className="w-40 h-40 mx-auto rounded-2xl p-2.5 bg-white border border-orange-200 shadow-sm flex items-center justify-center">
                  <SafeImage
                    src={STORE_CONFIG.pixQrUrl}
                    alt="QR Code Pix Sabor & Cia"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-stone-600">
                  Recebedor: <b className="text-[#261c16]">{STORE_CONFIG.name}</b> • Chave:{' '}
                  <b className="text-[#d43d11] tabular-nums">{STORE_CONFIG.pixKey}</b>
                </p>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Copie a chave Pix abaixo ou escaneie o QR Code no aplicativo do
                  seu banco e envie o comprovante pelo WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full py-3 px-4 rounded-2xl bg-[#d43d11] hover:bg-[#b82d0b] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  {pixCopied ? (
                    <>
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>Chave Pix {STORE_CONFIG.pixKey} Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Chave Pix ({STORE_CONFIG.pixKey})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 4. CARDS DE ENTREGA RÁPIDA & HORÁRIO DE ATENDIMENTO (MANTENDO OS 2 CARDS EMPILHADOS DO TEMPLATE) */}
          <div className="pt-1 space-y-3">
            {/* Card 1: Entrega Rápida em Ponta Porã */}
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="w-full text-left flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#d82e1b] to-[#b51f10] text-white shadow-md hover:brightness-105 transition active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border-2 border-white flex flex-col items-center justify-center shrink-0 bg-white/10">
                  <span className="text-[11px] font-black tracking-tight uppercase leading-none">
                    40-50
                  </span>
                  <span className="text-[9px] font-bold leading-none mt-0.5">
                    MIN
                  </span>
                </div>
                <div>
                  <b className="block text-[16px] font-bold text-white leading-snug">
                    Delivery Sabor & Cia
                  </b>
                  <small className="text-xs text-white/90 block mt-0.5">
                    {STORE_CONFIG.address}, {STORE_CONFIG.cityShort} • Mín. R$ 25,00
                  </small>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </button>

            {/* Card 2: Horário & Telefone Direto */}
            <a
              href={`tel:+55${STORE_CONFIG.phoneRaw}`}
              className="flex items-center justify-between p-4 rounded-[24px] bg-gradient-to-r from-[#ffc029] to-[#f59e0b] text-[#261c16] shadow-md hover:brightness-105 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-black/5 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-black leading-none">18:30</span>
                  <span className="text-[9px] font-bold leading-none mt-0.5">
                    às 23h
                  </span>
                </div>
                <div>
                  <b className="block text-[16px] font-bold text-[#261c16] leading-snug">
                    Ligar para o Restaurante
                  </b>
                  <small className="text-xs text-[#261c16]/80 block mt-0.5">
                    {STORE_CONFIG.openingHours}
                  </small>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#261c16]" />
              </div>
            </a>
          </div>
        </section>

        {/* 5. CARROSSEL "MAIS PEDIDOS" */}
        <section className="py-5 px-4">
          <h2 className="text-[22px] font-bold text-[#261c16] tracking-tight">
            Mais pedidos
          </h2>
          <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#d43d11] to-[#ff9f3d] mt-1.5 mb-2" />
          <p className="text-xs text-stone-500 mb-4">
            Deslize para ver os favoritos da casa.
          </p>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
            {STORE_CONFIG.bestSellersCarousel.map((item) => (
              <article
                key={item.id}
                onClick={() => handleProductClick(item)}
                className="flex-shrink-0 w-[210px] rounded-[24px] bg-white border border-orange-200/70 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md transition group"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#1e120b]">
                    {item.topBadge && (
                      <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#b82d0b]/95 text-white font-bold text-[10px] uppercase tracking-wider shadow">
                        {item.topBadge}
                      </span>
                    )}
                    <SafeImage
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-[14px] font-bold text-[#261c16] line-clamp-1 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                      {item.desc}
                    </p>
                    <div className="text-[16px] font-bold text-[#d43d11] mt-2 tabular-nums">
                      {formatBRL(item.price)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <OfertaSaborCia />

        {/* 5.5. GUIA "NOSSOS PRODUTOS" — CARROSSEL DE 6 CARDS COM SHORTS DO YOUTUBE E REELS DO INSTAGRAM */}
        <section className="py-5 px-4 bg-[#140a05] text-white rounded-[32px] mx-2 my-2 shadow-xl border border-orange-500/20">
          <div className="px-1">
            <h2 className="text-[21px] font-extrabold text-white tracking-wide uppercase">
              Nossos Produtos
            </h2>
            <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#d43d11] via-[#f96b1f] to-[#ffc029] mt-1.5 mb-2" />
            <p className="text-xs text-stone-300 mb-4">
              Toque nos vídeos em Shorts e Reels para assistir e pedir direto pelo WhatsApp.
            </p>
          </div>

          <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
            {STORE_CONFIG.productVideos.map((video) => {
              const isPlaying = playingVideoId === video.id;
              const isLiked = !!likedVideos[video.id];
              const displayLikes = video.likes + (isLiked ? 1 : 0);

              return (
                <article
                  key={video.id}
                  onClick={() =>
                    setPlayingVideoId((prev) =>
                      prev === video.id ? null : video.id
                    )
                  }
                  className="relative flex-shrink-0 w-[218px] h-[386px] rounded-[24px] overflow-hidden bg-zinc-950 border border-orange-500/45 shadow-lg cursor-pointer select-none group"
                >
                  {/* Mídia Vertical 9:16 (Vídeo em Reprodução ou Capa + Vídeo) */}
                  {isPlaying ? (
                    <video
                      src={video.videoSrc}
                      poster={video.thumbImg}
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <SafeImage
                      src={video.thumbImg}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}

                  {/* Gradientes de Contraste Topo e Base (Idêntico aos Shorts/Reels das fotos) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/85" />

                  {/* Barra Superior: Logo Shorts / Reels + Controle de Som + Menu */}
                  <div className="relative z-10 flex items-center justify-between px-3.5 pt-3.5">
                    <div className="flex items-center gap-1.5 text-white drop-shadow">
                      {video.platform === 'shorts' ? (
                        <>
                          <YouTubeShortsIcon className="w-5 h-5 text-white" />
                          <span className="text-sm font-extrabold tracking-tight">
                            Shorts
                          </span>
                        </>
                      ) : (
                        <>
                          <InstagramReelsIcon className="w-4 h-4 text-white" />
                          <span className="text-sm font-extrabold tracking-tight">
                            Reels
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsVideoMuted((prev) => !prev);
                        }}
                        aria-label={isVideoMuted ? 'Ativar som' : 'Silenciar'}
                        className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white transition"
                      >
                        {isVideoMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-[#ffc029]" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openExternalLink(video.externalUrl);
                        }}
                        aria-label="Abrir vídeo original"
                        className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Botão Play Central Redondo (Igual às fotos em anexo) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={`w-14 h-14 rounded-full bg-black/55 border-2 border-white/90 backdrop-blur-xs flex items-center justify-center shadow-xl transition-opacity duration-200 ${
                        isPlaying
                          ? 'opacity-0 group-hover:opacity-90'
                          : 'opacity-100'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white fill-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Coluna Lateral Direita: Curtir + Compartilhar (Como no Shorts/Reels da foto) */}
                  <div className="absolute right-2.5 bottom-24 z-10 flex flex-col items-center gap-3.5">
                    <button
                      type="button"
                      onClick={(e) => toggleVideoLike(video.id, e)}
                      className="flex flex-col items-center gap-0.5 text-white drop-shadow hover:scale-105 transition"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xs border ${
                          isLiked
                            ? 'bg-[#f96b1f] border-[#ffc029] text-white'
                            : 'bg-black/45 border-white/25 text-white'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold tabular-nums">
                        {displayLikes}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleShareVideo(video, e)}
                      className="flex flex-col items-center gap-0.5 text-white drop-shadow hover:scale-105 transition"
                    >
                      <div className="w-9 h-9 rounded-full bg-black/45 border border-white/25 backdrop-blur-xs flex items-center justify-center">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold max-w-[54px] truncate">
                        Compart...
                      </span>
                    </button>
                  </div>

                  {/* Rodapé Interno do Card: Avatar da Loja + @handle + Título + Botão Pedir */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 space-y-2">
                    <div className="flex items-center gap-2 pr-10">
                      <SafeImage
                        src={IMAGES.logo}
                        fallbackSrc={IMAGES.lancheBurger}
                        alt={STORE_CONFIG.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#ffc029] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">
                          {video.handle}
                        </span>
                        <span className="text-[10px] text-[#ffc029] font-semibold block truncate">
                          {formatBRL(video.price)}
                        </span>
                      </div>
                    </div>

                    <div className="pr-8">
                      <h3 className="text-xs font-bold text-white line-clamp-1 leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-[10.5px] text-white/85 line-clamp-2 leading-tight mt-0.5">
                        {video.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleOrderFromVideo(video, e)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#f96b1f] to-[#ff9f3d] hover:brightness-110 text-zinc-950 font-extrabold text-[11px] uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md transition active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Pedir • {formatBRL(video.price)}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 6. MONTE SUA PIZZA OU TURBINE SEU LANCHE (INTERATIVO NO TEMPLATE) */}
        <section className="mx-4 my-3 p-5 rounded-[28px] bg-gradient-to-br from-[#231108] via-[#3a1909] to-[#6b240b] text-white shadow-lg space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-[#ffc029] text-[#231108] rounded-full">
                <Sparkles className="w-3 h-3" />
                Personalize seu Pedido
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1.5">
                Monte sua Pizza ou Lanche
              </h2>
              <p className="text-xs text-orange-200/90 mt-0.5">
                {STORE_CONFIG.pizzaSizesInfo}
              </p>
            </div>
          </div>

          {/* Seletor Pizza vs Lanche */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-black/30 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setInlineBuilderTab('pizza')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                inlineBuilderTab === 'pizza'
                  ? 'bg-gradient-brand text-white shadow'
                  : 'text-orange-200 hover:text-white'
              }`}
            >
              🍕 Montar Pizza
            </button>
            <button
              type="button"
              onClick={() => setInlineBuilderTab('lanche')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                inlineBuilderTab === 'lanche'
                  ? 'bg-gradient-brand text-white shadow'
                  : 'text-orange-200 hover:text-white'
              }`}
            >
              🍔 Turbinar Lanche
            </button>
          </div>

          {inlineBuilderTab === 'pizza' ? (
            <>
              {/* Passo 1: Sabor da Pizza */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#ffc029] block">
                  1. Escolha o sabor da Pizza:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {STORE_CONFIG.products
                    .filter((p) => p.category === 'pizzas')
                    .map((pizza) => {
                      const isSelected = inlinePizzaProduct.id === pizza.id;
                      return (
                        <button
                          type="button"
                          key={pizza.id}
                          onClick={() => setInlinePizzaProduct(pizza)}
                          className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-white text-[#231108] border-white font-bold shadow-sm'
                              : 'bg-white/10 border-white/15 text-orange-100 hover:bg-white/15'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold truncate">
                              {pizza.name}
                            </div>
                            <div
                              className={`text-[10.5px] truncate ${
                                isSelected ? 'text-stone-600' : 'text-orange-200/80'
                              }`}
                            >
                              {pizza.desc}
                            </div>
                          </div>
                          <span className="text-xs font-extrabold shrink-0 tabular-nums">
                            {formatBRL(pizza.price)}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Passo 2: Tamanho */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#ffc029] block">
                  2. Escolha o tamanho:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PIZZA_SIZES.map((s) => {
                    const active = inlinePizzaSize === s.name;
                    return (
                      <button
                        type="button"
                        key={s.name}
                        onClick={() => setInlinePizzaSize(s.name)}
                        className={`p-2.5 rounded-2xl border text-center transition ${
                          active
                            ? 'bg-[#ffc029] text-[#231108] border-[#ffc029] font-extrabold shadow-md'
                            : 'bg-white/10 border-white/20 text-orange-100 hover:bg-white/15'
                        }`}
                      >
                        <div className="text-xs font-bold">{s.name}</div>
                        <div className="text-[10.5px] opacity-90 mt-0.5">
                          {s.details}{' '}
                          {s.priceModifier > 0
                            ? `(+${formatBRL(s.priceModifier)})`
                            : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Passo 3: Borda Recheada */}
              <button
                type="button"
                onClick={() => setInlinePizzaBorda((prev) => !prev)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition ${
                  inlinePizzaBorda
                    ? 'bg-white/20 border-[#ffc029] text-white font-bold'
                    : 'bg-white/5 border-white/15 text-orange-200'
                }`}
              >
                <span>Adicionar Borda Recheada (+R$ 8,00)</span>
                {inlinePizzaBorda && (
                  <Check className="w-4 h-4 text-[#ffc029] shrink-0" />
                )}
              </button>
            </>
          ) : (
            <>
              {/* Passo 1: Escolha o Lanche */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#ffc029] block">
                  1. Escolha o seu Lanche:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {STORE_CONFIG.products
                    .filter((p) => p.category === 'lanches')
                    .map((lanche) => {
                      const isSelected = inlineLancheProduct.id === lanche.id;
                      return (
                        <button
                          type="button"
                          key={lanche.id}
                          onClick={() => setInlineLancheProduct(lanche)}
                          className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-white text-[#231108] border-white font-bold shadow-sm'
                              : 'bg-white/10 border-white/15 text-orange-100 hover:bg-white/15'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold truncate">
                              {lanche.name}
                            </div>
                            <div
                              className={`text-[10.5px] truncate ${
                                isSelected ? 'text-stone-600' : 'text-orange-200/80'
                              }`}
                            >
                              {lanche.desc}
                            </div>
                          </div>
                          <span className="text-xs font-extrabold shrink-0 tabular-nums">
                            {formatBRL(lanche.price)}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Passo 2: Adicionais Rápidos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#ffc029]">
                    2. Adicionais extras ({inlineLancheExtras.length} selecionados):
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {LANCHE_ADDITIONALS.slice(0, 8).map((extra) => {
                    const active = inlineLancheExtras.includes(extra.name);
                    return (
                      <button
                        type="button"
                        key={extra.name}
                        onClick={() => toggleInlineLancheExtra(extra.name)}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between transition ${
                          active
                            ? 'bg-white text-[#231108] border-white font-bold shadow-sm'
                            : 'bg-white/10 border-white/15 text-orange-100 hover:bg-white/15'
                        }`}
                      >
                        <span className="truncate pr-1">
                          {extra.name} (+R${extra.price.toFixed(0)})
                        </span>
                        {active && (
                          <Check className="w-3.5 h-3.5 text-[#d43d11] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={addInlineBuilderToCart}
            className="w-full py-3.5 rounded-2xl bg-[#ffc029] hover:bg-[#ffcf4d] text-[#231108] font-extrabold text-xs uppercase tracking-wide transition shadow-lg active:scale-[0.99]"
          >
            + Adicionar à Sacola ({formatBRL(inlineBuilderTotal)})
          </button>
        </section>

        {/* 7. CATÁLOGO COMPLETO (EXATAMENTE NO MODELO BIOSITESAI) */}
        <section id="catalogo" className="py-5 px-4 space-y-4">
          <div>
            <h2 className="text-[22px] font-bold text-[#261c16] tracking-tight">
              Cardápio Digital
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#d43d11] to-[#ff9f3d] mt-1.5 mb-2.5" />
            <p className="text-[13px] text-stone-600 leading-relaxed">
              Escolha seus produtos, toque em{' '}
              <b className="text-[#261c16]">Adicionar</b> e envie seu pedido pelo
              WhatsApp.
            </p>
          </div>

          {/* Barra de Busca */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pizzas, lanches, bebidas ou sobremesas..."
              className="w-full py-3.5 pl-4 pr-10 rounded-2xl bg-white border border-orange-200/90 text-sm text-[#261c16] placeholder:text-stone-400 focus:outline-none focus:border-[#f96b1f] shadow-xs"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>

          {/* Categorias em Círculos (Story Style) */}
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar py-1">
            {STORE_CONFIG.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center shrink-0 w-[76px] group"
                >
                  <div
                    className={`w-[72px] h-[72px] rounded-full p-1 transition relative ${
                      isActive
                        ? 'border-[2.5px] border-[#d43d11] bg-orange-100/70 shadow-sm'
                        : 'border-2 border-orange-200/80 bg-white'
                    }`}
                  >
                    {cat.isGridIcon ? (
                      <div className="w-full h-full rounded-full bg-[#f7e7dc] flex items-center justify-center text-[#d43d11]">
                        <LayoutGrid className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ) : (
                      <>
                        <SafeImage
                          src={cat.img || IMAGES.pizzaArtesanal}
                          alt={cat.label}
                          className="w-full h-full object-cover rounded-full"
                        />
                        {cat.emoji && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white shadow border border-orange-200 flex items-center justify-center text-xs">
                            {cat.emoji}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 w-full truncate text-center ${
                      isActive
                        ? 'font-bold text-[#d43d11]'
                        : 'font-medium text-stone-700'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Linha de Relevância + Toggle Grid/Lista */}
          <div className="flex items-center justify-between pt-1">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'relevancia' | 'menor-preco' | 'maior-preco'
                  )
                }
                aria-label="Ordenar produtos"
                className="appearance-none bg-white border border-orange-200/90 rounded-full py-2.5 pl-4 pr-9 text-xs font-medium text-[#261c16] shadow-2xs focus:outline-none focus:border-[#d43d11]"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex items-center bg-white border border-orange-200/90 rounded-full p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Visualização em grade"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  viewMode === 'grid'
                    ? 'bg-[#f96b1f] text-white'
                    : 'text-stone-600 hover:text-[#261c16]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="Visualização em lista"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  viewMode === 'list'
                    ? 'bg-[#f96b1f] text-white'
                    : 'text-stone-600 hover:text-[#261c16]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contador de produtos e página */}
          <div className="text-xs text-stone-500">
            Exibindo {filteredProducts.length} produtos · página {currentPage} de{' '}
            {totalPages}
          </div>

          {/* Grid / Lista de Produtos */}
          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-orange-100 space-y-2">
              <p className="text-sm font-semibold text-stone-700">
                Nenhum produto encontrado para "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('todos');
                }}
                className="text-xs font-bold text-[#d43d11] underline"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 gap-3'
                  : 'grid grid-cols-1 gap-3'
              }
            >
              {paginatedProducts.map((product) => {
                const hasCustomOptions =
                  (product.sizes && product.sizes.length > 0) ||
                  (product.additionals && product.additionals.length > 0);
                return (
                  <article
                    key={product.id}
                    className={`rounded-[24px] bg-white border border-orange-200/75 shadow-xs overflow-hidden flex ${
                      viewMode === 'list'
                        ? 'flex-row items-center p-2.5 gap-3'
                        : 'flex-col justify-between p-2'
                    }`}
                  >
                    {/* Imagem do Produto */}
                    <div
                      className={`relative overflow-hidden rounded-[18px] bg-[#1e120b] shrink-0 ${
                        viewMode === 'list' ? 'w-28 h-28' : 'w-full h-40'
                      }`}
                    >
                      {product.topBadge && (
                        <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-[#b82d0b]/95 text-white font-bold text-[10px] uppercase tracking-wider">
                          {product.topBadge}
                        </span>
                      )}
                      <SafeImage
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Corpo do Card */}
                    <div className="flex flex-col justify-between flex-1 px-1.5 pt-2.5 pb-1">
                      <div>
                        <h3 className="text-[14px] font-bold text-[#261c16] line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-[11.5px] text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                          {product.desc}
                        </p>

                        {product.pillTag && (
                          <span className="inline-block mt-1.5 text-[#b82d0b] font-bold text-[10px] uppercase tracking-wide">
                            {product.pillTag}
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5">
                        <div className="text-[16px] font-bold text-[#d43d11] tabular-nums">
                          {formatBRL(product.price)}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleProductClick(product)}
                          className="mt-2 w-full py-2.5 rounded-full border border-orange-300 hover:border-[#f96b1f] hover:bg-orange-50/70 bg-white text-[#261c16] font-semibold text-xs transition active:scale-[0.98]"
                        >
                          {hasCustomOptions ? 'Escolher opções' : 'Adicionar'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      document
                        .getElementById('catalogo')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-11 h-11 rounded-2xl font-semibold text-sm transition ${
                      currentPage === page
                        ? 'bg-[#d43d11] text-white shadow-sm'
                        : 'bg-white border border-orange-200/80 text-[#261c16] hover:bg-orange-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              {currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    document
                      .getElementById('catalogo')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label="Próxima página"
                  className="w-11 h-11 rounded-2xl bg-white border border-orange-200/80 text-stone-600 hover:bg-orange-50 flex items-center justify-center font-semibold text-sm transition"
                >
                  ›
                </button>
              )}
            </div>
          )}
        </section>

        {/* 8. COMBO / PROMOÇÃO DA SEMANA COM CONTADOR REGRESSIVO (MANTENDO O MODELO DO TEMPLATE) */}
        <section className="px-4 py-3">
          <div className="rounded-[28px] overflow-hidden shadow-lg bg-gradient-to-b from-[#b82d0b] via-[#d43d11] to-[#f96b1f] text-white">
            {/* Banner Superior */}
            <div className="relative h-60 w-full bg-[#1e0d05] overflow-hidden">
              <SafeImage
                src={IMAGES.heroSplash}
                alt="Combo Noite Sabor & Cia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              {/* Overlay Tipográfico */}
              <div className="absolute top-4 left-4 bg-[#231108]/90 backdrop-blur-xs border border-amber-400/50 rounded-2xl px-3.5 py-2 shadow-lg">
                <span className="block text-[11px] font-black uppercase text-amber-300 tracking-wider">
                  COMBO FAMÍLIA
                </span>
                <span className="block text-xl font-black uppercase text-[#ffc029] leading-none">
                  PIZZA + 2L
                </span>
                <span className="block text-[10px] font-bold text-white mt-0.5">
                  Grande 35cm + Coca 2L
                </span>
              </div>

              {/* Selo de Desconto */}
              <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-[#b82d0b] text-white font-bold text-xs rotate-6 shadow-md border border-white/20">
                OFERTA
              </span>
            </div>

            {/* Conteúdo da Promoção */}
            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-[22px] font-bold text-white leading-snug">
                  Promoção da semana
                </h2>
                <div className="w-12 h-1.5 rounded-full bg-[#ffc029] mt-1.5 mb-3" />
                <p className="text-[13.5px] text-white/95 leading-relaxed">
                  Peça 1 Pizza Grande de 35 cm (8 fatias) + 1 Refrigerante
                  Coca-Cola 2 Litros gelado para toda a família. De R$ 68,80 por
                  apenas R$ 59,90!
                </p>
              </div>

              {/* Caixa Destacada */}
              <div className="rounded-2xl bg-black/20 border border-white/25 p-4 flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-white leading-snug">
                  Pizza Grande 35cm (8 fatias) +
                  <br />
                  Coca-Cola 2 Litros
                </div>
                <div className="text-lg font-bold text-[#ffc029] whitespace-nowrap tabular-nums">
                  R$ 59,90
                </div>
              </div>

              {/* Cronômetro 4 Colunas */}
              <div className="grid grid-cols-4 gap-2.5">
                <div className="rounded-2xl bg-black/20 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {countdown.days}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">dias</div>
                </div>
                <div className="rounded-2xl bg-black/20 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">horas</div>
                </div>
                <div className="rounded-2xl bg-black/20 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">min</div>
                </div>
                <div className="rounded-2xl bg-black/20 border border-white/25 py-3 text-center">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-white/85 mt-0.5">seg</div>
                </div>
              </div>

              {/* Botão Adicionar Combo */}
              <button
                type="button"
                onClick={addWeeklyComboToCart}
                className="block w-full py-4 rounded-2xl bg-[#231108] hover:bg-[#170b05] text-[#ffc029] font-bold text-sm text-center shadow-md transition active:scale-[0.99] cursor-pointer"
              >
                + Adicionar Combo ao Pedido (R$ 59,90)
              </button>
            </div>
          </div>
        </section>

        {/* 9. SOBRE SABOR & CIA + PERGUNTAS FREQUENTES */}
        <section className="px-4 py-6 space-y-6">
          <div>
            <h2 className="text-[22px] font-bold text-[#261c16] tracking-tight">
              Sobre {STORE_CONFIG.name}
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#d43d11] to-[#ff9f3d] mt-1.5 mb-3.5" />
            <p className="text-[13.5px] text-stone-600 leading-relaxed">
              O <b>{STORE_CONFIG.name}</b> em {STORE_CONFIG.city} (
              {STORE_CONFIG.address}) traz pizzas artesanais assadas no ponto
              ideal (Média 30 cm com 6 fatias e Grande 35 cm com 8 fatias),
              hambúrgueres e lanches generosos com até 17 opções de adicionais,
              bebidas super geladas e sobremesas irresistíveis. Peça pelo nosso
              Cardápio Magnético e receba quentinho na sua porta em{' '}
              {STORE_CONFIG.averageDeliveryTime}!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[11px] tracking-[0.14em] uppercase text-[#d43d11] font-semibold text-center mt-5 px-2">
              <span>PIZZAS ARTESANAIS</span>
              <span className="text-orange-400">•</span>
              <span>LANCHES & BURGERS</span>
              <span className="text-orange-400">•</span>
              <span>BEBIDAS GELADAS</span>
              <span className="text-orange-400">•</span>
              <span>SOBREMESAS</span>
            </div>
          </div>

          {/* Perguntas Frequentes */}
          <div>
            <h2 className="text-[22px] font-bold text-[#261c16] tracking-tight">
              Perguntas frequentes
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#d43d11] to-[#ff9f3d] mt-1.5 mb-4" />

            <div className="space-y-2.5">
              {STORE_CONFIG.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl bg-[#f5ede4] border border-orange-200/80 overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center gap-2.5 font-semibold text-[14px] text-[#261c16] hover:bg-orange-200/30 transition"
                    >
                      <span
                        className={`text-xs text-[#d43d11] transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      >
                        ▶
                      </span>
                      <span>{faq.question}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-orange-200/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. ONDE ESTAMOS + RODAPÉ BIOSITESAI */}
        <section id="onde-estamos" className="px-4 pt-2 pb-4 space-y-5">
          <div>
            <h2 className="text-[22px] font-bold text-[#261c16] tracking-tight">
              Onde estamos
            </h2>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#d43d11] to-[#ff9f3d] mt-1.5 mb-2" />
            <p className="text-sm font-medium text-[#261c16]">
              {STORE_CONFIG.fullAddress}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              {STORE_CONFIG.openingHours} • {STORE_CONFIG.deliveryFee}
            </p>

            {/* Botões Como chegar e Ligar */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d43d11] to-[#f96b1f] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Como chegar</span>
              </a>
              <a
                href={`tel:+55${STORE_CONFIG.phoneRaw}`}
                className="py-3.5 px-4 rounded-2xl bg-white border-[1.5px] border-[#d43d11] text-[#b82d0b] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-orange-50 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Ligar</span>
              </a>
            </div>
          </div>
        </section>

        {/* Card de Rodapé (BiositesAi style com cores Cardápio Magnético) */}
        <footer className="mt-2 rounded-t-[36px] bg-gradient-to-b from-[#261209] via-[#6b2209] to-[#b82d0b] text-white px-5 pt-9 pb-12 text-center space-y-4 shadow-inner">
          {/* Logo Circular com Borda Branca */}
          <div className="w-20 h-20 mx-auto rounded-full p-1 bg-white/20 border-2 border-[#ff9f3d] shadow-md">
            <SafeImage
              src={IMAGES.logo}
              fallbackSrc={IMAGES.pizzaArtesanal}
              alt="Logo Sabor & Cia"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
              {STORE_CONFIG.name}
            </h3>
            <p className="text-xs text-white/90 max-w-xs mx-auto leading-relaxed">
              {STORE_CONFIG.headline} {STORE_CONFIG.slogan}
            </p>
          </div>

          {/* Cards de Endereço, Horário e Telefone */}
          <div className="space-y-2.5 pt-1">
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-left hover:bg-white/15 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#ffc029]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">
                  {STORE_CONFIG.fullAddress}
                </span>
                <span className="text-xs text-white/80">
                  {STORE_CONFIG.openingHours}
                </span>
              </div>
            </a>

            <a
              href={`tel:+55${STORE_CONFIG.phoneRaw}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-left hover:bg-white/15 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#ffc029]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block tabular-nums">
                  {STORE_CONFIG.phoneDisplay}
                </span>
                <span className="text-xs text-white/80">
                  Pedido mínimo: {formatBRL(STORE_CONFIG.minimumOrder)} • Chave Pix:{' '}
                  {STORE_CONFIG.pixKey}
                </span>
              </div>
            </a>
          </div>

          <hr className="border-white/20 my-4" />

          {/* Ícones Sociais */}
          <div className="flex items-center justify-center gap-3">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-white/25 bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
            </a>
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/25 bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-white"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Créditos do Rodapé */}
          <div className="space-y-1.5 text-xs text-white/85 pt-1">
            <p>
              Feito com ♥️ por <b className="text-white">BiositesAi</b> •{' '}
              <b className="text-[#ffc029]">Cardápio Magnético</b>
            </p>
            <p className="text-white/90 tabular-nums">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {STORE_CONFIG.phoneRaw}
              </a>
            </p>
            <button
              type="button"
              onClick={() => setTermsModalOpen(true)}
              className="text-white/90 hover:underline pt-1 block mx-auto"
            >
              Termos de uso e privacidade
            </button>
          </div>
        </footer>

        {/* TOAST DE ITEM ADICIONADO */}
        {addedToast && (
          <div className="fixed top-4 inset-x-4 max-w-[440px] mx-auto z-50 bg-[#231108] text-white px-4 py-3 rounded-2xl shadow-xl border border-orange-400/40 flex items-center justify-between text-xs font-semibold">
            <span>✓ {addedToast}</span>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="text-[#ffc029] font-bold underline ml-2 shrink-0"
            >
              Ver sacola
            </button>
          </div>
        )}

        {/* 11. BARRA FLUTUANTE DO CARRINHO + BOTÃO FLUTUANTE WHATSAPP */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-4 right-20 max-w-[380px] mx-auto bg-[#231108] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between z-40 border border-orange-500/40">
            <div
              onClick={() => setCartDrawerOpen(true)}
              className="cursor-pointer"
            >
              <b className="text-xs block">
                {totalCartItems} {totalCartItems === 1 ? 'item' : 'itens'} na sacola
              </b>
              <small className="text-[#ffc029] text-xs font-extrabold tabular-nums">
                Total: {formatBRL(totalCartPrice)}
              </small>
            </div>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="px-3.5 py-2 bg-gradient-brand text-white font-extrabold text-xs rounded-xl hover:brightness-110 transition"
            >
              Finalizar
            </button>
          </div>
        )}

        {/* Botão Redondo Verde do WhatsApp no Canto Inferior Direito */}
        <button
          type="button"
          onClick={() => {
            if (cart.length > 0) {
              setCartDrawerOpen(true);
            } else {
              sendOrderToWhatsApp();
            }
          }}
          aria-label="Fazer pedido pelo WhatsApp"
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl flex items-center justify-center z-50 transition transform hover:scale-105 active:scale-95"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d43d11] text-white text-[10px] font-extrabold flex items-center justify-center border border-white tabular-nums">
              {totalCartItems}
            </span>
          )}
        </button>

        {/* MODAL: PERSONALIZAR PIZZA OU LANCHE (IDÊNTICO AO CARDÁPIO MAGNÉTICO) */}
        {customModalProduct && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-[460px] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-orange-100 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-100 text-[#d43d11]">
                    {customModalProduct.category === 'pizzas'
                      ? 'Escolha o Tamanho e Borda'
                      : 'Adicionais & Observações'}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#261c16] mt-1">
                    {customModalProduct.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {customModalProduct.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomModalProduct(null)}
                  className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Se for Pizza: Escolha de Tamanho */}
              {customModalProduct.sizes && customModalProduct.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d43d11] block">
                    Escolha o tamanho:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {customModalProduct.sizes.map((s) => {
                      const active = modalSize === s.name;
                      const sizePrice = customModalProduct.price + s.priceModifier;
                      return (
                        <button
                          type="button"
                          key={s.name}
                          onClick={() => setModalSize(s.name)}
                          className={`p-3 rounded-2xl border text-left transition ${
                            active
                              ? 'bg-[#f96b1f]/10 border-[#f96b1f] text-[#261c16] ring-1 ring-[#f96b1f]'
                              : 'bg-stone-50 border-stone-200 text-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{s.name}</span>
                            <span className="text-xs font-extrabold text-[#d43d11] tabular-nums">
                              {formatBRL(sizePrice)}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 block mt-0.5">
                            {s.details}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Complementos de Pizza ou Adicionais de Lanche */}
              {(customModalProduct.complements || customModalProduct.additionals) && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#d43d11] block">
                    {customModalProduct.complements
                      ? 'Complementos da Pizza (opcional):'
                      : 'Adicionais para o Lanche (opcional):'}
                  </label>
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                    {(
                      customModalProduct.complements ||
                      customModalProduct.additionals ||
                      []
                    ).map((add) => {
                      const qty = modalAdditionals[add.name] || 0;
                      return (
                        <div
                          key={add.name}
                          className="flex items-center justify-between rounded-xl border border-orange-200/60 bg-orange-50/30 p-2.5"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold text-[#261c16]">
                              {add.name}
                            </span>
                            <span className="text-xs font-bold text-[#d43d11] ml-2 tabular-nums">
                              +{formatBRL(add.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => updateModalAdditionalQty(add.name, -1)}
                              disabled={qty === 0}
                              aria-label="Diminuir"
                              className="w-7 h-7 rounded-full bg-white border border-stone-300 text-stone-700 disabled:opacity-30 flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center tabular-nums">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateModalAdditionalQty(add.name, 1)}
                              aria-label="Adicionar"
                              className="w-7 h-7 rounded-full bg-gradient-brand text-white flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Observações */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Observações (opcional):
                </label>
                <textarea
                  rows={2}
                  value={modalObservations}
                  onChange={(e) => setModalObservations(e.target.value)}
                  placeholder={
                    customModalProduct.category === 'pizzas'
                      ? 'Ex: Sem cebola, borda bem assada...'
                      : 'Ex: Sem maionese, sem tomate, ponto da carne...'
                  }
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs text-[#261c16] focus:outline-none focus:border-[#f96b1f] resize-none"
                />
              </div>

              <button
                type="button"
                onClick={confirmModalCustomization}
                className="w-full py-3.5 rounded-2xl bg-gradient-brand text-white font-bold text-sm shadow-brand-glow transition active:scale-[0.99]"
              >
                Adicionar à Sacola • {formatBRL(modalCalculatedPrice)}
              </button>
            </div>
          </div>
        )}

        {/* DRAWER DO CARRINHO / SACOLA + CHECKOUT COMPLETO WHATSAPP */}
        {cartDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-[460px] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[92vh] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between border-b border-orange-100 pb-3">
                <div>
                  <h3 className="text-lg font-extrabold text-[#261c16]">
                    Minha Sacola • {STORE_CONFIG.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Pedido mínimo: {formatBRL(STORE_CONFIG.minimumOrder)} • Entrega em{' '}
                    {STORE_CONFIG.averageDeliveryTime}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="text-sm font-semibold text-stone-600">
                    Sua sacola está vazia
                  </p>
                  <p className="text-xs text-stone-400">
                    Adicione pizzas, lanches, bebidas ou sobremesas para fazer seu
                    pedido pelo WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {/* Lista de Itens */}
                  <div className="space-y-2.5">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#faf6f2] border border-orange-200/70"
                      >
                        <SafeImage
                          src={item.img}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#261c16] truncate">
                            {item.name}
                            {item.selectedSize ? ` (${item.selectedSize})` : ''}
                          </h4>
                          {item.customDetails && (
                            <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                              {item.customDetails}
                            </p>
                          )}
                          <div className="text-xs font-extrabold text-[#d43d11] mt-1 tabular-nums">
                            {formatBRL(item.unitPrice * item.quantity)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white border border-orange-200 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-orange-50"
                            aria-label="Diminuir quantidade"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="text-xs font-bold w-5 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#d43d11] hover:bg-orange-50"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dados de Entrega e Pagamento (Idêntico ao Cardápio Magnético) */}
                  <div className="border-t border-orange-100 pt-3 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#d43d11]">
                      Dados para Entrega no WhatsApp
                    </h4>

                    <div>
                      <label className="text-xs font-semibold text-[#261c16] block mb-1">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-[#261c16] focus:outline-none focus:border-[#f96b1f]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#261c16] block mb-1">
                        WhatsApp (com DDD) *
                      </label>
                      <input
                        type="tel"
                        value={customerWhatsapp}
                        onChange={(e) => setCustomerWhatsapp(e.target.value)}
                        placeholder="(67) 99999-9999"
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-[#261c16] focus:outline-none focus:border-[#f96b1f]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#261c16] block mb-1">
                        Endereço de entrega *
                      </label>
                      <textarea
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Rua, número, bairro, complemento..."
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-[#261c16] focus:outline-none focus:border-[#f96b1f] resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#261c16] block mb-1">
                        Forma de pagamento *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            'Pix',
                            'Dinheiro',
                            'Cartão de Crédito',
                            'Cartão de Débito',
                          ] as const
                        ).map((method) => (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setPaymentMethod(method)}
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                              paymentMethod === method
                                ? 'bg-[#f96b1f] text-white border-[#f96b1f]'
                                : 'bg-stone-50 text-stone-700 border-stone-200'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {paymentMethod === 'Dinheiro' && (
                      <div>
                        <label className="text-xs font-semibold text-[#261c16] block mb-1">
                          Troco para quanto? (opcional)
                        </label>
                        <input
                          type="text"
                          value={changeFor}
                          onChange={(e) => setChangeFor(e.target.value)}
                          placeholder="Ex: 100,00"
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-[#261c16] focus:outline-none focus:border-[#f96b1f]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {cart.length > 0 && (
                <div className="border-t border-orange-100 pt-3 space-y-2.5">
                  {!isMinimumOrderMet && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
                      Pedido mínimo: <b>{formatBRL(STORE_CONFIG.minimumOrder)}</b>.
                      Faltam{' '}
                      <b>{formatBRL(STORE_CONFIG.minimumOrder - totalCartPrice)}</b>.
                    </div>
                  )}

                  {checkoutError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 font-medium">
                      {checkoutError}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-base font-extrabold text-[#261c16]">
                    <span>Total do Pedido</span>
                    <span className="text-[#d43d11] tabular-nums">
                      {formatBRL(totalCartPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => sendOrderToWhatsApp()}
                    className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1fb858] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Enviar Pedido para WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL TERMOS DE USO E PRIVACIDADE */}
        {termsModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[420px] rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#261c16]">
                  Termos de uso e privacidade
                </h3>
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(false)}
                  className="p-1.5 rounded-full bg-stone-100 text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Este cardápio digital (<b>Cardápio Magnético • BiositesAi</b>)
                facilita a montagem e envio do seu pedido diretamente para o
                WhatsApp oficial do <b>{STORE_CONFIG.name}</b> em{' '}
                {STORE_CONFIG.city}. Seus dados de entrega são utilizados
                exclusivamente para o processamento e entrega do seu pedido.
              </p>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#d43d11] text-white font-semibold text-xs"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
