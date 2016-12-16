angular.module('starter.controllers', [])

  .controller('BooksCtrl', function ($scope, Books, $ionicLoading) {
    $scope.page = 1;
    $scope.show = function () {
      $ionicLoading.show({
        template: 'Loading...',
        duration: 3000,
        animation: 'fade-in',
        noBackdrop: false
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });
    };
    $scope.hide = function () {
      $ionicLoading.hide().then(function () {
        console.log("The loading indicator is now hidden");
      });
    };

    $scope.searchBooks = function () {
      if (!this.searchBookText || this.searchBookText == "") {
        return;
      }
      ;

      // $scope.$watch('searchText', function (value) {
      //   console.log(value);
      // });

      $scope.show();
      Books.searchBook($scope.page, this.searchBookText).then(function (response) {
        console.log(JSON.stringify(response));
        $scope.bookList = response.data.GoodreadsResponse.search.results.work;
        if ($scope.bookList.length == 0) {
          alert("Not Found.");
        }
        $scope.hide();
      });
    };

    $scope.onSwipeLeft = function () {
      console.log("Swipe left");
      $scope.page++;
      $scope.show();
      Books.searchBook($scope.page, this.searchBookText).then(function (response) {
        // console.log(response);
        $scope.bookList = response.data.GoodreadsResponse.search.results.work;
        if ($scope.bookList.length == 0) {
          alert("Not Found.");
        }
        $scope.hide();
      });
    };

    $scope.onSwipeRight = function () {
      console.log("Swipe right");
      if ($scope.page == 1) {
        return;
      }
      ;
      $scope.page--;
      $scope.show();
      Books.searchBook($scope.page, this.searchBookText).then(function (response) {
        // console.log(response);
        $scope.bookList = response;
        if ($scope.bookList.length == 0) {
          $log.debug("Not Found - " + $scope.searchBookText);
          alert("Not Found.");
        }
        $scope.hide();
      });
    };

    $scope.doRefresh = function () {
      Books.searchBook($scope.page, this.searchBookText).then(function (response) {
        // console.log(response);
        $scope.bookList = response;
        if ($scope.bookList.length == 0) {
          alert("Not Found.");
        }
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

  })
  .controller('BookDetailCtrl', function ($scope, $stateParams, Books) {
    $scope.book = Books.get($stateParams.bookId);
    console.log(JSON.stringify($scope.book));
  })
  .controller('EventsCtrl', function ($scope, Events) {
    $scope.pageEventCount = 1;

    $scope.getEvents = function () {
      Events.getAllEvents($scope.pageEventCount).then(function (response) {
        //console.log(JSON.stringify(response));
        $scope.eventList = response.data.GoodreadsResponse.events.event;
        // $scope.bookList = response.data.GoodreadsResponse.search.results.work;
        // if ($scope.bookList.length == 0) {
        //   alert("Not Found.");
        // }

      });

      $scope.StartDate = new Date("2015-01-01");
      $scope.EndDate = new Date();


    };

    // $scope.dateFilter=function()
    // {
    //   return function(record,StartDate,EndDate) {
    //     // var myStringDate = StartDate.replace(/\D/g, " ");
    //     // var dObj = myStringDate.split(" ");
    //     // var startDate = new Date(dObj[0], (dObj[1]-1), dObj[2], dObj[3], dObj[4], dObj[5]);
    //     //
    //     // var myStringDate1 = EndDate.replace(/\D/g, " ");
    //     // var dObj1 = myStringDate1.split(" ");
    //     // var endDate = new Date(dObj1[0], (dObj1[1]-1), dObj1[2], dObj1[3], dObj1[4], dObj1[5]);
    //     var startDate = new Date("2016-12-15");
    //     var endDate = new Date("2018-08-06");
    //     return record.start_at.__text >= startDate && record.end_at.__text <= endDate;
    //   }
    // }
    $scope.applyAwesomeFilter = function () {
      $scope.dateFilter();

    };
    // $scope.dateFilter = function (record) {
    //   var startDate = new Date($scope.StartDate);
    //   var endDate = new Date($scope.EndDate);
    //
    //   return record.start_at.__text >= startDate && record.end_at.__text <= endDate;
    // };


    $scope.getEvents($scope.pageEventCount);
  }).filter('dateFilter', function () {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function (input, startDate, endDate) {
    // Do filter work here
    // var startDate = StartDate;
    // var endDate = EndDate;
    // if(event==null){
    //   return;
    // }
    // else{
    //   if(event.start_at==null)return;
    // }
    // console.log(event.start_at.__text);
    // return new Date(event.start_at.__text) >= new Date(startDate) && new Date(event.end_at.__text) <= new Date(endDate);
    var retArray = [];

    angular.forEach(input, function (obj) {
      console.log(input);
      var receivedDate = obj.start_at.__text;

      if (receivedDate >= startDate && receivedDate <= endDate) {
        retArray.push(obj);
      }
    });
    console.log(retArray[0]);
    return retArray;
  }
})
;
