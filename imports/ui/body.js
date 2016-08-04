import { Template } from 'meteor/templating'

import './body.html';

Template.body.helpers({
  tasks: [
    { text: 'first' },
    { text: 'second'},
  ],
});
