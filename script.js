const chatMessages = document.getElementById('chat-messages');
const optionsContainer = document.getElementById('options-container');
const textInputWrapper = document.getElementById('text-input-wrapper');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Manual Local Image Database
const fashionImageDB = {
    // Western Tops
    "blazer": ["images/blazer1.jpg", "images/blazer2.jpg"],
    "formal shirt": ["images/formal_shirt1.jpg", "images/formal_shirt2.jpg"],
    "satin blouse": ["images/satin_blouse1.jpg", "images/satin_blouse2.jpg"],
    "crop top": ["images/crop_top1.jpg", "images/crop_top2.jpg"],
    "t-shirt": ["images/tshirt1.jpg", "images/tshirt2.jpg"],
    "graphic tee": ["images/graphic_tee1.jpg", "images/graphic_tee2.jpg"],
    "polo shirt": ["images/polo1.jpg", "images/polo2.jpg"],
    "hoodie": ["images/hoodie1.jpg", "images/hoodie2.jpg"],
    "sweater": ["images/sweater1.jpg", "images/sweater2.jpg"],
    "knit top": ["images/knit_top1.jpg", "images/knit_top2.jpg"],
    "jacket": ["images/jacket1.jpg", "images/jacket2.jpg"],
    "corset top": ["images/corset1.jpg", "images/corset2.jpg"],
    "wrap top": ["images/wrap_top1.jpg", "images/wrap_top2.jpg"],

    // Bottoms
    "jeans": ["images/jeans1.jpg", "images/jeans2.jpg"],
    "trousers": ["images/trousers1.jpg", "images/trousers2.jpg"],
    "pants": ["images/trousers1.jpg", "images/trousers2.jpg"], // Alias
    "skirt": ["images/skirt1.jpg", "images/skirt2.jpg"],
    "mini skirt": ["images/mini_skirt1.jpg", "images/mini_skirt2.jpg"],
    "pencil skirt": ["images/pencil_skirt1.jpg", "images/pencil_skirt2.jpg"],
    "palazzo": ["images/palazzo1.jpg", "images/palazzo2.jpg"],
    "cargo pants": ["images/cargo1.jpg", "images/cargo2.jpg"],
    "cigarette pants": ["images/cigarette_pants1.jpg", "images/cigarette_pants2.jpg"],
    "dhoti pants": ["images/dhoti1.jpg", "images/dhoti2.jpg"],
    "leggings": ["images/leggings1.jpg", "images/leggings2.jpg"],

    // Dresses
    "dress": ["images/dress1.jpg", "images/dress2.jpg"],
    "bodycon dress": ["images/bodycon1.jpg", "images/bodycon2.jpg"],
    "party dress": ["images/party_dress1.jpg", "images/party_dress2.jpg"],
    "midi dress": ["images/midi1.jpg", "images/midi2.jpg"],
    "maxi dress": ["images/maxi1.jpg", "images/maxi2.jpg"],
    "gown": ["images/gown1.jpg", "images/gown2.jpg"],

    // Ethnic
    "saree": ["images/saree1.jpg", "images/saree2.jpg"],
    "silk saree": ["images/silk_saree1.jpg", "images/silk_saree2.jpg"],
    "lehenga": ["images/lehenga1.jpg", "images/lehenga2.jpg"],
    "bridal lehenga": ["images/lehenga_bridal1.jpg", "images/lehenga_bridal2.jpg"],
    "anarkali": ["images/anarkali1.jpg", "images/anarkali2.jpg"],
    "kurti": ["images/kurti1.jpg", "images/kurti2.jpg"],
    "choli": ["images/choli1.jpg", "images/choli2.jpg"],
    "dupatta": ["images/dupatta1.jpg", "images/dupatta2.jpg"],
    "salwar suit": ["images/salwar1.jpg", "images/salwar2.jpg"],
    "indo western": ["images/indo_western1.jpg", "images/indo_western2.jpg"],

    // Footwear
    "heels": ["images/heels1.jpg", "images/heels2.jpg"],
    "block heels": ["images/block_heels1.jpg", "images/block_heels2.jpg"],
    "pumps": ["images/pumps1.jpg", "images/pumps2.jpg"],
    "sneakers": ["images/sneakers1.jpg", "images/sneakers2.jpg"],
    "flats": ["images/flats1.jpg", "images/flats2.jpg"],
    "mules": ["images/mules1.jpg", "images/mules2.jpg"],
    "mojaris": ["images/mojaris1.jpg", "images/mojaris2.jpg"],
    "juttis": ["images/juttis1.jpg", "images/juttis2.jpg"],
    "boots": ["images/boots1.jpg", "images/boots2.jpg"],
    "chappals": ["images/chappals1.jpg", "images/chappals2.jpg"],
    "sandals": ["images/sandals1.jpg", "images/sandals2.jpg"],

    // Accessories
    "clutch": ["images/clutch1.jpg", "images/clutch2.jpg"],
    "handbag": ["images/handbag1.jpg", "images/handbag2.jpg"],
    "tote bag": ["images/tote1.jpg", "images/tote2.jpg"],
    "bag": ["images/bag1.jpg", "images/bag2.jpg"],
    "watch": ["images/watch1.jpg", "images/watch2.jpg"],
    "earrings": ["images/earrings1.jpg", "images/earrings2.jpg"],
    "necklace": ["images/necklace1.jpg", "images/necklace2.jpg"],
    "bangles": ["images/bangles1.jpg", "images/bangles2.jpg"],
    "belt": ["images/belt1.jpg", "images/belt2.jpg"],
    "chains": ["images/chains1.jpg", "images/chains2.jpg"],
    "jhumkas": ["images/jhumkas1.jpg", "images/jhumkas2.jpg"]
};

