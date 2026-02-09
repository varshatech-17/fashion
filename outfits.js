const outfitData = {
    occasions: [
        "College", "College Presentation", "Office", "Interview", "Party", "Wedding", "Casual Outing", "Date", "Fest/Festival", "Travel"
    ],
    vibes: [
        "Bold", "Minimal", "Classy", "Elegant", "Streetwear", "Cute", "Sporty", "Vintage", "Aesthetic", "Chill"
    ],
    colors: [
        "Black", "White", "Neutral", "Pastel", "Bright", "Any color"
    ],
    outfits: {
        getSuggestions: (occasion, vibe, color) => {
            const primaryColor = color === "Any color" ? "" : color + " ";
            const searchColor = color === "Any color" ? "stylish" : color.toLowerCase();

            // Step 1: Decide Category
            let category = "Casual";
            if (["College", "Casual Outing", "Travel"].includes(occasion)) category = "Casual";
            else if (["College Presentation", "Office"].includes(occasion)) category = "Formal";
            else if (occasion === "Interview") category = "StrictFormal";
            else if (["Party", "Date"].includes(occasion)) category = "WesternParty";
            else if (occasion === "Wedding") category = "Wedding";
            else if (occasion === "Fest/Festival") category = "Traditional";

            // Step 2: Styling Database based on Categories
            const database = {
                "Casual": [
                    {
                        name: "The Effortless Street Edge",
                        top: `${primaryColor}oversized graphic tee`,
                        bottom: "Relaxed fit charcoal denim jeans",
                        footwear: "Classic high-top sneakers",
                        accessories: "Silver chain necklace",
                        tip: "Tuck the front of the tee slightly for a more structured street look.",
                        keywords: [`${searchColor} graphic tee flat lay`, "charcoal jeans flat lay", "white sneakers product", "silver chain product"]
                    },
                    {
                        name: "Minimalist Daily Flow",
                        top: `${primaryColor}ribbed crop top`,
                        bottom: "High-waisted beige cargo pants",
                        footwear: "Neutral tone slip-on shoes",
                        accessories: "Small gold hoops",
                        tip: "Monochrome tones are dominating this season; keep it subtle.",
                        keywords: [`${searchColor} crop top flat lay`, "beige cargo pants flat lay", "slip on shoes product", "gold earrings product"]
                    },
                    {
                        name: "Retro Aesthetic Snap",
                        top: `${primaryColor}polo shirt`,
                        bottom: "Straight-leg light wash jeans",
                        footwear: "Retro canvas sneakers",
                        accessories: "Leather belt",
                        tip: "Roll up the sleeves once to lean into that vintage vibe.",
                        keywords: [`${searchColor} polo shirt flat lay`, "light wash jeans flat lay", "retro sneakers product", "leather belt product"]
                    }
                ],
                "Formal": [
                    {
                        name: "The Power Suit Edit",
                        top: `${primaryColor}tailored blazer`,
                        bottom: "Matching high-waisted trousers",
                        footwear: "Pointed-toe leather loafers",
                        accessories: "Minimalist wristwatch",
                        tip: "Wear the blazer open for a more approachable yet professional vibe.",
                        keywords: [`${searchColor} blazer flat lay`, `${searchColor} trousers flat lay`, "leather loafers product", "watch product"]
                    },
                    {
                        name: "Contemporary Corporate",
                        top: `${primaryColor}button-down silk shirt`,
                        bottom: "Navy blue pencil skirt",
                        footwear: "Nude slingback pumps",
                        accessories: "Pearl studs",
                        tip: "A crisp tuck ensures a sharp silhouette for meetings.",
                        keywords: [`${searchColor} silk shirt flat lay`, "navy skirt flat lay", "slingback pumps product", "pearl earrings product"]
                    },
                    {
                        name: "Modern Professional Set",
                        top: `${primaryColor}structured kurti`,
                        bottom: "White cigarette pants",
                        footwear: "Mules with metallic detail",
                        accessories: "Leather tote bag",
                        tip: "White bottoms make any formal color pop instantly.",
                        keywords: [`${searchColor} kurti flat lay`, "white trousers flat lay", "mules product", "leather bag product"]
                    }
                ],
                "StrictFormal": [
                    {
                        name: "The Interview Gold Standard",
                        top: `${primaryColor}formal shirt`,
                        bottom: "Charcoal gray slim-fit trousers",
                        footwear: "Leather oxford shoes",
                        accessories: "Classic leather belt",
                        tip: "Ensure your clothes are well-pressed; first impressions are everything.",
                        keywords: [`${searchColor} formal shirt flat lay`, "gray trousers flat lay", "oxford shoes product", "leather belt product"]
                    },
                    {
                        name: "Executive Precision",
                        top: `Dark ${primaryColor}blazer`,
                        bottom: "Tailored fit neutral skirt",
                        footwear: "Closed-toe black heels",
                        accessories: "Simple silver watch",
                        tip: "Stick to neutral supporting colors for maximum impact.",
                        keywords: [`${searchColor} blazer flat lay`, "neutral skirt flat lay", "black heels product", "silver watch product"]
                    },
                    {
                        name: "The Structured Professional",
                        top: `${primaryColor}mock-neck knit top`,
                        bottom: "Wide-leg formal trousers",
                        footwear: "Block-heel loafers",
                        accessories: "Delicate neckpiece",
                        tip: "A mock neck is a stylish alternative to a traditional collar.",
                        keywords: [`${searchColor} knit top flat lay`, "wide leg trousers flat lay", "block heel loafers product", "necklace product"]
                    }
                ],
                "WesternParty": [
                    {
                        name: "Vibrant Night Out",
                        top: `${primaryColor}sequin corset top`,
                        bottom: "Vegan leather mini skirt",
                        footwear: "Platform stiletto boots",
                        accessories: "Rhinestone earrings",
                        tip: "Let the sequins do the talking; keep accessories centered around the face.",
                        keywords: [`${searchColor} sequin top flat lay`, "leather skirt flat lay", "platform boots product", "rhinestone earrings product"]
                    },
                    {
                        name: "The Sleek Trendsetter",
                        top: `${primaryColor}bodycon dress`,
                        bottom: "N/A (Full Length)",
                        footwear: "Strappy lace-up heels",
                        accessories: "Metallic clutch bag",
                        tip: "Lace the heels over your trousers or dress for a trendy twist.",
                        keywords: [`${searchColor} dress flat lay`, "strappy heels product", "clutch bag product"]
                    },
                    {
                        name: "Glow & Flow",
                        top: `${primaryColor}satin wrap top`,
                        bottom: "Flare-leg black trousers",
                        footwear: "Pointed clear-strap heels",
                        accessories: "Layered gold chains",
                        tip: "The satin texture catches light perfectly for evening photos.",
                        keywords: [`${searchColor} satin top flat lay`, "black trousers flat lay", "clear heels product", "gold chain product"]
                    }
                ],
                "Wedding": [
                    {
                        name: "Royal Heritage Look",
                        top: `Main Outfit: ${primaryColor}silk saree`,
                        bottom: "Blouse: Matching designer blouse",
                        footwear: "Gold embellished juttis",
                        accessories: "Kundan necklace set",
                        tip: "A sleek low bun with flowers will complete the traditional Maharani look.",
                        keywords: [`${searchColor} silk saree flat lay`, "designer blouse flat lay", "gold juttis product", "kundan jewelry product"]
                    },
                    {
                        name: "Contemporary Ethnic Glam",
                        top: `Main Outfit: ${primaryColor}mirror work lehenga`,
                        bottom: "Blouse: Matching sleeveless choli",
                        footwear: "High block heels",
                        accessories: "Statement bangles",
                        tip: "Drape the dupatta over one shoulder and pin it at the waist for a modern silhouette.",
                        keywords: [`${searchColor} lehenga flat lay`, "sleeveless choli flat lay", "block heels product", "bangles product"]
                    },
                    {
                        name: "Fusion Designer Gown",
                        top: `Main Outfit: ${primaryColor}designer anarkali`,
                        bottom: "Bottom: Matching silk leggings",
                        footwear: "Bejeweled wedges",
                        accessories: "Heavy jhumkas",
                        tip: "Anarkalis provide great movement, perfect for the dance floor.",
                        keywords: [`${searchColor} anarkali flat lay`, "silk leggings flat lay", "wedges product", "jhumkas product"]
                    }
                ],
                "Traditional": [
                    {
                        name: "Festive Joy Outfit",
                        top: `Main Outfit: ${primaryColor}kurti set`,
                        bottom: "Bottom: Flared palazzo pants",
                        footwear: "Hand-crafted mojaris",
                        accessories: "Oxidized silver earrings",
                        tip: "Oxidized silver is the go-to for any festive Indian vibe.",
                        keywords: [`${searchColor} kurti flat lay`, "palazzo pants flat lay", "mojaris product", "silver earrings product"]
                    },
                    {
                        name: "Modern Ethnic Fusion",
                        top: `Main Outfit: ${primaryColor}short kurti`,
                        bottom: "Bottom: Patiala dhoti pants",
                        footwear: "Kolhapuri chappals",
                        accessories: "Colorful bangles",
                        tip: "Dhoti pants add a quirky, traditional edge for day-festivals.",
                        keywords: [`${searchColor} short kurti flat lay`, "dhoti pants flat lay", "kolhapuri chappals product", "bangles product"]
                    },
                    {
                        name: "The Classic Festival Vibe",
                        top: `Main Outfit: ${primaryColor}anarkali set`,
                        bottom: "Bottom: Matching dupatta",
                        footwear: "Classic gold heels",
                        accessories: "Silk clutch bag",
                        tip: "A well-draped dupatta can elevate even a simple kurti set.",
                        keywords: [`${searchColor} anarkali flat lay`, "dupatta flat lay", "gold heels product", "silk clutch product"]
                    }
                ]
            };

            // Heuristic uniqueness: return the database selection
            const selection = database[category] || database["Casual"];
            return selection;
        }
    }
};
