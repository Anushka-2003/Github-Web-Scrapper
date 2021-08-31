const request = require("request");
const cheerio = require("cheerio");
const getIssuePageHtml = require("./issue");

function getReposPageHtml(url, topic) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        }else if(response.statusCode == 404){
            console.log("Page not found");
        } else {
            // console.log(html);
            getReposLink(html);
        }
    }
    function getReposLink(html) {
        let $ = cheerio.load(html);
        let headingArr = $(".f3.color-text-secondary.text-normal.lh-condensed");

        console.log(topic);

        for (let i = 0; i < headingArr.length; i++) {
            let twoAnchors = $(headingArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            //    console.log(link);
            let fullLink = `https://github.com${link}/issues`;
            let repoName = link.split("/").pop();

            getIssuePageHtml(fullLink, topic, repoName);
        }
        // console.log("````````````````");
    }
}



module.exports = getReposPageHtml;