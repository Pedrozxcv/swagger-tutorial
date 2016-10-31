# swagger-tutorial

(Under construction)

### Requirements for this tutorial:

1. [NodeJS](https://nodejs.org/en/)
2. [MongoDB](https://www.mongodb.com/)

___

## Index

1. [Setting up the project](#setting-up-the-project)
2. [Creating endpoints](#creating-endpoints)
 1. [GET](#get)
 2. [POST](#post)
 3. [PUT](#put)
 4. [DELETE](#delete)

# Setting up the project

First we need to install the swagger module globally. For that we will use the following command:

```npm install -g swagger```


After, we will create our project using the swagger module by using the following command:

```swagger project create project_name```


For this example I will create a product list, so I will use

```swagger project create product-list```


Now that we have our project created, we need to start preparing some endpoints for our API. For that we will need to start changing our **swagger.yaml** file that is present in **path_to_project/api/swagger/swagger.yaml**. To edit this file, we can use any text editor, or we can use the swagger editor, which I strongly recommend since it provides:


* endpoint routing and validation
* documentation
* synthax highlighting for YAML

Swagger has an awesome feature that provides us mock data so we can focus on the design of endpoints first and take care of what which endpoint will do later.

Now, we need to start running our main file which is **app.js** located **path_to_project/app.js**. In a standard node API, we would launch it by using **node app.js** but in this case we will launch it by using:

```swagger project_name start -m```

Swagger will restart our project everytime changes are made, so we don't need to be always restarting the API like we normally do.

**-m** - means that we will launch the project in mock data mode

After we have our API running, we need to start our editor to start creating our endpoints. In order to launch the editor we will use:

```swagger project edit```

If everything went well the editor should open a new tab in your browser.

# Creating endpoints

## GET

First, we will create an endpoint to get all the product that are in our database. In order to do that, we go under **paths** in the editor and we will write the following:

```yaml
/product:
    x-swagger-router-controller: product
    get:
      description: get the product list
      responses:
        "200":
          description: If the error property is true, there was an error, if not everything went fine.
          schema:
            $ref: "#/definitions/Response"
```
- **x-swagger-router-controller** - this our controller file. This file will need to be on **path_to_project/api/controller/product.js**
- **get** - this is where we define our request type, in this case it will be a GET request
- **description** - description about the endpoint. This will be useful for the documentation.
- **responses** - the possible outcomes of this endpoint. These outcomes will be defined under the **definitions** tag in our swagger.yaml file

Now, let's create our schema. Let's go under the **definitions** tag to create our schema. We need to name it the same we defined in **$ref**, so in this case we will name it **Response**

```yaml
Response:
    type: object
    properties:
      error:
        type: boolean
        description: returns false if there isn't an error or true if there is an error
      message:
        type: string
        description: error message or success message
      data:
        type: object
        description: data
    required:
      - error
      - message
```

- **type** - the type of the schema, in this case it will be an **object**
- **properties** - the properties that the object will have
  - **type** - the type of the property
  - **description** - a description for that property
- **required** - which one of the properties in the object is required, in this case only the **error** and **message** properties will be required

After all this is done, we should be able to test it using the editor.

## POST

After the **GET** endpoint is created, let's create a endpoint to insert a new product in our database. First, we will go under the previous endpoint path which was **/product**. After all the code related to the **GET** request, we will write the following:

```yaml
post:
      description: Adds a new product
      parameters:
        - name: product
          description: Product parameters
          in: body
          required: true
          schema:
            $ref: "#/definitions/Product"
      responses:
        200:
          description: Success
          schema:
            $ref: "#/definitions/Response"
```

- **parameters** - the parameters which the endpoint will receive
  - **name** - the name of the parameter
  - **description** - the description of the parameter
  - **in** - where will this parameter be (path, body, formData, etc...)
  - **required** - if this parameter is required or not
  - **schema** - the schema that will be used. This schema is defined under the **definitions** tag.
- **responses** - same as described in the **GET** request
