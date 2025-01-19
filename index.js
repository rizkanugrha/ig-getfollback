let { igApi, getCookie, getSessionId } = require("insta-fetcher");
// using constructor

const fs = require('fs')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/*async function getCookies() {
    try {
        const session_id = await getCookie("your_username", "your_password");
        console.log(session_id);
    } catch (e) {
        console.log(e);

    }
};
getCookies()
*/

const ig = new igApi('your_cookies');

(async () => {
    try {
        // Get user ID by username
        const userId = await ig.getIdByUsername('your_username');
        // console.log("User ID:", userId);

        // Fetch all followers
        const followersData = await ig.getAllFollowers(userId);

        // Extract usernames into an array
        const followerUsernames = followersData.users?.map(user => user.username);

        // Save followers usernames to a file
        // fs.writeFileSync('followers_usernames.json', JSON.stringify(followerUsernames, null, 2));
        // console.log('Followers usernames saved to followers_usernames.json');

        // Fetch all following
        const followingData = await ig.getAllFollowing(userId);

        // Extract usernames into an array
        const followingUsernames = followingData.users?.map(user => user.username);

        // Identify users who don't follow you back
        const notFollowingBack = followingUsernames.filter(user => !followerUsernames.includes(user));

        // Save users who don't follow back to a file
        fs.writeFileSync('not_following_back.json', JSON.stringify(notFollowingBack, null, 2));
        console.log(`Users not following you back ${notFollowingBack.length} saved to not_following_back.json`);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
