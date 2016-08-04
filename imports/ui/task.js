import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
  'click .toggle-checked'() {
    // toggle checked value
    Tasks.update(
      { _id: this._id },	// '_id:' may be omitted
      {$set: { checked: !this.checked },}
    );
  },
  'click .delete'() {
    Tasks.remove({ _id: this._id });	// '_id:' may be omitted
  },
});
