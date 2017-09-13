var Generator = require('yeoman-generator'),
	chalk = require('chalk');

module.exports = class extends Generator {

	constructor(args, opts) {
	    super(args, opts);

	    this.promptQuestion = [];
	    
	    // This method adds support for a `--babel` flag
	    this.option('babel'); 
	}

	initializing () {
    	this.log('Initializing the generator ...');

    	this.promptQuestion = [{
		    type: 'input',
		    name: 'appName',
		    message: 'Your site name',
		    default: 'ITArverne'
		},{
		    type: 'input',
		    name: 'appUrl',
		    message: 'Your url domain',
		    default: function(response){
		    	return response.appName+'.itarverne.com';
		    }
		},{
		    type: 'input',
		    name: 'desc',
		    message: 'Put the website description'
		},{
		    type: 'input',
		    name: 'icoPath',
		    message: 'Put the website ico path',
		    default: 'linux or windows path supported'
		},{
		    type: 'input',
		    name: 'icoPathApple',
		    message: 'Put the website png path for apple ico',
		    default: 'linux or windows path supported'
		},{
		    type: 'input',
		    name: 'codeGA',
		    message: 'Put the following code for Google Analytics (UA-XXXXXXX-X)'
		},{
		    type: 'confirm',
		    name: 'putTwitter',
		    message: 'Do you want to put share and follow twitter button ?',
		    default: 'N'
		},{
			when: function (response) {
				return response.putTwitter;
			},
		    type: 'input',
		    name: 'nameTwitter',
		    message: 'Put the twitter username : ',
		    validate: function(username){
		    	if(username.trim().length == 0)
		    		return "Your twitter username is required !";
		 
		 		return !username.trim().length == 0
		    }
		},{
			when: function (response) {
				return response.putTwitter;
			},
		    type: 'input',
		    name: 'urlTwitter',
		    message: 'Put the url to share in twitter : ',
		    default: function(response){
		    	return response.appUrl;
		    }
		},{
		    type: 'confirm',
		    name: 'putFacebook',
		    message: 'Do you want to put share and like Facebook button ?',
		    default: 'N'
		},{
			when: function (response) {
				return response.putFacebook;
			},
		    type: 'input',
		    name: 'appIdFacebook',
		    message: 'Put the AppId Facebook : ',
		    validate: function(appId){
		    	if(appId.trim().length == 0 || isNaN(appId))
		    		return "Your facebook appId have to be numeric !";
		 
		 		return !appId.trim().length == 0
		    }
		}];
  	}

	prompting () {
	  var done = this.async();

	  this.prompt(this.promptQuestion)
	  	.then((prompt) => {
	        this.props = prompt;
	        done();
		});
	}

  	configuring () {
    	this.log(chalk.bold.cyan('Configuring the generator ...'));
  	}

	default () {
    	this.log('Default the generator ...');
  	}

	writing () {
		this.log(chalk.bold.cyan('Analyzing the inputs ...'));

		if(this.fs.exists(this.props.icoPath)){
			if(this.props.icoPath.includes('.ico')){
				this.fs.copy(this.props.icoPath, 'public/favicon.ico');				
			}
			else {
				this.log(chalk.bold.yellow('No favicon configured, wrong extension only .iso available !'));
			}
		} else {
			this.log(chalk.bold.yellow('No favicon configured, wrong path !'));			
		}

		if(this.fs.exists(this.props.icoPathApple)){
			if(this.props.icoPath.includes('.png')){
				this.fs.copy(this.props.icoPath, 'public/apple-touch-icon.png');				
			}
			else {
				this.log(chalk.bold.yellow('No favicon configured for apple, wrong extension only .png available !'));
			}
		} else {
			this.log(chalk.bold.yellow('No favicon configured for apple, wrong path !'));			
		}

		if(this.props.codeGA != this.promptQuestion[3].default){
			var regex = new RegExp('^UA-[0-9]{7}-[0-9]{1}$');
			if(!regex.test(this.props.codeGA)){
				this.props.codeGA = '';
				this.log(chalk.bold.red('Wrong Google Analytics code provided, script not included !'));
			}
		} else {
			this.log(chalk.bold.yellow('No Google Analytics code provided, script not included !'));
		}

		this.fs.copyTpl(
			this.templatePath('index.html'),
			this.destinationPath('public/index.html'),
			{ 
				title: this.props.appName,
				ga: this.props.codeGA,
				desc: this.props.desc
			}
		);
	}

	conflicts () {
    	this.log('conflicts the generator ...');
  	}

  	install () {
    	this.log('install the generator ...');
  	}

  	end () {
  		this.log('\n');
  		this.log(chalk.bold.green('The website '+ this.props.appName + ' generated succeded !'));
  		this.log(chalk.bold.green('You can launch this command to see your website : grunt build'));
  	}

  	_myMethod(){
    	this.log('_myMethod ...');
  	}


};
