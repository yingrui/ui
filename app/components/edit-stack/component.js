import Ember from 'ember';
import NewOrEdit from 'ui/mixins/new-or-edit';
import ModalBase from 'lacsso/components/modal-base';
import {normalizedChoices, tagsToArray} from 'ui/models/stack';

export default ModalBase.extend(NewOrEdit, {
  classNames: ['lacsso', 'modal-container', 'full-width-modal'],
  originalModel: Ember.computed.alias('modalService.modalOpts'),
  editing: true,
  model: null,

  actions: {
    outsideClick() {},

    cancel() {
      this.sendAction('dismiss');
    },

    addTag(tag) {
      let neu = tagsToArray(this.get('primaryResource.group'));
      neu.addObject(tag);
      this.set('primaryResource.group', neu.join(', '));
    },
  },

  allStacks: null,
  willInsertElement: function() {
    this._super(...arguments);
    var orig = this.get('originalModel');
    var clone = orig.clone();
    delete clone.services;
    this.set('model', clone);
    this.set('allStacks', this.get('store').all('stack'));
  },

  tagChoices: function() {
    return normalizedChoices(this.get('allStacks'));
  }.property('allStacks.@each.group'),

  doneSaving: function() {
    this.send('cancel');
  }
});
