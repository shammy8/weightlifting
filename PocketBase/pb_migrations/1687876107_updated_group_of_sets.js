migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tumwnj2i",
    "name": "session_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "nkyat6i89r2whay",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tumwnj2i",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "nkyat6i89r2whay",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
