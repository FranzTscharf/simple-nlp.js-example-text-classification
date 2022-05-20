const { dockStart } = require("@nlpjs/basic");
var path = require('path');
let nlpIntentProcess;

async function intentTrainModel() {
  console.log("Server - NLP Intent model training with corpus file start.");
  const dock = await dockStart({use: ['Basic']})
  const nlp = dock.get('nlp');
  await nlp.addCorpus('./src/nlp/nlpjs/corpus.json')
  let modelPathFilename = path.join(__dirname, "./src/nlp/nlpjs", "model.nlp");
  //console.log(modelPathFilename);
  await nlp.train();
  nlp.save(modelPathFilename);
  console.log("Server - NLP Intent model training with corpus file end.");
}

async function intentQueryModel() {
  const response = await nlpIntentProcess.process('en', 'Lets focus on the tasks next.');
  console.log("Server - NLP Intent Model Response: ", response);
}

async function intentLoadModel() {
  const dock = await dockStart({use: ['Basic']})
  nlpIntentProcess = dock.get('nlp');
  await nlpIntentProcess.addCorpus('./src/nlp/nlpjs/corpus.json');
  let modelPathFilename = path.join(__dirname, "src/nlp/nlpjs", "model.nlp");
  nlpIntentProcess.load(modelPathFilename)
}

(async() => {
  // train model
  await intentTrainModel();
  // load trained model
  await intentLoadModel();
  // query model response
  await intentQueryModel();
})();
