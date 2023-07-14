migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jiykusw2",
    "name": "hidden",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  // remove
  collection.schema.removeField("jiykusw2")

  return dao.saveCollection(collection)
})
