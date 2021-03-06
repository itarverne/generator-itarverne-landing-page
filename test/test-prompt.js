const path = require('path');
const os = require('os');
const assert = require('yeoman-assert');
const env = require('yeoman-environment');
const promptSuggestion = require('yeoman-generator/lib/util/prompt-suggestion');
const Storage = require('yeoman-generator/lib/util/storage');
const FileEditor = require('mem-fs-editor');

describe('Check prompt params for yo', () => {
  const prompts = { 'appName': 'ITArverne generated by test' };
  const options = { 'skip-install': true };

  beforeEach(() => {
    this.memFs = env.createEnv().sharedFs;
    this.fs = FileEditor.create(this.memFs);
    this.storePath = path.join(os.tmpdir(), 'suggestion-config.json');
    this.store = new Storage('suggestion', this.fs, this.storePath);
    this.store.set('promptValues', {});
  });

  it('check prompts appName', () => {
      const question = {
        name: 'appName',
        store: true
      };
      const answer = {
        appName: 'ITArverne'
      };
      promptSuggestion.prefillQuestions(this.store, question);
      promptSuggestion.storeAnswers(this.store, question, answer);
      assert.equal(this.store.get('promptValues').appName, answer.appName);
  });

  it('check prompts appUrl', () => {
      const question = {
        name: 'appUrl',
        store: true
      };
      const answer = {
        appUrl: 'test.itarverne.com'
      };
      promptSuggestion.prefillQuestions(this.store, question);
      promptSuggestion.storeAnswers(this.store, question, answer);
      if(this.store.get('promptValues').appUrl.includes('.itarverne.com'))
        assert.ok(true);
      else
        assert.fail('Wrong url for appUrl prompt');
  });
});