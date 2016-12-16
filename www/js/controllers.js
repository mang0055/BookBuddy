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
  .controller('BookDetailCtrl', function ($scope, $stateParams, Books, $ionicLoading) {
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
    $scope.show();
    Books.getBookDetail($stateParams.bookId).then(function (res) {
      console.log(JSON.stringify(res));
      $scope.book = res.data.GoodreadsResponse.book;
      $scope.hide();
    });

  })
  .controller('EventsCtrl', function ($scope, Events) {
    $scope.pageEventCount = 1;

    $scope.getEvents = function () {
      Events.getAllEvents($scope.pageEventCount).then(function (response) {
        //console.log(JSON.stringify(response));
        $scope.eventList = response.data.GoodreadsResponse.events.event;
        if ($scope.eventList.length == 0) {
          alert("Not Found.");
        }

      });

      //Demo Purpose setting fixed dates
      // $scope.StartDate = new Date("2015-01-01");
      // $scope.EndDate = new Date("2018-01-01");

    };

    $scope.applyAwesomeFilter = function () {
      $scope.dateFilter();

    };
    $scope.getEvents($scope.pageEventCount);
  }).filter('dateFilter', function () {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function (input, StartDate, EndDate) {
    // Do filter work here
    var startDate = new Date(StartDate);
    var endDate = new Date(EndDate);
    var retArray = [];

    angular.forEach(input, function (obj) {

      var stDate = new Date(obj.start_at.__text);
      var edDate = new Date(obj.start_at.__text);
      // console.log(stDate + " " + edDate);
      if (stDate >= startDate && edDate <= endDate) {
        retArray.push(obj);
      }
    });
    // console.log(retArray.length);
    return retArray;
  }
})
;
