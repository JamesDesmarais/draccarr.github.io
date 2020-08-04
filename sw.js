importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}


const cacheName = 'cache-v1';
const resourcesToPrecache = [ '/', 'index.html', 'images/vatherdone-with-tree-ghosts.png' ];

self.addEventListener('install', (event) => {
	console.log('Install evenet!');
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(resourcesToPrecache);
		})
	);
});

self.addEventListener('activate', (event) => {
	console.log('activate event!');
});

self.addEventListener('fetch', (event) => {
	console.log('Fetch intercepted for: ' + event.request.url);
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			return cachedResponse || fetch(event.request);
		})
	);
});
