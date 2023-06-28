migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xx7tiefx",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "reps",
        "time",
        "distance",
        "score",
        "note"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xx7tiefx",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "reps",
        "time",
        "score",
        "note"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
