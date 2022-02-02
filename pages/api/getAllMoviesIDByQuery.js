import * as cheerio from 'cheerio';


export default async (req, res) => {

    if (req.method === 'POST') {
        let userQuery = req.body.userQuery
        console.log("🚀 ~ file: getAllMoviesIDByQuery.js ~ line 8 ~ userQuery", userQuery)

        var myHeaders = new Headers();
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("sec-ch-ua", "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"");
        myHeaders.append("Accept", "application/json, text/plain, */*");
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36");
        myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
        myHeaders.append("Origin", "https://www.imdb.com");
        myHeaders.append("Sec-Fetch-Site", "cross-site");
        myHeaders.append("Sec-Fetch-Mode", "cors");
        myHeaders.append("Sec-Fetch-Dest", "empty");
        myHeaders.append("Referer", "https://www.imdb.com/");
        myHeaders.append("Accept-Language", "en-US,en;q=0.9");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
      
        

        const response = await fetch(`https://v2.sg.media-imdb.com/suggestion/${userQuery.charAt(0).toLowerCase()}/${userQuery}.json`, requestOptions)
        const response_json = await response.json()
        console.log("🚀 ~ file: getAllMoviesIDByQuery.js ~ line 34 ~ response_json", response_json)
        let movieIDs = response_json.d
      
        
        if (response_json) {
            return res.status(200).json({ movieIDs })
        }
    }
}


