Template.submit.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();
    if(!Meteor.user()) throw 'You must be logged in.';

    var title= $('#title').val();
    var url = $('#url').val();
    var body = $('#body').val();

    var postId = Posts.insert({
        headline: title
      , url: url
      , submitter: Meteor.user().username
      , submitted: new Date().getTime()
      , votes: 0
      , comments: 0
    });
    var post = Posts.findOne(postId);

    Meteor.call('voteForPost', post);

    Session.set('selected_post', post);
    Session.set('state', 'view_post');
  }
};