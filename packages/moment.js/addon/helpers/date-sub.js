import { helper } from '@ember/component/helper';
import Date from 'moment';

export function momentSub([ value = undefined, c = undefined, t = undefined ], options = undefined) {
	if (options) {
		return Date(value).subtract( Object.assign({}, options) );
	} else {
		return Date(value).subtract(c, t);
	}
}

export default helper(momentSub);
