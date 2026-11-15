import heroPizzaBurgerImg from '../assets/images/hero_sabor_cia_pizza_burger_1794716641442.jpg';
import logoSaborCiaImg from '../assets/images/logo_sabor_cia_1794716642408.jpg';
import pizzaArtesanalImg from '../assets/images/pizza_artesanal_sabor_1794716644017.jpg';
import lancheBurgerImg from '../assets/images/lanche_burger_artesanal_1794716645353.jpg';
import sobremesaPetitGateauImg from '../assets/images/sobremesa_petit_gateau_1794716645903.jpg';
import bebidasGeladasImg from '../assets/images/bebidas_geladas_combo_1794716646906.jpg';
import cocaCola2lImg from '../assets/images/coca_cola_2l.jpeg';
import tonicaAntarcticaImg from '../assets/images/tonica_antarctica.jpeg';
import guaranaLataImg from '../assets/images/guarana_lata.jpeg';
import spriteLataImg from '../assets/images/sprite_lata.jpeg';

export interface ProductSize {
  name: 'Média' | 'Grande';
  details: string;
  priceModifier: number;
}

export interface ProductAdditional {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  topBadge?: string;
  pillTag?: string;
  category: 'pizzas' | 'lanches' | 'bebidas' | 'sobremesas';
  bestSeller?: boolean;
  sizes?: ProductSize[];
  complements?: ProductAdditional[];
  additionals?: ProductAdditional[];
  img: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  emoji?: string;
  img?: string;
  isGridIcon?: boolean;
}

export const IMAGES = {
  logo: logoSaborCiaImg,
  heroSplash: heroPizzaBurgerImg,
  pizzaArtesanal: pizzaArtesanalImg,
  lancheBurger: lancheBurgerImg,
  sobremesa: sobremesaPetitGateauImg,
  bebidasCombo: bebidasGeladasImg,
  cocaCola2l: cocaCola2lImg,
  tonicaAntarctica: tonicaAntarcticaImg,
  guaranaLata: guaranaLataImg,
  spriteLata: spriteLataImg,
};

export const LANCHE_ADDITIONALS: ProductAdditional[] = [
  { name: 'Filé Picado', price: 10.0 },
  { name: 'Coração', price: 10.0 },
  { name: 'Hambúrguer', price: 7.0 },
  { name: 'Bacon', price: 7.0 },
  { name: 'Palmito', price: 6.0 },
  { name: 'Mussarela', price: 5.0 },
  { name: 'Catupiry', price: 5.0 },
  { name: 'Calabresa', price: 5.0 },
  { name: 'Ovo', price: 4.0 },
  { name: 'Salsicha', price: 4.0 },
  { name: 'Presunto', price: 3.5 },
  { name: 'Azeitona', price: 3.0 },
  { name: 'Batata Palha', price: 3.0 },
  { name: 'Alface', price: 3.0 },
  { name: 'Tomate', price: 3.0 },
  { name: 'Ervilha', price: 3.0 },
  { name: 'Milho', price: 3.0 },
];

export const PIZZA_SIZES: ProductSize[] = [
  { name: 'Média', details: '30 cm • 6 fatias', priceModifier: 0 },
  { name: 'Grande', details: '35 cm • 8 fatias', priceModifier: 10.0 },
];

export const PIZZA_COMPLEMENTS_DEFAULT: ProductAdditional[] = [
  { name: 'Borda recheada', price: 8.0 },
  { name: 'Catupiry Extra', price: 5.0 },
];

export const PIZZA_COMPLEMENTS_QUATRO_QUEIJOS: ProductAdditional[] = [
  { name: 'Borda recheada', price: 8.0 },
  { name: 'Toque de Mel', price: 3.0 },
];

