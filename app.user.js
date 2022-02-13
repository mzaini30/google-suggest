// ==UserScript==
// @name        Google Suggest
// @version     0.0.1
// @date        2022-02-13
// @author      Zen
// @description Tools yang akan memudahkan untuk mencatat suggest Google
// @homepage    https://www.mainkode.my.id/
// @downloadURL https://github.com/mzaini30/google-suggest/raw/master/app.user.js
// @include     https://www.google.com/search?q=*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// ==/UserScript==

escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
	createHTML: (to_escape) => to_escape
})

const elemen_baru = document.createElement('div')
elemen_baru.innerHTML = escapeHTMLPolicy.createHTML(`
	<style>
		.kotak {
		  position: fixed;
		  z-index: 9999;
		  left: 20px;
		  bottom: 20px;
		  font-size: 12px;
		  border: 2px solid orange;
		}
		.kotak .judul {
		  text-align: center;
		  font-family: sans-serif;
		  padding: 2px;
		  background: yellow;
		  color: black;
		}
		.kotak textarea {
		  width: 140px;
		  height: 100px;
		  border: 1px solid rgba(0, 0, 0, 0.2);
		}
	</style>

	<div class="kotak">
		<div class="judul">Keyword</div>
		<textarea name="" readonly id="" cols="30" rows="10"></textarea>
	</div>
`)

document.body.appendChild(elemen_baru)

// ===================================================

let input_pencarian = document.querySelector('.gLFyf.gsfi')
input_pencarian.addEventListener('keyup', olah_suggest)

function olah_suggest() {
	let wadah_pencarian = document.querySelector('.G43f7e')
	if (wadah_pencarian) {
		let suggest = wadah_pencarian.querySelectorAll('li')

		let data = []

		if (suggest.length > 0) {
			suggest.forEach(x => data = [...data, x.innerText.replace(/\n.+/, '').replace('Remove', '')])
			const hasil = data.join('\n')
			document.querySelector('.kotak textarea').value = hasil
		}
	}
	setTimeout(olah_suggest, 1000)
}
olah_suggest()