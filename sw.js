// ServiceWorker�����Fhttps://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// �L���b�V�����ƃL���b�V���t�@�C���̎w��
var CACHE_NAME = 'pwa-sample-1.02';
var urlsToCache = [
    './background.jpg',
    './what4-1.PNG',
    './what4-2.PNG',
    './manifest.png',
    './sw.png',
    './background.jpg',
    './SlideShow.js',
    './index.html',
    './jquery-3.3.1.min.js'
];

// �C���X�g�[������
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// ���\�[�X�t�F�b�`���̃L���b�V�����[�h����
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});