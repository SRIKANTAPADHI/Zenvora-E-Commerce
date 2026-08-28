
// export default products;

const products = [
  {
    id: 1,
    title: "Apple iPhone 15",
    category: "Mobiles",
    brand: "Apple",
    stock: 25,
    description:
      "6.1-inch Super Retina XDR Display, A16 Bionic Chip, 48MP Camera, USB-C, 128GB.",
    price: 69999,
    originalPrice: 79999,
    rating: 4.8,
    reviews: 15420,
    image: "https://m.media-amazon.com/images/I/619m8rLBQSL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/iphone15.jpg",
      "/images/products/iphone15-2.jpg"
    ],
    discount: "13% Off",
    seller: "Apple Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    category: "Mobiles",
    brand: "Samsung",
    stock: 18,
    description:
      "6.2-inch AMOLED Display, Snapdragon 8 Gen 3, 50MP Camera, 256GB.",
    price: 65999,
    originalPrice: 74999,
    rating: 4.7,
    reviews: 12355,
    image: "https://m.media-amazon.com/images/I/61YWiaTN6KL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/galaxys24.jpg",
      "/images/products/galaxys24-2.jpg"
    ],
    discount: "12% Off",
    seller: "Samsung Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    title: "Google Pixel 9",
    category: "Mobiles",
    brand: "Google",
    stock: 14,
    description:
      "Tensor G4 Processor, 50MP Camera, 6.3-inch OLED Display.",
    price: 74999,
    originalPrice: 82999,
    rating: 4.8,
    reviews: 8420,
    image: "https://m.media-amazon.com/images/I/61vPDPr-RzL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/pixel9.jpg",
      "/images/products/pixel9-2.jpg"
    ],
    discount: "10% Off",
    seller: "Google Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: true
  },
  {
    id: 4,
    title: "OnePlus 13",
    category: "Mobiles",
    brand: "OnePlus",
    stock: 20,
    description:
      "Snapdragon 8 Elite, 120Hz AMOLED Display, 6000mAh Battery.",
    price: 58999,
    originalPrice: 64999,
    rating: 4.6,
    reviews: 7210,
    image: "https://m.media-amazon.com/images/I/71vRZZ+FCiL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/oneplus13.jpg",
      "/images/products/oneplus13-2.jpg"
    ],
    discount: "9% Off",
    seller: "OnePlus Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: false
  },
  {
    id: 5,
    title: "Nothing Phone (3)",
    category: "Mobiles",
    brand: "Nothing",
    stock: 22,
    description:
      "Glyph Interface, AMOLED Display, Snapdragon Processor, 256GB.",
    price: 42999,
    originalPrice: 47999,
    rating: 4.5,
    reviews: 5120,
    image: "https://m.media-amazon.com/images/I/717z2bNF6DL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/nothing3.jpg",
      "/images/products/nothing3-2.jpg"
    ],
    discount: "10% Off",
    seller: "Nothing Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    title: "iQOO Neo 10",
    category: "Mobiles",
    brand: "iQOO",
    stock: 17,
    description:
      "144Hz AMOLED Display, Snapdragon Processor, 5500mAh Battery.",
    price: 34999,
    originalPrice: 38999,
    rating: 4.5,
    reviews: 4890,
    image: "https://m.media-amazon.com/images/I/61IVSO-TPEL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/iqooneo10.jpg",
      "/images/products/iqooneo10-2.jpg"
    ],
    discount: "10% Off",
    seller: "iQOO Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: false
  },
  {
    id: 7,
    title: "Motorola Edge 60",
    category: "Mobiles",
    brand: "Motorola",
    stock: 15,
    description:
      "Curved pOLED Display, 50MP OIS Camera, Fast Charging.",
    price: 29999,
    originalPrice: 34999,
    rating: 4.4,
    reviews: 3610,
    image: "https://m.media-amazon.com/images/I/41ptXDFmh3L._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/motoedge60.jpg",
      "/images/products/motoedge60-2.jpg"
    ],
    discount: "14% Off",
    seller: "Motorola Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: false
  },
  {
    id: 8,
    title: "Xiaomi 15",
    category: "Mobiles",
    brand: "Xiaomi",
    stock: 19,
    description:
      "Leica Camera System, Snapdragon Flagship Processor, AMOLED.",
    price: 54999,
    originalPrice: 60999,
    rating: 4.6,
    reviews: 4300,
    image: "https://m.media-amazon.com/images/I/71HXsFonzaL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/xiaomi15.jpg",
      "/images/products/xiaomi15-2.jpg"
    ],
    discount: "10% Off",
    seller: "Xiaomi Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: true
  },
  {
    id: 9,
    title: "Realme GT 7",
    category: "Mobiles",
    brand: "Realme",
    stock: 21,
    description:
      "AMOLED Display, 50MP Camera, 120W Fast Charging.",
    price: 31999,
    originalPrice: 36999,
    rating: 4.4,
    reviews: 4025,
    image: "https://m.media-amazon.com/images/I/81IytpoiMjL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/realmegt7.jpg",
      "/images/products/realmegt7-2.jpg"
    ],
    discount: "13% Off",
    seller: "Realme Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: false
  },
  {
    id: 10,
    title: "Vivo V50",
    category: "Mobiles",
    brand: "Vivo",
    stock: 16,
    description:
      "ZEISS Camera, AMOLED Display, Snapdragon Processor.",
    price: 37999,
    originalPrice: 42999,
    rating: 4.5,
    reviews: 3760,
    image: "https://m.media-amazon.com/images/I/71uAly+24OL._AC_UY327_FMwebp_QL65_.jpg",
    images: [
      "/images/products/vivov50.jpg",
      "/images/products/vivov50-2.jpg"
    ],
    discount: "12% Off",
    seller: "Vivo Store",
    warranty: "1 Year",
    delivery: "Free Delivery",
    inStock: true,
    featured: false
  },
  {
  id: 11,
  title: "Apple MacBook Air M3",
  category: "Laptops",
  brand: "Apple",
  stock: 12,
  description:
    "13.6-inch Liquid Retina Display, Apple M3 Chip, 16GB RAM, 512GB SSD.",
  price: 114999,
  originalPrice: 124999,
  rating: 4.9,
  reviews: 8750,
  image: "https://picsum.photos/seed/macbookm3/600/600",
  images: [
    "https://picsum.photos/seed/macbookm3/600/600",
    "https://picsum.photos/seed/macbookm3-2/600/600"
  ],
  discount: "8% Off",
  seller: "Apple Store",
  warranty: "1 Year Manufacturer Warranty",
  delivery: "FREE Delivery",
  inStock: true,
  featured: true
},

