describe("Pruebas con login y logout", function(){

  beforeEach(function(done){
    Meteor.loginWithPassword("pepe@gmail.com", "mipassword", function(err){
        Tracker.afterFlush(done);
    });
  });

  afterEach(function(done){
    Meteor.logout(function() {
      Tracker.afterFlush(done);
    });
  });

  it("despues de login muestra input para anadir players", function(){
    
    $('#addform').hide();
    
    var currentUser = Meteor.userId();
    
    if (currentUser) {
		bool=true;
		$('#addform').show();
	};
    
    
    it("add Sergio", function () {
		expect(bool).toBe(true);
	});
    
    
  });
});
