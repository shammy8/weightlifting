migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jnaixuni",
    "name": "Notes",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  // remove
  collection.schema.removeField("jnaixuni")

  return dao.saveCollection(collection)
})