{
  id: 12,
  title: "Dell Inspiron 15",
  category: "Laptops",
  brand: "Dell",
  stock: 20,
  description:
    "Intel Core i7 13th Gen, 16GB RAM, 512GB SSD, Windows 11.",
  price: 68999,
  originalPrice: 74999,
  rating: 4.6,
  reviews: 6421,
  image: "https://picsum.photos/seed/dellinspiron15/600/600",
  images: [
    "https://picsum.photos/seed/dellinspiron15/600/600",
    "https://picsum.photos/seed/dellinspiron15-2/600/600"
  ],
  discount: "8% Off",
  seller: "Dell Store",
  warranty: "1 Year Manufacturer Warranty",
  delivery: "FREE Delivery",
  inStock: true,
  featured: false
},

{
  id: 13,
  title: "HP Pavilion 15",
  category: "Laptops",
  brand: "HP",
  stock: 18,
  description:
    "Intel Core i5 13th Gen, 16GB RAM, 512GB SSD, Full HD Display.",
  price: 62999,
  originalPrice: 69999,
  rating: 4.5,
  reviews: 5320,
  image: "https://picsum.photos/seed/hppavilion15/600/600",
  images: [
    "https://picsum.photos/seed/hppavilion15/600/600",
    "https://picsum.photos/seed/hppavilion15-2/600/600"
  ],
  discount: "10% Off",
  seller: "HP Store",
  warranty: "1 Year Manufacturer Warranty",
  delivery: "FREE Delivery",
  inStock: true,
  featured: false
},

{
  id: 14,
  title: "Lenovo IdeaPad Slim 5",
  category: "Laptops",
  brand: "Lenovo",
  stock: 15,
  description:
    "AMD Ryzen 7, 16GB RAM, 512GB SSD, 15.6-inch Full HD Display.",
  price: 59999,
  originalPrice: 65999,
  rating: 4.6,
  reviews: 4985,
  image: "https://picsum.photos/seed/lenovoideapad/600/600",
  images: [
    "https://picsum.photos/seed/lenovoideapad/600/600",
    "https://picsum.photos/seed/lenovoideapad-2/600/600"
  ],
  discount: "9% Off",
  seller: "Lenovo Store",
  warranty: "1 Year Manufacturer Warranty",
  delivery: "FREE Delivery",
  inStock: true,
  featured: true
},

{
  id: 15,
  title: "ASUS VivoBook 15",
  category: "Laptops",
  brand: "ASUS",
  stock: 17,
  description:
    "Intel Core i5, 16GB RAM, 512GB SSD, OLED Display.",
  price: 56999,
  originalPrice: 62999,
  rating: 4.5,
  reviews: 4210,
  image: "https://picsum.photos/seed/asusvivobook15/600/600",
  images: [
    "https://picsum.photos/seed/asusvivobook15/600/600",
    "https://picsum.photos/seed/asusvivobook15-2/600/600"
  ],
  discount: "10% Off",
  seller: "ASUS Store",
  warranty: "1 Year Manufacturer Warranty",
  delivery: "FREE Delivery",
  inStock: true,
  featured: false
},
];

export default products;