export const STORE_CONFIG = {
  name: 'Sabor & Cia',
  brandSubtitle: 'Cardápio Magnético • BiositesAi',
  headline: 'Sabor que chega quentinho na sua porta.',
  slogan:
    'Pizzas artesanais, lanches generosos, bebidas geladas e sobremesas. Peça pelo cardápio digital e receba em minutos!',
  city: 'Ponta Porã/MS',
  cityShort: 'Ponta Porã',
  address: 'Av. Brasil, 2300',
  fullAddress: 'Av. Brasil, 2300 — Ponta Porã/MS',
  phoneDisplay: '(67) 99317-4612',
  phoneRaw: '67993174612',
  whatsappNumber: '5567993174612',
  openingHours: 'Domingo a Domingo • 18:30 às 23:00',
  averageDeliveryTime: '40-50 minutos',
  minimumOrder: 25.0,
  deliveryFee: 'Taxa de entrega a consultar',
  pizzaSizesInfo: 'Pizza grande 35 cm (8 fatias) • Pizza média 30 cm (6 fatias)',
  rating: '4.9',
  instagramUrl: 'https://www.instagram.com/',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av+Brasil+2300+Ponta+Pora+MS',
  pixKey: '67993174612',
  pixCode:
    '00020126360014BR.GOV.BCB.PIX0114+55679931746125204000053039865802BR5911Sabor e Cia6009PontaPora62070503***6304',
  pixQrUrl:
    'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=00020126360014BR.GOV.BCB.PIX0114+55679931746125204000053039865802BR5911Sabor%20e%20Cia6009PontaPora62070503***6304',
  categories: [
    { id: 'todos', label: 'Tudo', isGridIcon: true },
    {
      id: 'mais-vendidos',
      label: 'Destaques',
      emoji: '🔥',
      img: IMAGES.pizzaArtesanal,
    },
    {
      id: 'pizzas',
      label: 'Pizzas',
      emoji: '🍕',
      img: IMAGES.pizzaArtesanal,
    },
    {
      id: 'lanches',
      label: 'Lanches',
      emoji: '🍔',
      img: IMAGES.lancheBurger,
    },
    {
      id: 'bebidas',
      label: 'Bebidas',
      emoji: '🥤',
      img: IMAGES.cocaCola2l,
    },
    {
      id: 'sobremesas',
      label: 'Sobremesas',
      emoji: '🍰',
      img: IMAGES.sobremesa,
    },
  ] as CategoryItem[],
  bestSellersCarousel: [
    {
      id: 'p1',
      topBadge: 'MAIS PEDIDA',
      pillTag: '30CM OU 35CM',
      name: 'Pizza Margherita',
      desc: 'Molho de tomate, mussarela, manjericão fresco e azeite.',
      price: 45.9,
      category: 'pizzas',
      bestSeller: true,
      sizes: PIZZA_SIZES,
      complements: PIZZA_COMPLEMENTS_DEFAULT,
      img: IMAGES.pizzaArtesanal,
    },
    {
      id: 'l2',
      topBadge: 'CAMPEÃO',
      pillTag: '+17 ADICIONAIS',
      name: 'X-Bacon Especial',
      desc: 'Pão, 2 hambúrgueres, bacon crocante, queijo cheddar e barbecue.',
      price: 34.9,
      category: 'lanches',
      bestSeller: true,
      additionals: LANCHE_ADDITIONALS,
      img: IMAGES.lancheBurger,
    },
    {
      id: 'p3',
      topBadge: 'ESPECIAL',
      pillTag: '4 QUEIJOS',
      name: 'Pizza Quatro Queijos',
      desc: 'Mussarela, provolone, gorgonzola e parmesão gratinado.',
      price: 52.9,
      category: 'pizzas',
      bestSeller: true,
      sizes: PIZZA_SIZES,
      complements: PIZZA_COMPLEMENTS_QUATRO_QUEIJOS,
      img: IMAGES.pizzaArtesanal,
    },
    {
      id: 's3',
      topBadge: 'SOBREMESA',
      pillTag: 'COM SORVETE',
      name: 'Petit Gateau',
      desc: 'Bolinho de chocolate com recheio cremoso e sorvete.',
      price: 22.9,
      category: 'sobremesas',
      bestSeller: true,
      img: IMAGES.sobremesa,
    },
  ] as Product[],
  products: [
    // PIZZAS
    {
      id: 'p1',
      topBadge: 'MAIS PEDIDA',
      pillTag: 'MÉDIA 30CM / GRANDE 35CM',
      name: 'Pizza Margherita',
      desc: 'Molho de tomate, mussarela, manjericão fresco e azeite',
      price: 45.9,
      category: 'pizzas',
      bestSeller: true,
      sizes: PIZZA_SIZES,
      complements: PIZZA_COMPLEMENTS_DEFAULT,
      img: IMAGES.pizzaArtesanal,
    },
    {
      id: 'p2',
      topBadge: 'CLÁSSICA',
      pillTag: 'MÉDIA 30CM / GRANDE 35CM',
      name: 'Pizza Calabresa',
      desc: 'Molho de tomate, mussarela, calabresa fatiada e cebola',
      price: 48.9,
      category: 'pizzas',
      bestSeller: true,
      sizes: PIZZA_SIZES,
      complements: PIZZA_COMPLEMENTS_DEFAULT,
      img: IMAGES.pizzaArtesanal,
    },
    {
      id: 'p3',
      topBadge: '4 QUEIJOS',
      pillTag: 'MÉDIA 30CM / GRANDE 35CM',
      name: 'Pizza Quatro Queijos',
      desc: 'Mussarela, provolone, gorgonzola e parmesão',
      price: 52.9,
      category: 'pizzas',
      bestSeller: true,
      sizes: PIZZA_SIZES,
      complements: PIZZA_COMPLEMENTS_QUATRO_QUEIJOS,
      img: IMAGES.pizzaArtesanal,
    },

    // LANCHES
    {
      id: 'l1',
      topBadge: 'ARTESANAL',
      pillTag: 'BURGER 180G',
      name: 'X-Burger Clássico',
      desc: 'Pão brioche, hambúrguer 180g, queijo, alface, tomate e maionese',
      price: 28.9,
      category: 'lanches',
      bestSeller: true,
      additionals: LANCHE_ADDITIONALS,
      img: IMAGES.lancheBurger,
    },
    {
      id: 'l2',
      topBadge: 'MAIS PEDIDO',
      pillTag: 'DUPLO + BACON',
      name: 'X-Bacon Especial',
      desc: 'Pão, 2 hambúrgueres, bacon crocante, queijo cheddar e barbecue',
      price: 34.9,
      category: 'lanches',
      bestSeller: true,
      additionals: LANCHE_ADDITIONALS,
      img: IMAGES.lancheBurger,
    },
    {
      id: 'l3',
      pillTag: 'CROCANTE',
      name: 'Chicken Crispy',
      desc: 'Frango empanado crocante, alface, tomate e maionese especial',
      price: 26.9,
      category: 'lanches',
      additionals: LANCHE_ADDITIONALS,
      img: IMAGES.lancheBurger,
    },

    // BEBIDAS
    {
      id: 'b1',
      topBadge: 'FAMÍLIA',
      pillTag: '2 LITROS',
      name: 'Coca-Cola 2L',
      desc: 'Refrigerante Coca-Cola gelado 2 litros',
      price: 12.9,
      category: 'bebidas',
      bestSeller: true,
      img: IMAGES.cocaCola2l,
    },
    {
      id: 'b2',
      pillTag: 'NATURAL 500ML',
      name: 'Suco Natural Laranja',
      desc: 'Suco de laranja natural 500ml',
      price: 10.9,
      category: 'bebidas',
      bestSeller: true,
      img: IMAGES.bebidasCombo,
    },
    {
      id: 'b3',
      name: 'Água Mineral',
      desc: 'Água mineral sem gás 500ml',
      price: 4.9,
      category: 'bebidas',
      img: IMAGES.bebidasCombo,
    },
    {
      id: 'b4',
      name: 'Água com gás 500ml',
      desc: 'Água mineral com gás 500ml',
      price: 5.9,
      category: 'bebidas',
      img: IMAGES.bebidasCombo,
    },
    {
      id: 'b5',
      name: 'Água Tônica 350ml',
      desc: 'Água tônica gelada 350ml',
      price: 6.9,
      category: 'bebidas',
      img: IMAGES.tonicaAntarctica,
    },
    {
      id: 'b6',
      name: 'Água Tônica Zero 350ml',
      desc: 'Água tônica zero açúcar 350ml',
      price: 6.9,
      category: 'bebidas',
      img: IMAGES.tonicaAntarctica,
    },
    {
      id: 'b7',
      pillTag: 'LATA 350ML',
      name: 'Coca-Cola Lata 350ml',
      desc: 'Refrigerante Coca-Cola lata 350ml',
      price: 6.5,
      category: 'bebidas',
      img: IMAGES.cocaCola2l,
    },
    {
      id: 'b8',
      pillTag: 'LATA 350ML',
      name: 'Guaraná Lata 350ml',
      desc: 'Refrigerante Guaraná lata 350ml',
      price: 6.5,
      category: 'bebidas',
      img: IMAGES.guaranaLata,
    },
    {
      id: 'b9',
      pillTag: 'LATA 350ML',
      name: 'Fanta Lata 350ml',
      desc: 'Refrigerante Fanta laranja lata 350ml',
      price: 6.5,
      category: 'bebidas',
      img: IMAGES.bebidasCombo,
    },
    {
      id: 'b10',
      pillTag: 'LATA 350ML',
      name: 'Sprite Lata 350ml',
      desc: 'Refrigerante Sprite lata 350ml',
      price: 6.5,
      category: 'bebidas',
      img: IMAGES.spriteLata,
    },
    {
      id: 'b11',
      pillTag: 'ZERO AÇÚCAR',
      name: 'Coca-Cola Zero Lata 350ml',
      desc: 'Refrigerante Coca-Cola Zero lata 350ml',
      price: 6.5,
      category: 'bebidas',
      img: IMAGES.cocaCola2l,
    },
    {
      id: 'b12',
      pillTag: 'ZERO AÇÚCAR',
      name: 'Guaraná Zero Lata 350ml',
      desc: 'Refrigerante Guaraná Zero lata 350ml',
      price: 6.5,
      category: 'bebidas',
      img: IMAGES.guaranaLata,
    },
    {
      id: 'b13',
      pillTag: 'ZERO AÇÚCAR',
      name: 'Sprite Zero Lata 350ml',
      desc: 'Refrigerante Sprite Zero lata 350ml',
      price: 6.5,
      category: 'bebidas',
      img: IMAGES.spriteLata,
    },
    {
      id: 'b14',
      pillTag: 'MINI 220ML',
      name: 'Coca-Cola Mini 220ml',
      desc: 'Refrigerante Coca-Cola mini 220ml',
      price: 4.5,
      category: 'bebidas',
      img: IMAGES.cocaCola2l,
    },
    {
      id: 'b15',
      pillTag: 'MINI ZERO',
      name: 'Coca-Cola Mini Zero 220ml',
      desc: 'Refrigerante Coca-Cola Zero mini 220ml',
      price: 4.5,
      category: 'bebidas',
      img: IMAGES.cocaCola2l,
    },
    {
      id: 'b16',
      pillTag: 'MINI 220ML',
      name: 'Sprite Mini 220ml',
      desc: 'Refrigerante Sprite mini 220ml',
      price: 4.5,
      category: 'bebidas',
      img: IMAGES.spriteLata,
    },

    // SOBREMESAS
    {
      id: 's1',
      topBadge: 'CASEIRO',
      pillTag: 'COM SORVETE',
      name: 'Brownie de Chocolate',
      desc: 'Brownie caseiro com calda de chocolate e sorvete',
      price: 18.9,
      category: 'sobremesas',
      bestSeller: true,
      img: IMAGES.sobremesa,
    },
    {
      id: 's2',
      pillTag: 'TRADICIONAL',
      name: 'Pudim de Leite',
      desc: 'Pudim tradicional de leite condensado com calda de caramelo',
      price: 15.9,
      category: 'sobremesas',
      img: IMAGES.sobremesa,
    },
    {
      id: 's3',
      topBadge: 'MAIS PEDIDO',
      pillTag: 'QUENTINHO + SORVETE',
      name: 'Petit Gateau',
      desc: 'Bolinho de chocolate com recheio cremoso e sorvete',
      price: 22.9,
      category: 'sobremesas',
      bestSeller: true,
      img: IMAGES.sobremesa,
    },
  ] as Product[],
  faqs: [
    {
      question: 'O que o Sabor & Cia (Cardápio Magnético) oferece?',
      answer:
        'Trabalhamos com pizzas artesanais assadas no ponto perfeito (Média 30 cm com 6 fatias e Grande 35 cm com 8 fatias), lanches artesanais generosos com até 17 opções de adicionais, bebidas super geladas e sobremesas deliciosas.',
    },
    {
      question: 'Como faço meu pedido pelo WhatsApp?',
      answer:
        'Escolha seus itens no catálogo, personalize o tamanho da sua pizza ou os adicionais do seu lanche, adicione à sacola e preencha seu nome, endereço e forma de pagamento. Seu pedido chega formatado direto no nosso WhatsApp!',
    },
    {
      question: 'Qual o horário de funcionamento e tempo médio de entrega?',
      answer:
        'Atendemos de Domingo a Domingo, das 18:30 às 23:00. Nosso tempo médio de entrega é de 40 a 50 minutos, com pedido mínimo de R$ 25,00.',
    },
    {
      question: 'Onde fica o Sabor & Cia e quais as formas de pagamento?',
      answer:
        'Estamos na Av. Brasil, 2300 em Ponta Porã/MS. Aceitamos Pix (Chave: 67993174612), Cartão de Crédito, Cartão de Débito e Dinheiro (levamos troco se precisar!).',
    },
  ],
};
