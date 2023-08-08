<script>
  document.addEventListener("DOMContentLoaded", function (event) {
	var links = document.querySelectorAll('[href^="http"]');
	for (var i = 0; i < links.length; i++) {
		var hrefString = links[i].getAttribute("href");
		if (hrefString.includes("?")) {
			links[i].setAttribute(
				"href",
				hrefString + window.location.search.replace("?", "&")
			);
		} else {
			links[i].setAttribute("href", hrefString + window.location.search);
		}
	}
});
</script>

<script>  
  document.addEventListener("DOMContentLoaded", function (event) {
	var links = document.querySelectorAll('[href^="http"]');
	for (var i = 0; i < links.length; i++) {
		var hrefString = links[i].getAttribute("href");
		if (hrefString.includes("?")) {
			links[i].setAttribute(
				"href",
				hrefString + window.location.search.replace("?", "&")
			);
		} else {
			links[i].setAttribute("href", hrefString + window.location.search);
		}
	}
});
  
  function addParameterToURL (_url, param, value) {
    _url += (_url.split('?')[1] ? '&' : '?') + param + '=' + value
    return _url
  }

  function getParameterByName (name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }
  var utm_source = getParameterByName('utm_source')
  var utm_medium = getParameterByName('utm_medium')
  var aff = getParameterByName('aff')
  if (utm_source) localStorage.setItem('utm_source', utm_source)
  if (utm_medium) localStorage.setItem('utm_medium', utm_medium)
  if (aff) localStorage.setItem('aff', aff)

  var links = document.querySelectorAll('a[href*="eventbrite"]')
  var medium = '',
    source = localStorage.getItem('utm_source')
  if (source && source !== 'email') {
    medium = localStorage.getItem('utm_medium') || ''
  }
  if (source === 'email' || medium === 'email') {
    source = 'email'
    medium = ''
  }
  if (!aff || aff == null || aff == '' || aff == 'null') {
    aff = 'web'
  }
  if (aff) {
    for (var i = 0; i < links.length; i++) {
      links[i].href = addParameterToURL(links[i].href, 'aff', aff)
    }
  }
</script>

<script>
  ;(function () {
    function getParameterByName (name) {
      var url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }

    var utm_source =
      getParameterByName('utm_source') ||
      sessionStorage.getItem('utm_source') ||
      ''
    var utm_medium =
      getParameterByName('utm_medium') ||
      sessionStorage.getItem('utm_medium') ||
      ''
    var utm_campaign =
      getParameterByName('utm_campaign') ||
      sessionStorage.getItem('utm_campaign') ||
      ''

    var aff = getParameterByName('aff') || sessionStorage.getItem('aff') || ''

    sessionStorage.setItem('utm_source', utm_source)
    sessionStorage.setItem('utm_medium', utm_medium)
    sessionStorage.setItem('utm_campaign', utm_campaign)
    sessionStorage.setItem('aff', aff)

    function add_param (href, param, value) {
      if (value == null || value == '') {
        return href
      }
      if (href.indexOf(param) !== -1) {
        return href
      }

      if (href.indexOf('?') !== -1) {
        return href + '&' + param + '=' + value
      } else {
        return href + '?' + param + '=' + value
      }
    }

    function filter_href (href) {
      if (href[0] == '/') {
        // pathname pass
        console.log('Utm linker, process ', href)
      } else if (href.indexOf('//' + location.hostname) !== -1) {
        // full url pass
        console.log('Utm linker, process ', href)
      } else {
        // skip
        console.log('Utm linker, skip ', href)
        return null
      }

      href = add_param(href, 'utm_source', utm_source)
      href = add_param(href, 'utm_medium', utm_medium)
      href = add_param(href, 'utm_campaign', utm_campaign)
      href = add_param(href, 'aff', aff)

      return href
    }

    var href = filter_href(window.location.href)
    if (href !== window.location.href) {
      window.location.href = href
    }

    var hrefs = document.querySelectorAll('a[href]')
    for (var i = 0; i < hrefs.length; i++) {
      var href = filter_href(hrefs[i].href)
      if (href) {
        hrefs[i].href = href
      }
    }
  })();
</script>
