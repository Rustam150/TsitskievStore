// js/data/products.js
const products = [
    // Смартфоны
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 129990,
        oldPrice: 139990,
        category: "smartphones",
        brand: "Apple",
        image: "https://applestore72.ru/upload/iblock/0ca/5z9ahxxe7m0kw85vzyb8ygk2tyw18vjp.jpeg",
        rating: 4.9,
        features: {
            memory: "256GB",
            color: "Титановый синий",
            screen: "6.7''",
            camera: "48 Мп",
            battery: "4422 mAh"
        },
        inStock: true,
        isNew: true,
        isSale: false,
        description: "Флагманский смартфон с революционной камерой и процессором A17 Pro"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 109990,
        oldPrice: 119990,
        category: "smartphones",
        brand: "Samsung",
        image: "https://i-lite.ru/wp-content/uploads/2024/01/galaxy-s24-ultra-256-gb-zheltyj-titan.jpg",
        rating: 4.8,
        features: {
            memory: "512GB",
            color: "Черный",
            screen: "6.8''",
            camera: "200 Мп",
            battery: "5000 mAh"
        },
        inStock: true,
        isNew: true,
        isSale: true,
        description: "Мощный смартфон с AI-функциями и стилусом S-Pen"
    },
    {
        id: 3,
        name: "Xiaomi 14 Pro",
        price: 79990,
        oldPrice: 89990,
        category: "smartphones",
        brand: "Xiaomi",
        image: "https://mobilo4ka.ru/image/cache/3c8ec9eaaab81ed9a0a8165e2cfd3e06.jpg",
        rating: 4.6,
        features: {
            memory: "256GB",
            color: "Белый",
            screen: "6.73''",
            camera: "50 Мп",
            battery: "4880 mAh"
        },
        inStock: true,
        isNew: false,
        isSale: true,
        description: "Флагман от Xiaomi с камерой Leica и мощным процессором"
    },
    {
        id: 4,
        name: "Google Pixel 8 Pro",
        price: 89990,
        category: "smartphones",
        brand: "Google",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Wv6U1slUKe19kpaF2JR3VOAORUqZsJzQJg&s",
        rating: 4.7,
        features: {
            memory: "128GB",
            color: "Серый",
            screen: "6.7''",
            camera: "50 Мп",
            battery: "5050 mAh"
        },
        inStock: true,
        isNew: true,
        isSale: false,
        description: "Смартфон с лучшей камерой и чистым Android"
    },
    {
        id: 5,
        name: "OnePlus 12",
        price: 69990,
        category: "smartphones",
        brand: "OnePlus",
        image: "https://store123.ru/upload/iblock/464/2rs5fx2ri0rupczlaolqpxwqgn5x5lyt.jpg",
        rating: 4.5,
        features: {
            memory: "256GB",
            color: "Зеленый",
            screen: "6.82''",
            camera: "50 Мп",
            battery: "5400 mAh"
        },
        inStock: false,
        isNew: true,
        isSale: false,
        description: "Мощный и быстрый смартфон с отличной сборкой"
    },

    // Ноутбуки
    {
        id: 6,
        name: "MacBook Pro 16'' M3 Max",
        price: 299990,
        oldPrice: 329990,
        category: "laptops",
        brand: "Apple",
        image: "https://trashbox.ru/ifiles2/1882214_0d1465_apple-macbook-pro-16-m3-max-5146.jpg_min1x2.jpg/macbook-pro-16-m3-max-obzor-26.webp",
        rating: 4.9,
        features: {
            memory: "1TB SSD",
            color: "Серый космос",
            screen: "16.2''",
            processor: "Apple M3 Max",
            ram: "36GB"
        },
        inStock: true,
        isNew: true,
        isSale: true,
        description: "Профессиональный ноутбук для творчества и работы"
    },
    {
        id: 7,
        name: "Dell XPS 15",
        price: 159990,
        category: "laptops",
        brand: "Dell",
        image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/notebook-xps-15-9530-nt-blue-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3333&hei=3333&qlt=100,0&resMode=sharp2&size=3333,3333",
        rating: 4.7,
        features: {
            memory: "512GB SSD",
            color: "Серебристый",
            screen: "15.6''",
            processor: "Intel i7",
            ram: "16GB"
        },
        inStock: true,
        isNew: false,
        isSale: false,
        description: "Премиальный ноутбук с безрамочным дисплеем"
    },
    {
        id: 8,
        name: "ASUS ROG Zephyrus",
        price: 189990,
        oldPrice: 199990,
        category: "laptops",
        brand: "ASUS",
        image: "https://dlcdnwebimgs.asus.com/gain/4A35A5A5-9B75-4BD8-8D3F-6D43C3174855/w717/h525",
        rating: 4.8,
        features: {
            memory: "1TB SSD",
            color: "Черный",
            screen: "16''",
            processor: "AMD Ryzen 9",
            ram: "32GB"
        },
        inStock: true,
        isNew: false,
        isSale: true,
        description: "Игровой ноутбук премиум-класса"
    },

    // Планшеты
    {
        id: 9,
        name: "iPad Pro 12.9'' M2",
        price: 109990,
        oldPrice: 119990,
        category: "tablets",
        brand: "Apple",
        image: "https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad_Pro_M2_10182022_big.jpg.large.jpg",
        rating: 4.8,
        features: {
            memory: "256GB",
            color: "Серебристый",
            screen: "12.9''",
            processor: "Apple M2",
            cellular: "Wi-Fi + Cellular"
        },
        inStock: true,
        isNew: true,
        isSale: true,
        description: "Мощный планшет для профессионалов"
    },
    {
        id: 10,
        name: "Samsung Galaxy Tab S9",
        price: 79990,
        category: "tablets",
        brand: "Samsung",
        image: "https://images.samsung.com/is/image/samsung/p6pim/ru/2307/gallery/ru-galaxy-tab-s9-5g-sm-x716bzaceub-535973664",
        rating: 4.5,
        features: {
            memory: "128GB",
            color: "Серый",
            screen: "11''",
            processor: "Snapdragon 8 Gen 2",
            cellular: "Wi-Fi"
        },
        inStock: true,
        isNew: true,
        isSale: false,
        description: "Универсальный планшет с S-Pen"
    },

    // Наушники
    {
        id: 11,
        name: "Sony WH-1000XM5",
        price: 29990,
        oldPrice: 34990,
        category: "headphones",
        brand: "Sony",
        image: "https://www.sony.ru/image/5a6e33d6d97a4142e50e5c5c7a7e5b5f?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
        rating: 4.7,
        features: {
            type: "Накладные",
            noiseCancel: "Активное шумоподавление",
            battery: "30 часов",
            color: "Черный"
        },
        inStock: true,
        isNew: false,
        isSale: true,
        description: "Лучшие беспроводные наушники с шумоподавлением"
    },
    {
        id: 12,
        name: "Apple AirPods Pro 2",
        price: 24990,
        category: "headphones",
        brand: "Apple",
        image: "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907.jpg.og.jpg",
        rating: 4.6,
        features: {
            type: "Вкладыши",
            noiseCancel: "Активное шумоподавление",
            battery: "6 часов",
            color: "Белый"
        },
        inStock: true,
        isNew: true,
        isSale: false,
        description: "Беспроводные наушники с продвинутым шумоподавлением"
    },
    {
        id: 13,
        name: "Samsung Galaxy Buds2 Pro",
        price: 14990,
        category: "headphones",
        brand: "Samsung",
        image: "https://images.samsung.com/is/image/samsung/p6pim/ru/2208/gallery/ru-galaxy-buds2-pro-r510-sm-r510nzaceur-534299301",
        rating: 4.4,
        features: {
            type: "Вкладыши",
            noiseCancel: "Активное шумоподавление",
            battery: "8 часов",
            color: "Фиолетовый"
        },
        inStock: true,
        isNew: false,
        isSale: false,
        description: "Компактные беспроводные наушники"
    },

    // Часы
    {
        id: 14,
        name: "Apple Watch Series 9",
        price: 39990,
        oldPrice: 44990,
        category: "watches",
        brand: "Apple",
        image: "https://www.apple.com/newsroom/images/product/watch/standard/Apple-Watch-S9-hero-230912.jpg.og.jpg",
        rating: 4.5,
        features: {
            type: "Смарт-часы",
            screen: "1.9''",
            battery: "18 часов",
            color: "Серебристый",
            size: "45mm"
        },
        inStock: true,
        isNew: true,
        isSale: true,
        description: "Умные часы с новыми функциями"
    },
    {
        id: 15,
        name: "Samsung Galaxy Watch 6",
        price: 29990,
        category: "watches",
        brand: "Samsung",
        image: "https://images.samsung.com/is/image/samsung/p6pim/ru/2307/gallery/ru-galaxy-watch6-classic-r965-sm-r965fzsacis-535973791",
        rating: 4.3,
        features: {
            type: "Смарт-часы",
            screen: "1.5''",
            battery: "40 часов",
            color: "Черный",
            size: "44mm"
        },
        inStock: true,
        isNew: true,
        isSale: false,
        description: "Стильные умные часы для Android"
    },
    {
        id: 16,
        name: "Xiaomi Watch S3",
        price: 12990,
        category: "watches",
        brand: "Xiaomi",
        image: "https://i02.appmifile.com/967_operatorx_operatorx_opx/02/02/2024/28a4b4c4b4c4a4b4c4b4c4a4b4c4a4b4.png",
        rating: 4.2,
        features: {
            type: "Смарт-часы",
            screen: "1.43''",
            battery: "15 дней",
            color: "Серебристый",
            size: "46mm"
        },
        inStock: true,
        isNew: true,
        isSale: false,
        description: "Доступные умные часы с долгим временем работы"
    }
];

const categories = ["all", "smartphones", "laptops", "tablets", "headphones", "watches"];
const brands = ["all", "Apple", "Samsung", "Sony", "Xiaomi", "Google", "OnePlus", "Dell", "ASUS"];