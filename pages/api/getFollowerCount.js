

export default async (req, res) => {

    if (req.method === 'POST') {
        let twitterID = req.body.twitterID

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        
        const response = await fetch(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?user_ids=${twitterID}`, requestOptions)
        const response_json = await response.json()
        let followers_count = response_json[0].followers_count
        console.log("🚀 ~ file: getFollowerCount.js ~ line 17 ~ followers_count", followers_count)
        
        if (response_json) {
            return res.status(200).json({ followers_count })
        }
    }
}


