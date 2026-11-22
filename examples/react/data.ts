import type { Reel } from "./Example";

/*
 * The six groups of the static example, as data — what a CMS would send.
 * Pictures and videos are the static example's, served at /media.
 */
export const reels: Reel[] = [
    {
        "id": "enginar",
        "account": {
            "name": "enginardunyasi",
            "avatar": "/media/avatar-enginardunyasi.jpg",
            "profile": "https://www.instagram.com/enginardunyasi/"
        },
        "clips": [
            {
                "caption": "Artichokes at their tastiest",
                "video": "/media/enginar-1.mp4",
                "poster": "/media/enginar-1-poster.jpg",
                "product": {
                    "name": "Marinated Artichoke Salad, 425 g",
                    "category": {
                        "name": "Pantry",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-enginar.webp",
                    "price": "$9",
                    "about": "Artichoke hearts, marinated in olive oil and lemon — ready to eat, straight from the jar.",
                    "images": [
                        "/media/product-enginar.webp",
                        "/media/photo-artichoke-1.jpg",
                        "/media/photo-artichoke-2.jpg",
                        "/media/photo-artichoke-3.jpg",
                        "/media/photo-artichoke-4.jpg",
                        "/media/photo-artichoke-5.jpg",
                        "/media/photo-artichoke-6.jpg",
                        "/media/photo-artichoke-7.jpg",
                        "/media/photo-artichoke-8.jpg"
                    ]
                },
                "views": {
                    "short": "12.4K",
                    "full": "12,400"
                },
                "post": "Our artichoke salad: hearts marinated in olive oil and lemon, ready the moment you open the jar.\n\n#artichoke #oliveoil #pantry"
            },
            {
                "caption": "From Nazilli, dried in the sun",
                "video": "/media/enginar-2.mp4",
                "poster": "/media/enginar-2-poster.jpg",
                "product": {
                    "name": "Nazilli Baby Mountain Figs (Natural), 5 kg",
                    "category": {
                        "name": "Pantry",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-incir.webp",
                    "price": "$64",
                    "about": "Small mountain figs from Nazilli, sun-dried with nothing added.",
                    "images": [
                        "/media/product-incir.webp",
                        "/media/photo-fig-1.jpg",
                        "/media/photo-fig-2.jpg",
                        "/media/photo-fig-3.jpg"
                    ]
                },
                "views": {
                    "short": "8.1K",
                    "full": "8,100"
                },
                "post": "Baby figs from the hills of Nazilli, dried in the sun with nothing added. A 5 kg box, shipped free.\n\n#figs #nazilli #driedfruit"
            },
            {
                "caption": "Field tomatoes, chopped",
                "video": "/media/enginar-3.mp4",
                "poster": "/media/enginar-3-poster.jpg",
                "product": {
                    "name": "Chopped Tomato Sauce, 400 g × 6",
                    "category": {
                        "name": "Pantry",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-domates-sosu.webp",
                    "price": "$21",
                    "about": "Field tomatoes, chopped and cooked down — six jars for the pantry.",
                    "images": [
                        "/media/product-domates-sosu.webp",
                        "/media/photo-tomato-sauce-1.jpg",
                        "/media/photo-tomato-sauce-2.jpg",
                        "/media/photo-tomato-sauce-3.jpg"
                    ]
                },
                "views": {
                    "short": "5.6K",
                    "full": "5,600"
                },
                "post": "Tomatoes from our own fields, chopped and cooked down — six jars for the winter.\n\n#tomatosauce #homemade #pantry"
            }
        ]
    },
    {
        "id": "esarp",
        "account": {
            "name": "nuverascarfs",
            "avatar": "/media/avatar-nuverascarfs.jpg",
            "profile": "https://www.instagram.com/nuverascarfs/"
        },
        "clips": [
            {
                "caption": "Polka dots at their most elegant",
                "video": "/media/esarp-1.mp4",
                "poster": "/media/esarp-1-poster.jpg",
                "product": {
                    "name": "Cotton Voile Polka Dot Scarf",
                    "category": {
                        "name": "Scarves & shawls",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-esarp-1.webp",
                    "price": "$24",
                    "about": "Cotton voile, light and airy, with a red-and-white polka dot. 70 × 180 cm.",
                    "images": [
                        "/media/product-esarp-1.webp",
                        "/media/esarp-1-poster.jpg"
                    ]
                },
                "views": {
                    "short": "3.1K",
                    "full": "3,100"
                },
                "post": "Red and white polka dots on light cotton voile — our most elegant scarf yet.\n\n#scarf #polkadot #cottonvoile"
            },
            {
                "caption": "Naia cotton, so soft",
                "video": "/media/esarp-2.mp4",
                "poster": "/media/esarp-2-poster.jpg",
                "product": {
                    "name": "Naia Cotton Shawl",
                    "category": {
                        "name": "Scarves & shawls",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-esarp-2.webp",
                    "price": "$29",
                    "about": "A soft cotton shawl with a woven pattern that catches the light. 75 × 200 cm.",
                    "images": [
                        "/media/product-esarp-2.webp",
                        "/media/esarp-2-poster.jpg"
                    ]
                },
                "views": {
                    "short": "18.7K",
                    "full": "18,700"
                },
                "post": "Naia cotton: soft and warm, with a weave that catches the light.\n\n#shawl #cotton #naia"
            },
            {
                "caption": "Modal ombré, with a sheen",
                "video": "/media/esarp-3.mp4",
                "poster": "/media/esarp-3-poster.jpg",
                "product": {
                    "name": "Modal Ombré Scarf",
                    "category": {
                        "name": "Scarves & shawls",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-esarp-3.webp",
                    "price": "$27",
                    "about": "Modal with a satin sheen, its colour fading from one edge to the other.",
                    "images": [
                        "/media/product-esarp-3.webp",
                        "/media/esarp-3-poster.jpg"
                    ]
                },
                "views": {
                    "short": "2.4K",
                    "full": "2,400"
                },
                "post": "Modal with a satin sheen, its colour fading from one edge to the other. Our favourites, reviewed.\n\n#modal #ombre #scarf"
            },
            {
                "caption": "Naia Vera, in burgundy",
                "video": "/media/esarp-4.mp4",
                "poster": "/media/esarp-4-poster.jpg",
                "product": {
                    "name": "Naia Vera Shawl",
                    "category": {
                        "name": "Scarves & shawls",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-esarp-4.webp",
                    "price": "$29",
                    "about": "Deep burgundy with a tone-on-tone pattern; drapes and holds its shape.",
                    "images": [
                        "/media/product-esarp-4.webp",
                        "/media/esarp-4-poster.jpg"
                    ]
                },
                "views": {
                    "short": "9.8K",
                    "full": "9,800"
                },
                "post": "Naia Vera in deep burgundy — it drapes beautifully and holds its shape all day.\n\n#burgundy #shawl #naiavera"
            },
            {
                "caption": "Silky Elegance",
                "video": "/media/esarp-5.mp4",
                "poster": "/media/esarp-5-poster.jpg",
                "product": {
                    "name": "Silky Elegance Shawl",
                    "category": {
                        "name": "Scarves & shawls",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-esarp-5.webp",
                    "price": "$32",
                    "about": "A silky shawl with a fine texture and soft fringed ends.",
                    "images": [
                        "/media/product-esarp-5.webp",
                        "/media/esarp-5-poster.jpg"
                    ]
                },
                "views": {
                    "short": "1.2K",
                    "full": "1,200"
                },
                "post": "Silky Elegance: a fine texture and soft fringed ends, for the evenings that matter.\n\n#silk #elegance #shawl"
            }
        ]
    },
    {
        "id": "elmacioglu",
        "account": {
            "name": "elmacioglu",
            "avatar": "/media/avatar-elmacioglu.jpg",
            "profile": "https://www.instagram.com/elmacioglu/"
        },
        "clips": [
            {
                "caption": "How to make flour soup",
                "video": "/media/elmaci-1.mp4",
                "poster": "/media/elmaci-1-poster.jpg",
                "product": {
                    "name": "Elmacıoğlu Flour Soup",
                    "category": {
                        "name": "Home cooking",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-elmaci-1.webp",
                    "price": "$6",
                    "about": "A flour soup mix from Kayseri, the chef's way: ready in minutes, warm and filling.",
                    "images": [
                        "/media/product-elmaci-1.webp",
                        "/media/elmaci-1-poster.jpg"
                    ]
                },
                "views": {
                    "short": "860",
                    "full": "860"
                },
                "post": "Elmacıoğlu's legendary flour soup — how is it made? Our chef Osman shows you, step by step.\n\nWant to make it at home? Order from our online shop.\n\n#elmacıoğlu #kayseri #soup"
            },
            {
                "caption": "How to make Kayseri noodles",
                "video": "/media/elmaci-2.mp4",
                "poster": "/media/elmaci-2-poster.jpg",
                "product": {
                    "name": "Kayseri Egg Noodles",
                    "category": {
                        "name": "Home cooking",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-elmaci-2.webp",
                    "price": "$5",
                    "about": "Egg noodles rolled and cut as in Kayseri, dried slowly; cook, then toss with butter.",
                    "images": [
                        "/media/product-elmaci-2.webp",
                        "/media/elmaci-2-poster.jpg"
                    ]
                },
                "views": {
                    "short": "10.2K",
                    "full": "10,200"
                },
                "post": "Kayseri egg noodles, rolled and cut by hand and dried slowly. Cook them, then toss with butter.\n\n#kayseri #noodles #erişte"
            },
            {
                "caption": "How to make yumacık mantı",
                "video": "/media/elmaci-3.mp4",
                "poster": "/media/elmaci-3-poster.jpg",
                "product": {
                    "name": "Yumacık Mantı",
                    "category": {
                        "name": "Home cooking",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-elmaci-3.webp",
                    "price": "$9",
                    "about": "Small round mantı, filled and folded by hand; serve with yoghurt and red pepper butter.",
                    "images": [
                        "/media/product-elmaci-3.webp",
                        "/media/elmaci-3-poster.jpg"
                    ]
                },
                "views": {
                    "short": "37.1K",
                    "full": "37,100"
                },
                "post": "Yumacık mantı: small, round, folded one by one. Serve with yoghurt and red pepper butter.\n\n#mantı #kayseri #homecooking"
            },
            {
                "caption": "How to make bohça mantı",
                "video": "/media/elmaci-4.mp4",
                "poster": "/media/elmaci-4-poster.jpg",
                "product": {
                    "name": "Bohça Mantı",
                    "category": {
                        "name": "Home cooking",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-elmaci-4.webp",
                    "price": "$10",
                    "about": "Bundle-shaped mantı, baked then simmered — the Kayseri classic for a table of guests.",
                    "images": [
                        "/media/product-elmaci-4.webp",
                        "/media/elmaci-4-poster.jpg"
                    ]
                },
                "views": {
                    "short": "82.4K",
                    "full": "82,400"
                },
                "post": "Bohça mantı, baked then simmered — the Kayseri classic for a table of guests.\n\n#mantı #bohça #kayseri"
            }
        ]
    },
    {
        "id": "2aaltin",
        "account": {
            "name": "2aaltin",
            "avatar": "/media/avatar-2aaltin.jpg",
            "profile": "https://www.instagram.com/2aaltin/"
        },
        "clips": [
            {
                "caption": "Elegant, modern bangles",
                "video": "/media/altin-1.mp4",
                "poster": "/media/altin-1-poster.jpg",
                "product": {
                    "name": "14K Gold Bangle, 2.32 g",
                    "category": {
                        "name": "Gold jewellery",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-altin-1.webp",
                    "price": "11.590 ₺",
                    "about": "Slim 14-carat gold bangles with a fine engraved edge — for every day, or as a gift.",
                    "images": [
                        "/media/product-altin-1.webp",
                        "/media/altin-1-poster.jpg"
                    ]
                },
                "views": {
                    "short": "27K",
                    "full": "27,000"
                },
                "post": "Slim 14K gold bangles with a finely engraved edge. Which is yours — for you, for your daughter, or for a bride? Tell us in the comments.\n\n#gold #bangles #14k"
            },
            {
                "caption": "A precious investment in your future",
                "video": "/media/altin-2.mp4",
                "poster": "/media/altin-2-poster.jpg",
                "product": {
                    "name": "22K Gold Bar Necklace, 1.50 g",
                    "category": {
                        "name": "Gold jewellery",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-altin-2.webp",
                    "price": "12.990 ₺",
                    "about": "A 22-carat gold bar pendant, 999.9 fine: jewellery and saving at once.",
                    "images": [
                        "/media/product-altin-2.webp",
                        "/media/altin-2-poster.jpg"
                    ]
                },
                "views": {
                    "short": "14.3K",
                    "full": "14,300"
                },
                "post": "A 22K gold bar pendant, 999.9 fine. Jewellery or an investment — what do you think?\n\n#gold #investment #22k"
            },
            {
                "caption": "Made for everyday elegance",
                "video": "/media/altin-3.mp4",
                "poster": "/media/altin-3-poster.jpg",
                "product": {
                    "name": "14K Gold Ring",
                    "category": {
                        "name": "Gold jewellery",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-altin-3.webp",
                    "price": "8.490 ₺",
                    "about": "A plain 14-carat gold band with a softly faceted edge, made to be worn every day.",
                    "images": [
                        "/media/product-altin-3.webp",
                        "/media/altin-3-poster.jpg"
                    ]
                },
                "views": {
                    "short": "6.9K",
                    "full": "6,900"
                },
                "post": "A plain 14K gold band with a softly faceted edge, made to be worn every day.\n\n#goldring #everyday #14k"
            },
            {
                "caption": "Handmade diamond sparkle for special moments",
                "video": "/media/altin-4.mp4",
                "poster": "/media/altin-4-poster.jpg",
                "product": {
                    "name": "14K Diamond Chain Bracelet, 10.92 g",
                    "category": {
                        "name": "Gold jewellery",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-altin-4.webp",
                    "price": "54.590 ₺",
                    "about": "A hand-made 14-carat gold curb chain with a stone-set clasp — style and value in one.",
                    "images": [
                        "/media/product-altin-4.webp",
                        "/media/altin-4-poster.jpg"
                    ]
                },
                "views": {
                    "short": "41.2K",
                    "full": "41,200"
                },
                "post": "A handmade 14K curb chain bracelet with a stone-set clasp, for the moments that matter.\n\n#bracelet #diamond #handmade"
            }
        ]
    },
    {
        "id": "peskur",
        "account": {
            "name": "peskurkuruyemis",
            "avatar": "/media/avatar-peskurkuruyemis.jpg",
            "profile": "https://www.instagram.com/peskurkuruyemis/"
        },
        "clips": [
            {
                "caption": "Turkish coffee, from grandfather to grandson",
                "video": "/media/peskur-1.mp4",
                "poster": "/media/peskur-1-poster.jpg",
                "product": {
                    "name": "Peşeker Turkish Coffee",
                    "category": {
                        "name": "Delicatessen",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-kahve.jpg",
                    "price": "₺850",
                    "about": "Turkish coffee roasted and ground the old way — from grandfather to grandson since 1948.",
                    "variants": [
                        {
                            "id": "1kg",
                            "label": "1 kg",
                            "price": "₺850",
                            "href": "https://www.google.com/search?q=peseker+turk+kahvesi+1kg",
                            "images": [
                                "/media/peskur-kahve-1kg-1.jpg",
                                "/media/peskur-kahve-1kg-2.jpg",
                                "/media/peskur-kahve-1kg-3.jpg"
                            ]
                        },
                        {
                            "id": "500g",
                            "label": "500 g",
                            "price": "₺450",
                            "href": "https://www.google.com/search?q=peseker+turk+kahvesi+500g",
                            "images": [
                                "/media/peskur-kahve-500g-1.jpg",
                                "/media/peskur-kahve-500g-2.jpg",
                                "/media/peskur-kahve-500g-3.jpg"
                            ]
                        },
                        {
                            "id": "250g",
                            "label": "250 g",
                            "price": "₺240",
                            "href": "https://www.google.com/search?q=peseker+turk+kahvesi+250g",
                            "images": [
                                "/media/peskur-kahve-250g-1.jpg",
                                "/media/peskur-kahve-250g-2.jpg",
                                "/media/peskur-kahve-250g-3.jpg"
                            ]
                        },
                        {
                            "id": "100g",
                            "label": "100 g",
                            "price": "₺110",
                            "href": "https://www.google.com/search?q=peseker+turk+kahvesi+100g",
                            "images": [
                                "/media/peskur-kahve-100g-1.jpg",
                                "/media/peskur-kahve-100g-2.jpg",
                                "/media/peskur-kahve-100g-3.jpg"
                            ]
                        }
                    ]
                },
                "views": {
                    "short": "5.2K",
                    "full": "5,200"
                },
                "post": "From grandfather to grandson since 1948: Turkish coffee roasted and ground the old way.\n\n#turkishcoffee #peşeker #coffee"
            },
            {
                "caption": "I ate tahini, and my stomach ached",
                "video": "/media/peskur-2.mp4",
                "poster": "/media/peskur-2-poster.jpg",
                "product": {
                    "name": "Tahini",
                    "category": {
                        "name": "Delicatessen",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-tahin.jpg",
                    "about": "Traditional taste, modern twists — stone-ground sesame, single and double roasted.",
                    "images": [
                        "/media/product-peskur-tahin.jpg"
                    ],
                    "list": {
                        "count": "6 products",
                        "items": [
                            {
                                "name": "Peşkur Tahini, 300 g",
                                "price": "₺180",
                                "image": "/media/product-peskur-tahin.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Peşkur Tahini, 600 g",
                                "price": "₺320",
                                "image": "/media/product-peskur-tahin.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Double-Roasted Tahini",
                                "price": "₺260",
                                "image": "/media/peskur-2-poster.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Wholegrain Tahini",
                                "price": "₺210",
                                "image": "/media/peskur-2-poster.jpg",
                                "href": "https://www.google.com"
                            }
                        ]
                    }
                },
                "views": {
                    "short": "2.8K",
                    "full": "2,800"
                },
                "post": "Stone-ground sesame, single or double roasted — have you tried them all?\n\n#tahini #sesame #peşkur"
            },
            {
                "caption": "Welcome to Peşkur",
                "video": "/media/peskur-3.mp4",
                "poster": "/media/peskur-3-poster.jpg",
                "product": {
                    "name": "Dried Fruit",
                    "category": {
                        "name": "Delicatessen",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-meyve.jpg",
                    "about": "Sweet, natural snacks — fruit dried slowly, nothing added.",
                    "images": [
                        "/media/product-peskur-meyve.jpg"
                    ],
                    "list": {
                        "count": "39 products",
                        "items": [
                            {
                                "name": "Dried Pineapple, 250 g",
                                "price": "₺240",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Dried Strawberries, 250 g",
                                "price": "₺260",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Dried Apple, 250 g",
                                "price": "₺190",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Dried Mango, 250 g",
                                "price": "₺280",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            }
                        ]
                    }
                },
                "views": {
                    "short": "11.6K",
                    "full": "11,600"
                },
                "post": "Welcome to Peşkur! Fruit dried slowly with nothing added — 39 kinds to choose from.\n\n#driedfruit #snacks #peşkur"
            },
            {
                "caption": "Chocolates, carefully chosen",
                "video": "/media/peskur-4.mp4",
                "poster": "/media/peskur-4-poster.jpg",
                "product": {
                    "name": "Chocolate & Sweets",
                    "category": {
                        "name": "Delicatessen",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-cikolata.jpg",
                    "about": "For your sweet tooth — dragées, pralines and gift boxes.",
                    "images": [
                        "/media/product-peskur-cikolata.jpg"
                    ],
                    "list": {
                        "count": "98 products",
                        "items": [
                            {
                                "name": "Chocolate Gift Box",
                                "price": "₺650",
                                "image": "/media/product-peskur-cikolata.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Hazelnut Dragées, 250 g",
                                "price": "₺290",
                                "image": "/media/peskur-4-poster.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Praline Box",
                                "price": "₺480",
                                "image": "/media/product-peskur-cikolata.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Dark Chocolate",
                                "price": "₺220",
                                "image": "/media/peskur-4-poster.jpg",
                                "href": "https://www.google.com"
                            }
                        ]
                    }
                },
                "views": {
                    "short": "4.1K",
                    "full": "4,100"
                },
                "post": "Chocolates, carefully chosen: dragées, pralines and gift boxes for every sweet tooth.\n\n#chocolate #gifts #peşkur"
            }
        ]
    },
    {
        "id": "sadopastirma",
        "account": {
            "name": "sadopastirma",
            "avatar": "/media/avatar-sadopastirma.jpg",
            "profile": "https://www.instagram.com/sadopastirma/"
        },
        "clips": [
            {
                "caption": "Even the teleporting man is one of ours",
                "video": "/media/kaleonu-1.mp4",
                "poster": "/media/kaleonu-1-poster.jpg",
                "product": {
                    "name": "Kayseri Pastırma, 250 g",
                    "category": {
                        "name": "Cured meats",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/kaleonu-photo.jpg",
                    "price": "₺650",
                    "about": "Kayseri pastırma, cured and coated in çemen the old way, sliced thin for the table.",
                    "images": [
                        "/media/kaleonu-photo.jpg",
                        "/media/product-kaleonu-1.jpg",
                        "/media/kaleonu-1-poster.jpg"
                    ]
                },
                "views": {
                    "short": "1.9K",
                    "full": "1,900"
                },
                "post": "Kayseri pastırma, cured and coated in çemen the old way, sliced thin for your table.\n\n#pastırma #kayseri #curedmeat"
            },
            {
                "caption": "The sucuk is hanging — take your pick",
                "video": "/media/kaleonu-2.mp4",
                "poster": "/media/kaleonu-2-poster.jpg",
                "product": {
                    "name": "Kayseri Sucuk, 500 g",
                    "category": {
                        "name": "Cured meats",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-kaleonu-2.jpg",
                    "price": "₺480",
                    "about": "Beef sucuk with garlic and red pepper, dried in the shop — for the pan at breakfast.",
                    "images": [
                        "/media/product-kaleonu-2.jpg",
                        "/media/kaleonu-2-poster.jpg"
                    ]
                },
                "views": {
                    "short": "7.3K",
                    "full": "7,300"
                },
                "post": "The sucuk is hanging — take your pick. Beef, garlic and red pepper, dried right here in the shop.\n\n#sucuk #kayseri #breakfast"
            },
            {
                "caption": "Careful when you cook this precious sucuk",
                "video": "/media/kaleonu-3.mp4",
                "poster": "/media/kaleonu-3-poster.jpg",
                "product": {
                    "name": "Butcher's Sucuk, 500 g",
                    "category": {
                        "name": "Cured meats",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-kaleonu-3.jpg",
                    "price": "₺520",
                    "about": "The butcher's own sucuk, coarser and juicier — cook it slowly in its own fat.",
                    "images": [
                        "/media/product-kaleonu-3.jpg",
                        "/media/kaleonu-3-poster.jpg"
                    ]
                },
                "views": {
                    "short": "3.5K",
                    "full": "3,500"
                },
                "post": "Our butcher's sucuk: coarser and juicier. Cook it slowly in its own fat — carefully!\n\n#sucuk #butcher #kayseri"
            }
        ]
    }
];
