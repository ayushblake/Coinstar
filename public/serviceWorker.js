const cacheName = "v1"

//try both these arrays and see whichever works, works

// const cacheAssets = [
//     '/index.html',
//     '/favicon.io',
//     '/logo192.png',
//     '/logo512.png',
//     '/manifest.json',
//     '/robots.txt',
//     '/serviceWorker.js'
// ]
// const cacheAssets = [
//     '/',
//     'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
//     '/static/js/bundle.js',
//     '/static/js/vendors~main.chunk.js',
//     '/static/js/main.chunk.js',
//     'https://api.coingecko.com/api/v3/simple/supported_vs_currencies',
//     '/favicon.ico',
//     '/manifest.json',
//     // 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
//     // 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
//     // 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
//     'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,okb',

// ]

// Call Install Event(Uss this when caching all the requests the app requires when online(i.e every request that happens get cached automatically) - in this the caching is done in the fetch event, after requests are made  )
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
});

//Call Install Event(Use this install event when caching requests in either of the above mentioned arrays )
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("Service Worker: Caching Files")
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )
});

// Call Activate Event(here we remove all caches there are whose name does not match with the cacheName)
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();
                // Open cahce
                caches.open(cacheName).then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    );
});
