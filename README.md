# generator-itarverne-landing-page ![Build](https://travis-ci.org/itarverne/generator-itarverne-landing-page.svg?branch=master) 
![maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability) ![test_coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)


The generator push by ITArverne company for the landing page website

# Required

The libraries below have to be present on your machine :

- npm
- grunt
- yo
- ruby (for SASS)
- SASS

# Install

```
cd path/generator-itarverne-landing-page
npm intall
npm link
yo itarverne-landing-page
```

# Usage

```
cd path/generator-itarverne-landing-page/public
npm intall
# To build prod
grunt build --target=prod
# To build dev
grunt build --target=dev
# To build dev 
grunt build
# To launch the web server
grunt serve
```

# Test

```
cd path/generator-itarverne-landing-page
npm test
```