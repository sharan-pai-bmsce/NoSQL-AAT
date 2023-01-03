// http://localhost:3000/appointment  POST

/*
{
  "subCategories":["IRON STUDIES","LIPID PROFILE"],
  "start": "2020-01-22T13:00:26.285Z",
  "end": "2020-01-22T14:00:26.285Z"
}
*/

// http://localhost:3000/admin/reportGen  PUT

/*
{
  "id": "63b170d9452bd71dc7fa3ee5",
  "userId": "639a1c5a065326c917ee60ee",
  "tests": [
    "63b0164f66ec6b1fd7bc908f",
    "63b0182466ec6b1fd7bc9094"
    ]
}
*/

// http://localhost:3000/admin/reports  POST

/*
{
  "reportId": "63b170fd452bd71dc7fa3eea",
  "userId": "639a1c5a065326c917ee60ee",
  "content":{
    "category": "BIOCHEMISTRY",
    "subCategory": "IRON STUDIES",
    "attributes": [
          {
            "test": "Iron",
            "isSubheading": false,
            "value": 7.5,
            "unit": "μg/dl",
            "_id": "63b0164f66ec6b1fd7bc9090"
          },
          {
            "test": "Total Iron Binding Capacity",
            "isSubheading": false,
            "value": 43,
            "unit": "μg/dl",
            "_id": "63b0164f66ec6b1fd7bc9091"
          },
          {
            "test": "Transferrin Saturation",
            "isSubheading": false,
            "value": 53,
            "unit": "μg/dl",
            "_id": "63b0164f66ec6b1fd7bc9092"
          }
        ],
        "__v": 0
  }
}
*/