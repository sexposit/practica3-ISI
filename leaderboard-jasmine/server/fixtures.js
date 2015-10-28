if (process.env.IS_MIRROR) {
  Meteor.methods({
    'loadFixtures': function(){
      console.log('Loading default fixtures');
      // TODO: add your fixtures here

      Accounts.createUser({
        email: 'pepe@gmail.com',
        password: 'mipassword'
        });
      console.log('Finished loading default fixtures');

      PlayersService.generateRandomPlayers();


      },

    'clearDB': function(){
      console.log('Clear DB');

      var collectionsRemoved = 0;
      var db = Meteor.users.find()._mongo.db;
      db.collections(function (err, collections) {

        var appCollections = _.reject(collections, function (col) {
          return col.collectionName.indexOf('velocity') === 0 ||
            col.collectionName === 'system.indexes';
        });

        _.each(appCollections, function (appCollection) {
          appCollection.remove(function (e) {
            if (e) {
              console.error('Failed removing collection', e);
              fut.return('fail: ' + e);
            }
            collectionsRemoved++;
            console.log('Removed collection');
            if (appCollections.length === collectionsRemoved) {
              console.log('Finished resetting database');
            }
          });
        });

      });
      console.log('Finished clearing');
    }
  });
}
