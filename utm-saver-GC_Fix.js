document.addEventListener("DOMContentLoaded", function (event) {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function addParameterToURL(url, param, value) {
        if (url.indexOf(param + '=') !== -1) return url; // Avoid adding the same parameter again
        return url + (url.split('?')[1] ? '&' : '?') + param + '=' + value;
    }

    var utm_source = getParameterByName('utm_source') || sessionStorage.getItem('utm_source') || '';
    var utm_medium = getParameterByName('utm_medium') || sessionStorage.getItem('utm_medium') || '';
    var utm_campaign = getParameterByName('utm_campaign') || sessionStorage.getItem('utm_campaign') || '';
    var aff = getParameterByName('aff') || sessionStorage.getItem('aff') || 'web';

    sessionStorage.setItem('utm_source', utm_source);
    sessionStorage.setItem('utm_medium', utm_medium);
    sessionStorage.setItem('utm_campaign', utm_campaign);
    sessionStorage.setItem('aff', aff);

    var links = document.querySelectorAll('a[href]');
    links.forEach(function(link) {
        link.href = addParameterToURL(link.href, 'utm_source', utm_source);
        link.href = addParameterToURL(link.href, 'utm_medium', utm_medium);
        link.href = addParameterToURL(link.href, 'utm_campaign', utm_campaign);
        link.href = addParameterToURL(link.href, 'aff', aff);
    });
});
