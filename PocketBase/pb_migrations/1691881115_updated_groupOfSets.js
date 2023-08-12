migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2ogpuclg",
    "name": "sessionDate",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  // remove
  collection.schema.removeField("2ogpuclg")

  return dao.saveCollection(collection)
})
