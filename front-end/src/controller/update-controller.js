window.updateController = function ($scope, $http, $routeParams, $location) {
  $http
    .get(productsAPI + "/" + $routeParams.productBrandId)
    .then(function (response) {
      if (response.status === 200) {
        $scope.product = response.data;
      }
    });

  $scope.updateProduct = function (event) {
    event.preventDefault();

    $scope.product = {
      productBrandId: $routeParams.productBrandId,
      productId: $scope.product.productId,
      productName: $scope.product.productName,
      color: $scope.product.color,
      quantity: $scope.product.quantity,
      sellPrice: $scope.product.sellPrice,
      originPrice: $scope.product.originPrice,
      brandId: $scope.product.brandId,
      subCategoryId: $scope.product.subCategoryId,
      statusId: $scope.product.statusId,
    };

    if (
      $scope.product.productName == undefined &&
      $scope.product.color == undefined &&
      $scope.product.quantity == undefined &&
      $scope.product.sellPrice == undefined &&
      $scope.product.originPrice == undefined &&
      $scope.product.brandId == undefined &&
      $scope.product.subCategoryId == undefined
    ) {
      $scope.error = {
        productName: "Product name khong duoc bo trong",
        color: "Color khong duoc bo trong",
        quantity: "Quantity khong duoc bo trong",
        sellPrice: "Sell price khong duoc bo trong",
        originPrice: "Sell price khong duoc bo trong",
        brandId: "Brand khong duoc bo trong",
        subCategoryId: "SubCategory khong duoc bo trong",
      };
      return;
    } else if (
      $scope.product.productName == undefined ||
      $scope.product.color == undefined ||
      $scope.product.quantity == undefined ||
      $scope.product.sellPrice == undefined ||
      $scope.product.originPrice == undefined ||
      $scope.product.brandId == undefined ||
      $scope.product.subCategoryId == undefined
    ) {
      if (
        $scope.product.productName == undefined ||
        ($scope.product.productName + "").trim() == 0
      ) {
        $scope.error.productName = "Khong duoc bo trong";
      }

      if (
        $scope.product.color == undefined ||
        ($scope.product.color + "").trim() == 0
      ) {
        $scope.error.color = "Khong duoc bo trong";
      }

      if (
        $scope.product.quantity == undefined ||
        ($scope.product.quantity + "").trim() == 0
      ) {
        $scope.error.quantity = "Khong duoc bo trong";
      } else {
        if (!/^[1-9]\d*$/.test($scope.product.quantity + "")) {
          $scope.error.quantity =
            "Sai dinh dang, Quantity phai la so nguyen duong";
        }
      }

      if (
        $scope.product.sellPrice == undefined ||
        ($scope.product.sellPrice + "").trim() == 0
      ) {
        $scope.error.sellPrice = "Khong duoc bo trong";
      } else {
        if (!/^[1-9]\d*(\.\d+)?$/.test($scope.product.sellPrice + "")) {
          $scope.error.sellPrice = "Sai dinh dang, sell price phai la so";
        }
      }

      if (
        $scope.product.originPrice == undefined ||
        ($scope.product.originPrice + "").trim() == 0
      ) {
        $scope.error.originPrice = "Khong duoc bo trong";
      } else {
        if (!/^[1-9]\d*(\.\d+)?$/.test($scope.product.originPrice + "")) {
          $scope.error.originPrice = "Sai dinh dang, origin phai la so";
        }
      }

      if ($scope.product.brandId == undefined) {
        $scope.error.brandId = "Khong duoc bo trong";
      }

      if ($scope.product.subCategoryId == undefined) {
        $scope.error.subCategoryId = "Khong duoc bo trong";
      }
    } else if (
      Number.parseFloat($scope.product.sellPrice) <=
      Number.parseFloat($scope.product.originPrice)
    ) {
      $scope.error.sellPrice = "Sell price phai lon hon origin price";
    } else {
      $http.put(productsAPI, $scope.product).then(
        function (response) {
          console.log($scope.product);
          alert("Update thanh cong");
          $location.path("/home");
        },
        function (errors) {
          $scope.error = errors.data;
        }
      );
    }
  };
};
