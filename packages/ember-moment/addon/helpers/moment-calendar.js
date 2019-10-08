import Helper from '@ember/component/helper';
import { inject } from '@ember/service';
import { observe } from '@abcum/ember-decorators';
import Moment from 'moment';

export default class extends Helper {

	@inject clock;

	@observe('clock.quart') changed() {
		this.recompute();
	}

	compute([ value = undefined, reference = undefined ], { format = undefined }) {
		return Moment(value).calendar(reference, format);
	}

}
