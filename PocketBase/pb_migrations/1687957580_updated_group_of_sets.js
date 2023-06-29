migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o4ogengt",
    "name": "test",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // remove
  collection.schema.removeField("o4ogengt")

  return dao.saveCollection(collection)
})
