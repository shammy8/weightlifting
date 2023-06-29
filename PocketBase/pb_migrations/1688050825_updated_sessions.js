migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvaidulx",
    "name": "userId",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cvaidulx",
    "name": "user_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
