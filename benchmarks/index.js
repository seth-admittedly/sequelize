process.setMaxListeners(0);

var Benchmark = require("benchmark");

var Sequelize   = require(__dirname + '/../index');
var DataTypes = require(__dirname + "/../lib/data-types")

var bench = new Benchmark("Model#define", {
  defer : true,
  fn : function(deferred){
    var self = this;
    self.sequelize.define("Model", {
      username:  { type: DataTypes.STRING },
      uuidv1:    { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1 },
      uuidv4:    { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      touchedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      aNumber:   { type: DataTypes.INTEGER },
      bNumber:   { type: DataTypes.INTEGER },
      aDate:     { type: DataTypes.DATE }
    });
    deferred.resolve();
  },
  setup : function(){
    this.sequelize = new Sequelize();
  },
  teardown : function(){
  }
});

var suite = new Benchmark.Suite();
suite.add(bench);
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.run();
