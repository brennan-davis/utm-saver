<script>
    document.addEventListener("DOMContentLoaded", function (event) {

    function getAllUrlParams(url) {
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        var obj = {};

        if (queryString) {
            queryString = queryString.split('#')[0]; // Remove any hash fragment
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split('=');
                var paramName = a[0];
                var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
                obj[paramName] = paramValue;
            }
        }
        return obj;
    }

    function addParametersToURL(url, params) {
        Object.keys(params).forEach(key => {
            if (url.indexOf(key + '=') === -1) {
                url += (url.indexOf('?') !== -1 ? '&' : '?') + key + '=' + params[key];
            }
        })
        return url;
    }

    var urlParams = getAllUrlParams();

    var links = document.querySelectorAll('a[href]');
    links.forEach(function(link) {
        link.href = addParametersToURL(link.href, urlParams);
        });
    });
</script>
