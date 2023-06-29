migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hqwqxw68tj8cyib")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2la6dyal",
    "name": "groupOfSetsId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "4y80q0j9lrhclro",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hqwqxw68tj8cyib")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2la6dyal",
    "name": "group_of_sets_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "4y80q0j9lrhclro",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
