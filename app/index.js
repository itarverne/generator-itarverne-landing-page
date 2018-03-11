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
		    	return response.appName.toLowerCase()+'.itarverne.com';
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
		    name: 'codeGTM',
		    message: 'Put the following code for Google Tag Management (GTM-XXXXXXX)'
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
		},{
		    type: 'confirm',
		    name: 'putLinkedin',
		    message: 'Do you want to put share and follow LinkedIn button ?',
		    default: 'N'
		},{
			when: function (response) {
				return response.putLinkedin;
			},
		    type: 'input',
		    name: 'urlLinkedin',
		    message: 'Put the LinkedIn url : ',
		    validate: function(url){
		    	if(url.trim().length == 0)
		    		return "The LinkedIn url is required !";
		 
		 		return !url.trim().length == 0
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

		if(this.props.codeGTM != this.promptQuestion[3].default){
			var regex = new RegExp('^GTM-[0-9A-Z]{7}$');
			if(!regex.test(this.props.codeGTM)){
				this.props.codeGTM = '';
				this.log(chalk.bold.red('Wrong Google Tag Management code provided, script not included !'));
			}
		} else {
			this.log(chalk.bold.yellow('No Google Tag Management code provided, script not included !'));
		}

		this.fs.copyTpl(
			this.templatePath('index.html'),
			this.destinationPath('testyo/index.html'), // public instead of testyo
			{ 
				title: this.props.appName,
				url: this.props.appUrl,
				gtm: this.props.codeGTM,
				desc: this.props.desc,
				putTwitter: this.props.putTwitter,
				nameTwitter: this.props.nameTwitter,
				urlTwitter: this.props.urlTwitter,
				putFacebook: this.props.putFacebook,
				appIdFacebook: this.props.appIdFacebook,
				putLinkedin: this.props.putLinkedin,
				urlLinkedin: this.props.urlLinkedin
			}
		);

		this.fs.copyTpl(
			this.templatePath('cookies.html'),
			this.destinationPath('testyo/cookies.html'), // public instead of testyo
			{ 
				title: this.props.appName,
				url: this.props.appUrl,
				gtm: this.props.codeGTM,
				desc: this.props.desc,
				putTwitter: this.props.putTwitter,
				nameTwitter: this.props.nameTwitter,
				urlTwitter: this.props.urlTwitter,
				putFacebook: this.props.putFacebook,
				appIdFacebook: this.props.appIdFacebook,
				putLinkedin: this.props.putLinkedin,
				urlLinkedin: this.props.urlLinkedin
			}
		);

		this.fs.copyTpl(
			this.templatePath('scripts/react/main-react.jsx'),
			this.destinationPath('testyo/scripts/react/main-react.jsx'), // public instead of testyo
			{ 
				title: this.props.appName,
				url: this.props.appUrl,
				gtm: this.props.codeGTM,
				desc: this.props.desc,
				putTwitter: this.props.putTwitter,
				nameTwitter: this.props.nameTwitter,
				urlTwitter: this.props.urlTwitter,
				putFacebook: this.props.putFacebook,
				appIdFacebook: this.props.appIdFacebook,
				putLinkedin: this.props.putLinkedin,
				urlLinkedin: this.props.urlLinkedin
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
