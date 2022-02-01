import * as cheerio from 'cheerio';


export default async (req, res) => {

    if (req.method === 'POST') {
        let userID = req.body.userID

        var myHeaders = new Headers();
        myHeaders.append("authority", "www.imdb.com");
        myHeaders.append("cache-control", "max-age=0");
        myHeaders.append("sec-ch-ua", "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"");
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
        myHeaders.append("upgrade-insecure-requests", "1");
        myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36");
        myHeaders.append("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
        myHeaders.append("sec-fetch-site", "same-origin");
        myHeaders.append("sec-fetch-mode", "navigate");
        myHeaders.append("sec-fetch-user", "?1");
        myHeaders.append("sec-fetch-dest", "document");
        myHeaders.append("referer", "https://www.imdb.com/name/nm3918035/?ref_=tt_cl_i_2");
        myHeaders.append("accept-language", "en-US,en;q=0.9");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        

        const response = await fetch(`https://www.imdb.com/name/${userID}/externalsites`, requestOptions)
        let response_html = await response.text()
                
        const $ = cheerio.load(response_html);
        let divs = $("a.tracked-offsite-link")
        
        let socials = []
        divs.map(div => {
            socials.push(divs[div].attribs.href)     
        })
        
        
        if (response) {
            return res.status(200).json({socials})
        }
    }
}


