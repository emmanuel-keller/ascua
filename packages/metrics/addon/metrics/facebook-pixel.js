import Metric from './base';
import { assert } from '@ember/debug';

const src = 'script[src*="fbevents.js"]';

export default class extends Metric {

	name = 'facebook-pixel';

	init() {

		super.init(...arguments);

		if (window.fbq) return;

		if (!this.config.id) return;

		/* eslint-disable */
		!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
		n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
		document,'script','https://connect.facebook.net/en_US/fbevents.js');
		/* eslint-enable */

		window.fbq('init', this.config.id);

	}

	willDestroy() {

		document.querySelectorAll(src).forEach(e => {
			e.parentElement.removeChild(e);
		});

		delete window.fbq;
		delete window._fbq;

	}

	clear() {

		if (!window.fbq) return;

		window.fbq('init', this.config.id);

	}

	identify(id, data) {

		if (!window.fbq) return;

		assert(`You must pass an 'id' as the first argument to ${this.toString()}:identify()`, id);

		window.fbq('init', this.config.id, { external_id: id, ...data });

	}

	trackPage(data) {

		if (!window.fbq) return;

		window.fbq('track', 'PageView', data);

	}

	trackEvent(name, data) {

		if (!window.fbq) return;

		assert(`You must pass a 'name' as the first argument to ${this.toString()}:trackEvent()`, name);

		window.fbq('track', name, data);

	}

}
