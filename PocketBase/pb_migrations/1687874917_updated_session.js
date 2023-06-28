migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yqgfdinf",
    "name": "session",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  // remove
  collection.schema.removeField("yqgfdinf")

  return dao.saveCollection(collection)
})
