/* 네트워크 우선 + 캐시 대체: 온라인이면 항상 최신, 오프라인이면 마지막 버전 실행 */
var CACHE = "wb-v1";
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(clients.claim()); });
self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function(res){
      var copy = res.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      return res;
    }).catch(function(){ return caches.match(e.request, { ignoreSearch: true }); })
  );
});
