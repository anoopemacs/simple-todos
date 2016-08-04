import { Meteor } from 'meteor/meteor' // import reqd to use Meteor.call() function
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
  'click .toggle-checked'() {
    Meteor.call('tasks.setCheckedToX', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
});
