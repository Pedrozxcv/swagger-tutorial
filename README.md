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
3. [Coding the endpoints](#coding-the-endpoints)
 1. [GET](#get-endpoint)

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

```swagger project start -m```

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

Now let's create our Product schema/model. Go to the definitions tag and write the following:

```yaml
Product:
    type: object
    properties:
      name:
        type: string
        description: Product name
      price:
        type: string
        description: Product price
      category:
        type: array
        description: Product categories
        items:
            type: string
      description:
        type: string
        description: Product description
    required:
      - name
      - price
      - category
```
This schema definition is very similiar to the one done in the **GET** request for the response schema. Basically, we defined what the endpoing will be expecting. In this case, the endpoint is expecting an object with name, price, category, description properties, in which only the name, price and category are required.

Now that we have our schema/model created, we should be able to test the endpoint using the editor.

## PUT

Now let's create a **PUT** endpoint so that we are able to update the information of our products. For this, we need to create a new path because the older one (**/product**) doesn't allow us to send an id. Let's do something similiar to this:

```yaml
/product/{id}:
      x-swagger-router-controller: product
      put:
        description: Used to update the information of a product
        parameters:
          - name: id
            in: path
            required: true
            type: string
          - name: product
            in: body
            required: true
            schema:
              $ref: "#/definitions/EditProduct"
        responses:
          200:
            description: Success
            schema:
              $ref: "#/definitions/Response"
```
This very similar to what we've done in the **POST** request but this time the endpoint is expecting an **id** to be sent via path. In order to get this working, we need to create an id in the parameters and say that it will come via path and it will be a String.
Now let's create our EditProduct schema.

```yaml
EditProduct:
    type: object
    properties:
      name:
        type: string
        description: Product name
      price:
        type: string
        description: Product price
      category:
        type: array
        description: Product categories
        items:
            type: string
      description:
        type: string
        description: Product description
```
The schema is very similar to the one we used in the **POST** request, however this one doesn't have the **required** tag. We can do this in two ways:

- Use the same schema for the **POST** and **PUT** requests but we will need to do extra validation in the code afterwards
- Use different schemas for the **POST** and **PUT** requests but reduce the ammount of validation needed in the code

## DELETE

Finally, we will create the **DELETE** endpoint so that we can delete a product if needed. We will use the same path as the **PUT** request (**/product/{id}**). After the **PUT** code, let's create the following:

```yaml
delete:
        description: Used to delete a product
        parameters:
          - name: id
            type: string
            description: Product Id
            required: true
            in: path
        responses:
          200:
            description: Success
            schema:
              $ref: "#/definitions/Response"
```
Very similiar to the code used in the **PUT** request minus the product parameter. To delete a product we just need to know its id, so it doesn't make sense to have any other parameter besides the id.

# Coding the endpoints

In this phase, we will create all the code behind the endpoints. First we should leave the mock data mode. Stop the swagger and start it in normal mode by using:

```swagger project start```

After, we will create our controller file. Note that every endpoint points to the same controller (**x-swagger-router-controller: product**), so we need to create **product.js** inside **path_to_project/api/controller/**

Now let's create our product model. In this example we will use mongoose. To install mongoose run:

```npm install mongoose --save```

Create a new database in MongoDB, mine will be called **product-list**.

In our **app.js** file located in **path_to_project/** we will need to connect to our mongoDB database. In order to achieve that we will need to add the following code:

```node
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/db-name");
```
Finally, let's create our product model. Create a new folder called **models** inside **path_to_project/api/**. Afterwards, create the file that will contain the model. In this case, create a **product.js** file inside **path_to_project/api/models/**. Inside that file let's insert the following:

```node
var mongoose = require('mongoose');

var Product = new mongoose.Schema({
  name: String,
  price: String,
  category: [type: String],
  description: { type: String , default: null },
});

module.exports = mongoose.model("Product", Product);
```
Now we're ready to start coding our endpoints.

## GET endpoint

In our **product.js** file inside **path_to_project/api/controllers/** let's start by importing our product model. To do that add the following line to your file:

```node
var Product = require("../models/product");
```

After let's create a function like this: 

```node
function getProducts(req, res, next)
{

}
```

Inside that function we will query the database to get all the products. To do that add these lines into the function:

```node
Product.find({}, function(error, products)
{
  if(error)
  {
    res.json({ error: true, message: error });
  }
  res.json({ error: false, message: products });
});
```
What this function does is: queries the database for all products and sends an error (if one occured) or the products.

To finalize this endpoint we need to do two things, first in our **swagger.yaml** we need to point to the function that will do what we want. Open your swagger editor and add
