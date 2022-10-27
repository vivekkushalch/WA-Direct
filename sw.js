assets = [
    './',
    'index.html',
    'src/style.css',
    'src/app.js',
    'assets/MuktaVaani-Regular.ttf',
    'assets/background.jpg',
    'assets/github_icon.png',
    'assets/favicon.png',
    'assets/whatsapp_icon.png',
    'assets/install_pwa.png',
    'assets/share_app.png',
    'assets/copy_linkk.png'
]

//install and cache assets
self.addEventListener('install', e => {
    console.log('SW installed!');
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(assets)
        })
    );
});



//fetch interseption for cache reuse
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
    // console.log(`Intersepting fetch req for: ${e.request.url}`);
});