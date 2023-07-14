migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
