


var selectGraceHopper = function (callback) {

  Session.set("selected_player", Players.findOne({name: "Grace Hopper"})._id);
  if (callback) {
    Deps.afterFlush(callback);
  }
};

var selectMarieCurie = function (callback) {
  Session.set("selected_player", Players.findOne({name: "Marie Curie"})._id);
  if (callback) {
    Deps.afterFlush(callback);
  }
};

var unselectPlayer = function () {
  Session.set("selected_player", null);
};

describe("Selecting Grace Hopper", function () {

  beforeEach(function (done) {
    Meteor.autorun(function (c) {
      var grace = Players.findOne({name: "Grace Hopper"});
      if (grace) {
        c.stop();
        selectGraceHopper(done);
      }
    })
  });

  it("should show Grace above the give points button", function () {
    expect($("div.details > div.name").html()).toEqual("Grace Hopper");
  });


  it("should highlight Grace's name", function () {
    var parentDiv = $("span.name:contains(Grace Hopper)").parent();
    expect(parentDiv.hasClass("selected")).toBe(true);
  });
});

describe("Point Assignment", function () {
  beforeEach(function (done) {
    selectGraceHopper(done);
  });

  it("should give a player 5 points when he is selected and the button is pressed", function () {
    var graceInitialPoints = Players.findOne({name: "Grace Hopper"}).score;
    $("input.inc:button").click();
    expect(Players.findOne({name: "Grace Hopper"}).score).toBe(graceInitialPoints + 5);
  });
});

describe("Player Ordering", function () {
  it("should result in a list where the first player has as many or more points than the second player", function () {
    var players = PlayersService.getPlayerList().fetch();
    expect(players[0].score >= players[1].score).toBe(true);
  });
});


describe("add player ", function () {

  beforeEach(function () {
    numPlayers=Players.find().count();

    $("#new").val("sergio");
    $("input.add:submit").click();
  });

  afterEach(function () {
    Session.set("selected_player", Players.findOne({name: "sergio"})._id);
    $("input.remove:button").click();
  });

  it("add Sergio", function () {
    expect(Players.find().count()).toBe(numPlayers+1);
  });

});


describe("remove player grace ", function () {

  beforeEach(function () {
    numPlayers=Players.find().count();
    Session.set("selected_player", Players.findOne({name: "Grace Hopper"})._id);
    $("input.remove:button").click();

  });

  afterEach(function () {
    $("#new").val("Grace Hopper");
    $("input.add:submit").click();
    Session.set("selected_player", Players.findOne({name: "Grace Hopper"})._id);
  });

  it("Remove Grace Hopper", function () {
    expect(Players.findOne({name: "Grace Hopper"})==undefined).toBe(true);
    expect(Players.find().count()).toBe(numPlayers-1);

  });
});
