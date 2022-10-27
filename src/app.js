//service worker check
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('sw.js').then(swRegistration => {
        console.log("ServiceWorker(sw.js) is Registered Sucessfully!");
        console.log(swRegistration)
    }).catch(err => {
        console.log("ServiceWorker(sw.js) is Registration Failed :(")
        console.log(err)
    })
}

//variables
const whatsappAPI = 'https://wa.me';

const countryCodeInput = document.getElementById('code-input');
const mobileNumberInput = document.getElementById('mobile-num-input');
const chatMessageInput = document.getElementById('chat-message-inp');
const letsChatBtn = document.getElementById('open-chat-btn');
const installPWABtn = document.getElementById('install-pwa-btn');
const shareAppBtn = document.getElementById('share-app-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');
const siteDesc = document.querySelector('meta[name="description"]').content

let waChatLink = document.location.href;



//functions
function updateWhatsAppChatLink() {

    waChatLink = `${whatsappAPI}/${parseInt(countryCodeInput.value)}${mobileNumberInput.value}/?text=${encodeURIComponent(chatMessageInput.value)}`

}





//update wa chat link on typing
countryCodeInput.addEventListener("keydown", updateWhatsAppChatLink);
mobileNumberInput.addEventListener("keydown", updateWhatsAppChatLink);
chatMessageInput.addEventListener("keydown", updateWhatsAppChatLink);

//open wa chat
letsChatBtn.addEventListener("click", function() {
    updateWhatsAppChatLink();
    if (mobileNumberInput.value.length === 0) {
        alert("Please Provide a Mobile Number to Continue.")
        mobileNumberInput.focus();

    } else {
        console.log(parseInt(mobileNumberInput.value));
        window.open(waChatLink, '_blank')
    }
});


//share app link
shareAppBtn.addEventListener("click", function() {
    try {
        navigator.share({
            title: 'WA-Direct',
            text: siteDesc ,
            url: document.location.href
        });
    } catch (err) {
        console.error('[LINE 37] Not able to share app link :(\n\n[ERROR]: ' + err);
    }
});

//copy link
copyLinkBtn.addEventListener("click", function() {
    updateWhatsAppChatLink();
    if (mobileNumberInput.value.length === 0) {
        alert("Please Provide a Mobile Number to Continue.")
        mobileNumberInput.focus();

    } else {
        navigator.clipboard.writeText(waChatLink);
        alert("Link Copied!")
    }
    
})



//install pwa
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // e.preventDefault();
    deferredPrompt = e;
});
installPWABtn.addEventListener('click', async() => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
});


//refresh page
document.querySelector('.header-container').addEventListener("click",function(){
    location.reload();
})