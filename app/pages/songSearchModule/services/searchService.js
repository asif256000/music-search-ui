/**
 * Created by arnab on 27/3/17.
 */
angular.module('GreedyGame')

    .service('searchService',["$http",function($http){


        this.Songs=function (path) {

            console.log("inside cities service function");
            console.log(path);
            if(path===null) {
                return $http({

                    url: "http://104.197.128.152:8000/v1/tracks",
                    method: "GET"
                })
            }
            else {
                console.log("insede else methode...")
                return $http({

                    url: path,
                    method: "GET"
                })
            }
        };

        this.genrals=function (path) {

            console.log("inside cities service function");
            console.log(path);
            if(path===null) {
                return $http({

                    url: " http://104.197.128.152:8000/v1/genres",
                    method: "GET"
                })
            }
            else {
                console.log("insede else methode...")
                return $http({

                    url: path,
                    method: "GET"
                })
            }
        };

        this.singleTrack=function (title) {

            return $http({

                url:"http://104.197.128.152:8000/v1/tracks?title="+title,
                method: "GET",
                data: title

            })

        }

        this.editGenrs=function (id,data) {

            var editGenrData={
                "id": id,
                "name": data
            };
            return $http({

                url:" http://104.197.128.152:8000/v1/genres/"+id,
                method:"POST",
                data:editGenrData
            })
        }

        this.editTracks=function (id,data) {

            console.log(data);

            return $http({

                url:"http://104.197.128.152:8000/v1/tracks/"+id,
                method:"POST",
                data:data

            })

        }
        
        this.addTrack=function (data) {

            console.log(data);
            return $http({
                url:"http://104.197.128.152:8000/v1/tracks",
                method:"POST",
                data: data,
            })

        }

        this.addGenr=function (data) {

            return $http({

                url:"http://104.197.128.152:8000/v1/genres",
                method:"POST",
                data:data
            })

        }

    }]);