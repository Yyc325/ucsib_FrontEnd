function getCookie(cname) {
	const name = cname + '=';
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		const c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return '';
}

//清空cookie
function deleteCookie(key) {
	document.cookie = key + '=0;path=/;expires=' + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
	document.cookie =
		key + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
	document.cookie = key + '=0;path=/;domain=.xycloud.net.cn;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com

	document.cookie = key + '=0;path=/;domain=.lowcode.net.cn;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
}

//清空cookie
function clearCookie(cookieNames) {
	const keys = cookieNames.length ? cookieNames : document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (let i = keys.length; i--; ) {
			document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
			document.cookie =
				keys[i] +
				'=0;path=/;domain=' +
				document.domain +
				';expires=' +
				new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
			document.cookie =
				keys[i] + '=0;path=/;domain=.xycloud.net.cn;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com

			document.cookie =
				keys[i] + '=0;path=/;domain=.lowcode.net.cn;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
		}
	}
}
window.cookieTool = {
    getCookie,
    deleteCookie,
    clearCookie,
}
