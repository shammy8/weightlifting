migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  collection.createRule = null

  return dao.saveCollection(collection)
})
