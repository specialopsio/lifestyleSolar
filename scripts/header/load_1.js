function loadScript(src, callback='') {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

const dependencies = ["https://cdn.jsdelivr.net/npm/geotiff", "https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.7.5/proj4.min.js", "https://cdn.tailwindcss.com", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSzXo4HrIVIr7PgsvG7rWd3M0kBUFlnFU&libraries=places,geometry", "https://cdn.jsdelivr.net/npm/sourcebuster@1.1.0/dist/sourcebuster.min.js"]

dependencies.forEach((dependency) => {
    loadScript(dependency)
})