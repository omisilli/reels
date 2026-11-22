import type { Reel } from "./Example";

/*
 * The six groups of the static example, as data — what a CMS would send.
 * Pictures and videos are the static example's, served at /media.
 */
export const reels: Reel[] = [
    {
        "id": "enginar",
        "views": {
            "short": "12.4K",
            "full": "12,400"
        },
        "account": {
            "name": "enginardunyasi",
            "avatar": "/media/avatar-enginardunyasi.jpg",
            "profile": "https://www.instagram.com/enginardunyasi/"
        },
        "clips": [
            {
                "caption": "Enginarın en lezzetli hâli",
                "video": "/media/enginar-1.mp4",
                "poster": "/media/enginar-1-poster.jpg",
                "product": {
                    "name": "Marine Enginar Salatası, 425 g",
                    "category": {
                        "name": "Preserves",
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
                }
            },
            {
                "caption": "Nazilli'den, güneşte kurutulmuş",
                "video": "/media/enginar-2.mp4",
                "poster": "/media/enginar-2-poster.jpg",
                "product": {
                    "name": "Nazilli Bebek Dağ İnciri (Natürel), 5 kg",
                    "category": {
                        "name": "Dried fruit",
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
                }
            },
            {
                "caption": "Tarla domatesinden, doğranmış",
                "video": "/media/enginar-3.mp4",
                "poster": "/media/enginar-3-poster.jpg",
                "product": {
                    "name": "Domates Sosu (Doğranmış), 400 g × 6",
                    "category": {
                        "name": "Sauces",
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
                }
            }
        ]
    },
    {
        "id": "esarp",
        "views": {
            "short": "3.1K",
            "full": "3,100"
        },
        "account": {
            "name": "nuverascarfs",
            "avatar": "/media/avatar-nuverascarfs.jpg",
            "profile": "https://www.instagram.com/nuverascarfs/"
        },
        "clips": [
            {
                "caption": "Puantiyenin en zarif hâli",
                "video": "/media/esarp-1.mp4",
                "poster": "/media/esarp-1-poster.jpg",
                "product": {
                    "name": "Vual Pamuk Puantiye Desen",
                    "category": {
                        "name": "Scarves",
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
                }
            },
            {
                "caption": "Naia pamuk, yumuşacık",
                "video": "/media/esarp-2.mp4",
                "poster": "/media/esarp-2-poster.jpg",
                "product": {
                    "name": "Naia Pamuk Şal",
                    "category": {
                        "name": "Shawls",
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
                }
            },
            {
                "caption": "Modal degrade, ışıltılı",
                "video": "/media/esarp-3.mp4",
                "poster": "/media/esarp-3-poster.jpg",
                "product": {
                    "name": "Modal Degrade Desen",
                    "category": {
                        "name": "Scarves",
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
                }
            },
            {
                "caption": "Naia Vera, bordo",
                "video": "/media/esarp-4.mp4",
                "poster": "/media/esarp-4-poster.jpg",
                "product": {
                    "name": "Naia Vera Desen",
                    "category": {
                        "name": "Shawls",
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
                }
            },
            {
                "caption": "İpeksi Elegance",
                "video": "/media/esarp-5.mp4",
                "poster": "/media/esarp-5-poster.jpg",
                "product": {
                    "name": "İpeksi Elegance Şal",
                    "category": {
                        "name": "Shawls",
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
                }
            }
        ]
    },
    {
        "id": "elmacioglu",
        "views": {
            "short": "860",
            "full": "860"
        },
        "account": {
            "name": "elmacioglu",
            "avatar": "/media/avatar-elmacioglu.jpg",
            "profile": "https://www.instagram.com/elmacioglu/"
        },
        "clips": [
            {
                "caption": "Un çorbası nasıl yapılır?",
                "video": "/media/elmaci-1.mp4",
                "poster": "/media/elmaci-1-poster.jpg",
                "product": {
                    "name": "Elmacıoğlu Un Çorbası",
                    "category": {
                        "name": "Soups",
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
                }
            },
            {
                "caption": "Kayseri eriştesi nasıl yapılır?",
                "video": "/media/elmaci-2.mp4",
                "poster": "/media/elmaci-2-poster.jpg",
                "product": {
                    "name": "Kayseri Erişte",
                    "category": {
                        "name": "Noodles",
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
                }
            },
            {
                "caption": "Yumacık mantı nasıl yapılır?",
                "video": "/media/elmaci-3.mp4",
                "poster": "/media/elmaci-3-poster.jpg",
                "product": {
                    "name": "Yumacık Mantı",
                    "category": {
                        "name": "Mantı",
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
                }
            },
            {
                "caption": "Bohça mantı nasıl yapılır?",
                "video": "/media/elmaci-4.mp4",
                "poster": "/media/elmaci-4-poster.jpg",
                "product": {
                    "name": "Bohça Mantı",
                    "category": {
                        "name": "Mantı",
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
                }
            }
        ]
    },
    {
        "id": "2aaltin",
        "views": {
            "short": "27K",
            "full": "27,000"
        },
        "account": {
            "name": "2aaltin",
            "avatar": "/media/avatar-2aaltin.jpg",
            "profile": "https://www.instagram.com/2aaltin/"
        },
        "clips": [
            {
                "caption": "Zarif ve modern bilezikler",
                "video": "/media/altin-1.mp4",
                "poster": "/media/altin-1-poster.jpg",
                "product": {
                    "name": "14 Ayar Altın Bilezik, 2,32 g",
                    "category": {
                        "name": "Bangles",
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
                }
            },
            {
                "caption": "Geleceğiniz için değerli yatırım",
                "video": "/media/altin-2.mp4",
                "poster": "/media/altin-2-poster.jpg",
                "product": {
                    "name": "22 Ayar Külçe Altın Kolye, 1,50 g",
                    "category": {
                        "name": "Necklaces",
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
                }
            },
            {
                "caption": "Günlük şıklığınız için tasarlandı",
                "video": "/media/altin-3.mp4",
                "poster": "/media/altin-3-poster.jpg",
                "product": {
                    "name": "14 Ayar Altın Yüzük",
                    "category": {
                        "name": "Rings",
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
                }
            },
            {
                "caption": "Özel anlar için el yapımı pırlanta ışıltısı",
                "video": "/media/altin-4.mp4",
                "poster": "/media/altin-4-poster.jpg",
                "product": {
                    "name": "14 Ayar Pırlantalı Zincir Bileklik, 10,92 g",
                    "category": {
                        "name": "Bracelets",
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
                }
            }
        ]
    },
    {
        "id": "peskur",
        "views": {
            "short": "5.2K",
            "full": "5,200"
        },
        "account": {
            "name": "peskurkuruyemis",
            "avatar": "/media/avatar-peskurkuruyemis.jpg",
            "profile": "https://www.instagram.com/peskurkuruyemis/"
        },
        "clips": [
            {
                "caption": "Dededen toruna Türk kahvesi",
                "video": "/media/peskur-1.mp4",
                "poster": "/media/peskur-1-poster.jpg",
                "product": {
                    "name": "Peşeker Türk Kahvesi",
                    "category": {
                        "name": "Coffee",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-kahve.jpg",
                    "price": "₺850",
                    "about": "Turkish coffee roasted and ground the old way — from grandfather to grandson since 1948.",
                    "variants": [
                        {
                            "id": "1kg",
                            "label": "1 Kg",
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
                            "label": "500 Gr",
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
                            "label": "250 Gr",
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
                            "label": "100 Gr",
                            "price": "₺110",
                            "href": "https://www.google.com/search?q=peseker+turk+kahvesi+100g",
                            "images": [
                                "/media/peskur-kahve-100g-1.jpg",
                                "/media/peskur-kahve-100g-2.jpg",
                                "/media/peskur-kahve-100g-3.jpg"
                            ]
                        }
                    ],
                    "fromPrice": "from ₺110"
                }
            },
            {
                "caption": "Tahin yedim, midem ağrıdı",
                "video": "/media/peskur-2.mp4",
                "poster": "/media/peskur-2-poster.jpg",
                "product": {
                    "name": "Tahin Çeşitleri",
                    "category": {
                        "name": "Tahin Çeşitleri",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-tahin.jpg",
                    "about": "Geleneksel lezzet, modern farklar — stone-ground sesame, single and double roasted.",
                    "images": [
                        "/media/product-peskur-tahin.jpg"
                    ],
                    "list": {
                        "count": "6 products",
                        "items": [
                            {
                                "name": "Peşkur Tahin, 300 g",
                                "price": "₺180",
                                "image": "/media/product-peskur-tahin.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Peşkur Tahin, 600 g",
                                "price": "₺320",
                                "image": "/media/product-peskur-tahin.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Çifte Kavrulmuş Tahin",
                                "price": "₺260",
                                "image": "/media/peskur-2-poster.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Kepekli Tahin",
                                "price": "₺210",
                                "image": "/media/peskur-2-poster.jpg",
                                "href": "https://www.google.com"
                            }
                        ]
                    }
                }
            },
            {
                "caption": "Peşkur'a hoş geldiniz",
                "video": "/media/peskur-3.mp4",
                "poster": "/media/peskur-3-poster.jpg",
                "product": {
                    "name": "Kurutulmuş Meyveler",
                    "category": {
                        "name": "Kurutulmuş Meyveler",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-meyve.jpg",
                    "about": "Tatlı ve doğal atıştırmalıklar — fruit dried slowly, nothing added.",
                    "images": [
                        "/media/product-peskur-meyve.jpg"
                    ],
                    "list": {
                        "count": "39 products",
                        "items": [
                            {
                                "name": "Kurutulmuş Ananas, 250 g",
                                "price": "₺240",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Kurutulmuş Çilek, 250 g",
                                "price": "₺260",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Kurutulmuş Elma, 250 g",
                                "price": "₺190",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Kurutulmuş Mango, 250 g",
                                "price": "₺280",
                                "image": "/media/product-peskur-meyve.jpg",
                                "href": "https://www.google.com"
                            }
                        ]
                    }
                }
            },
            {
                "caption": "Özenle seçilmiş çikolatalar",
                "video": "/media/peskur-4.mp4",
                "poster": "/media/peskur-4-poster.jpg",
                "product": {
                    "name": "Çikolata ve Şekerleme",
                    "category": {
                        "name": "Çikolata ve Şekerleme",
                        "href": "https://www.google.com"
                    },
                    "href": "https://www.google.com",
                    "image": "/media/product-peskur-cikolata.jpg",
                    "about": "Tatlı ihtiyacınızı karşılayın — dragées, pralines and gift boxes.",
                    "images": [
                        "/media/product-peskur-cikolata.jpg"
                    ],
                    "list": {
                        "count": "98 products",
                        "items": [
                            {
                                "name": "Özel Kutu Çikolata",
                                "price": "₺650",
                                "image": "/media/product-peskur-cikolata.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Fındıklı Draje, 250 g",
                                "price": "₺290",
                                "image": "/media/peskur-4-poster.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Pralin Kutusu",
                                "price": "₺480",
                                "image": "/media/product-peskur-cikolata.jpg",
                                "href": "https://www.google.com"
                            },
                            {
                                "name": "Bitter Çikolata",
                                "price": "₺220",
                                "image": "/media/peskur-4-poster.jpg",
                                "href": "https://www.google.com"
                            }
                        ]
                    }
                }
            }
        ]
    },
    {
        "id": "sadopastirma",
        "views": {
            "short": "1.9K",
            "full": "1,900"
        },
        "account": {
            "name": "sadopastirma",
            "avatar": "/media/avatar-sadopastirma.jpg",
            "profile": "https://www.instagram.com/sadopastirma/"
        },
        "clips": [
            {
                "caption": "Işınlanan adamın da gadasını aldık",
                "video": "/media/kaleonu-1.mp4",
                "poster": "/media/kaleonu-1-poster.jpg",
                "product": {
                    "name": "Kayseri Pastırma, 250 g",
                    "category": {
                        "name": "Pastırma",
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
                }
            },
            {
                "caption": "Sucuklar asılı, seçim sizde",
                "video": "/media/kaleonu-2.mp4",
                "poster": "/media/kaleonu-2-poster.jpg",
                "product": {
                    "name": "Kayseri Sucuk, 500 g",
                    "category": {
                        "name": "Sucuk",
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
                }
            },
            {
                "caption": "Gadasını aldığım sucuğu pişirirken dikkat",
                "video": "/media/kaleonu-3.mp4",
                "poster": "/media/kaleonu-3-poster.jpg",
                "product": {
                    "name": "Kasap Sucuk, 500 g",
                    "category": {
                        "name": "Sucuk",
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
                }
            }
        ]
    }
];
