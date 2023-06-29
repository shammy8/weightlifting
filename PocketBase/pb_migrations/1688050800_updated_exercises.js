migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wo1odlf5",
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
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wo1odlf5",
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
