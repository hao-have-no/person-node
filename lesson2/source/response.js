// module.exports = {
//     get body() {
//         return this._body;
//     },
//     set body(val) {
//         this._body = val;
//     }
// };


$scope.showRealInfo = function () {
    RecordService.verifyInfo().then(function (msg) {
        if (msg === "ok") {
            RecordService.getPeopleInfo($routeParams.filter__xlPatientId, null, 'timeline').then(function success(msg) {
                var result = [];
                var map = {};
                msg.data && msg.data.map(function (option) {
                    map[option.label] = option.value;
                });
                result.push(map);
                $scope.baseInfo = result;
                $scope.baseInfoWrap = msg.data;
                $scope.totast.mainBody = { // 通知提示语定义
                    status: 'ok',
                    description: '已展示真实信息！',
                    delay: 3000
                };
            });
        } else {
            $('.real-btn').text('您没有权限查看！');
        }
    });
};
