import { Template } from 'meteor/templating'

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .new-task'(event) {
    event.preventDefault();

    const target = event.target; // target here is the <form>
    const text = target.text.value;

    Tasks.insert({
      text,			// why is there no key name here
      createdAt: new Date(),
    });

    target.text.value = '';
    target.text.focus();
  }
});
