migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y80q0j9lrhclro")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
