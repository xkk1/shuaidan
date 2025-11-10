// 获取排名数据 URL
var getRankDataUrl = function() {
    // 获取当前时间戳
    const timestamp = Math.floor(Date.now() / 1000);
    return `rank.json`;
}

// 默认头像 URL
var defaultAvatarUrl = "img/default_avatar.png";
// 获取上传头像 URL
var getAvatarUrl = function(avatar) {
    return "img/avatar/" + avatar.split('/').pop();
}
