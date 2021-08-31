const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdf = require("pdfkit");

function getIssuePageHtml(url, topic, repoName) {
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        }else if(response.statusCode == 404){
            console.log("Page not found");
        }
         else {
            // console.log(html);
            getIssues(html);
        }
    }

    function getIssues(html){
        let $ = cheerio.load(html);
        let issueElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        // console.log(issueElemArr.length);
        let arr = [];
        for(let i = 0; i<issueElemArr.length; i++){
            let link = $(issueElemArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        // console.log(topic, "    ", arr);
        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);

        let filePath = path.join(folderPath, repoName + ".pdf");

        let text = JSON.stringify(arr);
        let pdfdoc = new pdf;
        pdfdoc.pipe(fs.createWriteStream(filePath));
        pdfdoc.text(text);
        pdfdoc.end();
        // fs.writeFileSync(filePath, );
    }
}

function dirCreator(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}

module.exports = getIssuePageHtml;