let currentState = 'OCCASION';
let userData = {
    occasion: '',
    vibe: '',
    color: ''
};

function addMessage(text, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isBot ? 'bot-message' : 'user-message');
    messageDiv.innerHTML = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
}

function renderOptions(options, isCustomAllowed = true) {
    optionsContainer.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => handleInput(opt);
        optionsContainer.appendChild(btn);
    });

    if (isCustomAllowed) {
        const customBtn = document.createElement('button');
        customBtn.classList.add('option-btn');
        customBtn.innerText = 'Custom...';
        customBtn.onclick = () => {
            optionsContainer.style.display = 'none';
            textInputWrapper.style.display = 'flex';
            userInput.focus();
        };
        optionsContainer.appendChild(customBtn);
    }
}

function handleInput(val) {
    if (!val) return;

    addMessage(val, false);
    optionsContainer.style.display = 'flex';
    textInputWrapper.style.display = 'none';
    userInput.value = '';

    if (currentState === 'OCCASION') {
        userData.occasion = val;
        currentState = 'VIBE';
        setTimeout(askVibe, 500);
    } else if (currentState === 'VIBE') {
        userData.vibe = val;
        currentState = 'COLOR';
        setTimeout(askColor, 500);
    } else if (currentState === 'COLOR') {
        userData.color = val;
        currentState = 'DONE';
        setTimeout(generateOutfits, 500);
    }
}

function askOccasion() {
    addMessage("Hey there, trendsetter! ✨ Ready to look fire? What's the occasion today?");
    renderOptions(outfitData.occasions);
}

function askVibe() {
    addMessage("Love it! Now, what kind of vibe are we going for?");
    renderOptions(outfitData.vibes);
}

function askColor() {
    addMessage("Gotcha. Lastly, any color preference or palette you have in mind?");
    renderOptions(outfitData.colors);
}

// --- FINAL LOCAL IMAGE SYSTEM ---

function getClothingImage(keyword) {
    const kw = keyword.toLowerCase();

    // Map keywords to your local images folder
    if (kw.includes("kurti")) return "images/kurti1.jpg";
    if (kw.includes("trouser") || kw.includes("pant")) return "images/trousers1.jpg";
    if (kw.includes("heels") || kw.includes("mules") || kw.includes("footwear")) return "images/heels1.jpg";
    if (kw.includes("bag") || kw.includes("clutch")) return "images/bag1.jpg";
    if (kw.includes("blazer")) return "images/blazer1.jpg";
    if (kw.includes("saree")) return "images/saree1.jpg";
    if (kw.includes("lehenga")) return "images/lehenga1.jpg";

    // Show this if no other image is found
    return "images/default.jpg";
}

function generateOutfits() {
    addMessage("Thinking... 🧠 Browsing your local fashion lookbook!");

    const suggestions = outfitData.outfits.getSuggestions(userData.occasion, userData.vibe, userData.color);

    setTimeout(() => {
        addMessage(`<i>Outfit suggestions for you:</i>`);

        suggestions.forEach((outfit, index) => {
            const outfitHtml = `
                <div class="outfit-suggestion-card">
                    <h3 style="color: var(--secondary-accent); font-weight: 800;">Outfit ${index + 1}: ${outfit.name}</h3>
                    <div class="outfit-details">
                        <p><b>Top:</b> ${outfit.top}</p>
                        <p><b>Bottom:</b> ${outfit.bottom}</p>
                        <p><b>Footwear:</b> ${outfit.footwear}</p>
                        <p><b>Accessories:</b> ${outfit.accessories}</p>
                        <p><b>Style tip:</b> ${outfit.tip}</p>
                    </div>
                    
                    <div class="outfit-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); margin-top: 15px; gap: 12px;">
                        ${outfit.keywords.slice(0, 4).map((kw) => {
                const localPath = getClothingImage(kw);
                return `
                                <div class="outfit-item" style="border-radius: 15px; background: var(--glass-border); display: flex; align-items: center; justify-content: center; overflow: hidden; aspect-ratio: 1;">
                                    <img src="${localPath}" alt="${kw}" 
                                         style="width: 100%; height: 100%; object-fit: cover;" 
                                         onerror="this.src='images/default.jpg';">
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
            addMessage(outfitHtml);
        });

        setTimeout(() => {
            addMessage("How do these look? You're going to slay! 💅✨");
            const restartBtn = document.createElement('button');
            restartBtn.classList.add('option-btn');
            restartBtn.innerText = 'Start Over';
            restartBtn.onclick = () => location.reload();
            optionsContainer.innerHTML = '';
            optionsContainer.appendChild(restartBtn);
        }, 1000);
    }, 1000);
}

sendBtn.onclick = () => handleInput(userInput.value);
userInput.onkeydown = (e) => {
    if (e.key === 'Enter') handleInput(userInput.value);
};

window.onload = () => {
    setTimeout(askOccasion, 500);
};
