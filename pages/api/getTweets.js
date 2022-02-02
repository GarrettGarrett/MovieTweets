
export default async (req, res) => {

    if (req.method === 'POST') {
        let twitterID = req.body.twitterID
        // //console.log("🚀 ~ file: getTweets.js ~ line 6 ~ twitterID", twitterID)

        var myHeaders = new Headers();
        let BEARER_TOKEN = process.env.BEARER_TOKEN
        myHeaders.append("Authorization", `Bearer ${BEARER_TOKEN}`);
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        const response = await fetch(`https://api.twitter.com/2/users/${twitterID}/tweets?exclude=retweets,replies`, requestOptions)
        const response_json = await response.json()
        if (response_json) {
            let justTweets = response_json.data
            return res.status(200).json({ justTweets })
        }
    }
}


