angular.module('ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])
.config(function config($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            }
        },
        data: { pageTitle: 'Home' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller('HomeCtrl', function HomeController($scope) {
    console.log('this is controller');

    $scope.myImage = '';

    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
    $scope.SetCustomerImage = function () {
        try {
            var profileImage = new FormData();
            var imageName = $('#fileInput').val();
            var byteString = atob($scope.myImage.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);

            }
            var bb = new Blob([ab], { type: 'image/png' });
            profileImage.append('Image', bb);
            profileImage.append('ImageName', imageName);
            //Append the file to the form data.
            var request = new XMLHttpRequest();
            var requestWebServiceUrl = '';8
            requestWebServiceUrl = 'API URL';
            request.open('POST', requestWebServiceUrl, true);
            request.setRequestHeader('Accept', 'application/json');
            var token = 'LbmQSB1lC-vg5B679wTeqOEKgw4OXf_9mKGup84bLguqlL8yhktvGkbsnETOuzC3sJSLRvFdXxZh_-nNIVkW7TjekkZyUmceHY3xTwZ-7vjUOVNRih77F5htw_ALapQicNhsjbffTPXJWuE7mHTN-W6NnWPQxzXH5S773MNOYLCjuIe9XHzyIhZgtmkvZE8L8UVVaJIespTE_wsoRGskEMKGZlg6wD5zvEtOvqy1sucEwPHulEnOOEx2ROXx8CrRVi2gqUGpqgZw4b4t3G5H_bbab0KcayV6zO9RHv_hVxzEkYntgmYxBhPAAt-EkB8MsrflIT2lFzpOgYCp770K7ZR9z8b7Pnf1P40VuJehY9OGbe5AI7uJ_9xRGAtsI_kYYSp_xkVT3EY9o4MZEPmCPOL9RYTeN-vO8S8gmD6WPIR65hTMk6d0QAFeI8_AjFM9Kc6GPT3wxo7HjLHg2-esF0n9yJC3WzBIkpISQfFaL_fvLvBzYgIDjOO6zERTwnu34Nml70zEmJbWtSwyjbXBPw9oEdrYSr3uGQar6ka4bn4XJHLzdRA751-IXHz3qT4wtjsCTyL6X2H96vqehX2egdq6np6XnFkleAXRA9UQgqEjeQ5c';
            if (token) {
                request.setRequestHeader('Authorization', 'Bearer ' + token);
            }
            request.send(profileImage);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        alert('Image Uploaded Successfully');
                    }
                }
            };
        } catch (ex) {
            console.log('ex', ex);
        }
    };
});

