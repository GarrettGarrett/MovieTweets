

export default async (req, res) => {

    if (req.method === 'POST') {
        let actor = req.body.actor
        // console.log("🚀 ~ file: getFollowerCount.js ~ line 7 ~ actor", actor)

        var myHeaders = new Headers();
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"");
        myHeaders.append("Accept", "*/*");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36");
        myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
        myHeaders.append("Sec-Fetch-Site", "same-origin");
        myHeaders.append("Sec-Fetch-Mode", "cors");
        myHeaders.append("Sec-Fetch-Dest", "empty");
        myHeaders.append("Accept-Language", "en-US,en;q=0.9");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

          
        // How to refresh this?
        //  - 
        const response = await fetch(`https://mlmcounts.herokuapp.com/twitter/api/?name=${actor}`, requestOptions)
        // console.log("🚀 ~ file: getFollowerCount.js ~ line 15 ~ response", response)
        const response_json = await response.json()
        // console.log("🚀 ~ file: getFollowerCount.js ~ line 37 ~ response_json", response_json)
        let followers_count = response_json.followers_count
        // console.log("🚀 ~ file: getFollowerCount.js ~ line 36 ~ followers_count", followers_count)
        
        if (response_json) {
            return res.status(200).json({ followers_count })
        }
    }
}


