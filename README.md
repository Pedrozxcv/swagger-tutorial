# swagger-tutorial

(Under construction)

Requirements:

1. NodeJS
2. MongoDB

___

First we need to install the swagger module globally. For that we will use the following command:

> npm install -g swagger


After, we will create our project using the swagger module by using the following command:

> swagger project create <project_name>


For this example I will create a image gallery, so I will use

> swagger project create image-gallery


Now that we have our project created, we need to start preparing some endpoints for our API. For that we will need to start changing our **swagger.yaml** file that is present in **path_to_your_project/api/swagger.yaml**. To edit this file, we can use any text editor, or we can use the swagger editor, which I strongly recommend since it provides:


* endpoint routing and validation
* documentation
* synthax highlighting for YAML
