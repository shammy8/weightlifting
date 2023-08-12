migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  collection.indexes = [
    "CREATE INDEX `userIdAndDateIndex` ON `sessions` (\n  `userId`,\n  `date`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkyat6i89r2whay")

  collection.indexes = []

  return dao.saveCollection(collection)
})
