// 获取排名数据 URL
var getRankDataUrl = function() {
    // 获取当前时间戳
    const timestamp = Math.floor(Date.now() / 1000);
    return `https://proxy.120107.xyz/https://rank.xiaci.cn/rank.php?timestamp=${timestamp}`;
}

// 默认头像 URL
var defaultAvatarUrl = "https://rank.xiaci.cn/grade/title.png";
// 获取上传头像 URL
var getAvatarUrl = function(avatar) {
    return "https://rank.xiaci.cn" + avatar;
}

// 渲染排名表格
async function renderRankTable(data) {
    const table = document.getElementById("rank-table");
    // 清空表格
    table.innerHTML = "";
    // 表头
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const titles = [
        "排名",
        "头像/UID/名称",
        "奇珍",
        "珊瑚",
        "金冠",
        "总积分"
    ];
    for (let title of titles) {
        var th = document.createElement("th");
        th.textContent = title;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    // 表身
    const tbody = document.createElement("tbody");
    const tableData = data.top_3.concat(data.list);
    for (participant of tableData) {
        const tr = document.createElement("tr");
        let td = null;
        // 排名
        td = document.createElement("td");
        td.classList.add("rank");
        td.textContent = participant.rank;
        tr.appendChild(td);
        // 名称/UID
        td = document.createElement("td");
        td.classList.add("participant-info");
        const containerDiv = document.createElement('div');
        containerDiv.className = 'participant-info-container'; // 自定义内部容器 class
         // 创建 avatar 子元素
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar-wrap';
        // 若有头像 URL，可设置背景图或 img 子元素
        let avatarUrl = defaultAvatarUrl;
        let avatarAlt = "默认头像";
        if (participant.avatar) {
            avatarUrl = getAvatarUrl(participant.avatar);
            avatarAlt = participant.name + " 的头像";
        }
        const avatarImg = document.createElement('img');
        avatarImg.className = 'avatar-img';
        avatarImg.src = avatarUrl;
        avatarImg.alt = avatarAlt;
        avatarDiv.appendChild(avatarImg);

        // 创建 name-wrap 容器
        const nameWrapDiv = document.createElement('div');
        nameWrapDiv.className = 'name-wrap';

        // 创建 uid 和 name 子元素
        const uidDiv = document.createElement('div');
        uidDiv.className = 'uid';
        uidDiv.textContent = + participant.uid;

        const nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        nameDiv.textContent = participant.name;

        // 6. 逐层追加子元素
        nameWrapDiv.appendChild(uidDiv);
        nameWrapDiv.appendChild(nameDiv);
        containerDiv.appendChild(avatarDiv);
        containerDiv.appendChild(nameWrapDiv);
        td.appendChild(containerDiv); // 最终将容器添加到 td 中
        tr.appendChild(td);
        // 奇珍
        td = document.createElement("td");
        td.classList.add("qizhen");
        td.textContent = "✕" + participant.qizhen;
        tr.appendChild(td);
        // 珊瑚
        td = document.createElement("td");
        td.classList.add("shanhu");
        td.textContent = "✕" + participant.shanhu;
        tr.appendChild(td);
        // 金冠
        td = document.createElement("td");
        td.classList.add("jinguan");
        td.textContent = "✕" + participant.jinguan;
        tr.appendChild(td);
        // 总积分
        td = document.createElement("td");
        td.classList.add("total-score");
        td.textContent = participant.total_score;
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}

// 获取排名数据
async function getRankData() {
    return await fetch(getRankDataUrl())
        .then(function(response) {
            return response.json();
        })
        .catch(function(error) {
            console.log(error);
            alert("获取排名数据错误: " + error);
        });
}

// 刷新排名
function refreshRank() {
    document.getElementById("rank-table").innerText = "正在刷新榜单……";
    getRankData()
        .then(function(data) {
            renderRankTable(data);
        })
}


document.addEventListener("DOMContentLoaded", function() {
    refreshRank();
    document.getElementById("refresh-button").onclick = function() {
        refreshRank();
    }
});