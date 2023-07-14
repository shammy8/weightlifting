migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rapjjgrg42mkwpg")

  collection.createRule = null

  return dao.saveCollection(collection)
})
