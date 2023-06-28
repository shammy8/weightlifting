migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xhtyafoa",
    "name": "order",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // remove
  collection.schema.removeField("xhtyafoa")

  return dao.saveCollection(collection)
})
