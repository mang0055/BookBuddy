angular.module('starter.services', [])

  .factory('Books', function ($http) {
    return {

      searchBook: function (page, searchText) {

        var url = 'http://localhost:8100/search/index.xml?key=9ZOarJDswAwZbICWDQVvew&q=' + searchText + '&page=' + page;
        var promise = $http({
          method: 'GET',
          url: url
        })
          .success(function (data) {
            return data;
          })
          .error(function (data) {
            console.log("Error while searching " + searchText + " - " + data);
            return data;
          });
        return promise;
      }
    }
  })
  .factory('Events', function ($http) {
    return {

      getAllEvents: function (page) {
        var url = 'http://localhost:8100/event/index.xml?search[country_code]=CA&key=9ZOarJDswAwZbICWDQVvew&page=' + page;
        var promise = $http({
          method: 'GET',
          url: url
        })
          .success(function (data) {
            return data;
          })
          .error(function (data) {
            console.log("Error while Getting Events - " + data);
            return data;
          });
        return promise;
      }
    }
  });
