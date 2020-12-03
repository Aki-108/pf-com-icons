// ==UserScript==
// @name         Community Icons
// @description  Show Community Icons on the Pillowfort Feed
// @version      1.0
// @author       aki108
// @match        http*://www.pillowfort.social
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Aki-108/pf-com-icons/main/main.js
// @downloadURL  https://raw.githubusercontent.com/Aki-108/pf-com-icons/main/main.js
// ==/UserScript==

(function() {
    'use strict';

    /*OPTIONS*/
    var showUserIcon = true;/*Do you want to keep the icon of the user which is usually displayed?*/
    var makeUserSmall = false;/*Should the usual icon be small in the bottom right? If not, it will be the normal size.*/
    var clickableIcons = true;/*Do want to be able to click an icon to get to the respective community or user?*/
    var useGeneralIcon = true;/*Do you want to use a general icon, for communities, where you haven't set a specific icon?*/

    /*ICONS*/
    var generalIcon = "https://img3.pillowfort.social/posts/430ea3795e1c_02.jpg";
    var icons = {};
    icons["Active_Users"] = "https://img3.pillowfort.social/posts/fc4701560514_02.jpg";
    icons["BetaUsers"] = "https://img3.pillowfort.social/posts/0314000fae9e_02.jpg";
    icons["cats"] = "https://img3.pillowfort.social/posts/60c91ad21999_02.jpg";
    icons["DnD"] = "https://img3.pillowfort.social/posts/b880721e3eb0_02.jpg";
    icons["K-Pop"] = "https://img3.pillowfort.social/posts/8199d6c75bfc_02.jpg";
    icons["LGBT"] = "https://img3.pillowfort.social/posts/2ce7a22915a8_02.jpg";
    icons["NSFW"] = "https://img3.pillowfort.social/posts/15c5f81135a7_02.jpg";
    icons["PillowArtists"] = "https://img3.pillowfort.social/posts/0a62e140aa7e_02.jpg";
    icons["Pokemon"] = "https://img3.pillowfort.social/posts/ff3d67106d17_02.jpg";
    icons["Vocaloid"] = "https://img3.pillowfort.social/posts/9f706fe2defe_02.jpg";

    /*FUNCTION CODE*/
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            if (target.style.display == "none") {
                loadIcons();
            }
        });
    });
    var target = document.getElementById("home_loading");
    observer.observe(target, {
        attributes: true,
        attributeFilter: ["style"],
    });

    function loadIcons() {
        let posts = document.getElementsByClassName("post-container");
        for (let a = 0; a < posts.length; a++) {
            if (posts[a].classList.contains("community_icons")) continue;
            posts[a].classList.add("community_icons");
            let citation = posts[a].getElementsByClassName("citation")[0];
            let links = citation.getElementsByTagName("a");
            let username = links[links.length-1].innerHTML;
            let community = "";
            let hasCommunity = false;
            for (let b = 1; b < links.length; b++) {
                if (links[b].href.search("/community/")) {
                    community = links[b].innerHTML;
                    hasCommunity = true;
                    username = links[b-1].innerHTML;
                }
            }
            let hasCommunityIcon = icons[community] != null;

            let avatar = posts[a].getElementsByClassName("avatar")[0];
            let originalIcon = avatar.getElementsByTagName("img")[0];
            if (hasCommunity && (hasCommunityIcon || useGeneralIcon)) {
                let link = document.createElement("a");
                link.style.display = "inline-block";
                if (clickableIcons) link.href = "/community/" + community;
                let icon = document.createElement("img");
                if (hasCommunityIcon) {
                    icon.src = icons[community];
                } else {
                    icon.src = generalIcon;
                }
                icon.alt = community;
                link.appendChild(icon);
                avatar.appendChild(link);
            }
            if (!hasCommunity || showUserIcon || (!hasCommunityIcon && !useGeneralIcon)) {
                let link = document.createElement("a");
                link.style.display = "inline-block";
                if (clickableIcons) link.href = "/" + username;
                let icon = document.createElement("img");
                icon.src = originalIcon.src;
                icon.alt = username;
                if (hasCommunity && makeUserSmall && (hasCommunityIcon || (showUserIcon && useGeneralIcon))) {
                    link.style.position = "relative";
                    icon.style.width = "30px";
                    icon.style.height = "30px";
                    link.style.bottom = "38px";
                    link.style.left = "50px";
                    avatar.style.height = "88px";
                }
                link.appendChild(icon)
                avatar.appendChild(link);
            }
            originalIcon.remove();
        }
    }
})();
