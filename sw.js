self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.mode==='navigate'||req.destination==='document'){
    e.respondWith(fetch(req,{cache:'no-store'}).catch(function(){return fetch(req)}));
  }
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++)if(list[i].url.indexOf('menu.html')>-1)return list[i].focus();
    return list.length?list[0].focus():self.clients.openWindow('./menu.html');
  }));
});
