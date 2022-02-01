import * as cheerio from 'cheerio';


export default async (req, res) => {

    if (req.method === 'POST') {
        let movieID = req.body.movieID
        // console.log("🚀 ~ file: getTopCasts.js ~ line 8 ~ movieID", movieID)

        var myHeaders = new Headers();
        myHeaders.append("authority", "www.omdbapi.com");
        myHeaders.append("cache-control", "max-age=0");
        myHeaders.append("sec-ch-ua", "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"");
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
        myHeaders.append("upgrade-insecure-requests", "1");
        myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36");
        myHeaders.append("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
        myHeaders.append("sec-fetch-site", "none");
        myHeaders.append("sec-fetch-mode", "navigate");
        myHeaders.append("sec-fetch-user", "?1");
        myHeaders.append("sec-fetch-dest", "document");
        myHeaders.append("accept-language", "en-US,en;q=0.9");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };


        const response = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${process.env.OMDB_API_KEY}`, requestOptions)
        const response_json = await response.json()
        // console.log("🚀 ~ file: getTopCasts.js ~ line 33 ~ response_json", response_json)
        if (response_json) {
            let actorsString = response_json.Actors
            let actorsArray = actorsString.split(", ")
            return res.status(200).json({ actorsArray })
        }
    }
}


