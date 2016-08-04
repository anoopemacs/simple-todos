import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  // we are just following some dot syntax to organize our methods
  'tasks.insert'(text) {
    check(text, String);

    // make sure user is logged in
    if (! this.userId) {
      throw new Meteor.error('not-authorized');
    }
    
    Tasks.insert({
      text: text,		// key name here is optional, why?
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
/////      username: Meteor.user().username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    Tasks.remove({ _id: taskId });
  },
  'tasks.setCheckedToX'(taskId, checkedValueX) {
    check(taskId, String);
    check(checkedValueX, Boolean);
    Tasks.update(taskId, { $set: { checked: checkedValueX } });
  },
});
