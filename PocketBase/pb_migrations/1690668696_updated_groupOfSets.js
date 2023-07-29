migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
