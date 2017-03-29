/**
 * Created by arnab on 27/3/17.
 */
'use strict' ;

angular.module('GreedyGame')

    .controller('searchCtrl',['$scope','$state','$rootScope','searchService',function ($scope,$state,$rootScope,searchService) {

        console.log("inside mainController..");

        var next=null;
        var previous=null;
        $scope.songName;
        $scope.editGenrFormData={};
        $scope.editTrackFormData={};
        $scope.addTrackFormDetails={};
        $scope.addGenrFormDetails={};
        $scope.songGnr=[];
        $scope.rating;
        $scope.songRatings=[];

        $scope.getSongsList= function (direction) {

            if(direction===0) {
                searchService.Songs(null).then(function (successData) {

                        $scope.songGnr=[];
                        $scope.songlist = successData.data.results;
                        next = successData.data.next;
                        console.log($scope.songlist);
                        for(var i=0;i<$scope.songlist.length;i++){

                            var pstvfiveStarRating=$scope.songlist[i].rating/2;
                            $scope.songRatings.push(parseInt(pstvfiveStarRating));
                        }
                        console.log($scope.songRatings);
                        for(var i=0;i<$scope.songlist.length;i++){

                            for(var j=0;j<$scope.songlist[i].genres.length;j++) {
                                $scope.songGnr.push({

                                    "neme" :$scope.songlist[i].genres[j].name,
                                    "id" :$scope.songlist[i].genres[j].id
                                });
                            }

                        }
                        /*console.log($scope.songGnr);*/
                    },
                    function (errorData) {
                        console.log(errorData);
                    })
            }

            if(direction===1) {

                searchService.Songs(next).then(function (successData) {

                        $scope.songGnr=[];
                        $scope.songlist=successData.data.results;
                    console.log($scope.songlist);
                        next = successData.data.next;
                        previous=successData.data.previous;
                        for(var i=0;i<$scope.songlist.length;i++){

                            console.log($scope.songlist[i]);
                            for(var j=0;j<$scope.songlist[i].genres.length;j++) {
                                $scope.songGnr.push({

                                    "neme" :$scope.songlist[i].genres[j].name,
                                    "id" :$scope.songlist[i].genres[j].id
                                });
                            }

                        }
                        /*console.log($scope.songGnr);*/
                    },
                    function (errorData) {
                        console.log(errorData);
                    })
            }
            if(direction===2){
                searchService.Songs(previous).then(function (successData) {

                        $scope.songGnr=[];
                        $scope.songlist=successData.data.results;
                        next = successData.data.next;
                        previous=successData.data.previous;
                        for(var i=0;i<$scope.songlist.length;i++){

                            for(var j=0;j<$scope.songlist[i].genres.length;j++) {
                                $scope.songGnr.push({

                                    "neme" :$scope.songlist[i].genres[j].name,
                                    "id" :$scope.songlist[i].genres[j].id
                                });
                            }

                        }
                        /*console.log($scope.songGnr);*/

                    },
                    function (errorData) {
                        console.log(errorData);
                    })
            }

        }
        $scope.getSongsList(0);

        $scope.musicDetails=function (song) {

            $scope.songDetails=song;
            console.log($scope.songDetails);

        }

        $scope.getGenersList= function (direction) {

            if(direction===0) {
                searchService.genrals(null).then(function (successData) {

                        $scope.gnrlist = successData.data.results;
                        console.log(successData.data);
                        next = successData.data.next;
                    },
                    function (errorData) {
                        console.log(errorData);
                    })
            }

            if(direction===1) {

                searchService.genrals(next).then(function (successData) {

                        $scope.gnrlist=successData.data.results;
                        /*console.log($scope.gnrlist);*/
                        next = successData.data.next;
                        previous=successData.data.previous;
                    },
                    function (errorData) {
                        console.log(errorData);
                    })
            }
            if(direction===2){
                searchService.genrals(previous).then(function (successData) {

                        $scope.gnrlist=successData.data.results;
                        console.log($scope.gnrlist);
                        next = successData.data.next;
                        previous=successData.data.previous;

                    },
                    function (errorData) {
                        console.log(errorData);
                    })
            }

        };

        $scope.genrsDetails=function (gnrs) {

            $scope.gnrDetails=gnrs;
            console.log($scope.songDetails);

        }

        $scope.getSingleTracks=function () {

            searchService.singleTrack($scope.songName).then(function (successData) {
                    $scope.songlist=successData.data.results;
                    console.log($scope.songlist);

            },
            function (errorData) {

                console.log(errorData);
            })

            
        }

        $scope.editGenr=function (id) {


            var data=$scope.editGenrFormData.generName;
            console.log(data);
            searchService.editGenrs(id,data).then(function (successData) {

                console.log(successData.data);

            },
            function (errorData) {

                console.log(errorData);

            })

        }
        
        $scope.editTrack=function (id,rating,genrs) {

            console.log(id,rating,genrs);
            console.log($scope.editTrackFormData.TrackName);
            var genrId=[];
            for(var i=0; i<genrs.length; i++){
                genrId.push(genrs[i].id);
            }
            var data={
                "id": id,
                "title":$scope.editTrackFormData.TrackName,
                "rating":rating,
                "genres":genrId
            };

            console.log(genrId);

            searchService.editTracks(id,data).then(function (successData) {

                console.log(successData.data);

            },
            function (errorData) {

                console.log(errorData);
            })

        }
        
        $scope.AddTrack=function () {

            var data={
                "title":$scope.addTrackFormDetails.TrackName,
                "rating": $scope.addTrackFormDetails.rating,
                "genres":[
                    $scope.addTrackFormDetails.selectedGenrId
                ]
            }
            searchService.addTrack(data).then(function (successData) {

                console.log(successData.data);

            },
            function (errorData) {
                console.log(errorData);
            })
        }
        
        $scope.AddGenr=function () {

            var data={
                "name": $scope.addGenrFormDetails.addgenerName
            };

            searchService.addGenr(data).then(function (successData) {

                console.log(successData.data);
            },
            function (errorData) {

                console.log(errorData);

            })

        }

        $scope.IsVisible = false;
        $scope.showHide=function (data) {

            if(data===1) {
                $scope.IsVisible = false;
            }
            else {
                $scope.IsVisible = true;
            }
        };

        $scope.isEditVisible = false;
        $scope.isEditVisible1=true;
        $scope.EditDisplayCntrl=function (data) {

            if(data===1) {
                $scope.isEditVisible =  true;
                $scope.isEditVisible1 = false ;
            }
            else {

                $scope.isEditVisible =  false;
                $scope.isEditVisible1 = true;
            }
        };

        $scope.isAddDisplay=true;
        $scope.isAddDisplay1=false;
        $scope.addDisplayCntrl=function (data) {

            if(data===1) {

                $scope.isAddDisplay = true ;
                $scope.isAddDisplay1 = false;
            }
            else {
                $scope.isAddDisplay = false ;
                $scope.isAddDisplay1 = true;
            }

        }

        $scope.starPrintNumber=function (flag,getNumber) {

            var fiveStarPrint= parseInt(getNumber/2);
            var negeTiveStar=5-fiveStarPrint;
            if(flag===1) {
                if (fiveStarPrint === 5) {
                    return [1, 2, 3, 4, 5]
                }
                if (fiveStarPrint === 4) {
                    return [1, 2, 3, 4]
                }
                if (fiveStarPrint === 3) {
                    return [1, 2, 3]
                }
                if (fiveStarPrint === 2) {
                    return [1, 2]
                }
                if (fiveStarPrint === 1) {
                    return [1]
                }
                if (fiveStarPrint === 0) {
                    return []
                }
            }
            else {
                if (negeTiveStar === 5) {
                    return [1, 2, 3, 4, 5]
                }
                if (negeTiveStar === 4) {
                    return [1, 2, 3, 4]
                }
                if (negeTiveStar === 3) {
                    return [1, 2, 3]
                }
                if (negeTiveStar === 2) {
                    return [1, 2]
                }
                if (negeTiveStar === 1) {
                    return [1]
                }
                if (negeTiveStar === 0) {
                    return []
                }
            }

        }

    }]);