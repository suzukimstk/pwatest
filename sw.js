// ServiceWorker�����Fhttps://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// �L���b�V�����ƃL���b�V���t�@�C���̎w��
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    './background.jpg',
    './SlideShow.js'
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