// 获取排名数据 URL
var getRankDataUrl = function() {
    return "rank.json";
}

// 默认头像 URL
var defaultAvatarUrl = "img/default_avatar.png";
// 获取上传头像 URL
var getAvatarUrl = function(avatar) {
    return "img/avatar/" + avatar.split("/").pop();
}
