# swagger-tutorial

(Under construction)

Requirements for this tutorial:

1. NodeJS
2. MongoDB

___

First we need to install the swagger module globally. For that we will use the following command:

> npm install -g swagger


After, we will create our project using the swagger module by using the following command:

> swagger project create project_name


For this example I will create a image gallery, so I will use

> swagger project create image-gallery


Now that we have our project created, we need to start preparing some endpoints for our API. For that we will need to start changing our **swagger.yaml** file that is present in **path_to_your_project/api/swagger.yaml**. To edit this file, we can use any text editor, or we can use the swagger editor, which I strongly recommend since it provides:


* endpoint routing and validation
* documentation
* synthax highlighting for YAML
__
Swagger has an awesome feature that provides us mock data so we can focus on the design of endpoints first and take care of what which endpoint will do later.

Now, we need to start running our main file which is **app.js** located **path_to_your_project/app.js**. In a standard node API, we would launch it by using **node app.js** but in this case we will launch it by using:
<br/>
> swagger project_name start -m
<br/>
Swagger will restart our project everytime changes are made, so we don't need to be always restarting the API.

**-m** - means that we will launch the project in mock data mode

After we have our API running, we need to start our editor to start creating our endpoints. In order to launch the editor we will use:

> swagger project edit

If everything went well the editor should open a new tab in your browser.
