migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  collection.createRule = null

  return dao.saveCollection(collection)
})
