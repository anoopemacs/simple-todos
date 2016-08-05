//This file acts as our api in this example

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

// publish the tasks
// 10.9 do so selectively
if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [			    // or = atleast one of these is true
	{ private: { $ne: true } }, // ne = not equal 
	{ owner: this.userId },	// doubt - how does server know what the userId is?
      ],
    });
  });
}

Meteor.methods({
  // we are just following some dot syntax to organize our methods
  'tasks.insert'(text) {
    check(text, String);

    // make sure user is logged in
    if (! this.userId) {
      throw new Meteor.error('not-authorized');
    }
    
    Tasks.insert({
      text: text,		// key name here is optional, but why?
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      // username: Meteor.user().username, //// this also works - anoop
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId); // added by anoop, not in the offcial code
    if (task.private && task.owner !== this.userId) {
      // if task is private make sure only owner can remove it
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove({ _id: taskId });
  },
  'tasks.setCheckedToX'(taskId, checkedValueX) {
    check(taskId, String);
    check(checkedValueX, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // if task is private make sure only owner can check it off
      throw new Meteor.error('not-authorized');
    }
    Tasks.update(taskId, { $set: { checked: checkedValueX } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // make sure only the task owner can mark a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});
