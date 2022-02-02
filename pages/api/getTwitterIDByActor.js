
export default async (req, res) => {

    if (req.method === 'POST') {
        let actor = req.body.actor
        
        var myHeaders = new Headers();
        myHeaders.append("authority", "twitter.com");
        myHeaders.append("sec-ch-ua", "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"");
        myHeaders.append("x-twitter-client-language", "en");
        myHeaders.append("x-csrf-token", "c4235f9f4df833b83f2e15598dbba0cf");
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("authorization", "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA");
        myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36");
        myHeaders.append("x-guest-token", "1488684014323994625");
        myHeaders.append("x-twitter-active-user", "yes");
        myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
        myHeaders.append("accept", "*/*");
        myHeaders.append("sec-fetch-site", "same-origin");
        myHeaders.append("sec-fetch-mode", "cors");
        myHeaders.append("sec-fetch-dest", "empty");
        myHeaders.append("referer", "https://twitter.com/search?q=daniel%20craig&src=typed_query&f=user");
        myHeaders.append("accept-language", "en-US,en;q=0.9");
       
       
        

        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        // new guest token can be found here: https://twitter.com/search?q=daniel%20craig&src=typed_query&f=user
        const response = await fetch(`https://twitter.com/i/api/1.1/search/typeahead.json?q=${actor}&src=search_box&result_type=events%2Cusers%2Ctopics`, requestOptions)
        
        const response_json = await response.json()
        console.log("🚀 ~ file: getTwitterIDByActor.js ~ line 34 ~ response_json", response_json)
        
        if (response_json) {
            let mostLikelyID = response_json.users[0].id_str
            return res.status(200).json({ mostLikelyID })
        } 
        
    }
}


